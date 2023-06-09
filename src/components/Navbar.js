import { NavLink } from 'react-router-dom';

const links = [
  { path: '/', text: 'Home' },
  { path: 'calculator', text: 'calculator' },
  { path: 'quote', text: 'quote' },
];

const Navbar = () => (
  <nav className="navbar">
    <h1 className="navTitle">Math Magicians</h1>
    <ul>
      {links.map((link) => (
        <li key={link.text}>
          <NavLink to={link.path}>{link.text}</NavLink>
        </li>
      ))}
    </ul>
  </nav>
);
export default Navbar;
