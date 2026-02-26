import { Link, useLocation } from "react-router-dom";

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
          <Link to="/mage">Mage</Link>
          <Link to="/supply">Supply</Link>
          <Link to="/nemesis">Nemesis</Link>
          <Link to="/nemesis-cards">Nemesis Cards</Link>
        </nav>
      </div>
    </header>
  );
}