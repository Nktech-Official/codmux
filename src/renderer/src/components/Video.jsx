import { useState, useEffect, useRef } from 'react'
import ReactPlayer from 'react-player'

function VideoPlayer({ path, ...props }) {
  const [playBackRate, setPlayBackRate] = useState(1.0)
  const [position, setPosition] = useState({ left: 27, top: 27 })
  const vidoeRef = useRef()

  const handleMouseDown = (e) => {
    e.preventDefault()

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseUp = (e) => {
    e.preventDefault()
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (e) => {
    const video = document.querySelector('.video')
    const videoRect = video.getBoundingClientRect()
    const speed = document.querySelector('.speed')
    const speedRect = speed.getBoundingClientRect()
    const margin = 10
    const offsetX = (speedRect.width + margin) / 2
    const offsetY = (speedRect.height + margin) / 2
    const left = Math.min(
      videoRect.width - offsetX, // Max left position
      Math.max(offsetX, e.clientX - videoRect.left)
    )

    const top = Math.min(
      videoRect.height - offsetY, // Max top position
      Math.max(offsetY, e.clientY - videoRect.top)
    )

    setPosition({ left, top })
  }
  const bufferLoading = () => {
    console.log('loading')
  }

  const handleKeyboardShortcut = (e) => {
    const keyPressed = e.code
    console.log(keyPressed)
    if (keyPressed === 'KeyL' && playBackRate <= 4.0) {
      setPlayBackRate(playBackRate + 0.1)
    }
    if (keyPressed === 'KeyJ' && playBackRate >= 0.31) {
      setPlayBackRate(playBackRate - 0.1)
    }
    if (keyPressed === 'KeyR') {
      setPlayBackRate(1)
    }

    console.log(playBackRate)
  }
  useEffect(() => {
    window.addEventListener('keyup', handleKeyboardShortcut)

    return () => {
      window.removeEventListener('keyup', handleKeyboardShortcut)
    }
  }, [playBackRate])
  return (
    <div className="video">
      <ReactPlayer
        ref={vidoeRef}
        playbackRate={playBackRate}
        url={path} // Replace with your video URL
        controls // Display video controls (play, pause, volume, etc.)
        width="100%" // Set the player width
        height="auto" // Set the player height or use a fixed value
        {...props}
        onBuffer={bufferLoading}
        onPlaybackRateChange={(rate) => {
          setPlayBackRate(rate)
        }}
      ></ReactPlayer>
      <div
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        className="speed"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`
        }}
      >
        {playBackRate.toFixed(2)}
      </div>
    </div>
  )
}

export default VideoPlayer
