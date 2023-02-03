import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import PeopleIcon from '@mui/icons-material/People';
import Typography from '@mui/material/Typography';
import { styled, alpha } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Avatar from '@mui/material/Avatar';
import WorkIcon from '@mui/icons-material/Work';
import GridViewIcon from '@mui/icons-material/GridView';
import { useEffect, useState } from "react";
import ManageUser from './ManageUser'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HomePage from '../Pages/Home';
import Observation from '../Pages/Observation';
import TaskPage from '../Pages/Task';
import Ncrmain from "../Pages/Ncrmain"
import Profile from "../User/Profile"
import { getSearch2 } from "../../services/userServices";
import { faL } from '@fortawesome/free-solid-svg-icons';

const drawerWidth = 250;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

function BoldText({ children, bold }) {
  return (
    <span style={{ fontWeight: bold ? 'bold' : 'normal'}}>
      {children}
    </span>
  );
}
export default function PermanentDrawerLeft() {
  const [page, setPage] = useState(1);
  const [home, setHome] = useState(true);
  const [product, setProduct] = useState(false);
  const [task, setTask] = useState(false);
  const [obs, setObs] = useState(false);
  const [ncr, setNCR] = useState(false);
  const [user, setUser] = useState(false);
  const [profile, setProfile] = useState(false);

  const [open, setOpen] = React.useState(false);

  const [hbold, setH] = useState(true); 
  const [nbold, setN] = useState(false);
  const [obold, setO] = useState(false);
  const [tbold, setT] = useState(false);
  const [ubold, setU] = useState(false);
  const [pbold, setP] = useState(false);

  let navigate = useNavigate();
  const dispatch = useDispatch()

  const { loading2, data2 } = useSelector(
    (state) => state.userReducer
  );

  useEffect(() => {
    dispatch(getSearch2(localStorage.getItem("username")));

  }, [page]);

  const handleClick = () => {
    setOpen(!open);
  };

  const createNCR = () => {
    // window.location.href = "/createncr"
    setHome(false)
    setProduct(false)
    setTask(false)
    setUser(false)
    setObs(false)
    setNCR(true)
    setProfile(false)

    setN(true)
    setH(false)
    setO(false)
    setT(false)
    setU(false)
  }

  const createObs = () => {
    // window.location.href = "/observations"
    setHome(false)
    setProduct(false)
    setTask(false)
    setUser(false)
    setObs(true)
    setNCR(false)
    setProfile(false)

    setN(false)
    setH(false)
    setO(true)
    setT(false)
    setU(false)
    setP(false)
  }

  const openHome = () => {
    setHome(true)
    setProduct(false)
    setTask(false)
    setUser(false)
    setObs(false)
    setNCR(false)
    setProfile(false)

    setH(true)
    setN(false)
    setO(false)
    setT(false)
    setU(false)
    setP(false)
  }
  const openTask = () => {
    setHome(false)
    setProduct(false)
    setTask(true)
    setUser(false)
    setObs(false)
    setNCR(false)
    setProfile(false)

    setN(false)
    setH(false)
    setO(false)
    setT(true)
    setU(false)
    setP(false)
  }
  const openUser = () => {
    setHome(false)
    setProduct(false)
    setTask(false)
    setUser(true)
    setObs(false)
    setNCR(false)
    setProfile(false)

    setN(false)
    setH(false)
    setO(false)
    setT(false)
    setU(true)
    setP(false)
  }

  const openProfile = () => {
    setHome(false)
    setProduct(false)
    setTask(false)
    setUser(false)
    setObs(false)
    setNCR(false)
    setProfile(true)

    setN(false)
    setH(false)
    setO(false)
    setT(false)
    setU(false) 
    setP(true)
  }

  if (loading2) {
    return <div>Loading..</div>;
  }
  else {
    data2[0].data.map((res) => {
      let v1 = res.fname
      localStorage.setItem("fname", v1)
      let v2 = res.username
      localStorage.setItem("username", v2)
      let v3 = res.email
      localStorage.setItem("email", v3)
      let v4 = res.password
      localStorage.setItem("password", v4)
      let v5 = res.lname
      localStorage.setItem("lname", v5)
      let v6 = res.eid
      localStorage.setItem("eid", v6)
      let v7 = res.mobno
      localStorage.setItem("mobno", v7)
      let v8 = res.location
      localStorage.setItem("location", v8)
      let v9 = res._id
      localStorage.setItem("id", v9)
    })
    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left">
          <Toolbar>
            <img src="/images/danalogo1.png" style={{ height: '90px',width:'170px' }} alt=''></img>
          </Toolbar>
          <Divider />
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <ListItemButton onClick={openHome}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <BoldText bold={hbold}>Home</BoldText>
              {/* <ListItemText primary="Home" /> */}
            </ListItemButton>
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <NoteAddIcon />
              </ListItemIcon>
              <ListItemText primary="Product" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 2.5 }} onClick={createNCR}>
                  <ListItemIcon><AddIcon></AddIcon></ListItemIcon>
                  {/* <ListItemText primary="NCR" /> */}
                  <BoldText bold={nbold}>NCR</BoldText>
                </ListItemButton>
                <ListItemButton sx={{ pl: 2.5 }} onClick={createObs}>
                  <ListItemIcon><AddIcon></AddIcon></ListItemIcon>
                  {/* <ListItemText primary="Observation" /> */}
                  <BoldText bold={obold}>Observation</BoldText>
                </ListItemButton>
              </List>
            </Collapse>
            <ListItemButton onClick={openTask}>
              <ListItemIcon>
                <WorkIcon />
              </ListItemIcon>
              {/* <ListItemText primary="Task" /> */}
              <BoldText bold={tbold}>Task</BoldText>
            </ListItemButton>
            <ListItemButton onClick={openUser}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              {/* <ListItemText primary="User" /> */}
              <BoldText bold={ubold}>Users</BoldText>
            </ListItemButton>
            <ListItemButton onClick={openProfile}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              {/* <ListItemText primary="User" /> */}
              <BoldText bold={pbold}>Profile</BoldText>
            </ListItemButton>
          </List>
        </Drawer>
        {home ? <HomePage></HomePage> : ("")}
        {product ? ("") : ("")}
        {task ? <TaskPage></TaskPage> : ("")}
        {user ? <ManageUser></ManageUser> : ("")}
        {obs ? <Observation></Observation> : ("")}
        {ncr ? <Ncrmain></Ncrmain> : ("")}
        {profile ? <Profile></Profile> : ("")}
      </Box>
    );
  }
}