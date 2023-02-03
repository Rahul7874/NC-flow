import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Pagination from "@mui/material/Pagination";
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { GetAllUser, userSingle, getSearch } from "../../services/userServices";
import UserModal from "../Modals/UserModal";
import '../User/manageuser.css'
import Edit from "@mui/icons-material/Edit";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';

const ManageUser = () => {
    const [page, setPage] = useState(1);
    const [modal, setModal] = useState(false);
    const [ids, setIds] = useState();
    const [search, setSearch] = useState("");
    const [showDeleteModal, setShowdeleteModal] = useState(false);
    const [updateState, setUpdateState] = useState(false);
    const dispatch = useDispatch();
    const { loading, data, skipCount } = useSelector(
        (state) => state.userReducer
    );
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const [timer, setTimer] = useState(null)

    const inputChanged = e => {
        setSearch(e.target.value)

        clearTimeout(timer)

        const newTimer = setTimeout(() => {
            if (search.length == 1) {
                dispatch(getSearch(""));
            }
            else {
                dispatch(getSearch(search));
            }
            console.log(search.length)
        }, 500)

        setTimer(newTimer)
    }

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
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
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

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const handleChange = (event, value) => {
        setPage(value);
    };
    useEffect(() => {
        dispatch(GetAllUser(page));
        // dispatch(getSearch("Rahul"));
    }, [page]);

    const handleSearch = () => {
        dispatch(getSearch(search));
    };

    const deleteHandler = (id) => {
        setModal(true);
        setShowdeleteModal(true);
        setIds(id);
    };

    const updatehandler = (id) => {
        dispatch(userSingle(id));
        setUpdateState(true);
        setModal(true);
    };

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(-1);
        setTimeout(() => {
            window.location.reload(false)
        }, 100)
    }
    if (loading) {
        return <div>Loading..</div>;
    }
    if (data.length == 0) {
        // window.location.href = "/manageuser"
        dispatch(GetAllUser(page));
    }
    else {
        // console.log(data)
        return (
            <div>
                {/* <div className="mu-header">
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '-25px' }}>
                        <img src="/images/danalogo1.png" style={{ height: '90px' }} alt=''></img>
                        <label style={{ marginLeft: '-20px', fontSize: '25px', fontWeight: '600' }}>NC Flow</label>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input className="mu-search" type='text' placeholder='Search for first name, username, employee id, email' value={search} onChange={(e) => setSearch(e.target.value)}></input>
                        <Button
                            type="submit"
                            className="mu-search-button"
                            variant="contained"
                            onClick={() => handleSearch()}>Search</Button>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </div>
                </div> */}
                {/* <Divider /> */}
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar style={{ height: '90px' }}>
                        <Toolbar style={{ marginLeft: '200px' }}>
                            <Typography variant="h6" sx={{ color: 'text.white', fontWeight: '600' }}>
                                Welcome {localStorage.getItem("fname")}
                            </Typography>
                            <Box sx={{ ml: 10 }} />
                            {/* <Search value={search} >
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search> */}
                            <input placeholder="Search…" value={search} type="text" onChange={inputChanged} />
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
                    {localStorage.getItem("isAdmin") === "true" ? (<div style={{ display: 'flex', alignItems: 'right', justifyContent: 'right', marginTop: '100px' }}>
                        <Button
                            variant="contained"
                            onClick={() => navigate("/userregistration")}
                            style={{ width: '250px', height: '45px' }}
                            startIcon={<PersonAdd />}
                        >
                            Register New User
                        </Button>
                    </div>) : (<div style={{ marginTop: '130px' }}></div>)}

                    <table>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                            <th>Employee ID</th>
                            <th>Email</th>
                            <th>Mobile Number</th>
                            <th>Location</th>
                            {localStorage.getItem("isAdmin") === "true" ? (<th>Actions</th>) : ("")}
                        </tr>
                        {data[0].data.map((res) => (
                            <React.Fragment key={res._id}>
                                <tr>
                                    <td>{res.fname}</td>
                                    <td>{res.lname}</td>
                                    <td>{res.username}</td>
                                    <td>{res.eid}</td>
                                    <td>{res.email}</td>
                                    <td>{res.mobno}</td>
                                    <td>{res.location}</td>
                                    {localStorage.getItem("isAdmin") === "true" ? (<div style={{ display: 'flex' }}>
                                        <IconButton aria-label="edit" size="large" onClick={() => updatehandler(res._id)}>
                                            <Edit
                                                style={{ marginLeft: '1px' }}
                                                fontSize="inherit" sx={{ color: '#4cbb17' }} />
                                        </IconButton>
                                        <IconButton aria-label="delete" size="large" onClick={(e) => deleteHandler(res._id)} >
                                            <DeleteIcon
                                                style={{ marginLeft: '1px', marginRight: '1px' }}
                                                fontSize="inherit" sx={{ color: 'red' }} />
                                        </IconButton>
                                    </div>) : ("")}

                                </tr>
                            </React.Fragment>
                        ))}
                        {modal ? (
                            <UserModal
                                id={ids}
                                setModal={setModal}
                                showDeleteModal={showDeleteModal}
                                setShowdeleteModal={setShowdeleteModal}
                                updateState={updateState}
                                setUpdateState={setUpdateState}
                            ></UserModal>
                        ) : (
                            <div></div>
                        )}
                    </table>
                    <Pagination
                        page={page}
                        onChange={handleChange}
                        count={Math.floor(data[0].message / 50)}
                    />
                </div>
            </div>
        );
    }
};

export default ManageUser;
