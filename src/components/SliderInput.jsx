export default function SliderInput({
  name,
  label,
  min = 0,
  max = 100,
  step = 0.1,
  value,
  onChange,
  placeholder
}) {

  return (
    <div className="slider-input">
      <label>{label}</label>

      <div className="slider-row">
        <input
          name={name}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />

        <input
          name={name}
          type="number"
          className="slider-number"
          value={value}
          step={step}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}