
import React from 'react';
import { withAuth } from '@/contexts/AuthContext';
import PageHeader from '@/components/ui/PageHeader';
import StatsCard from '@/components/ui/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pill, ChartBar, FileText, AlertTriangle, Search } from 'lucide-react';
import { medicines, prescriptions, patients } from '@/data/sampleData';
import { useAuth } from '@/contexts/AuthContext';

const PharmacistDashboard: React.FC = () => {
  const { authState } = useAuth();
  
  // Get medicines with low stock
  const lowStockThreshold = 50;
  const lowStockMedicines = medicines.filter(med => 
    med.stock !== undefined && med.stock < lowStockThreshold
  );
  
  // Recent prescriptions
  const recentPrescriptions = [...prescriptions].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  
  return (
    <>
      <PageHeader 
        title="Pharmacy Dashboard" 
        subtitle={`Welcome, ${authState.user?.name}`}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatsCard
          title="Total Medicines"
          value={medicines.length}
          icon={Pill}
        />
        <StatsCard
          title="Low Stock Items"
          value={lowStockMedicines.length}
          icon={AlertTriangle}
          className={lowStockMedicines.length > 0 ? "border-l-4 border-yellow-500" : ""}
        />
        <StatsCard
          title="Prescriptions Today"
          value={prescriptions.filter(p => p.date === new Date().toISOString().split('T')[0]).length}
          icon={FileText}
        />
        <StatsCard
          title="Total Dispensed"
          value="187"
          icon={ChartBar}
        />
      </div>
      
      <div className="flex mb-6">
        <div className="w-full relative">
          <input
            type="text"
            placeholder="Search medicines by name, category, or ID..."
            className="w-full px-3 py-3 pl-12 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-medical-primary"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Button className="absolute right-2 top-1/2 transform -translate-y-1/2">
            Search
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Medicine Inventory</CardTitle>
            <Button variant="outline" size="sm">Add Medicine</Button>
          </CardHeader>
          <CardContent>
            <table className="medical-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Dosage</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map((medicine) => (
                  <tr key={medicine.id}>
                    <td className="font-medium">{medicine.name}</td>
                    <td>{medicine.dosage}</td>
                    <td>{medicine.stock}</td>
                    <td>
                      {medicine.stock !== undefined && medicine.stock < lowStockThreshold ? (
                        <span className="status-inactive">Low Stock</span>
                      ) : (
                        <span className="status-active">In Stock</span>
                      )}
                    </td>
                    <td>
                      <Button size="sm" variant="outline">Update</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">Recent Prescriptions</CardTitle>
            <Button variant="outline" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            {recentPrescriptions.map((prescription) => {
              const patient = patients.find(p => p.id === prescription.patientId);
              return (
                <div key={prescription.id} className="mb-4 p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium">{patient?.name}</h3>
                      <p className="text-sm text-gray-500">
                        ID: {patient?.uniqueId} | Date: {prescription.date}
                      </p>
                    </div>
                    <Button size="sm">Dispense</Button>
                  </div>
                  <div className="space-y-2">
                    {prescription.medicines.map((medicine, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{medicine.name} ({medicine.dosage})</span>
                        <span className="text-gray-600">{medicine.frequency} for {medicine.duration}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t text-sm text-gray-600">
                    <strong>Instructions:</strong> {prescription.instructions}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Medication Ordering</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-3">Low Stock Items</h3>
              {lowStockMedicines.length > 0 ? (
                <div className="space-y-2">
                  {lowStockMedicines.map((medicine) => (
                    <div key={medicine.id} className="flex justify-between items-center p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                      <div>
                        <p className="font-medium">{medicine.name}</p>
                        <p className="text-sm text-gray-600">{medicine.dosage}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-red-600 font-medium">
                          {medicine.stock} in stock
                        </p>
                        <Button size="sm" className="mt-1">Order</Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 border rounded-md">
                  <p className="text-gray-500">No low stock items</p>
                </div>
              )}
            </div>
            <div>
              <h3 className="font-medium mb-3">Quick Order</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Medicine
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-medical-primary">
                    <option value="">Select medicine</option>
                    {medicines.map((medicine) => (
                      <option key={medicine.id} value={medicine.id}>
                        {medicine.name} ({medicine.dosage})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-medical-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Supplier
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-medical-primary">
                    <option value="">Select supplier</option>
                    <option value="1">MedSupply Inc.</option>
                    <option value="2">PharmaDirect</option>
                    <option value="3">Global Pharma</option>
                  </select>
                </div>
                <Button className="w-full">Place Order</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default withAuth(PharmacistDashboard, ['pharmacist']);
