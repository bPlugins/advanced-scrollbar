import { useEffect, useState } from 'react';

import { extractDefaultsNested } from '../../utils/functions';
import Body from './Body/Body';
import SearchBodyFields from './Body/SearchBodyFields/SearchBodyFields';
import Footer from './Footer/Footer';
import './Main.scss';
import Navbar from './Navbar/Navbar';
import Sidebar from './SideBar/SideBar';

/**
 * Main component for the settings panel
 * @param {Object} options - Configuration options for the settings panel
 * @param {Object} data - Current form data
 * @param {Object} dbData - Data fetched from database
 * @param {Function} setData - Function to update form data
 * @param {Function} onSaveData - Callback function when data is saved
 * @param {boolean} isLoading - Loading state indicator
 * @param {Function} saveData - Function to save data to database
 * @param {Function} refetch - Function to refetch data from database
 * @param {boolean} isEqual - Indicates if current data matches saved data
 * @param {Function} setIsEqual - Function to update isEqual state
 * @param {boolean} isSaved - Indicates if data has been saved
 * @param {Function} setIsSaved - Function to update isSaved state
 * @param {Function} handleResetData - Function to reset all data
 */
const Main = ({ options, data, dbData, setData, onSaveData, isLoading, saveData, refetch, isEqual, setIsEqual, isSaved, setIsSaved, handleResetData, ...props }) => {

  // saveType = nested | serialized
  const { sections, saveType = 'serialized' } = options;

  const [isHidden, setIsHidden] = useState(false);
  const [search, setSearch] = useState("");

  // const parent = localStorage.getItem('activeSection')
  // const child = localStorage.getItem('activeChild')

  // const [activeSection, setActiveSection] = useState(parent || sections[0].name);
  // const [activeChild, setActiveChild] = useState(child || (sections[0].children ? sections[0].children[0].name : ''));
  const [activeSection, setActiveSection] = useState(sections[0].name);
  const [activeChild, setActiveChild] = useState(sections[0].children ? sections[0].children[0].name : '');
  useEffect(() => {
    localStorage.setItem('activeSection', activeSection)
    localStorage.setItem('activeChild', activeChild)
  }, [activeChild, activeSection])
  const activeProps = { activeSection, setActiveSection, activeChild, setActiveChild };
  const updateData = (id, val) => {
    if (!isLoading) {
      if (saveType === 'serialized') {
        setData(prev => ({
          ...prev,
          [id]: val
        }));
      } else {
        if (activeChild !== "null" && activeChild) {
          setData((prev) => ({
            ...prev,
            [activeSection]: {
              ...prev[activeSection],
              [activeChild]: {
                ...(prev[activeSection] && prev[activeSection][activeChild]) ? prev[activeSection][activeChild] : {},
                [id]: val
              }
            }
          }));
        } else {
          setData((prev) => ({
            ...prev,
            [activeSection]: {
              ...(prev[activeSection] || {}),
              [id]: val
            }
          }));
        }
      }
    }
  }

  const searchFieldUpdateData = (id, val) => {
    if (!isLoading) {
      if (saveType === 'serialized') {
        setData(prev => ({
          ...prev,
          [id]: val
        }));
      } else {
        if (activeChild !== "null" && activeChild) {
          setData((prev) => ({
            ...prev,
            [activeSection]: {
              ...prev[activeSection],
              [activeChild]: {
                ...(prev[activeSection] && prev[activeSection][activeChild]) ? prev[activeSection][activeChild] : {},
                [id]: val
              }
            }
          }));
        } else {
          setData((prev) => ({
            ...prev,
            [activeSection]: {
              ...(prev[activeSection] || {}),
              [id]: val
            }
          }));
        }
      }
    }
  }


  useEffect(() => {
    if (search.length > 3) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  }, [search])

  const handleResetSection = () => {
    if (saveType == 'nested') {
      if (activeSection && (activeChild && activeChild !== 'null')) {
        const newData = { ...data };
        Object.keys(newData?.[activeSection]?.[activeChild]).forEach((key) => {
          newData[activeSection][activeChild][key] = '';

        })
        saveData({ [options.id]: JSON.stringify(newData) })

        location.reload()
      } else if (!activeChild || activeChild === 'null') {
        const newData = { ...data };
        Object.keys(newData?.[activeSection]).forEach((key) => {
          newData[activeSection][key] = '';

        })
        saveData({ [options.id]: JSON.stringify(newData) })
        refetch()
        location.reload()
      }
    } else {
      // const db = { ...dbData };
      // Object.keys(db).forEach((key) => db[key] = '');
      // saveData({ [options.id]: JSON.stringify(db) })
      // const db = {};
      // Object.keys(db).forEach((key) => db[key] = '');
      const sections = options.sections;
      let db = {};
      for (const section of sections) {
        const fields = section?.fields;
        if (section.name === activeSection && fields) {
          db = extractDefaultsNested(fields);

        }
      }
      saveData({ [options.id]: JSON.stringify({ ...dbData, ...db }) })
      setData(prev => {
        return {
          ...prev,
          ...db
        }
      });
      location.reload()
      refetch()
    }
  }

  return (
    <div className='bPlSettings'>
      <Navbar {...{ search, setSearch, saveData, isLoading, isHidden, setIsHidden, options, onSaveData, setData, data, activeSection, activeChild, isEqual, setIsEqual, isSaved, setIsSaved, handleResetData, handleResetSection }} />
      <div className='bPlSettingsSection'>
        {(search.length < 4 && sections?.length > 1) && <Sidebar sections={sections} {...activeProps} isHidden={isHidden} refetch={refetch} />}
        <div className={`bPlSettingsBody ${options?.sections.length > 1 ? "" : "bPlWidthFull"}  ${isHidden ? "bPlWidthFull" : "bPlBodyWidth"}`} >
          {isLoading && <div className='bPlSettingsBodyLoader'>
          </div>}
          {
            search.length > 3 ?
              <SearchBodyFields {...{ search, setSearch, options, sections, data, setData, isLoading, activeSection, activeChild, refetch, dbData }} updateData={searchFieldUpdateData} {...props} />
              :
              <Body dbData={dbData} search={search} setSearch={setSearch} options={options} {...activeProps} updateData={updateData} sections={sections} data={data} setData={setData} isLoading={isLoading} refetch={refetch} {...props} />
          }
        </div>
      </div>
      <Footer setIsSaved={setIsSaved} saveData={saveData} isLoading={isLoading} onSaveData={onSaveData} handleResetData={handleResetData} handleResetSection={handleResetSection} />
    </div>
  );
};

export default Main;