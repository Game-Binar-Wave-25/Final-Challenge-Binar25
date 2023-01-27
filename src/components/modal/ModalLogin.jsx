import React, { useEffect, useState } from "react"
import Binar from "./binar.png"
import "./modal.css"

export default function ModalLogin() {
    const [isLogin, setLogin] = useState()
    // const [isError, setError] = useState(true)
    const Authen = () => {
        let storage = localStorage.getItem("accesstoken")
        if (storage === "" || storage === null){
            setLogin(false)
        } else{
            setLogin(true)
        }
    }
    useEffect(() =>{
        Authen()
    })
    return(
        <>
        { isLogin ? 
        <button type="button" className="login-button btn btn-outline-secondary fw-bold" data-bs-toggle="modal" data-bs-target="#staticBackdrop5"> 
                Logout
        </button> :
        <button type="button" className="login-button btn btn-outline-secondary fw-bold" data-bs-toggle="modal" data-bs-target="#staticBackdrop"> 
                Login
        </button>
        }
            
            <div className="modal fade fw-bold" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="d-flex justify-content-end">
                            <button type="button" className="btn text-white d-flex" data-bs-dismiss="modal" aria-label="Close">X</button>
                        </div>
                        <div className="modal-body text-white">
                            <div className="container-fluid">
                                <div className="container">
                                    <img className="modal-logo" src={Binar}/>
                                </div>
                                <h1 className="text-title">Join the fun!</h1>
                                <h6 className="mt-2">Create a free account to save your progress, add games to favorites and build your profile!</h6>
                            </div>
                        </div>
                        <div className=" d-flex row justify-content-center">
                            <div>
                                <button 
                                    type="button" 
                                    className="modal-edit btn btn-outline-warning fw-bold" 
                                    data-bs-toggle="modal" 
                                    data-bs-target="#staticBackdrop2"
                                >
                                    Register
                                </button>
                            </div>
                            <div>
                                <button
                                    type="button" 
                                    className="modal-edit btn btn-outline-warning mt-3 mb-4 fw-bold"
                                    data-bs-toggle="modal" 
                                    data-bs-target="#staticBackdrop1"
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}