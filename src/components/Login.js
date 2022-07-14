//import React, {useState} from 'react';
import React,{ useRef, useState, useEffect,Component } from 'react';
import { InputText } from 'primereact/inputtext';
import {Button} from "primereact/button";

import {useLocation} from "react-router-dom";
import {history} from 'history';
import { useHistory } from "react-router-dom"

//import { useNavigate } from "react-router-dom";
import useAuth from '../hooks/useAuth';
//import { Link, useNavigate, useLocation } from 'react-router-dom';

import axios from '../api/axios';
const LOGIN_URL = '/auth/iniciarSesion';


const Login = () =>{
   // const { setAuth } = useAuth();

    // const navigate = useNavigate();
    let history = useHistory()
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState("");
    /*const [user, setUser] = useState({
        id: "",
        displayName: "",
        role: ""});*/
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const[details,setDetails]= useState({usernameOrEmail:"",password:""});
    const submitHandler = async e => {

        e.preventDefault();
        //Login(details);
        try {

            console.log(LOGIN_URL);
            console.log(user);
            console.log(pwd);
            let _user = { ...user };
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({'usuario': user,'password': pwd}),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: false
                }
            );
            console.log(response);
           // console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.tokenDeAcceso;
            sessionStorage.setItem('token', JSON.stringify(accessToken));
           // const roles = response?.data?.roles;
            const users = (response?.data?.user);

            setUser({
                id: users[0].id,
                displayName: users[0].displayName,
                role:users[0].role,
            })
            localStorage.setItem('userName',users[0].displayName);
            //_user.id = users[0].id;
            console.log(users[0].id);
         //   setUser(_user);
           //setAuth({user, pwd,accessToken,users});
           // setUsers =
           // setUser('');
           // setPwd('');
           //  navigate(from, {replace: true});
          //  history.push(from);
            console.log("ingreso a link");
            history.push('/');
            console.log("after a link");
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
           // errRef.current.focus();
        }
    }
    return (
        <form onSubmit={submitHandler}>
            <div className="flex align-items-center py-8 justify-content-center">
                <div className="surface-card p-4 shadow-2 border-round w-full lg:w-2">
                    <div className="text-center ">
                        <img src="assets/layout/images/logopge.png" alt="hyper" height={150} className="mb-3" />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-900 font-medium mb-2">Usuario</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            className="w-full mb-3"
                            required
                        />
                        <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            className="w-full mb-3"
                            required
                        />

                    </div>
                    <div>
                        <Button label="INGRESAR" icon="pi pi-lock" className="p-button-danger w-full" />
                    </div>
                </div>
            </div>
        </form>
    )
}
export default Login
