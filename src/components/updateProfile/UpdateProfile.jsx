import React, { useState, useEffect } from "react"
import "./UpdateProfile.css"
import { useNavigate } from "react-router-dom"
import { ref, set } from "firebase/database"
import { database } from "../../services/firebase";
import jwtDecode from "jwt-decode";

export default function UpdateProfile(props) {
    const [isImg, setImg] = useState("")
    const [isName, setName] = useState("")
    const [userId, setUserId] = useState("")

    const navigate = useNavigate()
    const authenticate = async () => {
        let storage = localStorage.getItem("accesstoken")
        if (storage === "" || storage === null){
          navigate("/")
        } else {
          let decode = jwtDecode(storage)
          setUserId(decode.user_id)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        set(ref(database,`${userId}/UserProfile/nameProfile`), { userName: isName })
        // console.log("ganti nama jadi dong");
    }
    const handleImageChange = async (e) => {
        const image = e.target.files[0]
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "profileIMG")
        data.append("cloud_name", "dtochq6ko")

        await fetch("https://api.cloudinary.com/v1_1/dtochq6ko/image/upload", {
        method: "post",
        body: data
        })
        .then((res) => res.json())
        .then((data) => { 
            // console.log(data.url);
            set(ref(database,`${userId}/UserProfile/imgProfile`), {imgUrl: data.url })
            setImg(data.url)
        }).catch((err) => {
            alert(err);
        })    
    }
    useEffect (() => {
        authenticate()
        }, [])
    return (
        <>
            <div className="update-profile">
            <button type="button" className="button-edit-profile btn btn-outline-primary fw-bold" data-bs-toggle="modal" data-bs-target="#staticBackdrop3">
                {props.text}
            </button>

            <div className="modal fade" id="staticBackdrop3" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body text-white">
                            <div className="d-flex flex-row justify-content-end">
                                <button type="button" className="btn-button-close btn text-white d-flex" data-bs-dismiss="modal" aria-label="Close">X</button>
                            </div>
                                <form onSubmit={handleSubmit} className="p-4 d-flex flex-column justify-content-center align-items-center">
                                    <div className="w-100 mb-3 form-title d-flex flex-row justify-content-center align-items-center ">
                                        <h5>Your name and profile picture in Binar Games</h5>
                                    </div>
                                    <div className="form-top mb-4 d-flex flex-row justify-content-center align-items-center">
                                        <img src={isImg} alt="profie" />
                                        <div className="d-flex flex-column justify-content-center align-items-start m-3 ms-4">
                                            <p className="para mb-3">Add a photo for your responses, comments, and reviews</p>
                                            <input className="input-image mb-3"
                                            type="file"
                                            onChange={(e) => {
                                                handleImageChange(e)
                                            }} />
                                            {/* <button onClick={deleteImage}>Remove</button> */}
                                        </div>
                                    </div>
                                    <input value={isName} onChange={(e) => setName(e.target.value)} className="mb-3" type="text" placeholder="How should we display your name?" />
                                        <p className="para mb-4">Your display name is given in your reviews, comments, ratings, and responses. If you change it, the new name will also apply to your previously posted content.</p>
                                    <button type="submit" className="modal-button btn btn-outline-warning fw-bold" data-bs-dismiss="modal" aria-label="Close">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
