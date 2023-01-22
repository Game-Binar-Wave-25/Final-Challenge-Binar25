import React, {useState} from "react"


export default function VideoPlayer() {
    const [image, setImage] = useState(" ")
    const [video, setVideo] = useState(" ")
    const [isData, setData] = useState(" ")
    console.log(isData);

    console.log(isData.url);
    const submitImage = () => {
        // console.log(files[0]);
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "profileIMG")
        data.append("cloud_name", "dtochq6ko")

        fetch("https://api.cloudinary.com/v1_1/dtochq6ko/image/upload", {
            method: "post",
            body: data
        })
            .then((res) => res.json())
            .then((data) => { 
                setData(data) 
                // console.log(data);
            }).catch((err) => {
                console.log(err);
            })
    }

    const submitVideo = () => {
        // console.log(files[0]);
        const data = new FormData()
        data.append("file", video)
        data.append("upload_preset", "profileVID")
        data.append("cloud_name", "dtochq6ko")

        fetch("https://api.cloudinary.com/v1_1/dtochq6ko/video/upload", {
            method: "post",
            body: data
        })
            .then((res) => res.json())
            // .then((data) => {
            //     console.log(data);
            // }).catch((err) => {
            //     console.log(err);
            // })
    }
    return (
        <>
            <div>
                <h2>Image Upload</h2>
                <input
                    type="file"
                    onChange={(e) => {
                        setImage(e.target.files[0])
                    }} />
                <button onClick={submitImage}>upload</button>
            </div>

            <div>
                <h2>Video Upload</h2>
                <input
                    type="file"
                    onChange={(e) => {
                        setVideo(e.target.files[0])
                    }} />
                <button onClick={submitVideo}>upload</button>
            </div>
        </>
    )
}