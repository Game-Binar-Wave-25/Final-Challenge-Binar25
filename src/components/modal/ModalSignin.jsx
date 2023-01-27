import React, { useState } from "react"
import authFirebase from "../../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function ModalSignin() {
    const [state, setState] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState(false)
    const [isSpam, setSpam] = useState(false)
    const navigate = useNavigate()

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setState((prevProps) => ({
            ...prevProps,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSpam(isSpam+1)
        if (isSpam > 3 ) {
           return alert("Please STOP spamm the button")
        }
        signInWithEmailAndPassword(authFirebase, state.email, state.password)
            .then((userCredential) => {
                const jwtToken = userCredential.user.accessToken
                localStorage.setItem("accesstoken", jwtToken)
                // navigate("/",{replace: true})
                navigate(0)
            })
            .catch(() => {
                setError(" ")
            });
    };
    return (
        <>
            <div className="modal fade fw-bold" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="d-flex justify-content-end">
                            <button type="button" className="btn text-white d-flex" data-bs-dismiss="modal" aria-label="Close">X</button>
                        </div>
                        <div className="modal-body">
                            <h1 className="text-white mb-4 mt-3 text-title">Login</h1>
                            <div className="d-flex row justify-content-center mx-3">
                            </div>
                            <form className="pe-5 ps-5" onSubmit={handleSubmit}>
                                <fieldset>
                                    <div>
                                        <input required name="email" value={state.email} onChange={handleInputChange} type="email" className="form-control" placeholder="Email" />
                                    </div>
                                    <div>
                                        <input required name="password" value={state.password} onChange={handleInputChange} type="password" className="form-control mt-2" placeholder="Password" />
                                    </div>
                                </fieldset>
                                <div className="mx-3 mt-3">
                                    <button type="submit" className="modal-button btn btn-outline-warning py-2 fw-bold">Login</button>
                                </div>
                                {error &&
                                    <>
                                        <br />
                                        <div className="alert alert-danger d-flex align-items-center" role="alert" timeout={2000}>
                                            {/* <svg className="bi flex-shrink-0 me-2" width={24} height={24} role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill" /></svg> */}
                                            <div>
                                                there is error!!
                                            </div>
                                        </div>
                                    </>
                                }
                            </form>
                            <div className="text-white py-3">
                                <a className="forget-password" href="">
                                    i forget my password
                                </a>
                            </div>
                            <div className="d-flex justify-content-center">
                                <h6 className="text-white">No account yet?</h6>
                                <a
                                    className="text-link ms-2"
                                    data-bs-toggle="modal"
                                    data-bs-target="#staticBackdrop2"
                                >
                                    Register Now!
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}