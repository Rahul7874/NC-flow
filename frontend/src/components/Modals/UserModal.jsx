import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddUserD, DeleteUser, UpdateUser } from "../../services/userServices";
import { PostRoleData, GetAllRole, RoleDeletedata } from '../../services/roleServices';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from "@material-ui/core/Grid";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DeleteIcon from '@mui/icons-material/Delete';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { faL } from "@fortawesome/free-solid-svg-icons";

const UserModal = ({
  id,
  setModal,
  updateState,
  showDeleteModal,
  setShowdeleteModal,
}) => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('1');

  const [rtype, setrtype] = useState([])
  const [list, setList] = useState([])

  const handleChange = (event, newValue) => {
    setValue(newValue)
    dispatch(GetAllRole(username))

    if (data.length > 0) {
      if (!showD) {
        data[0].data.map((res) => {
          let name = res.usertype
          list.push({ name, id: res._id })
        })
        setShowD(true)
        // console.log(list)
      }
    }

  };
  const handleChange2 = (event) => {
    setUserType(event.target.value);
  };
  const [open, setOpen] = React.useState(false);
  const [usertype, setUserType] = useState('');
  const [name, setName] = useState('')
  const [fname, setFName] = useState('')
  const [lname, setLName] = useState('')
  const [username, setUsername] = useState('');
  const [eid, setEId] = useState('')
  const [email, setEmail] = useState('')
  const [mobno, setMobNo] = useState('')
  const [password, setPassword] = useState('')
  const [location, setLocation] = useState('')
  const { singleData } = useSelector((state) => state.userReducer);

  const [showD, setShowD] = useState(false)

  const dowellSingledata = { ...singleData };

  const [datatarget, setDataTarget] = useState({ ...dowellSingledata.data });
  const { loading, data, skipCount } = useSelector(
    (state) => state.roleReducer
  );

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleAddRole = (event) => {
    if (usertype === "") {
      alert("Select User Type")
    }
    else {
      setOpen(false)
      dispatch(PostRoleData({ username,name,usertype }))
      dispatch(GetAllRole(username))

      list.length=0
      if (data.length > 0) {
        data[0].data.map((res) => {
          let name = res.usertype
          list.push({ name, id: res._id })
        })
        setShowD(true)
      }
    }
  };

  useEffect(() => {
    if (updateState) {
      setUsername(dowellSingledata.data.username);
      setName(dowellSingledata.data.fname+" "+dowellSingledata.data.lname)
    }
  });

  const handleClose = () => {
   
    setOpen(false);
  };

  // handle clicks
  const handleUpdateChange = () => {
    const { _id, fname, lname, username, eid, email, mobno, password, location } = datatarget;
    if (fname.length == 0) {
      alert("Enter First Name")
    }
    else if (lname.length == 0) {
      alert("Enter Last Name")
    }
    else if (username.length == 0) {
      alert("Enter Username")
    }
    else if (eid.length == 0) {
      alert("Enter Employee ID")
    }
    else if (email.length == 0) {
      alert("Enter Email")
    }
    else if (mobno.length == 0) {
      alert("Enter Mobile Number")
    }
    else if (password.length == 0) {
      alert("Enter Password")
    }
    else if (location.length == 0) {
      alert("Enter Location")
    }
    else {
      dispatch(UpdateUser({ id: _id, fname, lname, username, eid, email, mobno, password, location }));
    }
  };

  const handleDelete = (e, id) => {
    dispatch(RoleDeletedata(id))
    const newList = list.filter((item) => item.id !== id)
    setList(newList);
    // window.location.reload(false);
  };
  const handleAddState = (e) => {
    dispatch(AddUserD({ fname, lname, mobno, eid, location, email, password, username }));
  };
  const deleteHandler = (e, id) => {
    dispatch(DeleteUser(id));
    window.location.reload(false);
  };
  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span
          className="close"
          onClick={() => {
            list.length=0
            setModal(false)
            setShowdeleteModal(false)
            // window.location.reload();
          }}
        >
          &times;
        </span>
        {showDeleteModal ? (
          <div>
            <div>Do You Really Want To delete?</div><br></br>
            <button
              style={{ width: '100px', padding: '2px', color: 'white', backgroundColor: 'rgb(230, 66, 66)', borderRadius: '5px' }}
              onClick={(e) => deleteHandler(e, id)}>Yes</button>
            <button
              style={{ width: '100px', marginLeft: '1rem', padding: '2px', color: 'white', backgroundColor: '#4cbb17', borderRadius: '5px' }}
              onClick={() => {
                setModal(false);
                setShowdeleteModal(false);
              }}
            >
              No
            </button>
          </div>
        ) : (
          <form>
            {/* email */}
            <div>
              <br />
              <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                      <Tab label="User Details" value="1" />
                      <Tab label="Manage Roles" value="2" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <h2 id="um-center">Update User Details</h2>
                    </div>

                    {/* ------------First Name & Last Name-------------*/}
                    {updateState ? (
                      <Grid container justify="center" style={{ marginTop: '2rem' }} >
                        <input className="ur-lkm" type='text' placeholder='First Name'
                          defaultValue={dowellSingledata.data.fname}
                          onChange={(e) =>
                            setDataTarget({ ...datatarget, fname: e.target.value })
                          }
                        ></input>
                        <input className="ur-lkm" style={{ marginLeft: '1rem' }} type='text' placeholder='Last Name'
                          defaultValue={dowellSingledata.data.lname}
                          onChange={(e) =>
                            setDataTarget({ ...datatarget, lname: e.target.value })
                          }
                        ></input>
                      </Grid>) : (<Grid container justify="center" style={{ marginTop: '2rem' }} >
                        <input className="ur-lkm" type='text' placeholder='First Name'
                          value={fname}
                          onChange={(e) => setFName(e.target.value)}
                        ></input>
                        <input className="ur-lkm" style={{ marginLeft: '1rem' }} type='text' placeholder='Last Name'
                          value={lname}
                          onChange={(e) => setLName(e.target.value)}
                        ></input>
                      </Grid>)}

                    {/* ------------Username & Employee ID-------------*/}
                    {updateState ? (
                      <Grid container justify="center" style={{ marginTop: '10px' }} >
                        <input className="ur-lkm" type='text' placeholder='Username'
                          defaultValue={dowellSingledata.data.username}
                          onChange={(e) =>
                            setDataTarget({ ...datatarget, username: e.target.value })
                          }
                        ></input>
                        <input className="ur-lkm" style={{ marginLeft: '1rem' }} type='text' placeholder='Employee ID'
                          defaultValue={dowellSingledata.data.eid}
                          onChange={(e) =>
                            setDataTarget({ ...datatarget, eid: e.target.value })
                          }
                        ></input>
                      </Grid>) : (<Grid container justify="center" style={{ marginTop: '10px' }}>
                        <input className="ur-lkm" type='text' placeholder='Username'
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        ></input>
                        <input className="ur-lkm" style={{ marginLeft: '1rem' }} type='text' placeholder='Employee ID'
                          value={eid}
                          onChange={(e) => setEId(e.target.value)}
                        ></input>
                      </Grid>)}

                    {/* ------------Email & Mobile Number-------------*/}
                    {updateState ? (
                      <Grid container justify="center" style={{ marginTop: '10px' }}>
                        <input className="ur-lkm" type='text' placeholder='Email'
                          defaultValue={dowellSingledata.data.email}
                          onChange={(e) =>
                            setDataTarget({ ...datatarget, email: e.target.value })
                          }
                        ></input>
                        <input className="ur-lkm" type='text' style={{ marginLeft: '1rem' }} placeholder='Mobile Number'
                          defaultValue={dowellSingledata.data.mobno}
                          onChange={(e) =>
                            setDataTarget({ ...datatarget, mobno: e.target.value })
                          }
                        ></input>
                      </Grid>) : (<Grid container justify="center" style={{ marginTop: '10px' }}>
                        <input className="ur-lkm" type='text' placeholder='Email'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        ></input>
                        <input className="ur-lkm" type='text' placeholder='Mobile Number'
                          value={mobno}
                          style={{ marginLeft: '1rem' }}
                          onChange={(e) => setMobNo(e.target.value)}
                        ></input>
                      </Grid>)}

                    {/* ------------Password & Location-------------*/}
                    {updateState ? (
                      <Grid container justify="center" style={{ marginTop: '10px' }}>
                        <input className="ur-lkm" type='text' placeholder='Password'
                          defaultValue={dowellSingledata.data.password}
                          onChange={(e) =>
                            setDataTarget({ ...datatarget, password: e.target.value })
                          }
                        ></input>
                        <input className="ur-lkm" type='text' style={{ marginLeft: '1rem' }} placeholder='Location'
                          defaultValue={dowellSingledata.data.location}
                          onChange={(e) =>
                            setDataTarget({ ...datatarget, location: e.target.value })
                          }
                        ></input>
                      </Grid>) : (<Grid container justify="center" style={{ marginTop: '10px' }}>
                        <input className="ur-lkm" type='text' placeholder='Password'
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        ></input>
                        <input className="ur-lkm" type='text' placeholder='Location'
                          value={location}
                          style={{ marginLeft: '1rem' }}
                          onChange={(e) => setLocation(e.target.value)}
                        ></input>
                      </Grid>)}

                    <br></br>
                    <br />
                    <Grid container justify="center" style={{ marginBottom: '2rem' }} >
                      <Button
                        type="submit"
                        style={{ padding: '8px', fontWeight: 'bold', width: '350px' }}
                        fullWidth
                        variant="contained"
                        onClick={(e) =>
                          updateState ? handleUpdateChange(id) : handleAddState(e)
                        }
                      >
                        Update
                      </Button>
                    </Grid>
                  </TabPanel>
                  <TabPanel value="2">
                    <div style={{ display: 'flex', justifyContent: 'right' }}>
                      <Button
                        variant="contained"
                        onClick={handleClickOpen}
                        style={{ width: '200px' }}
                        startIcon={<PersonAdd />}>
                        Add Role
                      </Button>
                    </div>
                    <Dialog open={open} onClose={handleClose}>
                      <DialogTitle>Add Role</DialogTitle>
                      <DialogContent>
                        <Grid container justify="center" style={{ marginTop: '1rem' }} >
                          <FormControl sx={{ m: 1, minWidth: 350 }}>
                            <Select
                              value={usertype}
                              onChange={handleChange2}
                              displayEmpty
                              inputProps={{ 'aria-label': 'Without label' }}
                            >
                              <MenuItem value="">
                                <em>Select User Type</em>
                              </MenuItem>
                              <MenuItem value={"Creator"}>Creator</MenuItem>
                              <MenuItem value={"Resolution Owner"}>Resolution Owner</MenuItem>
                              <MenuItem value={"Validator"}>Validator</MenuItem>
                              <MenuItem value={"Approver"}>Approver</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>

                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit" onClick={handleAddRole}>Add Role</Button>
                      </DialogActions>
                    </Dialog>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Grid container justify="left" style={{ marginTop: '10px', padding: '15px', borderRadius: '5px', border: '2px solid black', width: '100%' }}>
                        {showD ? (
                          <Stack direction="row" spacing={1}>
                            {list.map((item) => (
                              <Chip label={item.name} variant="outlined" color="primary" onDelete={(e) => handleDelete(e, item.id)}
                                deleteIcon={<DeleteIcon />} />
                            ))}
                          </Stack>
                        ) : ("")}
                      </Grid>
                    </div>
                  </TabPanel>
                </TabContext>
              </Box>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserModal;
