import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import {
  GameDetails,
  Games,
  Home,
  Leaderboard,
  Profile,
  Table,
  ErrorPage
} from "./pages"
import { Navbar, Footer } from "./components";
import ClipLoader from "react-spinners/ClipLoader";


function App() {
  const [loadings, setLoadings] = useState(false)

  useEffect(() => {
    setLoadings(true)

    setTimeout(() => {
      setLoadings(false)
    }, 1500)
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        {
          loadings ?
            <div>
              <ClipLoader
                color={"#D0021B"}
                loading={loadings}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
            :
            <>
              <Navbar />
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/Profile" element={<Profile />} />
                <Route exact path="/Games" element={<Games />} />
                <Route exact path="/Gamedetails" element={<GameDetails />} />
                <Route path="/Leaderboard" element={<Leaderboard />} />
                <Route exact path="/Games/Table" element={<Table />} />
                <Route path="*" element={<ErrorPage />} />

              </Routes>
              <Footer className="z-index-n1" />
            </>
        }
      </BrowserRouter>
    </div>
  );
}

export default App;
