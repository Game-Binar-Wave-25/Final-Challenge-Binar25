import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { onAuthStateChanged } from "firebase/auth";
import { ref, child, get } from "firebase/database"
import authFirebase, { database } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import "./buttonDownload.css"
 
export default function getPdf() {
  const [userId, setUserId] = useState("")
  const [isData, setData] = useState()
  const navigate = useNavigate()

  const dataTable = async () => {
    try {
        const db = await get(child(ref(database),`${userId}/GameHistory`))
        const video = db.val()
        setData(video)
    } catch (error) {
        error;
    }
}

const authenticate = () => {
    onAuthStateChanged(authFirebase, (user) => {
    if (user) {
          setUserId(user.uid)
    } else {
        navigate("/")
    }
})}

useEffect(()=>{
  authenticate()
  dataTable()
},[dataTable])

function generateSimplePDF() {
  const doc = new jsPDF();
  doc.text("Game Binar", 14, 10);
  doc.text(isData.record[1].email, 150, 10);
  doc.setFont("courier")
      autoTable(doc, 
      { 
        head: [ [ "hasil game", "Total Game", "Total Point" ] ],
        body: [ 
          [ isData.record[1].gameRecord.pickWinner, isData.record[1].totalGame, isData.record[1].totalPoint ], 
          [ isData.record[2].gameRecord.pickWinner, isData.record[2].totalGame, isData.record[2].totalPoint ], 
          [ isData.record[3].gameRecord.pickWinner, isData.record[3].totalGame, isData.record[3].totalPoint ], 
          [ isData.record[4].gameRecord.pickWinner, isData.record[4].totalGame, isData.record[4].totalPoint ], 
          [ isData.record[5].gameRecord.pickWinner, isData.record[5].totalGame, isData.record[5].totalPoint ], 
        ],
    })
    // untuk ganti nama
    doc.save(`Game Binar History ${isData.record[1].email}.pdf`); 
  }

  return (
    <div className="App">
      <button className="button-download btn border btn-sm mt-2 mb-3 " onClick={generateSimplePDF}>Download Your Game History</button>
    </div>
  );
}

