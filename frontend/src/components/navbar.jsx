import { NavLink, useNavigate } from 'react-router-dom';  
import { useAuth } from '../authcontext';  
import '../components_css/navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth(); 
  const navigate = useNavigate(); 

  
  const handleLogout = () => {
    logout();
    navigate('/');  
  };

  return (
    <nav className="navbar">
      <ul className="menu">
       
        {!isAuthenticated ? (
          <>
            <li><NavLink to="/">SignUp</NavLink></li>
            <li><NavLink to="/login">Login</NavLink></li>
          </>
        ) : (
          <>
            <li><NavLink to="/super-admin-dashboard">Super Admin Dashboard</NavLink></li>
            <li><NavLink to="/admin-dashboard">Admin Dashboard</NavLink></li>
            <li><NavLink to="/user-page">User Page</NavLink></li>
            <li><button onClick={handleLogout}>Logout</button></li> 
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
