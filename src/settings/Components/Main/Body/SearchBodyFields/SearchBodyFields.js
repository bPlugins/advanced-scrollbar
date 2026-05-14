import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import FieldSwitch from '../FieldSwitch';
import { AiFillQuestionCircle } from '../../../../utils/icons';

const SearchBodyFields = ({ search, options, updateData, sections, data, setData, isLoading, activeSection, activeChild,refetch,dbData }) => {
  const [filteredSections, setFilteredSections] = useState([]);


  useEffect(() => {
    const filtered = []

    sections.map(s => {
      const fields = s.fields?.filter(f => f.title?.toLowerCase().includes(search.toLowerCase()));

      if (fields?.length) {
        filtered.push({
          name: s.name,
          fields,
        })
      }

      const children = [];

      if (s.children && Array.isArray(s.children)) {
        s.children.map(ch => {
          const fields = ch.fields?.filter(f => f.title?.toLowerCase().includes(search.toLowerCase()));

          if (fields?.length) {
            children.push({
              name: ch.name,
              fields,
            })
          }
        })
      }

      if (children.length) {
        filtered.push({
          name: s.name,
          children,
        })
      }

      setFilteredSections(filtered);

    })

  }, [search])


  return (
    <div className='fields'>
      {filteredSections.map((section) => {
        const { name, fields = [], children = [] } = section;

        if (fields.length > 0) {
          return fields.map((f) => {
            return <Field parentName={name} key={f?.id} {...{ saveType: options.saveType, data, setData, activeSection, activeChild, updateData, fields, isLoading,refetch,dbData }} field={f} />;
          });
        } else if (children.length > 0) {
          return children.map((child) => {
            const { name: childName, fields = [] } = child;
            return fields?.map((c, i) => {
              return <Field parentName={name} childName={childName} key={c.id || i} {...{ saveType: options.saveType, data, setData, activeSection, activeChild, updateData, isLoading,refetch,dbData }} field={c} />
            });
          });
        }
      })}


    </div>
  );
};

export default memo(SearchBodyFields);

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