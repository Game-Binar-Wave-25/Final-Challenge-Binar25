import React, { useState } from "react"
import authFirebase from "../../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
// import ModalFailed from "./ModalFailed"

export default function ModalSignup() {
    const [state, setState] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState(false)
    const [isSpam, setSpam] = useState(0)

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setState((prevProps) => ({
            ...prevProps,
            [name]: value
        }));
    };
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault();
        setSpam(isSpam+1)
        if (isSpam > 3 ) {
           return alert("Please STOP spamm the button")
        }
        createUserWithEmailAndPassword(authFirebase, state.email, state.password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            user
            navigate(0)
        })
        .catch((error) => {
            error
            setError(true)
            // ..
        });
    };
    return (
        <>
            <div className="modal fade fw-bold" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="d-flex justify-content-end">
                            <button type="button" className="btn text-white d-flex" data-bs-dismiss="modal" aria-label="Close">X</button>
                        </div>
                        <div className="modal-body">
                            <h1 className="text-white mb-4 mt-3 text-title">Register</h1>
                            <form className="pe-5 ps-5" onSubmit={handleSubmit}>
                                <fieldset>
                                    <div>
                                        <input name="email" value={state.email} onChange={handleInputChange} type="email" className="form-control" placeholder="Email" required/>
                                    </div>
                                    <div>
                                        <input name="password" value={state.password} onChange={handleInputChange} type="password" className="form-control mt-2" placeholder="Password" required/>
                                    </div>
                                </fieldset>
                                <div className="mx-3 mt-3">
                                    <button type="submit" className="modal-button btn btn-outline-warning py-2 fw-bold">Register</button>
                                </div>
                                {error &&
                                    <>
                                        <br />
                                        <div className="alert alert-danger d-flex align-items-center" role="alert" timeout={5000}>
                                            {/* <svg className="bi flex-shrink-0 me-2" width={24} height={24} role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill" /></svg> */}
                                            <div>
                                                There's Something Wrong, Please try again
                                            </div>
                                        </div>
                                    </>
                                }
                            </form>
                            <div className="form-check py-3">
                                <div className="input-ceklis">
                                    <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" required/>
                                </div>
                                <label className="form-check-label text-white fw-bold" htmlFor="defaultCheck1">
                                    I accept the Terms & Conditions and Privacy
                                </label>
                            </div>
                            <div className="d-flex justify-content-center">
                                <h6 className="text-white">Already registered?</h6>
                                <a className="text-link ms-2 fw-bold" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">
                                    Login
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}