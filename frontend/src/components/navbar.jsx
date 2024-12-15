import '../components_css/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="menu">
        <li><a href="/">Home</a></li>
        <li><a href="/">About</a></li>
        <li><a href="/">Contact</a></li>
        <li><a href="/">Faq</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
