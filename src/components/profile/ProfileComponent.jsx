import React, { useState, useEffect } from "react"
import "./ProfileComponent.css"
import UpdateProfile from "../updateProfile/UpdateProfile"
import { FaCamera } from "react-icons/fa"
import { ref, child, get } from "firebase/database"
import { database } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const ProfileComponent = () => {
const [isName, setName] = useState()
const [isEmail, setEmail] = useState()
const [isImg, setImg] = useState("")
const [isData, setData] = useState()
const [isId, setId] = useState()

const navigate = useNavigate()

const authenticate = async () => {
    let storage = localStorage.getItem("accesstoken")
    if (storage === "" || storage === null){
      navigate("/")
    } else {
      let decode = jwtDecode(storage)
      const db = await get(child(ref(database),`${decode.user_id}/UserProfile`))
      setId(decode.user_id)
      setImg(db.val()?.imgProfile?.imgUrl)
      setName(db.val()?.nameProfile?.userName)
      setEmail(decode.email)
    }
}

const dataTable = async () => {
    try {
        const db = await get(child(ref(database),`${isId}/UserProfile`)) 
        const item = db.val() 
        setData(item)
        isData
    } catch (error) {
        error;
    }
}

useEffect (() => {
    authenticate()
    dataTable()
},[dataTable(), authenticate])

  return (
    <div className="profile">
        <div className="profile__content">
            <div className="profile__picture">
                    <div className="d-flex">
                        <img className="profile-img" src={isImg} alt="profile"/>
                        <div className="edit-icon d-flex justify-content-end">
                            <UpdateProfile text={<FaCamera />} />
                        </div>
                    </div>
            </div>
            <div className="profile__desc">
                <div className="profile__email">
                    <h2>Your Email : {isEmail}</h2>
                </div>
                <div className="profile__display-name">
                    <p>Your Name : {isName}</p>
                    <br />
                    <div className="ms-2">
                    <UpdateProfile text="Edit" />
                    </div>
                    
                </div>
                <div className="profile__achievements">
                    <div className="profile__achievements-head">
                    <h4>Achievements</h4>
                    </div>
                    <div className="profile__achievements-emblem">
                        <img className="" src="https://res.cloudinary.com/dtochq6ko/image/upload/v1674526978/Achievment/Epic_xqjxr7.png" alt="dummy" />
                        <img className="ms-3" src="https://res.cloudinary.com/dtochq6ko/image/upload/v1674526840/Achievment/LegendRanked_izgbjb.png" alt="dummy" />
                        <img className="ms-3" src="https://res.cloudinary.com/dtochq6ko/image/upload/v1674526841/Achievment/Mitik_v7lsmn.png" alt="dummy" />
                        <img className="ms-3" src="https://res.cloudinary.com/dtochq6ko/image/upload/v1674526838/Achievment/MitikalGlory_cdzuxt.png" alt="dummy" />
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileComponent
