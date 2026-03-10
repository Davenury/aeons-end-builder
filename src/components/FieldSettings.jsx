import { useState, useRef, useEffect } from "react";

export default function FieldSettings({ children, panel, type }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  // close when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="field-settings" ref={wrapperRef}>
      
      <div style={{flexGrow: '1'}}>
        {children}
      </div>
      <button
        className="gear-btn"
        onClick={() => setOpen(!open)}
        type="button"
      >
        ⚙
      </button>

      {open && <div className={`settings-panel${type === 'breach' ? '-bottom' : ''}`}>{panel}</div>}
    </div>
  );
}