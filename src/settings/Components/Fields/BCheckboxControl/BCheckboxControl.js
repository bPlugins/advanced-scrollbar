import { Spinner } from '@wordpress/components';
import { useMemo } from 'react';
import "./style.scss";

const CheckboxItem = ({ label, value, isChecked, onToggle }) => (
  <div key={JSON.stringify(value)} className="bPl-checkboxWrapper">
    <input type="checkbox" checked={isChecked} value={value} onChange={onToggle} />
    <span>{label}</span>
  </div>
);
const BCheckboxControl = ({
  options = [],
  value,
  categories = false,
  onChange,
  defaultValue = [],
  label,
  inline
}) => {
  const { data: content = null, isLoading } = { data: "" };
  const checkboxData = useMemo(() => {
    return categories ? content : Object.keys(options).map(key => { return { label: options[key], value: key } });
  }, [categories, content, options]);

  const isMultiple = Array.isArray(value) || Array.isArray(defaultValue);
  const cv = defaultValue === true ? 1 : defaultValue === false ? 0 : defaultValue;
  const currentValue = value ? value : cv;
  const handleChange = (val) => {
    if (isMultiple) {
      const newValue = currentValue?.includes(val)
        ? currentValue.filter(v => v !== val)
        : [...(currentValue || []), val];
      onChange(newValue);
    } else {
      onChange(currentValue === 1 ? 0 : 1);
    }
  };

  if (categories && isLoading) {
    return <Spinner />;
  }

  return (
    <div
      className="bPl-checkbox-main-wrapper"
      style={{
        display: 'flex',
        flexDirection: inline ? "row" : "column",
        gap: '10px'
      }}
    >
      {options.length > 0 ? checkboxData?.map(({ label, value: val }) => {
        const isChecked = isMultiple
          ? currentValue?.includes(val)
          : currentValue === 1;
        return (
          <CheckboxItem
            key={val}
            label={label}
            value={val}
            isChecked={isChecked}
            onToggle={() => handleChange(val)}
          />
        );
      }) : (
        <CheckboxItem
          label={label}
          value={currentValue}
          isChecked={currentValue}
          onToggle={() => handleChange(currentValue)}
        />
      )}
    </div>
  );
};

export default BCheckboxControl;