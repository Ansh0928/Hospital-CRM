
import React from 'react';
import SideNav from './SideNav';
import TopBar from './TopBar';
import { useAuth } from '@/contexts/AuthContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { authState } = useAuth();
  
  if (!authState.isAuthenticated) {
    return <>{children}</>;
  }
  
  return (
    <div className="flex h-screen bg-medical-blue">
      <SideNav />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
