import React from "react"

export default function VideoPlayer() { 
    const mediaUrls = [
      {
        id: 1,
        title: "Video One",
        videoUrl:
          "https://res.cloudinary.com/dtochq6ko/video/upload/v1674370017/GameVideo/Games_-_Google_Chrome_2023-01-22_13-41-07_1_n1lbyg.3gp",
      },
    ]
  
    return (
      <div>
        <div className='container d-flex justify-content-center mt-4'>
          <div className='row'>
            {mediaUrls.map((media) => (
              <div key={media.id} className='col-12'>
                <div className='container-fluid'>
                    <video
                      width="100%"
                      muted
                      autoPlay
                      loop
                    >
                      <source src={media.videoUrl} type="video/mp4"/>
                    </video>
                </div>
              </div>
            ))}
          </div>
        </div>
          
        </div>
    )
  }
  

  