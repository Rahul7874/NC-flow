import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import TextField from '@mui/material/TextField';
import "../Pages/Ncr.css"
import axios from "axios";
import { useState } from "react";
import NcrTable from "./NcrTable";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllNcrOptionsData } from "../../services/ncroptionServices";
import { PostNcrdata } from "../../services/ncrServices";
import { GetAllRO, GetAllValidator, GetAllApprover } from '../../services/roleServices';

const Ncr = () => {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    // const [data, setData] = useState([]);
    const [Error, Seterror] = useState({});
    const [isSubmit, SetIsSubmit] = useState(false)


    const dispatch = useDispatch();
    const { loading, data, skipCount } = useSelector(
        (state) => state.NcrOptionReducer
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

    const getadNCR = async () => {
        dispatch(GetAllNcrOptionsData())
        dispatch(GetAllRO("Resolution Owner"))
        dispatch(GetAllValidator("Validator"))
        dispatch(GetAllApprover("Approver"))
    };

    useEffect(() => {
        getadNCR();
    }, []);



    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);


    const wrongreload = () => {
        window.location.reload(false)

    }
    const [Ncr, setNcr] = useState({
        Type: "", ProcessStage: "",
        Problem: "", Issue: "", FailureType: "", PartNo: "",
        ReworkHrs: "", RCA: "", Resolutionowner: "", RCAValidator: "", Finalapprover: "", source: "",Creator:localStorage.getItem("fname")+" "+localStorage.getItem("lname") ,CreatorId:localStorage.getItem("id")
    })

    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value
        setNcr({ ...Ncr, [name]: value })

    }
    const submitHandler = (event) => {

        Seterror(validate(Ncr))
        SetIsSubmit(true)
        dispatch(PostNcrdata(Ncr))
        // window.location.href = "/createncr"
    }

    useEffect(() => {
        if (Object.keys(Error).length === 0 && isSubmit) {
            console.log(Error)
            handleClose()
        }
    }, [Error])


    const validate = (value) => {
        const errors = {}

        if (value.Type === "") {
            errors.Type = "Type is required!"
        }
        if (value.Problem === "") {
            errors.Problem = "Problem is required!"
        }
        if (value.ProcessStage === "") {
            errors.ProcessStage = "ProcessStage is required!"
        }
        if (value.Issue === "") {
            errors.Issue = "Issue description is required!"
        }
        if (value.FailureType === "") {
            errors.FailureType = "FailureType is required!"
        }
        if (value.PartNo === "") {
            errors.PartNo = "Part No is required!"
        }
        if (value.ReworkHrs === "") {
            errors.ReworkHrs = "Reworks hour is required!"
        }
        if (value.RCA === "") {
            errors.RCA = "RCA is required!"
        }
        if (value.Resolutionowner === "") {
            errors.Resolutionowner = "Resolution owner must be selected!"
        }
        if (value.RCAValidator === "") {
            errors.RCAValidator = "Rca validator is required!"
        }
        if (value.Finalapprover === "") {
            errors.Finalapprover = "Approver is required!"
        }
        return errors

    }
    if (loading) {
        return <div>Loading..</div>;
    }
    if (loading1) {
        return <div>Loading..</div>;
    }
    if (loading2) {
        return <div>Loading..</div>;
    }
    if (loading3) {
        return <div>Loading..</div>;
    }
    if (data.length == 0) {
        window.location.href = "/createncr"
    }
    else
        return (
            <div>
                <Button variant="contained" onClick={handleClickOpen('paper')} sx={{ mt: 2 }}>Create NCR</Button>
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
                            Create NCR
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
                                                    onChange={handleInputs}
                                                >
                                                    <option>Select</option>
                                                    {data[0].ncr.map((item) =>
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
                                                    onChange={handleInputs}
                                                >
                                                    <option>Select</option>
                                                    {data[0].ncr.map((item) =>
                                                        <option value={item.Problem}>{item.Problem}</option>
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
                                                    onChange={handleInputs}
                                                >
                                                    <option>Select</option>
                                                    {data[0].ncr.map((item) =>
                                                        <option value={item.ProcessStage}>{item.ProcessStage}</option>
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
                                                    onChange={handleInputs}
                                                >
                                                    <option>Select</option>
                                                    {data[0].ncr.map((item) =>
                                                        <option value={item.PartNo}>{item.PartNo}</option>
                                                    )}

                                                </NativeSelect>
                                            </FormControl>
                                        </Box>
                                        <p>{Error.PartNo}</p>
                                        <Box sx={{ minWidth: 350, mt: 3 }}>
                                            <TextField fullWidth id="outlined-basic" label="Rework Man-Hrs" variant="filled" type="number" required name="ReworkHrs" onChange={handleInputs} />

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
                                                onChange={handleInputs}
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
                                                    onChange={handleInputs}
                                                >
                                                    <option>Select</option>
                                                    {data[0].ncr.map((item) =>
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
                                                    onChange={handleInputs}
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
                                                    onChange={handleInputs}
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
                                                    onChange={handleInputs}
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
                                                    onChange={handleInputs}
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
                                            <TextField fullWidth id="outlined-basic" variant="outlined" type="file" name="source" onChange={handleInputs} />
                                        </Box>
                                    </div>
                                </div>

                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={submitHandler}>Create</Button>
                        </DialogActions>
                    </form>
                </Dialog>

                <NcrTable />
            </div>
        )
}

export default Ncr