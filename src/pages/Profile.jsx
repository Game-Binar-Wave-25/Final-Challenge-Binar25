import React from "react"
import ProfileComponent from "../components/profile/ProfileComponent"
import Button from "../components/button/ButtonDownload"
import { VideoUpload } from "../components"
export default function Profile() {
    return(
        <>
            <div className="container-fluid mt-4">
                <ProfileComponent />
            </div>
            <div className="container">
                <div className="row mx-3 my-5">
                    <div className="col-6">
                        <div className="container border rounded-3">
                            <div className="input-group mt-2 mb-3">
                                <VideoUpload/>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="container border rounded-3" style={{"height":"80px",}}>
                            <div className="mt-3">
                                <Button/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}