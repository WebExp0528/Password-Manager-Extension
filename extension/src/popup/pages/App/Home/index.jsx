import React from "react";
import { Link } from "react-router-dom";
import {
    Box,
    Container,
    TextField,
    Typography,
    Divider,
    Grid,
    Paper,
    MenuList,
    ListItemIcon,
    MenuItem,
    InputBase,
    IconButton
} from "@material-ui/core";
import { spacing } from "@material-ui/system";
import { fade, makeStyles } from "@material-ui/core/styles";
import MuiButton from "@material-ui/core/Button";

import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import SearchIcon from "@material-ui/icons/Search";

import cls from "./page-home.module.scss";

const useStyles = makeStyles(theme => ({
    search: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        position: "relative",
        padding: "5px",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(1),
            width: "auto"
        }
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    inputRoot: {
        color: "inherit",
        width: "100%"
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch"
            }
        }
    }
}));

export const PageHome = props => {
    const {
        match,
        match: { path, url }
    } = props;

    const classes = useStyles();

    const handleSignIn = values => {};
    return (
        <div className={cls.homeWrapper}>
            <Box>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput
                        }}
                        placeholder="Search Passwords"
                        inputProps={{ "aria-label": "Search Passwords" }}
                    />
                </div>
                <Paper>
                    <MenuList>
                        <MenuItem>
                            <ListItemIcon>
                                <SendIcon fontSize="small" />
                            </ListItemIcon>
                            <Typography variant="inherit">
                                Open my vault
                            </Typography>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <PriorityHighIcon fontSize="small" />
                            </ListItemIcon>
                            <Typography variant="inherit">
                                Recently Used
                            </Typography>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <DraftsIcon fontSize="small" />
                            </ListItemIcon>
                            <Typography variant="inherit">All Items</Typography>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <DraftsIcon fontSize="small" />
                            </ListItemIcon>
                            <Typography variant="inherit">Add Item</Typography>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <DraftsIcon fontSize="small" />
                            </ListItemIcon>
                            <Typography variant="inherit">
                                Generate Secure Password
                            </Typography>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <DraftsIcon fontSize="small" />
                            </ListItemIcon>
                            <Typography variant="inherit">
                                Account Options
                            </Typography>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <DraftsIcon fontSize="small" />
                            </ListItemIcon>
                            <Typography variant="inherit">Logout</Typography>
                        </MenuItem>
                    </MenuList>
                </Paper>
            </Box>
        </div>
    );
};

export default PageHome;
