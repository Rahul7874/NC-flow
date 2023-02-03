import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import PersonAdd from '@mui/icons-material/PersonAdd';
import People from '@mui/icons-material/People';
import Button from '@mui/material/Button';
import './Modals.css'
const ManageUserModal = ({
  setModal
}) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span
          className="close"
          onClick={() => {
            setModal(false);
          }}
        >
          &times;
        </span>
        <div style={{ marginTop: '3rem',display:"flex",justifyContent:'center'}}>
          <Button
            variant="contained"
            onClick={() => navigate("/userregistration")}
            style={{ width: '250px' }}
            startIcon={<PersonAdd />}
          >
            Register New User
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate("/manageuser")}
            style={{ width: '250px', marginLeft: '2rem' }}
            // onClick={() => openManageModal()}
            startIcon={<People />}
          >
            Manage User
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ManageUserModal;