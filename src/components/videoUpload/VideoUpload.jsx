import React, {useEffect, useState} from "react"
import { ref, set, child, get } from "firebase/database"
import { database } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export default function VideoPlayer() {
    const [isVideo, setVideo] = useState("")
    const [isUser, setUser] = useState("")
    const [isUserId, setUserId] = useState("")
    const [isLoading, setLoading] = useState(false)
    
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
            const video = db?.val()
            setVideo(video?.vidUrl)
        } catch (error) {
            error
        }
    }
    const submitVideo = (e) => {
        setLoading(true)
        const video = e.target.files[0]
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
                setLoading(false)
            }).catch((err) => {
                err
                setLoading(false)
            })
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
                    <form className="mb-2">
                        <input 
                            type="file"
                            className="form-control" 
                            placeholder="Upload your file" 
                            onChange={(e) => {submitVideo(e)}}/>
                        <div className="input-group-append">
                            {isLoading ? 
                            <p>waiting for uploading</p>:
                            <p>upload yuor video</p>
                            }
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