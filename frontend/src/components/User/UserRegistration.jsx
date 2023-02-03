import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import React from "react";
import { AddUserD } from '../../services/userServices'
import Button from '@mui/material/Button';
import "./userregistration.css"
import Grid from "@material-ui/core/Grid";


const UserRegistration = () => {
  const [fname, setFName] = useState('')
  const [lname, setLName] = useState('')
  const [username, setUsername] = useState('')
  const [eid, setEId] = useState('')
  const [email, setEmail] = useState('')
  const [mobno, setMobNo] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCPassword] = useState('')
  const [location, setLocation] = useState('')

  let navigate = useNavigate();
  // login function
  const dispatch = useDispatch()
  const LoginFunction = () => {
    // e.preventDefault()
    dispatch(AddUserD({ fname,lname,username,eid,email,mobno,password,location}));
    navigate('/')
    // handleClick
  }
  const validateData = (event) => {
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
    else if (cpassword.length == 0) {
      alert("Enter Confirm Password")
    }
    else if (location.length == 0) {
      alert("Enter Location")
    }
    else {
      if (password != cpassword) {
        alert("Password and Confirm Password do not match")
      }
      else {
        LoginFunction();
      }
    }
  }

  return (
    <div className="ur-td">
      <div className="ur-header">
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '-30px' }}>
          <img src="/images/danalogo1.png" style={{ height: '120px' }} alt=''></img>
          <label style={{ marginLeft: '-20px', fontSize: '28px', fontWeight: '600' }}>NC Flow</label>
        </div>
      </div>
      <div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="ur-card">
          <div className="ur-container">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <h2 id="ur-center">Register User</h2>
            </div>
            <Grid container justify="center" style={{ marginTop: '2rem'}} >
              <input className="ur-lkm" type='text' placeholder='First Name' value={fname} onChange={(e) => setFName(e.target.value)}></input>
              <input style={{marginLeft:'1rem'}} className="ur-lkm" type='text' placeholder='Last Name' value={lname} onChange={(e) => setLName(e.target.value)}></input>
            </Grid>
            <Grid container justify="center" style={{ marginTop: '10px'}}>
              <input className="ur-lkm" type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}></input>
              <input style={{marginLeft:'1rem'}} className="ur-lkm" type='text' placeholder='Employee ID' value={eid} onChange={(e) => setEId(e.target.value)}></input>
            </Grid>
            <Grid container justify="center" style={{ marginTop: '10px'}}>
              <input className="ur-lkm" type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
              <input style={{marginLeft:'1rem'}} className="ur-lkm" type='phone' placeholder='Mobile Number' value={mobno} onChange={(e) => setMobNo(e.target.value)}></input>
            </Grid>
            <Grid container justify="center" style={{ marginTop: '10px'}}>
              <input className="ur-lkm" type='text' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
              <input style={{marginLeft:'1rem'}} className="ur-lkm" type='password' placeholder='Confirm Password' value={cpassword} onChange={(e) => setCPassword(e.target.value)}></input>
            </Grid>
            <Grid container justify="center" style={{ marginTop: '10px'}}>
            <input style={{marginLeft:'1rem'}} className="ur-lkm" type='text' placeholder='Location' value={location} onChange={(e) => setLocation(e.target.value)}></input>
            </Grid>
            <br></br>
            <br />
            <Grid container justify="center" style={{ marginBottom: '2rem' }} >
            <Button
                    type="submit"
                    style={{padding:'8px',fontWeight:'bold',width:'350px'}}
                    fullWidth
                    variant="contained"
                    onClick={validateData}
                  >
                    Register
                  </Button>
            </Grid>
          </div>
        </div>
      </div>
    </div >
  );
}

export default UserRegistration;