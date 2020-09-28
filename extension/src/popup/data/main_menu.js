import React from "react";
import DraftsIcon from "@material-ui/icons/Drafts";

export const MainMenu = [
    [
        {
            label: "Open My vault",
            icon: <DraftsIcon fontSize="small" />,
            href: ""
        },
        {
            label: "Sites",
            icon: <DraftsIcon fontSize="small" />,
            to: ""
        },
        {
            label: "Secure Notes",
            icon: <DraftsIcon fontSize="small" />,
            to: ""
        },
        {
            label: "Form Fills",
            icon: <DraftsIcon fontSize="small" />,
            to: ""
        },
        {
            label: "Generate Secure Password",
            icon: <DraftsIcon fontSize="small" />,
            to: ""
        }
    ],
    [
        {
            label: "Show Matching Sites",
            icon: <DraftsIcon fontSize="small" />,
            to: ""
        },
        {
            label: "Recently Used",
            icon: <DraftsIcon fontSize="small" />,
            to: ""
        }
    ],
    [
        {
            label: "More Options",
            icon: <DraftsIcon fontSize="small" />,
            to: ""
        },
        {
            label: "Preferences",
            icon: <DraftsIcon fontSize="small" />,
            href: ""
        },
        {
            label: "Help",
            icon: <DraftsIcon fontSize="small" />,
            href: ""
        }
    ],
    [
        {
            label: "Log Out",
            icon: <DraftsIcon fontSize="small" />,
            to: ""
        }
    ]
];

export default MainMenu;
