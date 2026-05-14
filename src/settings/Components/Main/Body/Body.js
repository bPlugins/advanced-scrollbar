import { useCallback, useEffect, useMemo, useState } from 'react';
import { checkDependency } from '../../../utils/functions';
import { AiFillQuestionCircle } from '../../../utils/icons';
import FieldSwitch from './FieldSwitch';

const Body = (props) => {
  const { options, data, sections, activeSection, activeChild, updateData, setData, isLoading, refetch, dbData } = props;

  const item = useMemo(() => {
    const section = sections.find(s => s.name === activeSection);
    if (activeChild && activeChild !== "null") {
      return section?.children?.find(c => c.name === activeChild);
    }
    return section;
  }, [sections, activeSection, activeChild]);

  const { fields = [], description = '' } = item || {};

  return <>
    {description && <p className='description' dangerouslySetInnerHTML={{ __html: description }} />}
    <div className='fields'>
      {fields.map((field, i) => checkDependency(field?.dependency, data, fields) ?
        <Field key={`${activeSection}-${activeChild}-${field.id || i}`} {...{ saveType: options.saveType, data, setData, dbData, activeSection, activeChild, field, updateData, fields, isLoading, refetch }} /> : null)}
    </div>
  </>;
};

const Field = ({ saveType = 'nested', data, setData, activeSection, activeChild, field, updateData, isLoading, refetch, dbData }) => {
  // eslint-disable-next-line no-unused-vars
  const { id, title, default: defaultValue = {}, subtitle, before, after, field: fieldProps, help, desc = "", hints = '' } = field;

  const [value, setValue] = useState();
  const [dbValue, setDbValue] = useState();
  useEffect(() => {
    if (saveType === 'nested') {
      if (activeChild) {
        setValue(data?.[activeSection]?.[activeChild]?.[id] || "");
      } else {
        setValue(data?.[activeSection]?.[id] || "");
      }
    } else {
      setValue(data?.[id]);
    }
    //dbData
    if (saveType === 'nested') {
      if (activeChild) {
        setDbValue(dbData?.[activeSection]?.[activeChild]?.[id] || "");
      } else {
        setDbValue(dbData?.[activeSection]?.[id] || "");
      }
    } else {
      setDbValue(dbData?.[id] || "");
    }
  }, [dbData, data, activeSection, activeChild, isLoading, value, refetch]);

  const handleChange = useCallback(val => {
    updateData(id, val);
  }, [id, updateData]);

  const fieldClasses = useMemo(() => {
    const baseClass = ["notice", "heading", "subheading", "content", "submessage"].includes(fieldProps) ? "" : "fieldPadding";
    return `field ${baseClass}`;
  }, [fieldProps]);

  const labelClasses = useMemo(() => {
    const baseClass = ["notice", "heading", "subheading", "content", "submessage"].includes(fieldProps) ? "" : "pr15";
    return `fieldLabel ${baseClass}`;
  }, [fieldProps]);


  return <>
     <div className={`${fieldClasses}`}>
      {title && (
        <div className={labelClasses}>
          <label className='label'>
            {title}
          </label>
          {subtitle && <p className='subTitle' dangerouslySetInnerHTML={{ __html: subtitle }} />}
        </div>
      )}

      <div className={`fieldComponent ${!title ? "fullWidth" : ""}`}>
        {before && <div className="beforeAfterText" dangerouslySetInnerHTML={{ __html: before }} />}
        <FieldSwitch
          {...field}
          extraFields={field}
          value={value}
          data={data}
          setData={setData}
          onChange={handleChange}
          isLoading={isLoading}
          refetch={refetch}
          dbData={dbValue}
        />
        {desc && <div className="beforeAfterText" dangerouslySetInnerHTML={{ __html: desc }} />}
        {after && <div className="beforeAfterText" dangerouslySetInnerHTML={{ __html: after }} />}
      </div>

      {help && (
        <div className='bPl-field-help-main-wrapper'>
          <span className='bPl-field-help-text'>{help}</span>
          <AiFillQuestionCircle className="bPl-field-help-icon" />
        </div>
      )}
      {
        hints && <p className='bPl-settings-hints' dangerouslySetInnerHTML={{ __html: hints }}></p>
      }
    </div>
  </>
};

export default Body;