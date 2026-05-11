import React, { Fragment } from "react";
import { faCaretLeft, rightAngel } from "../../../utils/icons";
import "./style.scss";

const Sidebar = (props) => {
  const { sections, activeSection, setActiveSection, activeChild, setActiveChild, isHidden, refetch } = props;
  return (
    <aside className={`wp-sidebar-main ${isHidden ? "isHidden" : ""}`}>
      <div className="wp-sidebar-wrapper">
        <div className="wp-sidebar-items-wrapper">
          <div className="wp-sidebar-items">
            {sections?.map((section, index) => {
              const { name, title, icon, children } = section;
              return (
                <Fragment key={index}>
                  <div className="wp-sidebar-item-wrapper-main">
                    <div
                      onClick={() => {
                        setActiveSection(name);
                        if (children) {
                          setActiveChild(children[0].name);
                        } else {
                          setActiveChild('');
                        }
                        refetch()
                      }}
                      className={`wp-sidebar-item-wrapper ${activeSection === name && !children ? "active" : ""
                        }`}
                    >
                      {icon && <div className="wp-sidebar-item-logo" dangerouslySetInnerHTML={{ __html: icon }} />}
                      <div className="wp-sidebar-item">
                        <p className="wp-sidebar-item-title">{title}</p>
                      </div>
                      {
                        children && <div className={`bpl-sidebar-toggle-icon ${activeSection === name ? "toggle-active" : ""}`}>
                          {rightAngel}
                        </div>
                      }
                      {
                        !children && activeSection === name && <div className="active-caretLeftIcon">
                          {faCaretLeft}
                        </div>
                      }
                    </div>
                    {children && name === activeSection &&
                      children.map((child, i) => {
                        const { name: childName, title, icon } = child;
                        return (
                          <div
                            onClick={() => {
                              setActiveSection(section.name);
                              setActiveChild(childName);
                              refetch()
                            }}
                            key={i}
                            className={`wp-sidebar-children-wrapper ${activeChild === childName ? "active" : ""}`}
                          >
                            {icon && <div className={`wp-sidebar-children-logo ${activeChild === childName ? "activeIconColor" : ""}`} dangerouslySetInnerHTML={{ __html: icon }} />}
                            <div className="wp-sidebar-children-content">
                              <p className="wp-sidebar-children-title">
                                {title}
                              </p>
                            </div>
                            {
                              activeChild === childName && <div className="child-active-caretLeftIcon">
                                {faCaretLeft}
                              </div>
                            }
                          </div>
                        )
                      })}
                  </div>
                </Fragment>
              )
            })}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;