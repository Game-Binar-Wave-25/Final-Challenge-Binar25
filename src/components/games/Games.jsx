import { useState, useEffect } from "react"
import { database } from "../../services/firebase"
import { ref, set, get, child } from "firebase/database"
import { useNavigate, Link } from "react-router-dom"
import { 
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
  WhatsappIcon,
  WhatsappShareButton
} from "react-share"
import jwtDecode from "jwt-decode";
import "./games.css"
import Batu from "./assets/batu.png"
import Gunting from "./assets/gunting.png"
import Kertas from "./assets/kertas.png"

export default function FirebaseGameSuit(){
  const [userChoice, setUserChoice] = useState(null)
  const [computerChoice, setComputerChoice] = useState(null)
  const [result, setResult] = useState("")
  const [isEmail, setEmail] = useState("")
  const [isId, setId] = useState(0)
  const [isPoint, setPoint] = useState(0)
  const [isUserId, setUserId] = useState("")
  const [isName, setName] = useState("Anonymous")
  const choices = ["batu", "kertas", "gunting"]
  const rec = "record"
  const url = "https://github.com/orgs/Game-Binar-Wave-25/dashboard"
  const navigate = useNavigate()
  const [isBatu, setBatu] = useState(false);
  const [isGunting, setGunting] = useState(false);
  const [isKertas, setKertas] = useState(false);
  const [botBatu, setBotBatu] = useState(false);
  const [botGunting, setBotGunting] = useState(false);
  const [botKertas, setBotKertas] = useState(false);

  function generateComputerChoice() {
    let randomChoice = choices[Math.floor(Math.random() * choices.length)]
    return randomChoice
  }
  const handleClick = (choice, bot) => {
    setId(isId+1)
    Start(choice,bot)
  }
  const seri = (e,a) => {
    if (e === "batu" && a === "batu"){
      setBatu(true)
      setGunting(false)
      setKertas(false)
      setBotBatu(true)
      setBotGunting(false)
      setBotKertas(false)
    } else if (e === "gunting" && a === "gunting"){
      setBatu(false)
      setGunting(true)
      setKertas(false)
      setBotBatu(false)
      setBotGunting(true)
      setBotKertas(false)
    } else if (e === "kertas" && a === "kertas"){
      setBatu(false)
      setGunting(false)
      setKertas(true)
      setBotBatu(false)
      setBotGunting(false)
      setBotKertas(true)
    }
  }
  const authenticate = async () => {
    let storage = localStorage.getItem("accesstoken")
    if (storage === "" || storage === null){
      navigate("/")
    } else {
      let decode = jwtDecode(storage)
      const db = await get(child(ref(database),`${decode.user_id}/GameHistory`))
      const dbPoint = await get(child(ref(database),`${decode.user_id}/UserProfile`))
      setUserId(decode.user_id)
      setEmail(decode.email)
      let items = db?.val()
      let items2 = dbPoint?.val()
      let banyakData = items?.record?.length
      if (banyakData !== undefined) {
        setId(banyakData)
        setPoint(items2?.result?.totalPoint)
        setName(items2?.nameProfile?.userName)
      }
    }
}
  const Start = (p1,p2) => {
    setUserChoice(p1)
    setComputerChoice(p2)
    if (p1 === "batu" && p2 === "gunting") {
      setResult("YOU WIN!")
      setPoint(isPoint+10)
      setBatu(true)
      setGunting(false)
      setKertas(false)
      setBotBatu(false)
      setBotGunting(true)
      setBotKertas(false)
    } else if (p1 === "batu" && p2 === "kertas") {
      setResult("YOU LOSE!")
      setBatu(true)
      setGunting(false)
      setKertas(false)
      setBotBatu(false)
      setBotGunting(false)
      setBotKertas(true)
    } else if (p1 === "gunting" && p2 === "kertas") {
      setResult("YOU WIN!")
      setPoint(isPoint+10)
      setBatu(false)
      setGunting(true)
      setKertas(false)
      setBotBatu(false)
      setBotGunting(false)
      setBotKertas(true)
    } else if (p1 === "gunting" && p2 === "batu") {
      setResult("YOU LOSE!")
      setBatu(false)
      setGunting(true)
      setKertas(false)
      setBotBatu(true)
      setBotGunting(false)
      setBotKertas(false)
    } else if (p1 === "kertas" && p2 === "batu") {
      setResult("YOU WIN!")
      setBatu(false)
      setGunting(false)
      setKertas(true)
      setBotBatu(true)
      setBotGunting(false)
      setBotKertas(false)
    } else if (p1 === "kertas" && p2 === "gunting") {
      setResult("YOU LOSE!")
      setBatu(false)
      setGunting(false)
      setKertas(true)
      setBotBatu(false)
      setBotGunting(true)
      setBotKertas(false)
    } else {
      seri(p1,p2)
      setResult("DRAW")
      setPoint(isPoint+5)
    }
  }

  useEffect(() => {
    authenticate()
    const inputUser = {
      userId: isUserId,
      email: isEmail,
      totalGame: isId,
      totalPoint: isPoint,
      gameRecord: 
        {
          pickBot: computerChoice,
          pickPlayer: userChoice,
          pickWinner: result
        }
    }
    if (userChoice !== null) {
      set(ref(database,`${isUserId}/GameHistory/${rec}/${isId}`), inputUser)
      set(ref(database,`${isUserId}/UserProfile/result`), { totalPoint : isPoint })
      set(ref(database,"Leaderboard/"+isName), { totalPoint : isPoint })
    }
  },[userChoice, computerChoice, isId, result, isPoint])

  return (
    <>
        <div className="container py-2">
                <div className="row text-center">
                <div className="col">
                    <div className="mb-5 "><h1>{isName}</h1></div>
                    <div className="my-3 option" 
                    style={{
                            backgroundColor: isBatu ? "#933093" : "", 
                            color: isBatu ? "white" : "",
                            borderRadius: isBatu ? "400px" : ""}}>
                        <img alt='batu' src={Batu} onClick={() => handleClick("batu",generateComputerChoice())}/>
                    </div>
                    <div className="my-3 option" 
                            style={{backgroundColor: isGunting ? "#933093" : "", 
                            color: isGunting ? "white" : "",
                            borderRadius: isGunting ? "400px" : ""}}>
                        <img alt='gunting' src={Gunting} onClick={() => handleClick("gunting",generateComputerChoice())}/>
                    </div>
                    <div className="my-3 option" 
                            style={{backgroundColor: isKertas ? "#933093" : "", 
                            color: isKertas ? "white" : "",
                            borderRadius: isKertas ? "400px" : ""}}>
                        <img alt='kertas' src={Kertas} onClick={() => handleClick("kertas",generateComputerChoice())}/>
                    </div>
                </div>
                <div className="col d-flex justify-content-center align-items-center">
                    <div id="vs" className="vs">VS</div>
                    <div id="win" className="d-flex justify-content-center align-items-center result win">PLAYER 1<br/> WIN</div>
                    <div id="lose" className="d-flex justify-content-center align-items-center result win">COM <br/> WIN</div>
                    <div id="draw" className="d-flex justify-content-center align-items-center result draw">DRAW</div>
                </div>
                <div className="col">
                    <div className="mb-5"><h1>Bot</h1></div>
                    <div className="my-3 option" 
                            style={{backgroundColor: botBatu ? "#933093" : "", 
                            color: botBatu ? "white" : "",
                            borderRadius: botBatu ? "400px" : ""}}>
                        <img id="comrock" className="bot" src={Batu} alt="batu"/>
                    </div>
                    <div className="my-3 option" 
                            style={{backgroundColor: botGunting ? "#933093" : "", 
                            color: botGunting ? "white" : "",
                            borderRadius: botGunting ? "400px" : ""}}>
                        <img id="comscissors" className="bot" src={Gunting} alt="gunting"/>
                    </div>
                    <div className="my-3 option" 
                            style={{backgroundColor: botKertas ? "#933093" : "", 
                            color: botKertas ? "white" : "",
                            borderRadius: botKertas ? "400px" : ""}}>
                        <img id="compaper" className="bot" src={Kertas}  alt="kertas"/>
                    </div>
                </div>
                </div>
                <div className="fs-3 font-monospace mx-1 mt-4">
                    Your Point : {isPoint}
                    {result && <>, Result : {result}</>}
                </div>
                <div className="container d-flex justify-content-center mt-3">
                  <div className="mx-3">
                    <FacebookShareButton url={url} hashtag='#game' className='facebook'>
                      <FacebookIcon size={32} round={true} />
                    </FacebookShareButton>
                  </div>
                  <div className="mx-3">
                    <TwitterShareButton url={url} hashtag='#game' className='twitter'>
                      <TwitterIcon size={32} round={true} />
                    </TwitterShareButton>
                  </div>
                  <div className="mx-3">
                    <WhatsappShareButton url={url} hashtag='#game' className='whatsapp'>
                      <WhatsappIcon size={32} round={true} />
                    </WhatsappShareButton> 
                  </div>
                    <Link to='/' className='point'>
                    </Link>
                </div>
                <div className="mt-4">
                  <Link to="/Games/Table">
                    <button type="button" className="button-ingame btn btn-outline-costum fw-bold">History</button>
                  </Link>
                </div>
        </div>
    </>
  )
}
