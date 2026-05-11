import BCheckboxControl from "../../Fields/BCheckboxControl/BCheckboxControl";
import BRadioControl from "../../Fields/BRadioControl/BRadioControl";
import BTextControl from "../../Fields/BTextControl/BTextControl";
import Border from "../../Fields/Border/Border";
import ColorPicker from "../../Fields/ColorPicker/ColorPicker"
import Spinner from "../../Fields/Spinner/Spinner"

const FieldSwitch = (props) => {
  const { extraFields, dbData, label, help, field, value, onChange, placeholder, options = [], default: defaultValue, attributes, fields, isLoading } = props;
  const fieldProps = { value, help, label, defaultValue, fields, ...attributes, isLoading, dbData }

  switch (field) {
    case 'border': return <Border {...fieldProps} {...attributes} {...extraFields} defaultValue={defaultValue} onChange={val => onChange(val)} />
    case "color": return <ColorPicker  {...fieldProps} defaultValue={defaultValue} onChange={val => onChange(val)} />
    case "radio": return <BRadioControl {...fieldProps} {...extraFields} options={options} defaultValue={defaultValue} selected={value} onChange={val => onChange(val)} />
    case 'checkbox':
      return <BCheckboxControl {...extraFields} defaultValue={defaultValue} {...attributes} options={options} value={value} onChange={val => onChange(val)} />
    case 'spinner': return <Spinner {...fieldProps} {...extraFields} defaultValue={defaultValue} onChange={val => onChange(val)} />
    case "text": return <BTextControl  {...fieldProps} {...attributes} placeholder={placeholder} defaultValue={defaultValue} onChange={val => onChange(val)} name={value} />
  }
}
export default FieldSwitch