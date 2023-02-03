import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import './Modals.css'
const TaskModal = ({
  setModal
}) => {
  const dispatch = useDispatch();

  const { singleData } = useSelector((state) => state.taskReducer);
  const taskdata = { ...singleData };

  // let navigate = useNavigate();
  return (
    <div id="myModal" className="modal">
      {console.log(taskdata)}
      <div className="modal-content">
        <span
          className="close"
          onClick={() => {
            setModal(false);
          }}
        >
          &times;
        </span>
        <div style={{ display: 'flex', alignItem: 'center', justifyContent: 'center', marginTop: '2rem' }}>
          <Typography gutterBottom variant="h6" component="div">
            Resolution Owner Approver for {taskdata.data.objectid}
          </Typography>
        </div>
        <Divider sx={{ borderWidth: '1px', borderColor: 'black' }} />
        <div style={{ display: 'flex', marginTop: '2rem' }}>
          <div>
            <div style={{ display: 'flex' }}>
              <Typography fontWeight={600} gutterBottom variant="h9" component="div">
                Object ID:
              </Typography>
              <Typography marginLeft={'4.2rem'} gutterBottom variant="h9" component="div" color={'blue'} style={{ cursor: 'pointer' }}>
                {taskdata.data.objectid}
              </Typography>
            </div>
            <div style={{ display: 'flex' }}>
              <Typography fontWeight={600} gutterBottom variant="h9" component="div">
                Assigned Date:
              </Typography>
              <Typography marginLeft={'1.3rem'} gutterBottom variant="h9" component="div">
                Type
              </Typography>
            </div>
            <div style={{ display: 'flex' }}>
              <Typography fontWeight={600} gutterBottom variant="h9" component="div">
                Creator:
              </Typography>
              <Typography marginLeft={'4.8rem'} gutterBottom variant="h9" component="div">
              {taskdata.data.creator}
              </Typography>
            </div>
            <div style={{ display: 'flex' }}>
              <Typography fontWeight={600} gutterBottom variant="h9" component="div">
                Created on:
              </Typography>
              <Typography marginLeft={'3rem'} gutterBottom variant="h9" component="div">
                18 Jan 2023
              </Typography>
            </div>
            <div style={{ display: 'flex' }}>
              <Typography fontWeight={600} gutterBottom variant="h9" component="div">
                Task Details:
              </Typography>
              <Typography marginLeft={'2.5rem'} gutterBottom variant="h9" component="div">
                Server Department
              </Typography>
            </div>
          </div>
          <div style={{ borderLeft: '2px solid black', height: '100', marginLeft: '5rem' }}></div>
          <div style={{ marginLeft: '1.5rem' }}>
            <Typography fontWeight={600} gutterBottom variant="h9" component="div">
              Comment:
            </Typography>
            <textarea
              style={{ width: "400px", minHeight: '100px',padding:'10px'}}
              type="text"
              placeholder="Comment"
            ></textarea>
            <div style={{ display: "flex",justifyContent:'right'}}>
              <button className="bst-btn-delete">Reject
              </button>
              <button className="bst-btn-update">Approve
              </button>
            </div>

          </div>
        </div >
      </div >
    </div >
  );
};

export default TaskModal;