import React from "react"
import Failed from "./3567801.jpg"

export default function ModalFailed() {
    
    return(
        <>
            <div className="modal fade fw-bold" id="staticBackdrop4" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="d-flex justify-content-end">
                            <button type="button" className="btn text-white d-flex" data-bs-dismiss="modal" aria-label="Close">X</button>
                        </div>
                        <div className="modal-body text-white">
                            <div className="container-fluid">
                                <div className="container">
                                    <img className="image-failed" src={Failed}/>
                                </div>
                                <h1 className="text-title mt-3">Failed</h1>
                                <h6 className="mt-2">Seems like your email and password do not match. Please check one again</h6>
                            </div>
                        </div>
                        <div className=" d-flex row justify-content-center mb-4">
                            <div>
                                <button 
                                    type="button" 
                                    className="modal-edit btn btn-outline-warning fw-bold" 
                                    data-bs-toggle="modal" 
                                    data-bs-target="#staticBackdrop4"
                                >
                                    Try again
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}