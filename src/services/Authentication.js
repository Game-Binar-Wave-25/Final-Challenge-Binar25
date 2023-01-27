import { useNavigate } from "react-router-dom";

// export default function Auth() => {
//     const navigate = useNavigate()
//     let storage = localStorage.getItem("accesstoken")
//     if (storage === "" || storage === null){
//         navigate("/")
//     } 
// }

export default function Auth() {
    const navigate = useNavigate
    let storage = localStorage.getItem("accesstoken")
        if (storage === "" || storage === null){
            navigate("/")
        } 
}