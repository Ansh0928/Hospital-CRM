
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  User, 
  Calendar, 
  FileText, 
  CreditCard, 
  Users, 
  Pill, 
  Receipt, 
  ChartBar, 
  Shield, 
  Home,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

const SideNav: React.FC = () => {
  const { authState } = useAuth();
  const { user } = authState;
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const getMenuItems = () => {
    const role = user?.role;
    const dashboardPath = `/${role}-dashboard`;
    
    const menuItems = [
      {
        name: 'Dashboard',
        path: dashboardPath,
        icon: Home,
        roles: ['admin', 'doctor', 'staff', 'lab', 'pharmacist'],
      },
      {
        name: 'Patients',
        path: '/patients',
        icon: User,
        roles: ['admin', 'doctor', 'staff'],
      },
      {
        name: 'Appointments',
        path: '/appointments',
        icon: Calendar,
        roles: ['admin', 'doctor', 'staff'],
      },
      {
        name: 'Medical Records',
        path: '/emr',
        icon: FileText,
        roles: ['admin', 'doctor', 'staff'],
      },
      {
        name: 'Billing',
        path: '/billing',
        icon: CreditCard,
        roles: ['admin', 'staff'],
      },
      {
        name: 'Staff Management',
        path: '/staff',
        icon: Users,
        roles: ['admin'],
      },
      {
        name: 'Pharmacy',
        path: '/pharmacy',
        icon: Pill,
        roles: ['admin', 'pharmacist'],
      },
      {
        name: 'Lab Reports',
        path: '/lab-reports',
        icon: Receipt,
        roles: ['admin', 'doctor', 'lab'],
      },
      {
        name: 'Machine Management',
        path: '/machine-management',
        icon: Settings,
        roles: ['admin', 'doctor', 'lab'],
        
      },
      {
        name: 'Analytics',
        path: '/analytics',
        icon: ChartBar,
        roles: ['admin'],
      },
      {
        name: 'Security',
        path: '/security',
        icon: Shield,
        roles: ['admin'],
      },
    ];
    
    return menuItems.filter(item => item.roles.includes(role as string));
  };
  
  return (
    // // <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
    // <aside className="w-64 h-full bg-white border-r border-gray-200 flex flex-col">
    //   <div className="flex flex-col h-full">
    //     {/* Removed system title */}
        
    //     <div className="px-6 py-4 border-b border-gray-200">
    //       <p className="text-sm text-gray-500">Logged in as</p>
    //       <p className="font-medium text-medical-dark capitalize">{user?.role}</p>
    //     </div>
        
    //     <nav className="flex-1 px-4 py-4 overflow-y-auto">
    //       <ul className="space-y-1">
    //         {getMenuItems().map((item, index) => (
    //           <li key={index}>
    //             <Link
    //               to={item.path}
    //               className={cn(
    //                 "flex items-center space-x-3 px-3 py-2 rounded-md text-sm",
    //                 isActive(item.path)
    //                   ? "bg-medical-primary text-white"
    //                   : "text-gray-700 hover:bg-gray-100"
    //               )}
    //             >
    //               <item.icon size={18} />
    //               <span>{item.name}</span>
    //             </Link>
    //           </li>
    //         ))}
    //       </ul>
    //     </nav>
    //   </div>
    // </aside>
    <aside className="w-64 h-full bg-white border-r border-gray-200 flex flex-col">
  <div className="px-6 py-5 border-b border-gray-200">
    <p className="text-sm text-gray-500">Logged in as</p>
    <p className="text-base font-semibold text-medical-dark capitalize">{user?.role}</p>
  </div>

  <nav className="flex-1 px-4 py-4 overflow-y-auto">
    <ul className="space-y-2">
      {getMenuItems().map((item, index) => (
        <li key={index}>
          <Link
            to={item.path}
            className={cn(
              "flex items-center space-x-4 px-4 py-3 rounded-md text-sm font-medium transition-colors duration-150",
              isActive(item.path)
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            )}
          >
            <item.icon size={24} />
            <span>{item.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
</aside>

  );
};

export default SideNav;


// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { useAuth } from '@/contexts/AuthContext';
// import {
//   Home,
//   Users,
//   Calendar,
//   FileText,
//   CreditCard,
//   UserCog,
//   Pill,
//   Receipt,
//   FileBarChart2,
//   BarChart2,
//   Shield,
//   Settings
// } from 'lucide-react';
// import { cn } from '@/lib/utils';

// const SideNav: React.FC = () => {
//   const { authState } = useAuth();
//   const { user } = authState;
//   const location = useLocation();

//   const isActive = (path: string) => {
//     return location.pathname === path;
//   };

//   const getMenuItems = () => {
//     const role = user?.role;
//     const dashboardPath = `/${role}-dashboard`;

//     const menuItems = [
//       {
//         name: 'Dashboard',
//         path: dashboardPath,
//         icon: Home,
//         roles: ['admin', 'doctor', 'staff', 'lab', 'pharmacist'],
//       },
//       {
//         name: 'Patients',
//         path: '/patients',
//         icon: Users,
//         roles: ['admin', 'doctor', 'staff'],
//       },
//       {
//         name: 'Appointments',
//         path: '/appointments',
//         icon: Calendar,
//         roles: ['admin', 'doctor', 'staff'],
//       },
//       {
//         name: 'Medical Records',
//         path: '/emr',
//         icon: FileText,
//         roles: ['admin', 'doctor', 'staff'],
//       },
//       {
//         name: 'Billing',
//         path: '/billing',
//         icon: CreditCard,
//         roles: ['admin', 'staff'],
//       },
//       {
//         name: 'Staff Management',
//         path: '/staff-management',
//         icon: UserCog,
//         roles: ['admin'],
//       },
//       {
//         name: 'Pharmacy',
//         path: '/pharmacy',
//         icon: Pill,
//         roles: ['admin', 'pharmacist'],
//       },
//       {
//         name: 'Lab Reports',
//         path: '/lab-reports',
//         icon: Receipt,
//         roles: ['admin', 'doctor', 'lab'],
//       },
//       {
//         name: 'Analytics',
//         path: '/analytics',
//         icon: BarChart2,
//         roles: ['admin'],
//       },
//       {
//         name: 'Machine Management',
//         path: '/machine-management',
//         icon: Settings,
//         roles: ['admin', 'doctor', 'lab'],
//       },
//       {
//         name: 'Security',
//         path: '/security',
//         icon: Shield,
//         roles: ['admin'],
//       },
//     ];

//     return menuItems.filter((item) => item.roles.includes(role as string));
//   };

//   return (
//     <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
//       <div className="flex flex-col h-full">
//         <div className="px-6 py-4 border-b border-gray-200">
//           <p className="text-sm text-gray-500">Logged in as</p>
//           <p className="font-medium text-medical-dark capitalize">{user?.role}</p>
//         </div>
//         <nav className="flex-1 px-4 py-4 overflow-y-auto">
//           <ul className="space-y-1">
//             {getMenuItems().map((item, index) => (
//               <li key={index}>
//                 <Link
//                   to={item.path}
//                   className={cn(
//                     'flex items-center space-x-3 px-3 py-2 rounded-md text-sm',
//                     isActive(item.path)
//                       ? 'bg-medical-primary text-white'
//                       : 'text-gray-700 hover:bg-gray-100'
//                   )}
//                 >
//                   <item.icon size={18} />
//                   <span>{item.name}</span>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </div>
//     </aside>
//   );
// };

// export default SideNav;