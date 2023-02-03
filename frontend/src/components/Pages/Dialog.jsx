import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import style from "./Observations.module.css"
import axios from "axios"
import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import { useEffect } from 'react';
import { PostObsdata } from '../../services/obsServices';
import { useDispatch } from 'react-redux';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};
// --------------------------------------------------------------------------------------------------------



export default function CustomizedDialogs() {
    const [open, setOpen] = React.useState(false);
    const [openN, setOpenN] = useState(false);

    const dispatch = useDispatch()
    // const wrongreload = () => {
    //     window.location.reload(false)

    // }

    //   -----------------------------------------------------------------------------------------------
    const handleClick = () => {
        setOpenN(true);
    };

    const handleNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenN(false);
    };
    const action = (

        <IconButton
            size="small"
            aria-label="close"
            color="success"
            onClick={handleNotification}
        >
            <CloseIcon fontSize="small" />
        </IconButton>

    )
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [Obser, setObser] = useState({
        Product: "", ProcessStage: "",
        Problem: "", Issue: "", Rootcause: "", PartNo: "",
        ReworkHrs: ""
    })

    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value
        setObser({ ...Obser, [name]: value })

    }
    const submitHandler = (event) => {

        // event.preventDefault();

        // axios.post("http://localhost:8080/obse/post", Obser)

        //     .then(response => {
        //         console.log(response)
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
        dispatch(PostObsdata(Obser))

        handleClose()
        // wrongreload()
        handleClick()
        window.location.href = "/observations"

    }

    return (
        <div>
            <div className='for_search'>
            <Button variant="contained" onClick={handleClickOpen} sx={{ mt: 2 }}>
                Create New Observations
            </Button>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400,backgroundColor:"rgb(240,240,240)" }}
            >

                <InputBase
                    sx={{ ml: 1, flex: 1,backgroundColor:"rgb(240,240,240)" }}
                    placeholder="Search by part no"
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

            </Paper>
            </div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} >
                    <div style={{ textAlign: "center" }}>Observations</div>
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <form>
                        <div className="obs_form_main">
                            <div className="part1">
                                {/* <select name="Product" className="sel" onChange={handleInputs}>
                                     <option>Product</option>
                                    <option value="Engine">Engine</option>
                                    <option value="Axle">Axle</option>
                                    <option value="Suspension">Suspension</option>
                                    <option value="Transmission">Transmission</option>
                                </select> */}
                                <Box sx={{ minWidth: 100 }}>
                                    <FormControl fullWidth>
                                        <InputLabel variant="standard" htmlFor="uncontrolled-native" required>
                                            Product Part
                                        </InputLabel>
                                        <NativeSelect
                                            name="Product"
                                            onChange={handleInputs}
                                        >
                                            <option>Select</option>
                                            <option value="Engine">Engine</option>
                                            <option value="Axle">Axle</option>
                                            <option value="Suspension">Suspension</option>
                                            <option value="Transmission">Transmission</option>

                                        </NativeSelect>
                                    </FormControl>

                                </Box>

                                {/* <select name="ProcessStage" className="sel" onChange={handleInputs}>
                                    <option>Process Stage</option>
                                    <option value="Drilling">Drilling</option>
                                    <option value="Machining">Machining</option>
                                    <option value="Chamfer">Chamfer</option>
                                    <option value="Welding">Welding</option>
                                </select> */}
                                <Box sx={{ minWidth: 350 }}>
                                    <FormControl fullWidth>
                                        <InputLabel variant="standard" htmlFor="uncontrolled-native" required>
                                            ProcessStage                                        </InputLabel>
                                        <NativeSelect
                                            name="ProcessStage"
                                            onChange={handleInputs}
                                        >
                                            <option>Select</option>
                                            <option value="Drilling">Drilling</option>
                                            <option value="Machining">Machining</option>
                                            <option value="Chamfer">Chamfer</option>
                                            <option value="Welding">Welding</option>

                                        </NativeSelect>
                                    </FormControl>
                                </Box>

                                {/* <select name="Problem" className="sel" onChange={handleInputs}>
                                    
                                    <option>Problem happend in</option>
                                    <option value="Customer End">Customer End</option>
                                    <option value="Tool Room">Tool Room</option>
                                    <option value="Machining Center">Machining Center</option>
                                    <option value="Design">Design</option>
                                </select> */}
                                <Box sx={{ minWidth: 350 }}>
                                    <FormControl fullWidth>
                                        <InputLabel variant="standard" htmlFor="uncontrolled-native" required>
                                            Where did the problem happend
                                        </InputLabel>
                                        <NativeSelect
                                            name="Problem"
                                            onChange={handleInputs}
                                        >
                                            <option>Select</option>
                                            <option value="Customer End">Customer End</option>
                                            <option value="Tool Room">Tool Room</option>
                                            <option value="Machining Center">Machining Center</option>
                                            <option value="Design">Design</option>

                                        </NativeSelect>
                                    </FormControl>
                                </Box>

                                {/* <select name="PartNo" className="sel" onChange={handleInputs}>
                                    
                                    <option>Part No</option>
                                    <option value="DAPR-AB-1234">DAPR-AB-1234</option>
                                    <option value="DAUS-IN-7244">DAUS-IN-7244</option>
                                    <option value="DAIN-MA-2548">DAIN-MA-2548</option>
                                </select> */}
                                <Box sx={{ minWidth: 350 }}>
                                    <FormControl fullWidth>
                                        <InputLabel variant="standard" htmlFor="uncontrolled-native" required>
                                            PartNo
                                        </InputLabel>
                                        <NativeSelect
                                            name="PartNo"
                                            onChange={handleInputs}
                                        >
                                            <option>Select</option>
                                            <option value="DAPR-AB-1234">DAPR-AB-1234</option>
                                            <option value="DAUS-IN-7244">DAUS-IN-7244</option>
                                            <option value="DAIN-MA-2548">DAIN-MA-2548</option>
                                        </NativeSelect>
                                    </FormControl>
                                </Box>

                            </div>
                            {/* -------------2 part of the form--------------- */}
                            <div className="part1" >
                                {/* <textarea name="Issue" className="inp" placeholder="Item description" onChange={handleInputs} /> */}
                                <Box
                                    component="form"
                                    sx={{
                                        minWidth: 350, mt: 3
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >

                                    <TextField
                                        fullWidth
                                        id="filled-textarea"
                                        label="Issue Description"
                                        placeholder="Placeholder"
                                        multiline
                                        variant="filled"
                                        required
                                        name="Issue"
                                        onChange={handleInputs}
                                    />
                                </Box>
                                {/* <select name="Rootcause" className="sel" onChange={handleInputs}>
                                <option>Rootcause</option>
                                    <option value="Design Error">Design Error</option>
                                    <option value="Faulty Material">Faulty Material</option>
                                    <option value="Faulty Manufacturing">Faulty Manufacturing</option>
                                    <option value="Improper Use">Improper Use</option>
                                </select> */}
                                <Box sx={{ minWidth: 350 }}>
                                    <FormControl fullWidth>
                                        <InputLabel variant="standard" htmlFor="uncontrolled-native" required>
                                            Rootcause
                                        </InputLabel>
                                        <NativeSelect
                                            name="Rootcause"
                                            onChange={handleInputs}
                                        >
                                            <option>Select</option>
                                            <option value="Design Error">Design Error</option>
                                            <option value="Faulty Material">Faulty Material</option>
                                            <option value="Faulty Manufacturing">Faulty Manufacturing</option>
                                            <option value="Improper Use">Improper Use</option>
                                        </NativeSelect>
                                    </FormControl>
                                </Box>
                                {/* <input name="ReworkHrs" type="number" className="inpU" placeholder="Reworks Hrs" onChange={handleInputs} /> */}
                                <Box sx={{ minWidth: 350 }}>
                                    <TextField fullWidth id="outlined-basic" label="Rework Man-Hrs" variant="filled" type="number" required name="ReworkHrs" onChange={handleInputs} />

                                </Box>

                            </div>
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="contained" onClick={submitHandler} >Create</Button>
                </DialogActions>
            </BootstrapDialog>
            <Snackbar
                open={openN}
                autoHideDuration={5000}
                onClose={handleNotification}
                message="Observation was Created Succesfully"
                action={action}
                sx={{
                    width: 300,
                    color: 'success.main',
                }}
            />

        </div>
    );
}