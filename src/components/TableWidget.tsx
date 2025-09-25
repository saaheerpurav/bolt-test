import React from 'react';
import { X, Users, MapPin } from 'lucide-react';

const TableWidget = ({ id, title, onRemove, driversData, shipmentsData }) => {
  const renderDriversTable = () => (
    <div className="overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-2 px-3 font-medium text-gray-700">Name</th>
            <th className="text-left py-2 px-3 font-medium text-gray-700">Status</th>
            <th className="text-left py-2 px-3 font-medium text-gray-700">Hours</th>
            <th className="text-left py-2 px-3 font-medium text-gray-700">Location</th>
          </tr>
        </thead>
        <tbody>
          {driversData.slice(0, 4).map((driver) => (
            <tr key={driver.id} className="border-b border-gray-100">
              <td className="py-2 px-3 text-gray-900">{driver.name}</td>
              <td className="py-2 px-3">
                <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                  driver.status === 'Active' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {driver.status}
                </span>
              </td>
              <td className="py-2 px-3 text-gray-700">{driver.hours}h</td>
              <td className="py-2 px-3 text-gray-600 text-xs">{driver.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderShipmentsTable = () => (
    <div className="overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-2 px-3 font-medium text-gray-700">ID</th>
            <th className="text-left py-2 px-3 font-medium text-gray-700">Route</th>
            <th className="text-left py-2 px-3 font-medium text-gray-700">Status</th>
            <th className="text-left py-2 px-3 font-medium text-gray-700">ETA</th>
          </tr>
        </thead>
        <tbody>
          {shipmentsData.slice(0, 4).map((shipment) => (
            <tr key={shipment.id} className="border-b border-gray-100">
              <td className="py-2 px-3 font-medium text-gray-900">#{shipment.id}</td>
              <td className="py-2 px-3 text-gray-700 text-xs">
                {shipment.origin} → {shipment.destination}
              </td>
              <td className="py-2 px-3">
                <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                  shipment.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                  shipment.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {shipment.status}
                </span>
              </td>
              <td className="py-2 px-3 text-gray-600 text-xs">{shipment.eta}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full relative group">
      <button
        onClick={() => onRemove(id)}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-400 hover:text-red-500"
      >
        <X className="w-4 h-4" />
      </button>
      
      <div className="flex items-center mb-4">
        {id === 'table-drivers' ? (
          <Users className="w-5 h-5 text-blue-600 mr-2" />
        ) : (
          <MapPin className="w-5 h-5 text-blue-600 mr-2" />
        )}
        <h3 className="font-semibold text-gray-800">{title}</h3>
      </div>
      
      <div className="h-full overflow-auto">
        {id === 'table-drivers' ? renderDriversTable() : renderShipmentsTable()}
      </div>
    </div>
  );
};

export default TableWidget;