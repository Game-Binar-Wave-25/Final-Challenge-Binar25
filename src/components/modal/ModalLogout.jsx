import React from "react"
import { useNavigate } from "react-router-dom";

export default function ModalFailed() {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.clear();
        navigate(0)
    }
    return(
        <>
            <div className="modal fade fw-bold" id="staticBackdrop5" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="d-flex justify-content-end">
                            <button type="button" className="btn text-white d-flex" data-bs-dismiss="modal" aria-label="Close">X</button>
                        </div>
                        <div className="modal-body text-white">
                            <div className="container-fluid">
                                <h1 className="text-title mt-3">Logout</h1>
                                <h6 className="mt-2">Are you really want QUIT ?</h6>
                            </div>
                        </div>
                        <div className=" d-flex row justify-content-center mb-4">
                            <div>
                                <button 
                                    type="submit" 
                                    className="modal-edit btn btn-outline-warning fw-bold" 
                                    data-bs-toggle="modal" 
                                    data-bs-target="#staticBackdrop5"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}