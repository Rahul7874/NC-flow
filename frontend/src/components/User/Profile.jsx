import React, { useEffect } from "react";
import Card from '@mui/material/Card';
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getSearch, UpdateUser } from "../../services/userServices";
import "./profile.css"

const Profile = () => {
    const [fname, setFName] = useState('')
    const [lname, setLName] = useState('')
    const [username, setUsername] = useState('')
    const [eid, setEId] = useState('')
    const [email, setEmail] = useState('')
    const [mobno, setMobNo] = useState('')
    const [password, setPassword] = useState('')
    const [location, setLocation] = useState('')
    const [page, setPage] = useState(1);

    const [list, setList] = useState([])

    let navigate = useNavigate();
    const dispatch = useDispatch()
    const { loading, data, skipCount } = useSelector(
        (state) => state.userReducer
    );
    const handleUpdateChange = (_id) => {
        // if (mobno.length == 0) {
        //     setMobNo(list[6])
        // }
        // if (password.length == 0) {
        //     setPassword(list[3])
        // }
        // if (location.length == 0) {
        //     setLocation(list[7])
        // }
        // setFName(list[0])
        // setLName(list[4])
        // setUsername(list[1])
        // setEmail(list[2])
        // setEId(list[5])
        // alert(fname.length)
        // setTimeout(() => {
            
        // }, 2000);
        // dispatch(UpdateUser({ id: _id, fname, lname, username, eid, email, mobno, password, location }));
        // alert("Data Updated")
    };
    useEffect(() => {
        dispatch(getSearch(localStorage.getItem("username")));

    }, [page]);

    if (loading) {
        return <div>Loading..</div>;
    }
    if (data.length == 0) {
        window.location.href = "/profile"
    }
    else {
        data[0].data.map((res) => {
            let v1 = res.fname
            list.push(v1)
            let v2 = res.username
            list.push(v2)
            let v3 = res.email
            list.push(v3)
            let v4 = res.password
            list.push(v4)
            let v5 = res.lname
            list.push(v5)
            let v6 = res.eid
            list.push(v6)
            let v7 = res.mobno
            list.push(v7)
            let v8 = res.location
            list.push(v8)
            let v9 = res._id
            list.push(v9)
        })
        return (
            <div>
                <Card sx={{ maxWidth: 880, marginTop: '3rem', marginLeft: '3rem' }}>
                    <CardContent sx={{ padding: '50px' }}>
                        <Typography gutterBottom variant="h5" component="div">
                            General information
                        </Typography>
                        <div style={{ display: 'flex', marginTop: '2rem' }}>
                            <div>
                                <Typography gutterBottom variant="h7" component="div">
                                    First Name
                                </Typography>
                                <input className="pf-lkm" disabled type='text' defaultValue={list[0]} placeholder='Enter your first name' onChange={(e) => setFName(e.target.value)}></input>
                                <Typography gutterBottom variant="h7" component="div" sx={{ marginTop: '1.5rem' }}>
                                    Username
                                </Typography>
                                <input disabled className="pf-lkm" type='text' defaultValue={list[1]} placeholder='Username' onChange={(e) => setUsername(e.target.value)}></input>
                                <Typography gutterBottom variant="h7" component="div" sx={{ marginTop: '1.5rem' }}>
                                    Email
                                </Typography>
                                <input disabled className="pf-lkm" type='email' placeholder='Enter your email' defaultValue={list[2]} onChange={(e) => setEmail(e.target.value)}></input>
                                <Typography gutterBottom variant="h7" component="div" sx={{ marginTop: '1.5rem' }}>
                                    Password
                                </Typography>
                                <input className="pf-lkm" type='text' placeholder='Enter your password' defaultValue={list[3]} onChange={(e) => setPassword(e.target.value)}></input>
                            </div>
                            <div style={{ marginLeft: '5rem' }}>
                                <Typography gutterBottom variant="h7" component="div">
                                    Last Name
                                </Typography>
                                <input disabled className="pf-lkm" type='text' placeholder='Enter your last name' defaultValue={list[4]} onChange={(e) => setLName(e.target.value)}></input>
                                <Typography gutterBottom variant="h7" component="div" sx={{ marginTop: '1.5rem' }}>
                                    Employee ID
                                </Typography>
                                <input disabled className="pf-lkm" type='text' placeholder='Enter your employee id' defaultValue={list[5]} onChange={(e) => setEId(e.target.value)}></input>
                                <Typography gutterBottom variant="h7" component="div" sx={{ marginTop: '1.5rem' }}>
                                    Mobile Number
                                </Typography>
                                <input className="pf-lkm" type='phone' placeholder='Enter your mobile number' defaultValue={list[6]} onChange={(e) => setMobNo(e.target.value)}></input>
                                <Typography gutterBottom variant="h7" component="div" sx={{ marginTop: '1.5rem' }}>
                                    Location
                                </Typography>
                                <input className="pf-lkm" type='text' placeholder='Enter your location' defaultValue={list[7]} onChange={(e) => setLocation(e.target.value)}></input>
                            </div>
                        </div>
                        <Button
                            type="submit"
                            style={{ padding: '8px', fontWeight: 'bold', width: '150px', marginTop: '3rem' }}
                            fullWidth
                            onClick={(e) =>
                                handleUpdateChange(list[8])
                            }
                            variant="contained">
                            Save All
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default Profile;