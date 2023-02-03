import React from "react";
import jwt from 'jsonwebtoken'
import Login from "./User/Login";
import { useSelector } from "react-redux";


function AdminProtected(props) {
  const { Component } = props;
    
        if (localStorage.getItem('isAdmin')) {
            return <Component />;
        }
        else {
            return <Login></Login>
        }
}

export default AdminProtected;