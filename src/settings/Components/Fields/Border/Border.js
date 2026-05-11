import  { Fragment } from 'react';
import "./style.scss"
import ColorPicker from '../ColorPicker/ColorPicker';
const Border = ({
  value = {},
  top = true,
  bottom = true,
  left = true,
  right = true,
  all = false,
  unit = "px",
  defaultValue = { unit: "px" },
  onChange,
}) => {
  const def = Object.keys(value).length > 0 ? value : defaultValue;
  const topIcon = (
    <svg
      height={14}
      fill="#777"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
    >
      <path d="M318 177.5c3.8-8.8 2-19-4.6-26l-136-144C172.9 2.7 166.6 0 160 0s-12.9 2.7-17.4 7.5l-136 144c-6.6 7-8.4 17.2-4.6 26S14.4 192 24 192l72 0 0 288c0 17.7 14.3 32 32 32l64 0c17.7 0 32-14.3 32-32l0-288 72 0c9.6 0 18.2-5.7 22-14.5z" />
    </svg>
  );

  const rightIcon = (
    <svg
      height={14}
      fill="#777"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path d="M334.5 414c8.8 3.8 19 2 26-4.6l144-136c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22l0 72L32 192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32l288 0 0 72c0 9.6 5.7 18.2 14.5 22z" />
    </svg>
  );

  const bottomIcon = (
    <svg
      height={14}
      fill="#777"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
    >
      <path d="M2 334.5c-3.8 8.8-2 19 4.6 26l136 144c4.5 4.8 10.8 7.5 17.4 7.5s12.9-2.7 17.4-7.5l136-144c6.6-7 8.4-17.2 4.6-26s-12.5-14.5-22-14.5l-72 0 0-288c0-17.7-14.3-32-32-32L128 0C110.3 0 96 14.3 96 32l0 288-72 0c-9.6 0-18.2 5.7-22 14.5z" />
    </svg>
  );

  const leftIcon = (
    <svg
      height={14}
      fill="#777"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path d="M177.5 414c-8.8 3.8-19 2-26-4.6l-144-136C2.7 268.9 0 262.6 0 256s2.7-12.9 7.5-17.4l144-136c7-6.6 17.2-8.4 26-4.6s14.5 12.5 14.5 22l0 72 288 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-288 0 0 72c0 9.6-5.7 18.2-14.5 22z" />
    </svg>
  );

  const arrowAltIcon = (
    <svg
      height={14}
      fill="#777"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path d="M278.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8l32 0 0 96-96 0 0-32c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6l0-32 96 0 0 96-32 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8l-32 0 0-96 96 0 0 32c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 32-96 0 0-96 32 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-64-64z" />
    </svg>
  );

  const styleOptions = [
    { label: "Solid", value: "solid" },
    { label: "Dashed", value: "dashed" },
    { label: "Dotted", value: "dotted" },
    { label: "Double", value: "double" },
    { label: "Inset", value: "inset" },
    { label: "Outset", value: "outset" },
    { label: "Grove", value: "grove" },
    { label: "Ridge", value: "ridge" },
    { label: "None", value: "none" },
  ]
  return (
    <div className="bPl-border-main-wrapper">
      {all ? (
        <div className="bPl-border-field-main-wrapper">
          <div className="bPl-border-wrapper">
            <div className="bPl-border-title">{arrowAltIcon}</div>
            <div className="bPl-border-inputField-wrapper">
              <input
                value={def?.["top"]}
                type="number"
                placeholder="all"
                className="bPl-border-input"
                onChange={(e) =>
                  onChange({
                    ...def,
                    top: e.target.value,
                    right: e.target.value,
                    bottom: e.target.value,
                    left: e.target.value,
                  })
                }
              />
            </div>

            <div className="bPl-border-unit">{unit}</div>

          </div>
        </div>
      ) : (
        <Fragment>
          {/* top section */}
          {top && (
            <div className="bPl-border-field-main-wrapper">
              <div className="bPl-border-wrapper">
                <div className="bPl-border-title">{topIcon}</div>
                <div className="bPl-border-inputField-wrapper">
                  <input
                    value={def?.["top"]}
                    type="number"
                    placeholder="top"
                    className="bPl-border-input"
                    onChange={(e) => onChange({ ...def, top: e.target.value })}
                  />
                </div>

                <div className="bPl-border-unit">{unit}</div>

              </div>
            </div>
          )}

          {/* right section */}
          {right && (
            <div className="bPl-border-field-main-wrapper">
              <div className="bPl-border-wrapper">
                <div className="bPl-border-title">{rightIcon}</div>
                <div className="bPl-border-inputField-wrapper">
                  <input
                    value={def?.["right"]}
                    type="number"
                    placeholder="right"
                    className="bPl-border-input"
                    onChange={(e) =>
                      onChange({ ...def, right: e.target.value })
                    }
                  />
                </div>

                <div className="bPl-border-unit">{unit}</div>

              </div>
            </div>
          )}

          {/* bottom section */}
          {bottom && (
            <div className="bPl-border-field-main-wrapper">
              <div className="bPl-border-wrapper">
                <div className="bPl-border-title">{bottomIcon}</div>
                <div className="bPl-border-inputField-wrapper">
                  <input
                    value={def?.["bottom"]}
                    type="number"
                    placeholder="bottom"
                    className="bPl-border-input"
                    onChange={(e) =>
                      onChange({ ...def, bottom: e.target.value })
                    }
                  />
                </div>

                <div className="bPl-border-unit">{unit}</div>

              </div>
            </div>
          )}
          {/* left section */}
          {left && (
            <div className="bPl-border-field-main-wrapper">
              <div className="bPl-border-wrapper">
                <div className="bPl-border-title">{leftIcon}</div>
                <div className="bPl-border-inputField-wrapper">
                  <input
                    type="number"
                    value={def?.["left"]}
                    placeholder="left"
                    className="bPl-border-input"
                    onChange={(e) => onChange({ ...def, left: e.target.value })}
                  />
                </div>

                <div className="bPl-border-unit">{unit}</div>

              </div>
            </div>
          )}
        </Fragment>
      )}

      {/* units */}
      <div className="bPl-unit-control-wrapper">
        <select
          name=""
          id=""
          onChange={(e) => onChange({ ...def, style: e.target.value })}
          value={def["style"]}
        >
          {styleOptions.map((val, index) => (
            <option key={index} value={val.value}>
              {val.label}
            </option>
          ))}
        </select>
      </div>
      <ColorPicker value={def?.["color"]} defaultValue={defaultValue ? defaultValue?.["color"] : ""} onChange={val => onChange({ ...def, color: val })} />
    </div>
  );
};

export default Border;