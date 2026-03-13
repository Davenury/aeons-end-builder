import { useState, useRef, useEffect } from "react";

export default function Dropdown({ label, children }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggle = () => setOpen((prev) => !prev);

  // close if clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button className="dropdown-button" onClick={toggle}>
        {label} ▾
      </button>

      {open && <div className="dropdown-menu" onClick={() => setOpen(false)}>{children}</div>}
    </div>
  );
}