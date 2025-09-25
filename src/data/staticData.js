export const driversData = [
  { id: 1, name: "John Smith", status: "Active", hours: 8.5, location: "Dallas, TX" },
  { id: 2, name: "Maria Garcia", status: "Active", hours: 7.2, location: "Houston, TX" },
  { id: 3, name: "Robert Johnson", status: "Off Duty", hours: 0, location: "Austin, TX" },
  { id: 4, name: "Lisa Chen", status: "Active", hours: 6.8, location: "San Antonio, TX" },
  { id: 5, name: "Mike Williams", status: "Active", hours: 9.1, location: "Fort Worth, TX" }
];

export const shipmentsData = [
  { id: 1001, origin: "Dallas, TX", destination: "Phoenix, AZ", status: "In Transit", eta: "2025-01-15" },
  { id: 1002, origin: "Houston, TX", destination: "Denver, CO", status: "Delivered", eta: "2025-01-14" },
  { id: 1003, origin: "Austin, TX", destination: "Las Vegas, NV", status: "In Transit", eta: "2025-01-16" },
  { id: 1004, origin: "San Antonio, TX", destination: "Albuquerque, NM", status: "Loading", eta: "2025-01-17" },
  { id: 1005, origin: "Fort Worth, TX", destination: "Oklahoma City, OK", status: "Delivered", eta: "2025-01-13" }
];

export const fuelData = [
  { date: "2025-01-10", gallons: 1250, cost: 4875 },
  { date: "2025-01-11", gallons: 1180, cost: 4602 },
  { date: "2025-01-12", gallons: 1320, cost: 5148 },
  { date: "2025-01-13", gallons: 1095, cost: 4271 },
  { date: "2025-01-14", gallons: 1275, cost: 4973 }
];

export const trucksData = [
  { id: "T001", model: "Freightliner Cascadia", status: "Active", mileage: 145000 },
  { id: "T002", model: "Kenworth T680", status: "Active", mileage: 98000 },
  { id: "T003", model: "Peterbilt 579", status: "Maintenance", mileage: 203000 },
  { id: "T004", model: "Volvo VNL", status: "Active", mileage: 87000 },
  { id: "T005", model: "Mack Anthem", status: "Active", mileage: 156000 }
];

export const kpiData = {
  activeTrucks: 4,
  totalDrivers: 5,
  activeDrivers: 4,
  avgDeliveryTime: 2.3,
  fuelLoadedToday: 1275,
  shipmentsInTransit: 2,
  totalShipments: 5,
  deliveredToday: 1
};