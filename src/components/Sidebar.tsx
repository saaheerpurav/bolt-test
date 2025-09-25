import React from 'react';
import { BarChart3, Table, TrendingUp, Truck, Users, Fuel, MapPin, Clock } from 'lucide-react';

const Sidebar = ({ onWidgetDragStart, selectedDataSource, onDataSourceSelect, allData }) => {
  const widgets = [
    { id: 'kpi-active-trucks', type: 'kpi', title: 'Active Trucks', icon: Truck },
    { id: 'kpi-active-drivers', type: 'kpi', title: 'Active Drivers', icon: Users },
    { id: 'kpi-fuel-loaded', type: 'kpi', title: 'Fuel Loaded Today', icon: Fuel },
    { id: 'kpi-avg-delivery', type: 'kpi', title: 'Avg. Delivery Time', icon: Clock },
    { id: 'table-drivers', type: 'table', title: 'Drivers Table', icon: Table },
    { id: 'table-shipments', type: 'table', title: 'Shipments Table', icon: Table },
  ];

  const dynamicCharts = [
    { id: 'dynamic-bar-chart', type: 'chart', title: 'Bar Chart', icon: BarChart3, chartType: 'bar' },
    { id: 'dynamic-pie-chart', type: 'chart', title: 'Pie Chart', icon: BarChart3, chartType: 'pie' },
    { id: 'dynamic-line-chart', type: 'chart', title: 'Line Chart', icon: TrendingUp, chartType: 'line' }
  ];

  const dataSources = [
    { id: 'drivers', name: 'Drivers Data', icon: Users },
    { id: 'shipments', name: 'Shipments Data', icon: MapPin },
    { id: 'fuel', name: 'Fuel Data', icon: Fuel },
    { id: 'trucks', name: 'Trucks Data', icon: Truck }
  ];

  const handleDragStart = (e, widget) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(widget));
    onWidgetDragStart(widget);
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Widgets Section */}
      <div className="flex-1 p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
          Widgets
        </h2>
        <div className="space-y-2">
          {widgets.map((widget) => {
            const Icon = widget.icon;
            return (
              <div
                key={widget.id}
                draggable
                onDragStart={(e) => handleDragStart(e, widget)}
                className="flex items-center p-3 bg-gray-50 rounded-lg cursor-move hover:bg-blue-50 hover:border-blue-200 border border-gray-200 transition-all duration-200"
              >
                <Icon className="w-4 h-4 mr-3 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">{widget.title}</span>
              </div>
            );
          })}
          
          {/* Dynamic Charts Section */}
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Dynamic Charts</h3>
            {dynamicCharts.map((chart) => {
              const Icon = chart.icon;
              return (
                <div
                  key={chart.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, chart)}
                  className="flex items-center p-3 bg-purple-50 rounded-lg cursor-move hover:bg-purple-100 hover:border-purple-200 border border-purple-200 transition-all duration-200"
                >
                  <Icon className="w-4 h-4 mr-3 text-purple-600" />
                  <span className="text-sm font-medium text-purple-700">{chart.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Data Sources Section */}
      <div className="border-t border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Table className="w-5 h-5 mr-2 text-green-600" />
          Data Sources
        </h2>
        <div className="space-y-2">
          {dataSources.map((source) => {
            const Icon = source.icon;
            return (
              <div
                key={source.id}
                onClick={() => onDataSourceSelect(source.id)}
                className={`flex items-center p-3 rounded-lg cursor-pointer border transition-all duration-200 ${
                  selectedDataSource === source.id
                    ? 'bg-green-50 border-green-200 text-green-700'
                    : 'bg-gray-50 border-gray-200 hover:bg-green-50 hover:border-green-200 text-gray-700'
                }`}
              >
                <Icon className="w-4 h-4 mr-3" />
                <span className="text-sm font-medium">{source.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;