//code based on https://material-ui.com/components/drawers/
import React, { useEffect, useState } from "react";
import { useAuth } from '../context/AuthContext';
import clsx from "clsx";
import {
  Button,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ClassIcon from "@material-ui/icons/Class";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import FaceIcon from "@material-ui/icons/Face";
import SchoolIcon from "@material-ui/icons/School";
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import Logo from "../images/logo.png";
import "../css/dashboard-style.css";
import "../css/auth-page-style.css";

//Components
import TeacherDirectory from "./TeacherDirectory";
import Calendar from "./Calendar";
import ClassDirectory from "./ClassDirectory";
import StudentDirectory from "./StudentDirectory";
import Class from "./Class";
import LandingPage from "./LandingPage";
import Login from './Login';
import Signup from './Signup';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";

//API
import axios from "axios";

const FACE_API_KEY = process.env.REACT_APP_FACE_API_KEY;
const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#0066b3",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const { currentUser, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);//for logout menu
  const [allFaces, setAllFaces] = useState([]); //for preloading face images

  const fontStyle = {
    fontWeight: "bold",
    fontFamily:"Montserrat",
  };

  useEffect(() => {
    fetchFaces();
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  const handleLogoutClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogoutClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async() => {
    handleLogoutClose()
    try{
      await logout()
      history.push('/login')
    }catch(err){
      console.log("Logout failed. Error: ", err)
    }
  };


  const fetchFaces = () => {
    const url = new URL("https://api.generated.photos/api/v1/faces");
    url.searchParams.append("api_key", FACE_API_KEY);
    url.searchParams.append("order_by", "random");
    url.searchParams.append("per_page", 100);
    url.searchParams.append("age", "young-adult");
    console.log(url.toString());
    axios
      .get(url)
      .then((response) => {
        const faces = response.data.faces; //[0].urls[4]["512"]
        setAllFaces(faces);
      })
      .catch((err) => {
        console.log("Fetch Face Error: ", err);
      });
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <img className="appbar__logo" src={Logo} />
          <Typography style={fontStyle} className="appbar__title" variant="h6">
            T.J Elementary School Admin Dashboard
          </Typography>
          {!currentUser
          ? <Button onClick={()=>{history.push('/login')}} style={fontStyle} className="appbar__login" color="inherit">
            Login
          </Button>
          
          : <>
            <Button onClick={handleLogoutClick} style={fontStyle} className="appbar__login" color="inherit">
                <AccountCircleIcon style={{paddingRight:"5px"}}/> {currentUser.email}
              </Button>
              <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleLogoutClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                  {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </>
          }
        </Toolbar>
      </AppBar>
      <Drawer
        style={{ backgroundColor: "#FFBC19" }}
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar} style={{ backgroundColor: "#FFBC19" }}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
        <ListItem
            button
            key={"Home"}
            onClick={() => {
              history.push("/");
            }}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>

          <ListItem
            button
            key={"Teachers"}
            onClick={() => {
              history.push("teacherspage");
            }}
          >
            <ListItemIcon>
              <FaceIcon />
            </ListItemIcon>
            <ListItemText primary={"Teachers"} />
          </ListItem>
          <ListItem
            button
            key={"Students"}
            onClick={() => {
              history.push("/studentspage");
            }}
          >
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary={"Students"} />
          </ListItem>
          <ListItem
            button
            key={"Classes"}
            onClick={() => {
              history.push("/classespage");
            }}
          >
            <ListItemIcon>
              <ClassIcon />
            </ListItemIcon>
            <ListItemText primary={"Classes"} />
          </ListItem>
          <ListItem
            button
            key={"Calendar"}
            onClick={() => {
              history.push("/calendarpage");
            }}
          >
            <ListItemIcon>
              <CalendarTodayIcon />
            </ListItemIcon>
            <ListItemText primary={"Calendar"} />
          </ListItem>
        </List>
        <Divider />
      </Drawer>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div>
          <Switch>
            <Route exact path="/teacherspage">
              <TeacherDirectory allFaces={allFaces} />
            </Route>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/studentspage" component={StudentDirectory} />
            <Route exact path="/classespage" component={ClassDirectory} />
            <Route exact path="/classpage/:classid" component={Class} />
            <Route exact path="/calendarpage" component={Calendar} />
          </Switch>
        </div>
      </main>
    </div>
  );
}
