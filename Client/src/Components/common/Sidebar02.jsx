import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  FileText, 
  Plus, 
  User, 
  Settings, 
  LogOut,
  TrendingUp,
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/Auth';
import { ROUTES } from '../../Config/routesConfig';
import '../../Styles/components/Sidebar02.css';


function Sidebar02() {
 const [screenSize, setScreenSize] = useState('desktop');
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setScreenSize('desktop');
      } else if (width >= 768) {
        setScreenSize('tablet');
      } else {
        setScreenSize('mobile');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    {
         name: "Home",
         icon: Home,
         path: ROUTES.DASHBOARD,
         role: "user",
       },
       {
         name: "My Blogs",
         icon: FileText,
         path: ROUTES.MY_BLOGS,
         role: "user",
       },
       {
         name: "Create Blog",
         icon: Plus,
         path: ROUTES.CREATE_BLOG,
         role: "user",
       },
       {
         name: "Trending",
         icon: TrendingUp,
         path: "/trending",
         role: "user",
       },
       {
         name: "Profile",
         icon: User,
         path: `/dashboard/${user?.userName}`,
         role: "user",
       },
       {
         name: "Settings",
         icon: Settings,
         path: ROUTES.SETTINGS,
         role: "user",
       },
     ];

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  const isActive = (path) => location.pathname === path;

  if (screenSize === 'mobile') {
    return (
      <motion.nav
        className="sidebar-mobile"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', damping: 25 }}
      >
        {menuItems.slice(0, 4).map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`mobile-nav-item ${isActive(item.path) ? 'active' : ''}`}
              title={item.name}
            >
              <Icon size={22} />
              {isActive(item.path) && (
                <motion.div
                  className="mobile-active-dot"
                  layoutId="mobileActive"
                  transition={{ type: 'spring', stiffness: 300 }}
                />
              )}
            </Link>
          );
        })}
      </motion.nav>
    );
  }

  if (screenSize === 'tablet') {
    return (
      <motion.div
        className="sidebar-tablet"
        initial={{ x: -80 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', damping: 25 }}
      >
        {/* Logo */}
        <div className="sidebar-logo-tablet">
          <Link to={ROUTES.DASHBOARD}>
            <FileText size={28} />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav-tablet">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`tablet-nav-item ${isActive(item.path) ? 'active' : ''}`}
                title={item.name}
              >
                <Icon size={22} />
                {isActive(item.path) && (
                  <motion.div
                    className="tablet-active-indicator"
                    layoutId="tabletActive"
                    transition={{ type: 'spring', stiffness: 300 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User & Logout */}
        <div className="sidebar-footer-tablet">
          <Link
            to= {`/dashboard/${user?.userName}`}
            className="tablet-user-btn"
            title="Profile"
          >
            <div className="user-avatar-tablet">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
          </Link>
          
          <button
            onClick={handleLogout}
            className="tablet-logout-btn"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </motion.div>
    );
  }

  // Desktop Sidebar
  return (
    <motion.div
      className="sidebar-desktop"
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', damping: 25 }}
    >
      {/* Header */}
      <div className="sidebar-header">
        <motion.div 
          className="logo"
          whileHover={{ scale: 1.02 }}
        >
          <Link to={ROUTES.DASHBOARD}>
            <FileText size={28} />
            <span>BlogSphere</span>
          </Link>
        </motion.div>
      </div>

      {/* User Profile */}
      <motion.div 
        className="user-profile"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="user-avatar">
          {user?.name?.charAt(0)?.toUpperCase() || 'U'}
        </div>
        <div className="user-info">
          <h4>{user?.name || 'User'}</h4>
          <p>@{user?.userName || 'username'}</p>
        </div>
      </motion.div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={item.path}
                className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              >
                <Icon size={20} />
                <span>{item.name}</span>
                {isActive(item.path) && (
                  <motion.div
                    className="active-indicator"
                    layoutId="activeIndicator"
                    transition={{ type: 'spring', stiffness: 300 }}
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Footer */}
      <motion.div 
        className="sidebar-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </motion.div>
    </motion.div>
  );
};


export default Sidebar02
