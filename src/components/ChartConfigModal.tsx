import React from 'react';
import { X, BarChart3, PieChart, TrendingUp } from 'lucide-react';

const ChartConfigModal = ({ isOpen, onClose, onSave, selectedDataSource, allData, chartType }) => {
  const [config, setConfig] = React.useState({
    dataSource: selectedDataSource,
    compareDataSource: '',
    xAxis: '',
    yAxis: '',
    groupBy: '',
    aggregation: 'count',
    title: ''
  });

  const dataSourceOptions = Object.keys(allData);
  const currentData = allData[config.dataSource] || [];
  const compareData = config.compareDataSource ? allData[config.compareDataSource] || [] : [];
  
  const getFieldOptions = (data) => {
    if (!data || data.length === 0) return [];
    return Object.keys(data[0] || {});
  };

  const currentFields = getFieldOptions(currentData);
  const compareFields = getFieldOptions(compareData);

  const handleSave = () => {
    if (!config.title) {
      alert('Please enter a chart title');
      return;
    }
    
    if (chartType === 'bar' || chartType === 'line') {
      if (!config.xAxis || !config.yAxis) {
        alert('Please select both X and Y axis fields');
        return;
      }
    } else if (chartType === 'pie') {
      if (!config.groupBy) {
        alert('Please select a field to group by');
        return;
      }
    }
    
    onSave({
      ...config,
      chartType,
      id: `${chartType}-${Date.now()}`
    });
  };

  if (!isOpen) return null;

  const renderChartSpecificFields = () => {
    switch (chartType) {
      case 'bar':
      case 'line':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">X-Axis Field</label>
              <select
                value={config.xAxis}
                onChange={(e) => setConfig({...config, xAxis: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select X-Axis field</option>
                {currentFields.map(field => (
                  <option key={field} value={field}>{field}</option>
                ))}
                {config.compareDataSource && compareFields.map(field => (
                  <option key={`compare-${field}`} value={`compare.${field}`}>
                    {config.compareDataSource}.{field}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Y-Axis Field</label>
              <select
                value={config.yAxis}
                onChange={(e) => setConfig({...config, yAxis: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Y-Axis field</option>
                {currentFields.map(field => (
                  <option key={field} value={field}>{field}</option>
                ))}
                {config.compareDataSource && compareFields.map(field => (
                  <option key={`compare-${field}`} value={`compare.${field}`}>
                    {config.compareDataSource}.{field}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Aggregation</label>
              <select
                value={config.aggregation}
                onChange={(e) => setConfig({...config, aggregation: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="count">Count</option>
                <option value="sum">Sum</option>
                <option value="avg">Average</option>
                <option value="max">Maximum</option>
                <option value="min">Minimum</option>
              </select>
            </div>
          </>
        );
      
      case 'pie':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Group By Field</label>
            <select
              value={config.groupBy}
              onChange={(e) => setConfig({...config, groupBy: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select field to group by</option>
              {currentFields.map(field => (
                <option key={field} value={field}>{field}</option>
              ))}
            </select>
          </div>
        );
      
      default:
        return null;
    }
  };

  const getChartIcon = () => {
    switch (chartType) {
      case 'bar': return BarChart3;
      case 'pie': return PieChart;
      case 'line': return TrendingUp;
      default: return BarChart3;
    }
  };

  const ChartIcon = getChartIcon();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <ChartIcon className="w-5 h-5 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">
              Configure {chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Chart Title</label>
            <input
              type="text"
              value={config.title}
              onChange={(e) => setConfig({...config, title: e.target.value})}
              placeholder="Enter chart title"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Primary Data Source</label>
            <select
              value={config.dataSource}
              onChange={(e) => setConfig({...config, dataSource: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {dataSourceOptions.map(source => (
                <option key={source} value={source}>{source}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Compare with (Optional)</label>
            <select
              value={config.compareDataSource}
              onChange={(e) => setConfig({...config, compareDataSource: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">No comparison</option>
              {dataSourceOptions.filter(source => source !== config.dataSource).map(source => (
                <option key={source} value={source}>{source}</option>
              ))}
            </select>
          </div>
          
          {renderChartSpecificFields()}
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create Chart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChartConfigModal;