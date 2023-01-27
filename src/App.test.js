import { render } from "@testing-library/react";
import { GameDetails, Home, Games, Leaderboard, Profile} from "./pages"
import { describe,test } from "@jest/globals";
import { ModalSignin, ModalSignup } from "./components";
import { BrowserRouter as Router } from "react-router-dom";


describe("test all pages render", () => { 
  test("renders Login pages", async () => {
    render(
      <Router>
        <ModalSignin/>
      </Router>,
    )
  })
  test("renders Register pages", async () => {
    render(
      <Router>
        <ModalSignup/>
      </Router>,
    )
  })
  test("renders Home pages", async () => {
    render(
      <Router>
        <Home/>
      </Router>,
    )
  })
  test("renders Profile pages", async () => {
    render(
      <Router>
        <Profile/>
      </Router>,
    )
  })
  test("renders GameDetails pages", async () => {
    render(
      <Router>
        <GameDetails/>
      </Router>,
    )
  test("renders Games pages", async () => {
    render(
      <Router>
        <Games/>
      </Router>,
    )
  })
  })
  test("renders Leaderboard pages", async () => {
    render(
      <Router>
        <Leaderboard/>
      </Router>,
    )
  })
})