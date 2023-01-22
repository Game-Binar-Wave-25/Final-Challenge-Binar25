import React from "react";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import "./landingGame.css"

export default function LandingGame() {

    return(
        <>

            <div className="container-fluid" style={{"minHeight":"100vh"}}>
                <VideoPlayer/>
                <div>
                    <button type="button" className="button-games btn btn-outline-warning mt-4 fw-bold" href="/games">Play Now</button>
                </div>
            </div>

            {/* Game Detail */}
            <div className="container game-detail text-black mb-3">
                <div class="row mb-3">
                    <div class="col">
                        <div className="fw-bold">
                            <h1 className="">Game Details</h1>
                        </div>
                        <div>
                            <p className="">
                                Rock, paper, scissors (also known as Rochambeau, Roshambo, or Janken) is a fun and easy hand game that anyone can learn and enjoy. It’s a great way to make minor decisions when you and a friend can’t agree on something, or even just an entertaining way to pass the time. The neat thing about the game is that almost anybody can pick the rules up in a matter of seconds. In this article, we’ll break the game down so that you and a friend can play whenever you’d like.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div className="">
                            <div className="fw-bold">
                                <h5>How To Play</h5>
                            </div>
                            <div>
                                <ul>
                                    <li>Rock beats scissors, scissors beat paper, and paper beats rock.</li>
                                    <li>Agree ahead of time whether you’ll count off “rock, paper, scissors, shoot” or just “rock, paper, scissors.</li>
                                    <li>Use rock, paper, scissors to settle minor decisions or simply play to pass the time.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div className="">
                            <div className="fw-bold">
                                <h5>Release Date</h5>
                            </div>
                            <div>
                                <p>
                                    14 August 2022
                                </p>
                            </div>
                            <div className="fw-bold">
                                <h5>Developer</h5>
                            </div>
                            <div>
                                <p>
                                Binar Academy Full Stack Web Developer Wave 25
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}