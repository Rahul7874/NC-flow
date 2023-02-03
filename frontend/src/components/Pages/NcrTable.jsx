import React from "react";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
//import DeleteIcon from '@mui/icons-material/Delete';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Edit from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { GetAllNcrOptionsData2 } from "../../services/ncroptionServices";
import { GetAllNcrData, NcrDataDelete, UpdateNcr } from "../../services/ncrServices";
const NcrTable = () => {

    // const [data, setData] = useState([]);

    const dispatch = useDispatch();
    const [dataId, setDataid] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [openAL, setopenAL] = useState(false)
    const [Type, setType] = useState("")
    const [ProcessStage, setProcessStage] = useState("");
    const [Problem, setProblem] = useState("")
    const [PartNo, setPartNo] = useState("")
    const [Issue, setIssue] = useState("")
    const [FailureType, setFailureType] = useState("")
    const [ReworkHrs, setReworkHrs] = useState("")
    const [RCA, setRca] = useState("")
    const [Resolutionowner, setResolutionowner] = useState("")
    const [RCAValidator, setRCAValidator] = useState("")
    const [Finalapprover, setFinalapprover] = useState("")

    const { loading, data, skipCount } = useSelector(
        (state) => state.NcrReducer
    );
    const { loading1, data1 } = useSelector(
        (state) => state.roleReducer
    );
    const { loading2, data2 } = useSelector(
        (state) => state.roleReducer
    );
    const { loading3, data3 } = useSelector(
        (state) => state.roleReducer
    );
    const { loading4, data4 } = useSelector(
        (state) => state.NcrOptionReducer
    );

    const getadNCR = async () => {
        dispatch(GetAllNcrData())
        dispatch(GetAllNcrOptionsData2())
    };

    useEffect(() => {
        getadNCR();
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    const handleopenfinalAlert = () => {
        setopenAL(true)
    }
    const handleclosefinalAlert = () => {
        setopenAL(false)
    }

    const handleDelete = (id) => {
        dispatch(NcrDataDelete(id))
        window.location.href = "/createncr"

    };
    const getncrid = (id, Type, ProcessStage, Problem, Issue, FailureType, PartNo, ReworkHrs, RCA, Resolutionowner, RCAValidator, Finalapprover) => {
        setType(Type)
        setDataid(id)
        setProcessStage(ProcessStage)
        setPartNo(PartNo)
        setProblem(Problem)
        setIssue(Issue)
        setFailureType(FailureType)
        setReworkHrs(ReworkHrs)
        setRca(RCA)
        setResolutionowner(Resolutionowner)
        setRCAValidator(RCAValidator)
        setFinalapprover(Finalapprover)
        setOpen(true)

    }
    const updateObs = (_id, Type, ProcessStage, Problem, Issue, FailureType, PartNo, ReworkHrs, RCA, Resolutionowner, RCAValidator, Finalapprover) => {
        dispatch(UpdateNcr({ id: _id, Type, ProcessStage, Problem, Issue, FailureType, PartNo, ReworkHrs, RCA, Resolutionowner, RCAValidator, Finalapprover }))
        setOpen(false);
        window.location.href = "/createncr"
    }


    const getIdforSubmit = (id, Type, ProcessStage, Problem, Issue, FailureType, PartNo, ReworkHrs, RCA, Resolutionowner, RCAValidator, Finalapprover) => {
        setType(Type)
        setDataid(id)
        setProcessStage(ProcessStage)
        setPartNo(PartNo)
        setProblem(Problem)
        setIssue(Issue)
        setFailureType(FailureType)
        setReworkHrs(ReworkHrs)
        setRca(RCA)
        setResolutionowner(Resolutionowner)
        setRCAValidator(RCAValidator)
        setFinalapprover(Finalapprover)
        handleopenfinalAlert()
    }


    const submitNcrfinal = (Type, ProcessStage, Problem, Issue, FailureType, PartNo, ReworkHrs, RCA, Resolutionowner, RCAValidator, Finalapprover) => {
        let uitem = { Type, ProcessStage, Problem, Issue, FailureType, PartNo, ReworkHrs, RCA, Resolutionowner, RCAValidator, Finalapprover }
        // dispatch(PostNcrfinaldata(uitem))
        handleclosefinalAlert()
    }
    if (loading4) {
        return <div>Loading..</div>;
    }
    if (loading) {
        return <div>Loading..</div>;
    }
    else
        return (
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                    maxWidth
                >
                    <DialogTitle id="scroll-dialog-title" >
                        <Box sx={{ textAlign: "center", fontWeight: "bold" }}>
                            Update NCR
                        </Box>
                    </DialogTitle>
                    <form>
                        <DialogContent dividers={scroll === 'paper'}>
                            <DialogContentText>

                                <div className="ncrformmain">
                                    <div>
                                        <Box sx={{ minWidth: 250 }}>
                                            <FormControl fullWidth>
                                                <InputLabel variant="standard" htmlFor="uncontrolled-native" required>
                                                    Type
                                                </InputLabel>
                                                <NativeSelect
                                                    name="Type"
                                                    defaultValue={Type}
                                                    onChange={(e) => setType(e.target.value)}
                                                >
                                                    <option>Select</option>
                                                    {data4[0].ncr.map((item) =>
                                                        <option value={item.Type}>{item.Type}</option>
                                                    )}

                                                </NativeSelect>
                                            </FormControl>

                                        </Box>
                                        <p>{Error.Type}</p>

                                        <Box sx={{ minWidth: 350, mt: 3 }}>
                                            <FormControl fullWidth>
                                                <InputLabel variant="standard" htmlFor="uncontrolled-native" required>
                                                    Where did the problem happend
                                                </InputLabel>
                                                <NativeSelect
                                                    name="Problem"
                                                    defaultValue={Problem}
                                                    onChange={(e) => setProblem(e.target.value)}
                                                >
                                                    <option>Select</option>
                                                    {data4[0].ncr.map((item) =>
                                                        <option value={item.Problem} >{item.Problem}</option>
                                                    )}

                                                </NativeSelect>
                                            </FormControl>
                                        </Box>
                                        <p>{Error.Problem}</p>
                                        <Box sx={{ minWidth: 350, mt: 3 }}>
                                            <FormControl fullWidth>
                                                <InputLabel variant="standard" htmlFor="uncontrolled-native" required>
                                                    Process stage
                                                </InputLabel>
                                                <NativeSelect
                                                    name="ProcessStage"
                                                    defaultValue={ProcessStage}
                                                    onChange={(e) => setProcessStage(e.target.value)}
                                                >
                                                    <option>Select</option>
                                                    {data4[0].ncr.map((item) =>
                                                        <option value={item.ProcessStage} >{item.ProcessStage}</option>
                                                    )}

                                                </NativeSelect>
                                            </FormControl>
                                        </Box>
                                        <p>{Error.ProcessStage}</p>
                                        <Box sx={{ minWidth: 350, mt: 3 }}>
                                            <FormControl fullWidth>
                                                <InputLabel variant="standard" htmlFor="uncontrolled-native" required>
                                                    Part No
                                                </InputLabel>
                                                <NativeSelect
                                                    name="PartNo"
                                                    defaultValue={PartNo}
                                                    onChange={(e) => setPartNo(e.target.value)}
                                                >
                                                    <option>Select</option>
                                                    {data4[0].ncr.map((item) =>
                                                        <option value={item.PartNo} >{item.PartNo}</option>
                                                    )}

                                                </NativeSelect>
                                            </FormControl>
                                        </Box>
                                        <p>{Error.PartNo}</p>
                                        <Box sx={{ minWidth: 350, mt: 3 }}>
                                            <TextField fullWidth id="outlined-basic" label="Rework Man-Hrs" variant="filled" type="number" required name="ReworkHrs" onChange={(e) => setReworkHrs(e.target.value)} defaultValue={ReworkHrs} />

                                        </Box>
                                        <p>{Error.ReworkHrs}</p>
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
                                                defaultValue={Issue}
                                                onChange={(e) => setIssue(e.target.value)}
                                            />
                                        </Box>
                                        <p>{Error.Issue}</p>
                                    </div>
                                    <div>
                                        <Box sx={{ minWidth: 350 }}>
                                            <FormControl fullWidth>
                                                <InputLabel variant="standard" htmlFor="uncontrolled-native" required>
                                                    Standard failure type
                                                </InputLabel>
                                                <NativeSelect
                                                    name="FailureType"
                                                    defaultValue={FailureType}
                                                    onChange={(e) => setFailureType(e.target.value)}
                                                >
                                                    <option>Select</option>
                                                    {data4[0].ncr.map((item) =>
                                                        <option value={item.Ftype}>{item.Ftype}</option>
                                                    )}

                                                </NativeSelect>
                                            </FormControl>
                                        </Box>
                                        <p>{Error.FailureType}</p>

                                        <Box sx={{ minWidth: 350, mt: 3 }}>
                                            <FormControl fullWidth>
                                                <InputLabel variant="standard" htmlFor="uncontrolled-native" required>
                                                    RCA Required
                                                </InputLabel>
                                                <NativeSelect
                                                    name="RCA"
                                                    defaultValue={RCA}
                                                    onChange={(e) => setRca(e.target.value)}
                                                >
                                                    <option>Select</option>
                                                    <option value="Yes">Yes</option>
                                                    <option value="No">No</option>
                                                </NativeSelect>
                                            </FormControl>
                                        </Box>
                                        <p>{Error.RCA}</p>
                                        <Box sx={{ minWidth: 350, mt: 3 }}>
                                            <FormControl fullWidth>
                                                <InputLabel variant="standard" htmlFor="uncontrolled-native" required>
                                                    Resolution owner
                                                </InputLabel>
                                                <NativeSelect
                                                    name="Resolutionowner"
                                                    defaultValue={Resolutionowner}
                                                    onChange={(e) => setResolutionowner(e.target.value)}
                                                >
                                                    <option>Select</option>
                                                    {data1[0].resolutionowner.map((item) =>
                                                        <option value={item.name}>{item.name}</option>
                                                    )}
                                                </NativeSelect>
                                            </FormControl>
                                        </Box>
                                        <p>{Error.Resolutionowner}</p>
                                        <Box sx={{ minWidth: 350, mt: 3 }}>
                                            <FormControl fullWidth>
                                                <InputLabel variant="standard" htmlFor="uncontrolled-native" required>
                                                    RCA Validator                                 </InputLabel>
                                                <NativeSelect
                                                    name="RCAValidator"
                                                    defaultValue={RCAValidator}
                                                    onChange={(e) => setRCAValidator(e.target.value)}
                                                >
                                                    <option>Select</option>
                                                    {data2[0].validator.map((item) =>
                                                        <option value={item.name}>{item.name}</option>
                                                    )}
                                                </NativeSelect>
                                            </FormControl>
                                        </Box>
                                        <p>{Error.RCAValidator}</p>
                                        <Box sx={{ minWidth: 350, mt: 3 }}>
                                            <FormControl fullWidth>
                                                <InputLabel variant="standard" htmlFor="uncontrolled-native" required>
                                                    Final approver                                </InputLabel>
                                                <NativeSelect
                                                    name="Finalapprover"
                                                    defaultValue={Finalapprover}
                                                    onChange={(e) => setFinalapprover(e.target.value)}
                                                >
                                                    <option>Select</option>
                                                    {data3[0].approver.map((item) =>
                                                        <option value={item.name}>{item.name}</option>
                                                    )}
                                                </NativeSelect>
                                            </FormControl>
                                        </Box>
                                        <p>{Error.Finalapprover}</p>
                                        <Box sx={{ minWidth: 350, mt: 1 }}>Attachments
                                            <TextField fullWidth id="outlined-basic" variant="outlined" type="file" name="source" />
                                        </Box>
                                    </div>
                                </div>

                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={(e) => { updateObs(dataId, Type, ProcessStage, Problem, Issue, FailureType, PartNo, ReworkHrs, RCA, Resolutionowner, RCAValidator, Finalapprover) }}>Update</Button>
                        </DialogActions>
                    </form>
                </Dialog>
                <table>
                    <thead>
                        <tr>
                            {/* <th>Check</th> */}
                            <th style={{ width: '20px' }}>NCR No</th>
                            <th>Type</th>
                            <th>Problem</th>
                            <th>Part No</th>
                            <th>Process Stage</th>
                            <th>Rework Hrs</th>
                            <th>Failure type</th>
                            <th>Issue Desc</th>
                            <th>RCA</th>
                            <th>Creator</th>
                            <th>Resolution owner</th>
                            <th>Rca Validator</th>
                            <th>Final approver</th>
                            <th>Actions</th>
                            {/* <th>Edit</th> */}
                            {/* <th>Delete</th> */}
                            {/* <th>Submit</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {data[0].ncr.map((item, index) =>

                            <tr key={index}>
                                <td style={{ width: '20px' }}>NCR00{index + 1}</td>
                                <td>{item.Type}</td>
                                <td>{item.Problem}</td>
                                <td>{item.PartNo}</td>
                                <td>{item.ProcessStage}</td>
                                <td>{item.ReworkHrs}</td>
                                <td>{item.FailureType}</td>
                                <td>{item.Issue}</td>
                                <td>{item.RCA}</td>
                                <td>{item.Creator}</td>
                                <td>{item.Resolutionowner}</td>
                                <td>{item.RCAValidator}</td>
                                <td>{item.Finalapprover}</td>
                                {localStorage.getItem("isAdmin") === "true" ? (<div style={{ display: 'flex' }}>

                                    <IconButton aria-label="edit" size="large" onClick={(e) => { getncrid(item._id, item.Type, item.ProcessStage, item.Problem, item.Issue, item.FailureType, item.PartNo, item.ReworkHrs, item.RCA, item.Resolutionowner, item.RCAValidator, item.Finalapprover) }}>
                                        <Edit
                                    
                                            fontSize="inherit" sx={{ color: '#4cbb17' }} />
                                    </IconButton>
                                    <IconButton aria-label="delete" size="large" onClick={(id) => handleDelete(item._id)} >
                                        <DeleteIcon
                                           
                                            fontSize="inherit" sx={{ color: 'red' }} />
                                    </IconButton>
                                    <IconButton aria-label="delete" size="large" onClick={(e) => getIdforSubmit(item._id, item.Type, item.ProcessStage, item.Problem, item.Issue, item.FailureType, item.PartNo, item.ReworkHrs, item.RCA, item.Resolutionowner, item.RCAValidator, item.Finalapprover)}>
                                        <DoneAllIcon  color="success" variant="contained" >Submit</DoneAllIcon>
                                    </IconButton>

                                </div>) : (localStorage.getItem("id") === item.CreatorId ? (<td>
                                    <div style={{ display: 'flex' }}>

                                        <IconButton aria-label="edit" size="large" onClick={(e) => { getncrid(item._id, item.Type, item.ProcessStage, item.Problem, item.Issue, item.FailureType, item.PartNo, item.ReworkHrs, item.RCA, item.Resolutionowner, item.RCAValidator, item.Finalapprover) }}>
                                            <Edit
                                               
                                                fontSize="inherit" sx={{ color: '#4cbb17' }} />
                                        </IconButton>
                                        <IconButton aria-label="delete" size="large" onClick={(id) => handleDelete(item._id)} >
                                            <DeleteIcon
                                               
                                                fontSize="inherit" sx={{ color: 'red' }} />
                                        </IconButton>
                                        <IconButton aria-label="delete" size="large" onClick={(e) => getIdforSubmit(item._id, item.Type, item.ProcessStage, item.Problem, item.Issue, item.FailureType, item.PartNo, item.ReworkHrs, item.RCA, item.Resolutionowner, item.RCAValidator, item.Finalapprover)}>
                                            <DoneAllIcon color="success" variant="contained" >Submit</DoneAllIcon>
                                        </IconButton>

                                    </div>
                                </td>) : (<td style={{ width: '20px' }}>NA</td>))}
                            </tr>
                        )}
                    </tbody>
                </table>
                <Dialog
                    open={openAL}
                    onClose={handleclosefinalAlert}
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Are you sure you want to submit?"}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={handleclosefinalAlert}>NO</Button>
                        <Button onClick={(e) => submitNcrfinal(Type, ProcessStage, Problem, Issue, FailureType, PartNo, ReworkHrs, RCA, Resolutionowner, RCAValidator, Finalapprover)} autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
}

export default NcrTable




