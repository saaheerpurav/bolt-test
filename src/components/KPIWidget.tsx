import React from 'react';
import { X, Truck, Users, Fuel, Clock } from 'lucide-react';

const KPIWidget = ({ id, title, onRemove, kpiData }) => {
  const getKPIValue = () => {
    switch (id) {
      case 'kpi-active-trucks':
        return { value: kpiData.activeTrucks, unit: 'trucks', icon: Truck };
      case 'kpi-active-drivers':
        return { value: kpiData.activeDrivers, unit: 'drivers', icon: Users };
      case 'kpi-fuel-loaded':
        return { value: kpiData.fuelLoadedToday, unit: 'gallons', icon: Fuel };
      case 'kpi-avg-delivery':
        return { value: kpiData.avgDeliveryTime, unit: 'days', icon: Clock };
      default:
        return { value: 0, unit: '', icon: Truck };
    }
  };

  const kpiInfo = getKPIValue();
  const Icon = kpiInfo.icon;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full relative group">
      <button
        onClick={() => onRemove(id)}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-400 hover:text-red-500"
      >
        <X className="w-4 h-4" />
      </button>
      
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
      </div>
      
      <div>
        <div className="text-2xl font-bold text-gray-900 mb-1">
          {kpiInfo.value.toLocaleString()}
        </div>
        <div className="text-sm text-gray-500 capitalize">{kpiInfo.unit}</div>
        <div className="text-xs font-medium text-gray-600 mt-2">{title}</div>
      </div>
    </div>
  );
};

export default KPIWidget;