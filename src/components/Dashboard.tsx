import React from 'react';
import { RotateCcw, Settings } from 'lucide-react';
import KPIWidget from './KPIWidget';
import ChartWidget from './ChartWidget';
import TableWidget from './TableWidget';
import ChartConfigModal from './ChartConfigModal';

const Dashboard = ({ 
  widgets, 
  onWidgetAdd, 
  onWidgetRemove, 
  onResetLayout, 
  driversData, 
  shipmentsData, 
  fuelData, 
  kpiData,
  selectedDataSource,
  allData
}) => {
  const [showConfigModal, setShowConfigModal] = React.useState(false);
  const [pendingWidget, setPendingWidget] = React.useState(null);
  const [gridSize] = React.useState({ cols: 6, rows: 4, cellWidth: 200, cellHeight: 180 });

  const findAvailableGridPosition = (widgetWidth, widgetHeight) => {
    const cols = Math.ceil(widgetWidth / gridSize.cellWidth);
    const rows = Math.ceil(widgetHeight / gridSize.cellHeight);
    
    // Create a grid to track occupied cells
    const grid = Array(gridSize.rows).fill().map(() => Array(gridSize.cols).fill(false));
    
    // Mark occupied cells
    widgets.forEach(widget => {
      const startCol = Math.floor(widget.x / gridSize.cellWidth);
      const startRow = Math.floor(widget.y / gridSize.cellHeight);
      const widgetCols = Math.ceil(widget.width / gridSize.cellWidth);
      const widgetRows = Math.ceil(widget.height / gridSize.cellHeight);
      
      for (let r = startRow; r < Math.min(startRow + widgetRows, gridSize.rows); r++) {
        for (let c = startCol; c < Math.min(startCol + widgetCols, gridSize.cols); c++) {
          if (r >= 0 && c >= 0) grid[r][c] = true;
        }
      }
    });
    
    // Find first available position
    for (let r = 0; r <= gridSize.rows - rows; r++) {
      for (let c = 0; c <= gridSize.cols - cols; c++) {
        let canPlace = true;
        for (let dr = 0; dr < rows && canPlace; dr++) {
          for (let dc = 0; dc < cols && canPlace; dc++) {
            if (grid[r + dr][c + dc]) canPlace = false;
          }
        }
        if (canPlace) {
          return {
            x: c * gridSize.cellWidth,
            y: r * gridSize.cellHeight
          };
        }
      }
    }
    
    // If no space found, place at end
    return { x: 0, y: widgets.length * 200 };
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const widgetData = JSON.parse(e.dataTransfer.getData('text/plain'));
    
    const widgetWidth = widgetData.type === 'kpi' ? 280 : 400;
    const widgetHeight = widgetData.type === 'table' ? 300 : 250;
    
    if (widgetData.type === 'chart' && widgetData.id.includes('dynamic')) {
      // Show configuration modal for dynamic charts
      setPendingWidget({
        ...widgetData,
        width: widgetWidth,
        height: widgetHeight
      });
      setShowConfigModal(true);
      return;
    }
    
    const position = findAvailableGridPosition(widgetWidth, widgetHeight);
    
    const newWidget = {
      ...widgetData,
      x: position.x,
      y: position.y,
      width: widgetWidth,
      height: widgetHeight
    };
    
    onWidgetAdd(newWidget);
  };

  const handleChartConfig = (config) => {
    if (pendingWidget) {
      const position = findAvailableGridPosition(pendingWidget.width, pendingWidget.height);
      const newWidget = {
        ...pendingWidget,
        x: position.x,
        y: position.y,
        config: config
      };
      onWidgetAdd(newWidget);
      setPendingWidget(null);
    }
    setShowConfigModal(false);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const renderWidget = (widget) => {
    const commonProps = {
      key: widget.id,
      id: widget.id,
      title: widget.title,
      onRemove: onWidgetRemove
    };

    const widgetStyle = {
      position: 'absolute',
      left: widget.x,
      top: widget.y,
      width: widget.width,
      height: widget.height,
      zIndex: 1
    };

    let WidgetComponent;
    let widgetProps = { ...commonProps };

    if (widget.type === 'kpi') {
      WidgetComponent = KPIWidget;
      widgetProps.kpiData = kpiData;
    } else if (widget.type === 'chart') {
      WidgetComponent = ChartWidget;
      widgetProps.fuelData = fuelData;
      widgetProps.shipmentsData = shipmentsData;
      widgetProps.allData = allData;
      widgetProps.config = widget.config;
    } else if (widget.type === 'table') {
      WidgetComponent = TableWidget;
      widgetProps.driversData = driversData;
      widgetProps.shipmentsData = shipmentsData;
      widgetProps.allData = allData;
    }

    return (
      <div key={widget.id} style={widgetStyle}>
        <WidgetComponent {...widgetProps} />
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Logistics Dashboard</h1>
          <button
            onClick={onResetLayout}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Default Layout
          </button>
        </div>
      </div>

      {/* Dashboard Area */}
      <div 
        className="flex-1 p-4 relative overflow-auto"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{ minHeight: '600px' }}
      >
        {widgets.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <div className="text-6xl mb-4">📊</div>
              <h2 className="text-xl font-medium mb-2">Start Building Your Dashboard</h2>
              <p className="text-sm">Drag widgets from the sidebar to create your custom dashboard</p>
            </div>
          </div>
        ) : (
          widgets.map(renderWidget)
        )}
      </div>
      
      {showConfigModal && (
        <ChartConfigModal
          isOpen={showConfigModal}
          onClose={() => setShowConfigModal(false)}
          onSave={handleChartConfig}
          selectedDataSource={selectedDataSource}
          allData={allData}
          chartType={pendingWidget?.chartType}
        />
      )}
    </div>
  );
};

export default Dashboard;