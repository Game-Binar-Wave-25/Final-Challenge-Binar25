import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { database } from "../../services/firebase"
import { ref, get, child } from "firebase/database"
import "./leaderboard.css"


const Leaderboard = () => {

    const [isData, setData] = useState([])

    const navigate = useNavigate()

    const authenticate = async () => {
        let storage = localStorage.getItem("accesstoken")
        const db = await get(child(ref(database), "Leaderboard"))
        if (storage === "" || storage === null) {
            navigate("/")
        } else {
            let item = db?.val()
            if (item !== null || item !== undefined) {
                const leaderboardArray = Object.entries(item).map(([id, data]) => ({
                    id,
                    totalPoint: data.totalPoint
                }));
                const sorting = leaderboardArray.sort((a, b) => b.totalPoint - a.totalPoint);
                setData(sorting)
            }
        }
    }

    useEffect(() => {
        authenticate()
    }, [authenticate])

    return (
        <div className="container-fluid z-index-2">
            <div className="container">
                <div className="mt-5 mx-5" style={{ "height": "80vh" }}>
                    <div className="mt-1 fs-1 fw-bold">Leaderboard</div>
                    <div className="container mt-3">
                        <div className="py-2 scroll-container">
                            {isData.map((el, index) =>
                                <div key={index} className="scroll-area container mt-3 ">
                                    <div className="py-2 mx-5">
                                        <div className="d-flex justify-content-evenly border border-dark border-2 rounded py-3">
                                            <div className="d-flex me-5">
                                                <img className="rounded-circle" width={45} src="https://res.cloudinary.com/dtochq6ko/image/upload/v1674465805/Profile/l1ixovppehxy6mt3ifnx.jpg" alt="" />
                                                <h6 className="me-5 m-2 mt-3">{el.id}</h6>
                                            </div>
                                            <div className="d-flex">
                                                <h6 className="ms-5 mt-3">{el.totalPoint}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Leaderboard