import React from "react"
import { Link } from "react-router-dom"
import hero from "./hero.png"
import "./index.css"

export default function Content(){
    return(
        <>
            <div className="container-fluid" style={{"maxnHeight":"85vh"}}>
                <div className="row mx-5">
                    <div className="col-8 mt-5">
                        <h1 className="d-flex display-5 fw-bold lh-1 mb-3 justify-content-start ">
                            Lets Have Fun!
                        </h1>
                        <p className="lead text-lg-start lh-md my-1">
                            Today, you are still confused about where to play free online games? Oh, not really! 
                            Just use our game feature from binargame. Just click on the link, then choose the game you want to play, and play it for free. 
                            Very easy right?
                        </p>
                        <Link to="/Gamedetails" style={{ "textDecoration": "none" }}>
                            <div className="d-flex btn-lg mt-4">
                                <button type="button" className="button-hover btn btn-outline-custom fw-bold">Play Now</button>
                            </div>
                        </Link>
                    </div>
                    <div className="col-4 mt-3">
                        <img src={hero} alt="let's play" width={300} />
                    </div>
                </div>
            </div>
        </>
    )
}