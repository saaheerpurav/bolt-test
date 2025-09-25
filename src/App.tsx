import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import { driversData, shipmentsData, fuelData, trucksData, kpiData } from './data/staticData';

function App() {
  const [widgets, setWidgets] = useState([]);
  const [selectedDataSource, setSelectedDataSource] = useState('drivers');
  const allData = { drivers: driversData, shipments: shipmentsData, fuel: fuelData, trucks: trucksData };

  const defaultLayout = [
    { id: 'kpi-active-trucks', type: 'kpi', title: 'Active Trucks', x: 20, y: 20, width: 280, height: 180 },
    { id: 'kpi-active-drivers', type: 'kpi', title: 'Active Drivers', x: 320, y: 20, width: 280, height: 180 },
    { id: 'kpi-fuel-loaded', type: 'kpi', title: 'Fuel Loaded Today', x: 620, y: 20, width: 280, height: 180 },
    { id: 'kpi-avg-delivery', type: 'kpi', title: 'Avg. Delivery Time', x: 920, y: 20, width: 280, height: 180 },
    { id: 'chart-fuel-trend', type: 'chart', title: 'Fuel Usage Trend', x: 20, y: 220, width: 580, height: 300 },
    { id: 'table-drivers', type: 'table', title: 'Drivers Table', x: 620, y: 220, width: 580, height: 300 }
  ];

  const handleWidgetAdd = (widget) => {
    // Check if widget already exists
    const exists = widgets.some(w => w.id === widget.id);
    if (!exists) {
      setWidgets([...widgets, widget]);
    }
  };

  const handleWidgetRemove = (widgetId) => {
    setWidgets(widgets.filter(w => w.id !== widgetId));
  };

  const handleResetLayout = () => {
    setWidgets([...defaultLayout]);
  };

  const handleDataSourceSelect = (sourceId) => {
    setSelectedDataSource(sourceId);
  };

  const handleWidgetDragStart = (widget) => {
    // This can be used for additional drag start logic if needed
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar 
        onWidgetDragStart={handleWidgetDragStart}
        selectedDataSource={selectedDataSource}
        onDataSourceSelect={handleDataSourceSelect}
        allData={allData}
      />
      <Dashboard 
        widgets={widgets}
        onWidgetAdd={handleWidgetAdd}
        onWidgetRemove={handleWidgetRemove}
        onResetLayout={handleResetLayout}
        driversData={driversData}
        shipmentsData={shipmentsData}
        fuelData={fuelData}
        kpiData={kpiData}
        selectedDataSource={selectedDataSource}
        allData={allData}
      />
    </div>
  );
}

export default App;