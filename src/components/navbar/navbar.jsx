import React, { useEffect, useState } from "react"
import logo from "./binar.png"
import "./navbar.css"
import { Link, NavLink } from "react-router-dom"
import ModalLogin from "../modal/ModalLogin"
import ModalSignin from "../modal/ModalSignin"
import ModalSignup from "../modal/ModalSignup"
import ModalFailed from "../modal/ModalFailed"
import ModalLogout from "../modal/ModalLogout"

export default function Navbar() {
    const activeLink = ({isActive}) => (isActive ?  "active nav-link fontNav2 me-2" : "nav-link fontNav2 me-2" )
    const [isUser, setUser] = useState()

    const Authen = () => {
        let storage = localStorage.getItem("accesstoken")
        if (storage === "" || storage === null){
            setUser(false)
        } else{
            setUser(true)
        }
    }
    useEffect(() =>{
        Authen()
    })
    return(
        <>
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid mx-5">
                <nav className="navbar">
                    <div className="container-fluid">
                        <Link className="navbar-brand fontNav" to="/">
                        Binar
                        <img src={logo} alt="LogoBinar" width="30" height="28" className="d-inline-block align-text-top me-1 ms-1"/>
                        Games
                        </Link>
                    </div>
                </nav>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className={activeLink} aria-current="page" to="/">Home</NavLink>
                        </li>                        
                            { isUser && 
                            <>
                                <li className="nav-item">
                                    <NavLink className={activeLink} aria-current="page" to="/profile">
                                        Profile
                                    </NavLink>
                                </li>
                            </>
                            }
                            { isUser && 
                            <>
                                <li className="nav-item">
                                    <NavLink className={activeLink} aria-current="page" to="/Gamedetails">
                                        Game
                                    </NavLink>
                                </li>
                            </>
                            }
                            { isUser && 
                            <>
                                <li className="nav-item">
                                    <NavLink className={activeLink} aria-current="page" to="/Leaderboard">
                                        Leaderboard
                                    </NavLink>
                                </li>
                            </>
                            }
                        </ul>
                        <div className="d-flex">
                            <ModalLogin/>
                            <ModalSignin />
                            <ModalSignup />
                            <ModalFailed/>
                            <ModalLogout/>
                        </div>
                </div>
            </div>
        </nav>
        </>
    )
}