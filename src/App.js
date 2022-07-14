import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import {Route, useHistory, useLocation} from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { AppTopbar } from './AppTopbar';
import { AppFooter } from './AppFooter';
import { AppMenu } from './AppMenu';
import { AppConfig } from './AppConfig';

import Dashboard from './components/Dashboard';

import Crud from './pages/Crud';
import Usuarios from './pages/Usuarios';
import Rol from './pages/Rol';

import PrimeReact from 'primereact/api';
import { Tooltip } from 'primereact/tooltip';



import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import './assets/demo/flags/flags.css';
import './assets/demo/Demos.scss';
import './assets/layout/layout.scss';
import './App.scss';
import Login from "./components/Login";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import swal from 'sweetalert';
import Menu from "./pages/Menu";
import Aplicacion from "./pages/Aplicacion";
import Persona from "./pages/Persona";
import useUser from "./components/Login";


const App = () => {
    let history = useHistory()
    const [layoutMode, setLayoutMode] = useState('static');
    const [layoutColorMode, setLayoutColorMode] = useState('light')
    const [inputStyle, setInputStyle] = useState('outlined');
    const [ripple, setRipple] = useState(true);
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
    const copyTooltipRef = useRef();
    const location = useLocation();
  //  const useUse = useUser();

    const [error, setError] = useState("");

    const [usernameOrEmail, setUsernameOrEmail] = useState();
    const [password, setPassword] = useState();


   // const Login= details=> {
        //console.log(details);
       /* const response = fetch('http://10.10.2.121:8090/api/auth/iniciarSesion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(details)
        }).then(data => data.json())
        const objeto = () => {
            response.then((a) => {
                if (a.tokenDeAcceso) {
                    console.log("ingreso");
                    setUser({
                        id: a.id,
                        displayName: a.displayName,
                        role:a.role,
                    })
                } else {
                    setError("Usuario y Password incorrectos")
                    console.log("no ingreso");
                }
            });
        }
        objeto();

        setUser({
            id: "1",
            displayName: "alex",
            role:"Administrador",
        })*/
  // }

    PrimeReact.ripple = true;

    let menuClick = false;
    let mobileTopbarMenuClick = false;

    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
    }, [mobileMenuActive]);

    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    }

    const onRipple = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value)
    }

    const onLayoutModeChange = (mode) => {
        setLayoutMode(mode)
    }

    const onColorModeChange = (mode) => {
        setLayoutColorMode(mode)
    }

    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }

        if (!mobileTopbarMenuClick) {
            setMobileTopbarMenuActive(false);
        }

        mobileTopbarMenuClick = false;
        menuClick = false;
    }
    const onCloseClick = (event) =>{
      //  console.log("close");
        sessionStorage.removeItem("token");
        localStorage.removeItem("userName");
        history.push('/');
    }
    const onToggleMenuClick = (event) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutMode === 'overlay') {
                if (mobileMenuActive === true) {
                    setOverlayMenuActive(true);
                }

                setOverlayMenuActive((prevState) => !prevState);
                setMobileMenuActive(false);
            }
            else if (layoutMode === 'static') {
                setStaticMenuInactive((prevState) => !prevState);
            }
        }
        else {
            setMobileMenuActive((prevState) => !prevState);
        }

        event.preventDefault();
    }

    const onSidebarClick = () => {
        menuClick = true;
    }

    const onMobileTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        setMobileTopbarMenuActive((prevState) => !prevState);
        event.preventDefault();
    }

    const onMobileSubTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        event.preventDefault();
    }

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    }
    const isDesktop = () => {
        return window.innerWidth >= 992;
    }

    const menu = [
        {
            label: 'Módulos', icon: 'pi pi-fw pi-clone',
            items: [
                { label: 'Aplicacion', icon: 'pi pi-fw pi-desktop', to: '/aplicacion' },
                { label: 'Rol', icon: 'pi pi-fw pi-th-large', to: '/rol' },
                { label: 'Menu', icon: 'pi pi-fw pi-list', to: '/menu' },
                { label: 'Persona', icon: 'pi pi-fw pi-user', to: '/persona' },
                { label: 'Usuarios', icon: 'pi pi-fw pi-users', to: '/usuarios' },



                /*    { label: 'Crud', icon: 'pi pi-fw pi-user-edit', to: '/crud' }
                { label: 'Timeline', icon: 'pi pi-fw pi-calendar', to: '/timeline' },
                  { label: 'Empty', icon: 'pi pi-fw pi-circle-off', to: '/empty' }*/
            ]
        },
    ];

    const addClass = (element, className) => {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    const removeClass = (element, className) => {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    const wrapperClass = classNames('layout-wrapper', {
        'layout-overlay': layoutMode === 'overlay',
        'layout-static': layoutMode === 'static',
        'layout-static-sidebar-inactive': staticMenuInactive && layoutMode === 'static',
        'layout-overlay-sidebar-active': overlayMenuActive && layoutMode === 'overlay',
        'layout-mobile-sidebar-active': mobileMenuActive,
        'p-input-filled': inputStyle === 'filled',
        'p-ripple-disabled': ripple === false,
        'layout-theme-light': layoutColorMode === 'light'
    });
    //const [user, setUser] = useUser();

   // const [token, setToken] = useState();

    //console.log(this.useState(user));
    const token_key = sessionStorage.getItem("token");
    console.log(token_key);
    if(token_key == null) {
        console.log("Login");
        return <Login  />
        //<Login  Login ={Login} error={error}/>
   }
    const userName = localStorage.getItem("userName");
    return (
        <div className="App">
    <div className={wrapperClass} onClick={onWrapperClick}>
        <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />

        <AppTopbar onCloseClick ={onCloseClick} onToggleMenuClick={onToggleMenuClick} layoutColorMode={layoutColorMode}
                   mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick} />

        <div className="layout-sidebar " onClick={onSidebarClick}>
          <div className="text-center"> <img src='assets/layout/images/user.png' alt="Logo" height="40" className="mr-2" /> </div>
            <div className="text-center"> {userName} </div>
            <div>&nbsp;</div>
            <AppMenu model={menu} onMenuItemClick={onMenuItemClick} layoutColorMode={layoutColorMode} />
        </div>

        <div className="layout-main-container">
            <div className="layout-main">
                <Route path="/" exact render={() => <Dashboard colorMode={layoutColorMode} location={location} />} />
                <Route path="/aplicacion" component={Aplicacion} />
                <Route path="/rol" component={Rol} />
                <Route path="/crud" component={Crud} />
                <Route path="/usuarios" component={Usuarios} />

                <Route path="/menu" component={Menu} />
                <Route path="/persona" component={Persona} />

            </div>
        </div>

        <AppConfig rippleEffect={ripple} onRippleEffect={onRipple} inputStyle={inputStyle} onInputStyleChange={onInputStyleChange}
                   layoutMode={layoutMode} onLayoutModeChange={onLayoutModeChange} layoutColorMode={layoutColorMode} onColorModeChange={onColorModeChange} />

        <CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={mobileMenuActive} unmountOnExit>
            <div className="layout-mask p-component-overlay"></div>
        </CSSTransition>

    </div>


        </div>
    );

}

export default App;
