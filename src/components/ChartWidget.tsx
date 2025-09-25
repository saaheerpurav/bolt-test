import React from 'react';
import { X, TrendingUp, BarChart3 } from 'lucide-react';

const ChartWidget = ({ id, title, onRemove, fuelData, shipmentsData, allData, config }) => {
  const renderDynamicChart = () => {
    if (!config) return <div className="text-gray-500">No configuration found</div>;
    
    const primaryData = allData[config.dataSource] || [];
    const compareData = config.compareDataSource ? allData[config.compareDataSource] || [] : [];
    
    if (config.chartType === 'pie') {
      return renderPieChart(primaryData, config);
    } else if (config.chartType === 'bar') {
      return renderBarChart(primaryData, compareData, config);
    } else if (config.chartType === 'line') {
      return renderLineChart(primaryData, compareData, config);
    }
    
    return <div className="text-gray-500">Unsupported chart type</div>;
  };
  
  const renderPieChart = (data, config) => {
    const groupedData = data.reduce((acc, item) => {
      const key = item[config.groupBy];
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    
    const total = Object.values(groupedData).reduce((sum, count) => sum + count, 0);
    const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500'];
    
    return (
      <div className="space-y-3">
        {Object.entries(groupedData).map(([key, count], index) => (
          <div key={key} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${colors[index % colors.length]}`} />
              <span className="text-sm text-gray-700">{key}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-sm font-medium text-gray-900">{count}</div>
              <div className="text-xs text-gray-500">({Math.round((count / total) * 100)}%)</div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  const renderBarChart = (primaryData, compareData, config) => {
    const processData = (data, field) => {
      if (config.aggregation === 'count') {
        return data.reduce((acc, item) => {
          const key = item[field];
          acc[key] = (acc[key] || 0) + 1;
          return acc;
        }, {});
      }
      // Add other aggregation types as needed
      return {};
    };
    
    const xField = config.xAxis.startsWith('compare.') ? config.xAxis.replace('compare.', '') : config.xAxis;
    const yField = config.yAxis.startsWith('compare.') ? config.yAxis.replace('compare.', '') : config.yAxis;
    
    const primaryProcessed = processData(primaryData, xField);
    const maxValue = Math.max(...Object.values(primaryProcessed));
    
    return (
      <div className="space-y-3">
        {Object.entries(primaryProcessed).slice(0, 5).map(([key, value]) => (
          <div key={key} className="flex items-center space-x-3">
            <div className="text-xs text-gray-500 w-20 truncate">{key}</div>
            <div className="flex-1 bg-gray-200 rounded-full h-3 relative">
              <div 
                className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(value / maxValue) * 100}%` }}
              />
            </div>
            <div className="text-xs font-medium text-gray-700 w-12">{value}</div>
          </div>
        ))}
      </div>
    );
  };
  
  const renderLineChart = (primaryData, compareData, config) => {
    // Simplified line chart representation
    const processedData = primaryData.slice(0, 5).map((item, index) => ({
      label: item[config.xAxis] || `Point ${index + 1}`,
      value: parseFloat(item[config.yAxis]) || Math.random() * 100
    }));
    
    const maxValue = Math.max(...processedData.map(d => d.value));
    
    return (
      <div className="space-y-3">
        {processedData.map((point, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="text-xs text-gray-500 w-16">{point.label}</div>
            <div className="flex-1 bg-gray-200 rounded-full h-2 relative">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(point.value / maxValue) * 100}%` }}
              />
            </div>
            <div className="text-xs font-medium text-gray-700 w-12">{point.value.toFixed(1)}</div>
          </div>
        ))}
      </div>
    );
  };
  const renderFuelChart = () => {
    const maxGallons = Math.max(...fuelData.map(d => d.gallons));
    
    return (
      <div className="space-y-3">
        {fuelData.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="text-xs text-gray-500 w-16">{item.date.slice(5)}</div>
            <div className="flex-1 bg-gray-200 rounded-full h-2 relative">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(item.gallons / maxGallons) * 100}%` }}
              />
            </div>
            <div className="text-xs font-medium text-gray-700 w-16">{item.gallons}g</div>
          </div>
        ))}
      </div>
    );
  };

  const renderShipmentStatusChart = () => {
    const statusCounts = shipmentsData.reduce((acc, shipment) => {
      acc[shipment.status] = (acc[shipment.status] || 0) + 1;
      return acc;
    }, {});

    const colors = { 'In Transit': 'bg-blue-500', 'Delivered': 'bg-green-500', 'Loading': 'bg-yellow-500' };
    const total = shipmentsData.length;

    return (
      <div className="space-y-4">
        {Object.entries(statusCounts).map(([status, count]) => (
          <div key={status} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${colors[status] || 'bg-gray-500'}`} />
              <span className="text-sm text-gray-700">{status}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-sm font-medium text-gray-900">{count}</div>
              <div className="text-xs text-gray-500">({Math.round((count / total) * 100)}%)</div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full relative group">
      <button
        onClick={() => onRemove(id)}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-400 hover:text-red-500"
      >
        <X className="w-4 h-4" />
      </button>
      
      <div className="flex items-center mb-4">
        {config ? (
          config.chartType === 'pie' ? <PieChart className="w-5 h-5 text-blue-600 mr-2" /> :
          config.chartType === 'line' ? <TrendingUp className="w-5 h-5 text-blue-600 mr-2" /> :
          <BarChart3 className="w-5 h-5 text-blue-600 mr-2" />
        ) : id === 'chart-fuel-trend' ? (
          <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
        ) : (
          <BarChart3 className="w-5 h-5 text-blue-600 mr-2" />
        )}
        <h3 className="font-semibold text-gray-800">{config?.title || title}</h3>
      </div>
      
      <div className="h-full">
        {config ? renderDynamicChart() : 
         id === 'chart-fuel-trend' ? renderFuelChart() : renderShipmentStatusChart()}
      </div>
    </div>
  );
};

export default ChartWidget;