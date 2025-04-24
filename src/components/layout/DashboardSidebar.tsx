// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import { 
//   Home, 
//   Users, 
//   Calendar, 
//   FileText, 
//   CreditCard, 
//   UserCog, 
//   Pill, 
//   FileBarChart2, 
//   BarChart2, 
//   Shield, 
//   Settings 
// } from "lucide-react";

// interface SidebarItemProps {
//   icon: React.ElementType;
//   title: string;
//   to: string;
//   isActive: boolean;
// }

// interface DashboardSidebarProps {
//   isMobileOpen: boolean;
// }

// const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, title, to, isActive }) => {
//   return (
//     <Link
//       to={to}
//       className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
//         isActive
//           ? "bg-blue-600 text-white"
//           : "text-gray-600 hover:bg-gray-100"
//       }`}
//     >
//       <Icon className="h-5 w-5 mr-3" />
//       {title}
//     </Link>
//   );
// };

// const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ isMobileOpen }) => {
//   const location = useLocation();
  
//   const sidebarItems = [
//     { title: "Dashboard", icon: Home, path: "/" },
//     { title: "Patients", icon: Users, path: "/patients" },
//     { title: "Appointments", icon: Calendar, path: "/appointments" },
//     { title: "Medical Records", icon: FileText, path: "/medical-records" },
//     { title: "Billing", icon: CreditCard, path: "/billing" },
//     { title: "Staff Management", icon: UserCog, path: "/staff-management" },
//     { title: "Pharmacy", icon: Pill, path: "/pharmacy" },
//     { title: "Lab Reports", icon: FileBarChart2, path: "/lab-reports" },
//     { title: "Analytics", icon: BarChart2, path: "/analytics" },
//     { title: "Machine Management", icon: Settings, path: "/machine-management" },
//     { title: "Security", icon: Shield, path: "/security" },
//   ];

//   return (
//     <>
//       {/* Sidebar for mobile */}
//       <div
//         className={`lg:hidden fixed inset-0 z-40 transform ${
//           isMobileOpen ? "translate-x-0" : "-translate-x-full"
//         } transition-transform duration-300 ease-in-out`}
//       >
//         <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-xl">
//           <div className="flex items-center px-4 py-6 border-b border-gray-200">
//             <div className="flex-shrink-0">
            
//             </div>
//           </div>
//           <div className="mt-4 flex-1 px-2 pb-4 space-y-1">
//             {sidebarItems.map((item) => (
//               <SidebarItem
//                 key={item.title}
//                 icon={item.icon}
//                 title={item.title}
//                 to={item.path}
//                 isActive={location.pathname === item.path}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Sidebar for desktop */}
//       <div className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:z-50 lg:w-64">
//         <div className="flex flex-col flex-grow bg-white shadow-lg overflow-y-auto">
//           <div className="flex items-center px-4 py-6 border-b border-gray-200">
//           <div className="flex flex-col items-start space-y-0.5">
//                <p className="text-sm font-medium text-gray-500">Logged in as</p>
//                <p className="text-base font-semibold text-black">Admin</p>
//           </div>
//           </div>
//           <div className="mt-4 flex-1 px-2 pb-4 space-y-1">
//             {sidebarItems.map((item) => (
//               <SidebarItem
//                 key={item.title}
//                 icon={item.icon}
//                 title={item.title}
//                 to={item.path}
//                 isActive={location.pathname === item.path}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DashboardSidebar;
