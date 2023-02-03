import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import "./Table.css";
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Edit from "@mui/icons-material/Edit";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { GetObsData, ObsDataDelete, UpdateObs } from '../../services/obsServices'
import { Postobsfinaldata } from "../../services/submittedobsServices";
import Snackbar from '@mui/material/Snackbar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import style from "./Observations.module.css"

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

const Table = () => {

    // const [data, setData] = useState([])
    const [dataId, setDataid] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [Product, setProduct] = useState("");
    const [ProcessStage, setProcessStage] = useState("");
    const [Problem, setProblem] = useState("")
    const [PartNo, setPartNo] = useState("")
    const [Issue, setIssue] = useState("")
    const [Rootcause, setRootcause] = useState("")
    const [ReworkHrs, setReworkHrs] = useState(5)
    const [updateId, setupdateId] = useState(null)
    const [openN, setOpenN] = useState(false);
    const [openAL, setopenAL] = useState(false)
    const [checkedItems, setCheckedItems] = useState("");

    const dispatch = useDispatch();

    const { loading, data, skipCount } = useSelector(
        (state) => state.obsReducer
    );

    const handleopenfinalAlert = () => {
        setopenAL(true)
    }
    const handleclosefinalAlert = () => {
        setopenAL(false)
    }

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
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleNotification}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    const getTodo = async () => {
        dispatch(GetObsData())
    };

    useEffect(() => {
        getTodo();
    }, []);


    const handleDelete = (id) => {
        dispatch(ObsDataDelete(id))
        window.location.href = "/observations"

    };
    const getObsid = async (id, Product, PartNo, ProcessStage, Problem, Issue, Rootcause, ReworkHrs) => {
        setProduct(Product)
        setDataid(id)
        setProcessStage(ProcessStage)
        setPartNo(PartNo)
        setProblem(Problem)
        setIssue(Issue)
        setRootcause(Rootcause)
        setReworkHrs(ReworkHrs)
        handleClickOpen()
    }
    const updateObs = (_id, Product, PartNo, ProcessStage, Problem, Issue, Rootcause, ReworkHrs) => {
        dispatch(UpdateObs({ id: _id, Product, PartNo, ProcessStage, Problem, Issue, Rootcause, ReworkHrs }))
        window.location.href = "/observations"
    }

    const getidforsumbit = async (id, Product, PartNo, ProcessStage, Problem, Issue, Rootcause, ReworkHrs) => {
        setProduct(Product)
        setDataid(id)
        setProcessStage(ProcessStage)
        setPartNo(PartNo)
        setProblem(Problem)
        setIssue(Issue)
        setRootcause(Rootcause)
        setReworkHrs(ReworkHrs)
        handleopenfinalAlert()
    }


    const submitObs = (Product, PartNo, Issue, Problem, ProcessStage, Rootcause, ReworkHrs) => {
        let uitem = { Product, PartNo, Issue, Problem, ProcessStage, Rootcause, ReworkHrs }
        dispatch(Postobsfinaldata(uitem))
        handleclosefinalAlert()
    }
    if (loading) {
        return <div>Loading..</div>;
    }
    if (data.length == 0) {
        window.location.href = "/observations"
    }
    else {
        return (
            <div>

                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                    maxWidth
                >
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                        Update Observations

                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                        <form>
                            <div className="obs_form_main">
                                <div className="part1">
                                    <select name="Product" className="sel" defaultValue={Product} value={Product} onChange={(e) => setProduct(e.target.value)} >
                                        <option>Product</option>
                                        <option value="Engine">Engine</option>
                                        <option value="Axle">Axle</option>
                                        <option value="Suspension">Suspension</option>
                                        <option value="Transmission">Transmission</option>
                                    </select>

                                    <select name="ProcessStage" className="sel" defaultValue={ProcessStage} value={ProcessStage} onChange={(e) => setProcessStage(e.target.value)} >
                                        <option>Process Stage</option>
                                        <option value="Drilling">Drilling</option>
                                        <option value="Machining">Machining</option>
                                        <option value="Chamfer">Chamfer</option>
                                        <option value="Welding">Welding</option>
                                    </select>

                                    <select name="Problem" className="sel" value={Problem} defaultValue={Problem} onChange={(e) => setProblem(e.target.value)}>
                                        <option>Problem happend in</option>
                                        <option value="Customer End">Customer End</option>
                                        <option value="Tool Room">Tool Room</option>
                                        <option value="Machining Center">Machining Center</option>
                                        <option value="Design">Design</option>
                                    </select>

                                    <select name="PartNo" className="sel" defaultValue={PartNo} value={PartNo} onChange={(e) => setPartNo(e.target.value)}>
                                        <option>Part No</option>
                                        <option value="DAPR-AB-1234">DAPR-AB-1234</option>
                                        <option value="DAUS-IN-7244">DAUS-IN-7244</option>
                                        <option value="DAIN-MA-2548">DAIN-MA-2548</option>
                                    </select>

                                </div>
                                {/* -------------2 part of the form--------------- */}
                                <div className="part1" >
                                    <textarea name="Issue" className="inp" placeholder="Item description" defaultValue={Issue} value={Issue} onChange={(e) => setIssue(e.target.value)} />

                                    <select name="Rootcause" className="sel" defaultValue={Rootcause} value={Rootcause} onChange={(e) => setRootcause(e.target.value)}>
                                        <option>Rootcause</option>
                                        <option value="Design Error">Design Error</option>
                                        <option value="Faulty Material">Faulty Material</option>
                                        <option value="Faulty Manufacturing">Faulty Manufacturing</option>
                                        <option value="Improper Use">Improper Use</option>
                                    </select>
                                    <input name="ReworkHrs" type="number" className="inpU" placeholder="Reworks Hrs" defaultValue={ReworkHrs} value={ReworkHrs} onChange={(e) => setReworkHrs(e.target.value)} />

                                </div>
                            </div>
                            <div>
                                <Button variant="contained" onClick={(e) => { updateObs(dataId, Product, PartNo, ProcessStage, Problem, Issue, Rootcause, ReworkHrs) }}>Update</Button>
                            </div>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            Close
                        </Button>

                    </DialogActions>
                </BootstrapDialog>




                {/* ================================================================================================================================== */}


                {/* ========================================================================================= */}
                {/* <div className="deletebtn">
                    <div>
                        <DeleteIcon color="error" variant="contained" onClick={handleDelete}>Delete</DeleteIcon>
                    </div>
                    <div>
                        <EditIcon variant="contained" onClick={getObsid} />
                    </div>
                    <div>
                        <DoneAllIcon color="success" variant="contained" onClick={getidforsumbit}>Submit</DoneAllIcon>
                    </div>
                </div> */}
                <div>
                    <table>
                        {/* {console.log(data)} */}
                        <thead>
                            <tr>
                                {/* <th className="r-th">Check</th> */}
                                <th style={{width: '20px'}}>OBS No</th>
                                <th>Product</th>
                                <th>Part No</th>
                                <th>Process Stage</th>
                                <th>Problem</th>
                                <th>Root Cause</th>
                                <th>Issue Desc</th>
                                <th>Rework Hrs</th>
                                <th>Actions</th>
                                {/* <th>Edit</th>
                            <th>Delete</th>
                            <th>Submit</th> */}
                            </tr>
                        </thead>

                        <tbody>
                            {data[0].observations.map((res, index) => (
                                <React.Fragment key={res._id}>
                                    <tr>
                                        {/* <td><input type="checkbox" name={res._id} onChange={handleChange}/></td> */}
                                        <td style={{width: '20px'}}>OBS00{index + 1}</td>
                                        <td>{res.Product}</td>
                                        <td>{res.PartNo}</td>
                                        <td>{res.ProcessStage}</td>
                                        <td>{res.Problem}</td>
                                        <td>{res.Rootcause}</td>
                                        <td>{res.Issue}</td>
                                        <td>{res.ReworkHrs}</td>
                                        {/* <td><Button color="secondary" variant="contained" onClick={() => getObsid(item._id)} >Edit</Button></td> */}
                                        {/* <td><EditIcon  variant="contained" onClick={() => getObsid(item._id)}/></td> */}
                                        {/* <td><Button color="error" variant="contained" onClick={() => handleDelete()}>Delete</Button></td> */}
                                        {/* <td><DoneAllIcon color="success" variant="contained" onClick={() => getidforsumbit(item._id)}>Submit</DoneAllIcon></td> */}

                                        <div style={{ display: 'flex' }}>
                                            <IconButton aria-label="edit" size="large" onClick={(e) => { getObsid(res._id, res.Product, res.PartNo, res.ProcessStage, res.Problem, res.Issue, res.Rootcause, res.ReworkHrs) }}>
                                                <Edit
                                                    style={{ marginLeft: '1px' }}
                                                    fontSize="inherit" sx={{ color: '#4cbb17' }} />
                                            </IconButton>
                                            <IconButton aria-label="delete" size="large" onClick={(id) => handleDelete(res._id)} >
                                                <DeleteIcon
                                                    style={{ marginLeft: '1px' }}
                                                    fontSize="inherit" sx={{ color: 'red' }} />
                                            </IconButton>
                                            <IconButton aria-label="delete" size="large" onClick={(e) => { getidforsumbit(res._id, res.Product, res.PartNo, res.ProcessStage, res.Problem, res.Issue, res.Rootcause, res.ReworkHrs) }}>
                                                <DoneAllIcon style={{ marginLeft: '1px', marginRight: '1px' }} color="success" variant="contained" >Submit</DoneAllIcon>
                                            </IconButton>

                                        </div>

                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Snackbar
                    open={openN}
                    autoHideDuration={5000}
                    onClose={handleNotification}
                    message="Observation Was Updated Succesfully"
                    action={action}
                    sx={{
                        width: 300,
                        color: 'success.main',
                    }}
                />


                <Dialog
                    open={openAL}
                    onClose={handleclosefinalAlert}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Are you sure you want to submit?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleclosefinalAlert}>NO</Button>
                        <Button onClick={(e) => { submitObs(Product, PartNo, Issue, Problem, ProcessStage, Rootcause, ReworkHrs) }} autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default Table