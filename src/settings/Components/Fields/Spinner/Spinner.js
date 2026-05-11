import "./style.scss";
const Spinner = ({
  value,
  onChange,
  max = 100,
  min = 0,
  step = 1,
  unit,
  defaultValue="",
}) => {
  const def = value || { spinner: defaultValue?.spinner };
  const roundToPrecision = (num, precision) => {
    return Number((Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision)).toFixed(precision));
  };

  const currentValue = roundToPrecision(def.spinner, 1);
  return (
    <div className="bPl-spinner-main-wrapper">
      <div className="bPl-spinner-field-main-wrapper">
        <div className="bPl-spinner-wrapper">
          <div
            onClick={() => {
              if (min < currentValue) {
                const newValue = roundToPrecision(currentValue - step, 1);
                if (unit) {
                  onChange({ ...def, spinner: newValue, unit });
                } else {
                  onChange({ ...def, spinner: newValue });
                }
              }
            }}  
            className="bPl-spinner-button"
          >
            <svg
              height={14}
              fill="#777"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 512"
            >
              <path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z" />
            </svg>
          </div>
          <div className="bPl-spinner-inputField-wrapper">
            <input
              value={def?.spinner}
              type="number"
              min={min}
              max={max}
              step={step}
              className="bPl-spinner-input"
              onChange={(e) => onChange({ ...def, spinner: e.target.value })}
            />
          </div>
          {unit && <div className="bPl-spinner-unit">{unit}</div>}
          <div
            onClick={() => {
              if (max > currentValue) {
                const newValue = roundToPrecision(currentValue + step, 1);
                if (unit) {
                  onChange({ ...def, spinner: newValue, unit });
                } else {
                  onChange({ ...def, spinner: newValue });
                }
              }
            }}  
            className="bPl-spinner-button"
          >
            <svg
              height={14}
              fill="#777"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 512"
            >
              <path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
