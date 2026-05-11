export const options = {
    id: "asb-advanced-scrollbar-thirds",
    title: "Advanced Scrollbar",
    saveType: "serialized",
    sections: [
        {
            "name": "basic_settings",
            "title": "Scrollbar Basic Settings",
            fields: [
                {
                    id: "asb_showscrollbar",
                    field: "radio",
                    title: "Show Scrollbar?",
                    after: "Select show option to show scrollbar",
                    options: {
                        'true': "Show",
                        'false': "Hide",
                    },
                    default: 'false'
                },
                {
                    id: "asb_color",
                    title: "Scrollbar Color",
                    after: "Change Scrollbar Color.",
                    field: "color",
                    default: "#46b3e6"
                },
                {
                    id: "asb_background",
                    title: "Scrollbar Rail Background Color",
                    after: "Change the Rail Background Color.",
                    field: "color"
                },
                {
                    id: "asb_mousescrollstep",
                    title: "Mouse Scroll Step",
                    field: "text",
                    after: "scrolling speed with mouse wheel, default value is 40 (pixel)",
                    attributes: {
                        style: {
                            width: "50%"
                        }
                    },
                    default: "40"
                },
                {
                    id: "asb_autohidemode",
                    field: "radio",
                    title: "Auto Hide",
                    after: "how hide the scrollbar works",
                    options: {
                        true: "On",
                        false: "Off",
                        cursor: "Cursor Only"
                    },
                    default: "false"

                },
                {
                    id: "asb_scrollspeed",
                    title: "Scroll Speed",
                    field: "text",
                    after: "Change the speed of scrollbar during scroll.",
                    default: "60",
                    attributes: {
                        style: {
                            width: "50%"
                        }
                    }
                },
                {
                    id: "asb_railalign",
                    field: "radio",
                    title: "Rail Align",
                    after: "Alignment of vertical rail",
                    options: {
                        "right": "Right",
                        "left": "Left"
                    },
                    default: "right"

                },
                {
                    id: "asb_touchbehavior",
                    field: "checkbox",
                    title: "Enable Touch Behavior",
                    label: "enable cursor-drag scrolling like touch devices in desktop computer (default:Off)",
                    default: 0
                }
            ]
        },
        {
            "name": "custom_style_settings",
            "title": "Scrollbar Custom Style Settings",
            fields: [
                {
                    id: "asb_width",
                    title: "Scrollbar width",
                    field: "spinner",
                    unit: "px",
                    after: "Change the width of the scrollbar. Enter a value in pixel",
                    attributes: {
                        style: {
                            width: "50%"
                        }
                    },
                    default: {
                        spinner: 10
                    }
                },
                {
                    id: "asb_border",
                    title: "Scrollbar Border CSS",
                    field: "border",
                    after: "Css definition for cursor border",
                    all: true,
                    default: {
                        top: "1",
                        right: "1",
                        bottom: "1",
                        left: "1",
                        style: "solid",
                        color: "#fff"
                    }
                },
                {
                    id: "asb_border_radius",
                    title: "Scrollbar Border Radius",
                    field: "spinner",
                    // unit: "px",
                    after: "border radius in pixel",
                    default: {
                        spinner: 4
                    }
                }
            ]
        }
    ]
}




