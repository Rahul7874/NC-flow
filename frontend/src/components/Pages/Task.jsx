import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Pagination from "@mui/material/Pagination";
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import { getAllTask,getSingleTask } from '../../services/taskService'
import TaskModal from "../Modals/TaskModal";

const Task = () => {
    const [page, setPage] = useState(1);
    const [modal1, setModal] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const { loading, data, skipCount } = useSelector(
        (state) => state.taskReducer
    );

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllTask(localStorage.getItem("username")));
    }, [page]);

    const handleChange = (event, value) => {
        setPage(value);
    };
    const openManageModal = (id) => {
        dispatch(getSingleTask(id));
        setModal(true);
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const openProfile = () => {
        window.location.href = "/profile"
    };
    const menuId = 'primary-search-account-menu';

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={openProfile}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );
    if (loading) {
        return <div>Loading..</div>;
    }
    if (data.length == 0) {
        dispatch(getAllTask(localStorage.getItem("username")));
    }
    else {
        return (
            <div >
                {console.log(data)}
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar style={{ height: '90px' }}>
                        <Toolbar style={{ marginLeft: '200px' }}>
                        <Typography variant="h6" sx={{ color: 'text.white',fontWeight:'600' }}>
                            Welcome {localStorage.getItem("fname")}
                        </Typography>
                            <Box sx={{ flexGrow: 1 }} />
                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="show 17 new notifications"
                                    color="inherit"
                                >
                                    <Badge badgeContent={17} color="error">
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton>
                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                            </Box>
                            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="show more"
                                    aria-controls={mobileMenuId}
                                    aria-haspopup="true"
                                    onClick={handleMobileMenuOpen}
                                    color="inherit"
                                >
                                    <MoreIcon />
                                </IconButton>
                            </Box>
                        </Toolbar>
                    </AppBar>
                    {renderMobileMenu}
                    {renderMenu}
                </Box>
                <div>
                    <table style={{ marginTop: '150px' }}>
                        <tr>
                            <th>S.No</th>
                            <th>Object ID</th>
                            <th>Creator</th>
                            <th>Description</th>
                            <th>Created on</th>
                        </tr>
                        {data[0].data.map((res) => (
                            <React.Fragment key={res._id}>
                                <tr>
                                    <td>{data.length}</td>
                                    <td style={{ color: 'blue', cursor: 'pointer' }} onClick={() => openManageModal(res._id)} >
                                        {res.objectid}
                                    </td>
                                    <td>{res.creator}</td>
                                    <td>{res.description}</td>
                                    <td>{res.type}</td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </table>
                    <Pagination
                        page={page}
                        onChange={handleChange}
                        count={Math.floor(data[0].message / 50)}
                    />
                    {modal1 ? (
                        <TaskModal
                            setModal={setModal}
                        ></TaskModal>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        )
    }
}
export default Task