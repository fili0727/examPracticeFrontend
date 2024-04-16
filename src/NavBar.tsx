
import { NavLink } from 'react-router-dom';
import './styling/navBar.css'; // Import the CSS for styling

export default function NavBar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/products" >Products</NavLink>
        </li>
        <li>
          <NavLink to="/productorders" >Product Orders</NavLink>
        </li>
        <li>
          <NavLink to="/deliveries" >Deliveries</NavLink>
        </li>
        <li>
          <NavLink to="/vans" >Vans</NavLink>
        </li>
      </ul>
    </nav>
  );
}


