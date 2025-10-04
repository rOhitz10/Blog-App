import React, { useState } from "react";
import { FileText, Home, LogOut, Menu, Plus, Search, Settings, TrendingUp, User, X } from "lucide-react";
import { ROUTES } from "../../Config/routesConfig";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion ,AnimatePresence} from "framer-motion";
import { useAuth } from '../../contexts/Auth';
import '../../Styles/components/sidebar01.css'

function Sidebar01() {
 const [isOpen ,setIsOpen] = useState(false);
 const [isCollapsed,setIsCollapsed] = useState(false)
 const location = useLocation();
 const navigate = useNavigate();
 const {user,logout} = useAuth()
  const items = [
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
      path: ROUTES.PROFILE,
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
  const toggleSidebar = ()=> setIsOpen(!isOpen);
  const toggleCollapse = ()=> setIsCollapsed(!isCollapsed)

  const isActive = (path) => location.pathname === path;

  return <>
  <AnimatePresence>

  {isOpen && (
   <motion.div 
   className='sidebar-overlay'
   initail={{opacity:0}}
   animate={{opacity:1}}
   exit={{opacity:0}}
   onClick={()=>setIsOpen(false)}
   />   
  )}
  </AnimatePresence>

  {/* Mobile Menu Button */}
      <button className="mobile-menu-btn" onClick={toggleSidebar}>
        <Menu size={24} />
      </button>

      {/* sidebar */}
      <motion.div className={`sidebar ${isCollapsed ? "collapsed" : ''} ${isOpen ? 'open' : ''}`}
      initial={{x:-300}}
      animate={{x:isOpen ? 0 : -300}}
      transition={{type: 'spring',  damping:25}}
      >
       {/* header */}
       <div className="sidebar-header">
        <motion.div 
        className="logo"
        whileHover={{scale:1.05}}
        transition={{type:'spring',stiffness:300}}
        >
         <Link to={ROUTES.DASHBOARD}>
         <FileText size={30} />
         {!isCollapsed && <span>BlogSphere</span>}
         </Link>
        </motion.div>
        <button className="collapse-btn" onClick={toggleCollapse}>
         {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
       </div>

       {/* user Profile */}
       <motion.div 
       className="user-profile"
       initial={{opacity:0}}
       animate={{opacity:1}}
       transition={{delay:0.1}}
       >
        <div className="user-avatar">{user?.name?.charAt(0)?.toUpperCase() || 'U'}</div>
        {!isCollapsed && (
         <div className="user-info"> 
         <h4>{user?.name || 'User'}</h4>
         <p>@{user?.userName || 'username'}</p>
         </div>
        )}
       </motion.div>

           {/* Navigation Menu */}
        <nav className="sidebar-nav">
          {items.map((item, index) => {
            if (item.role === 'admin' && user?.role !== 'admin') return null;
            
            const Icon = item.icon;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon size={20} />
                  {!isCollapsed && <span>{item.name}</span>}
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
          transition={{ delay: 0.3 }}
        >
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={20} />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </motion.div>
      </motion.div>

  </>;
}

export default Sidebar01;
