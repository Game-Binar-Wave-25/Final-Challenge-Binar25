import React from "react"
import Carousel from "../carousel/Carousel"
export default function box(el){
    return(
        <>
            <div className="fs-3 fw-bolder">
                {el.name}
            </div>
            <div className="container mb-2">
                <div className="my-4">
                    <Carousel cols={el.cols} rows={el.rows} gap={el.gap}/>
                </div>
            </div>
        </>
    )
}