import React, { useMemo } from 'react';
import { Spinner } from '@wordpress/components';
import "./style.scss";

const { useInstanceId } = wp.compose;

const RadioItem = ({ id, label, value, isChecked, onChange }) => (
  <div className="bPl-radioWrapper">
    <input
      id={id}
      type="radio"
      name={id}
      value={value}
      checked={isChecked}
      onChange={() => onChange(value)}
    />
    <label htmlFor={id}>{label}</label>
  </div>
);

const BRadioControl = ({ options = {}, value = '', categories = false, onChange, inline = false, defaultValue = '' }) => {
  const instanceId = useInstanceId(BRadioControl);
  const id = `radio-control-${instanceId}`;

  const { data: content = null, isLoading } = {data:""};

  const radioData = useMemo(() => {
    if (categories) return content;
    return Object.entries(options).map(([key, label]) => ({
      label,
      value: key
    }));
  }, [categories, content, options]);

  const currentValue = value || defaultValue;

  if (categories && isLoading) {
    return <Spinner />;
  }

  return (
    <div
      className="bPl-radio-main-wrapper"
      data-layout={inline ? "row" : "column"}
    >
      {radioData?.map(({ label, value: val }, index) => (
        <RadioItem
          key={val}
          id={`${id}-${index}`}
          label={label}
          value={val}
          isChecked={currentValue === val}
          onChange={onChange}
        />
      ))}
    </div>
  );
};

export default BRadioControl;