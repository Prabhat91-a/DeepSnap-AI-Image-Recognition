import { Outlet, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { trefoil } from "ldrs";
import {
  Home,
  ImageIcon,
  History,
  Settings,
  Menu,
  X,
  HelpCircle,
  Bell,
  Search,
  ChevronRight,
} from "lucide-react";

export default function DashboardLayout() {
  useEffect(() => trefoil.register(), []);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);

  const { userId, isLoaded, user } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (isLoaded && !userId) nav("/sign-in");

    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [isLoaded, userId, nav]);

  if (!isLoaded)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <l-trefoil
            size="100"
            stroke="4"
            stroke-length="0.15"
            bg-opacity="0.1"
            speed="1"
            color="#7c3aed"
          />
          <p className="mt-6 text-gray-600 animate-pulse">
            Loading DeepSnap...
          </p>
        </div>
      </div>
    );

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside
        className={`fixed inset-y-0 left-0 z-20 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out
        w-64 bg-white border-r border-gray-100 shadow-lg overflow-y-auto`}
      >
        <div className="p-4 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex-shrink-0 relative w-10 h-10 rounded-full p-0.5 bg-gradient-to-r from-violet-600 to-indigo-600 overflow-hidden">
              <img
                src="/logo.png"
                alt="DeepSnap logo"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              DeepSnap
            </span>
          </Link>
        </div>

        <div className="p-4">
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search analyses..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 text-sm"
            />
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>

          <nav className="space-y-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 pl-2">
              Main
            </p>
            <NavItem
              to="/dashboard"
              icon={<Home size={18} />}
              label="Dashboard"
            />
            <NavItem
              to="/dashboard"
              icon={<ImageIcon size={18} />}
              label="New Analysis"
              active
            />
            <NavItem
              to="/dashboard"
              icon={<History size={18} />}
              label="History"
              badge="12"
            />

            <div className="pt-4 mt-4 border-t border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 pl-2">
                Settings
              </p>
              <NavItem
                to="/dashboard"
                icon={<Settings size={18} />}
                label="Preferences"
              />
              <NavItem
                to="/dashboard"
                icon={<HelpCircle size={18} />}
                label="Help & Support"
              />
            </div>
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-white">
          {user && (
            <div className="flex items-center gap-3">
              <img
                src={
                  user.imageUrl ||
                  `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=7c3aed&color=fff`
                }
                alt={user.firstName}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user.emailAddresses[0]?.emailAddress}
                </p>
              </div>
            </div>
          )}
        </div>
      </aside>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={toggleMobileMenu}
        ></div>
      )}

      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white transform ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:hidden`}
      >
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="flex-shrink-0 relative w-8 h-8 rounded-full p-0.5 bg-gradient-to-r from-violet-600 to-indigo-600 overflow-hidden">
              <img
                src="/logo.png"
                alt="DeepSnap logo"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              DeepSnap
            </span>
          </Link>
          <button onClick={toggleMobileMenu} className="text-gray-500">
            <X size={24} />
          </button>
        </div>

        <div className="p-4">
          <nav className="space-y-1">
            <NavItem
              to="/dashboard"
              icon={<Home size={18} />}
              label="Dashboard"
              onClick={toggleMobileMenu}
            />
            <NavItem
              to="/dashboard"
              icon={<ImageIcon size={18} />}
              label="New Analysis"
              active
              onClick={toggleMobileMenu}
            />
            <NavItem
              to="/dashboard"
              icon={<History size={18} />}
              label="History"
              badge="12"
              onClick={toggleMobileMenu}
            />
            <NavItem
              to="/dashboard"
              icon={<Settings size={18} />}
              label="Preferences"
              onClick={toggleMobileMenu}
            />
            <NavItem
              to="/dashboard"
              icon={<HelpCircle size={18} />}
              label="Help & Support"
              onClick={toggleMobileMenu}
            />
          </nav>
        </div>
      </div>

      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "lg:ml-64" : "ml-0"
        }`}
      >
        <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-500 lg:hidden focus:outline-none"
              >
                <Menu size={24} />
              </button>
              <button
                onClick={toggleSidebar}
                className="text-gray-500 hidden lg:block focus:outline-none"
              >
                <Menu size={24} />
              </button>
              <div className="hidden sm:flex items-center">
                <nav className="flex" aria-label="Breadcrumb">
                  <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li className="inline-flex items-center">
                      <Link
                        to="/dashboard"
                        className="text-sm font-medium text-gray-700 hover:text-violet-600"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <div className="flex items-center">
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                        <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                          Image Analysis
                        </span>
                      </div>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 text-gray-500 hover:text-violet-600 hover:bg-violet-50 rounded-full transition-colors">
                <Bell size={20} />
                {notifications > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                    {notifications}
                  </span>
                )}
              </button>
              <button className="p-2 text-gray-500 hover:text-violet-600 hover:bg-violet-50 rounded-full transition-colors">
                <HelpCircle size={20} />
              </button>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function NavItem({ to, icon, label, badge, active, onClick }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
        active
          ? "bg-violet-50 text-violet-700"
          : "text-gray-700 hover:bg-gray-50 hover:text-violet-600"
      }`}
      onClick={onClick}
    >
      <span className={`${active ? "text-violet-600" : "text-gray-500"}`}>
        {icon}
      </span>
      <span className="flex-1">{label}</span>
      {badge && (
        <span className="px-2 py-0.5 text-xs rounded-full bg-violet-100 text-violet-700">
          {badge}
        </span>
      )}
    </Link>
  );
}
