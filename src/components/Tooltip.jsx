export default function Tooltip({ text }) {
  return (
    <div className="tooltip">
      <div className="tooltip-icon">?</div>
      <span className="tooltip-text">{text}</span>
    </div>
  );
}