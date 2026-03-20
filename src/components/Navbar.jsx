import { Link, useLocation } from "react-router-dom";
import Dropdown from "./Dropdown";

export default function Navbar() {

    const location = useLocation();

    const pathnames = location.pathname.split("/").filter(Boolean);

    const breadcrumbs = pathnames.map((segment, index) => {
        const to = "/" + pathnames.slice(0, index + 1).join("/");
        const isLast = index === pathnames.length - 1;

        const label =
          segment.charAt(0).toUpperCase() + segment.slice(1);

        return (
          <span key={to}>
            {" / "}
            {isLast ? (
              <span className="crumb-current">{label}</span>
            ) : (
              <Link to={to}>{label}</Link>
            )}
          </span>
        );
    })

  return (
    <header className="navbar">
      <div className="nav-inner">
        <h1 className="logo">Aeon's End Creator {breadcrumbs}</h1>

        <nav>
          <Link to="/">Home</Link>
          <Dropdown label="Mage">
            <Link to="/mage">Character</Link>
            <Link to="/breach">Breach</Link>
          </Dropdown>
          <Dropdown label="Friend / Foe">
            <Link to="/friend-foe">Character</Link>
            <Link to="/friend-foe-cards">Cards</Link>
          </Dropdown>
          <Link to="/supply">Supply</Link>
          <Dropdown label="Nemesis">
            <Link to="/nemesis">Nemesis</Link>
            <Link to="/nemesis-cards">Cards</Link>
          </Dropdown>
          <Dropdown label="Other">
            <Link to="/lore">Lore</Link>
          </Dropdown>
        </nav>
      </div>
    </header>
  );
}