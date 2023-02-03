import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./components/User/Login";
import PersonAdd from '@mui/icons-material/PersonAdd';
import Button from '@mui/material/Button';
import ManageUserModal from "./components/Modals/ManageUserModal";
import "./App.css"

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Dashboard from './components/User/Dashboard'

const App = () => {
  const { success, loading } = useSelector((state) => state.userReducer);
  const [modal1, setModal] = useState(false);
  const openManageModal = () => {
    setModal(true);
  };
  let navigate = useNavigate();
  const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  const [open, setOpen] = React.useState(false);
  const form = useRef();
  const handleClose = () => {
    setOpen(false);
  };
  const sendEmail = (event) => {
    event.preventDefault();

    emailjs.sendForm('service_elbxdb3', 'template_itvdifh', form.current, 'fBGpCPnteQiDkRODz')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  if (
    localStorage.getItem("token") &&
    localStorage.getItem("isAdmin") === "false"
  ) {
    return (
      <div className="app-td">
      <React.Fragment>
        <Dashboard></Dashboard>
      </React.Fragment>
    </div>
    );
  }
  if (
    localStorage.getItem("token") &&
    localStorage.getItem("isAdmin") === "true"
  ) {
    return (

      <div className="app-td">
        <React.Fragment>
          <Dashboard></Dashboard>
        </React.Fragment>
      </div>

    );
  }

  if (localStorage.getItem("isAdmin") === "true") {
    return <Login />;
  }
  if (!localStorage.getItem("token")) {
    return <Login />;
  }
};

export default App;
