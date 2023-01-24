import React, {useEffect, useState} from "react"
import { ref, set, child, get } from "firebase/database"
import { database } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export default function VideoPlayer() {
    const [isVideo, setVideo] = useState("")
    const [isUser, setUser] = useState("")
    const [isUserId, setUserId] = useState("")
    const [isData, setData] = useState(false)
    
    const navigate = useNavigate()
    const authenticate = async () => {
        let storage = localStorage.getItem("accesstoken")
        if (storage === "" || storage === null){
          navigate("/")
        } else {
          let decode = jwtDecode(storage)
          const db = await get(child(ref(database),`${decode.user_id}/UserProfile/vidProfile`))
          setUser(decode.email)
          setUserId(decode.user_id)
          setVideo(db.val()?.vidUrl)
        }
      }

    const dataTable = async () => {
        try {
            const db = await get(child(ref(database),`${isUser}/UserProfile/vidProfile`))
            const video = db.val()
            setVideo(video?.vidUrl)
        } catch (error) {
            console.log(error);
        }
    }
    const submitVideo = (e) => {
        const video = e.target.files[0]
        console.log(video);
        const data = new FormData()
        data.append("file", video)
        data.append("upload_preset", "profileVID")
        data.append("cloud_name", "dtochq6ko")

        fetch("https://api.cloudinary.com/v1_1/dtochq6ko/video/upload", {
            method: "post",
            body: data
        })
            .then((res) => res.json())
            .then((data) => {
                set(ref(database,`${isUserId}/UserProfile/vidProfile`), { vidUrl : data.url })
                console.log(data.url);
                setData(true)
            }).catch((err) => {
                console.log(err);
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isData !== false) {
            navigate(0)
        }else {
            alert("Sabar masih LOADING")
        }
    }
    useEffect(()=>{
        authenticate()
        dataTable()
    },[dataTable])
    
    return (
        <>
            <div className="container">
                <div className="d-flex justify-content-center">
                    <h2>Video Upload</h2>
                </div>
                <div className="container input-group d-flex justify-content-center">
                    <form className="mb-2" onSubmit={handleSubmit}>
                        <input 
                            type="file"
                            className="form-control" 
                            placeholder="Upload your file" 
                            onChange={(e) => {submitVideo(e)}}/>
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary mt-3" type="submit">Upload</button>
                        </div>
                    </form>
                    {isVideo &&
                     <video
                        width={360}
                        height={330}
                        muted
                        autoPlay
                        loop>
                             <source src={isVideo} type="video/mp4"/>
                    </video>
                    }
                </div>
            </div>
        </>
    )
}