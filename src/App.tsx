
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";

// Pages
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Dashboards
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import DoctorDashboard from "./pages/dashboards/DoctorDashboard";
import StaffDashboard from "./pages/dashboards/StaffDashboard";
import LabDashboard from "./pages/dashboards/LabDashboard";
import PharmacistDashboard from "./pages/dashboards/PharmacistDashboard";

// Modules
import Patients from "./pages/patients/Patients";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <MainLayout>
            <Routes>
              {/* Public route */}
              <Route path="/login" element={<Login />} />
              
              {/* Redirect from home to appropriate location */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              
              {/* Role-based dashboards */}
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
              <Route path="/staff-dashboard" element={<StaffDashboard />} />
              <Route path="/lab-dashboard" element={<LabDashboard />} />
              <Route path="/pharmacist-dashboard" element={<PharmacistDashboard />} />
              
              {/* Module routes */}
              <Route path="/patients" element={<Patients />} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainLayout>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
