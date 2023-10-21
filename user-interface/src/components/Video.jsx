import React from "react";
import ReactPlayer from "react-player";

function VideoPlayer({ path, ...props }) {
  const bufferLoading = () => {
    console.log("loading");
  };
  return (
    <div>
      <ReactPlayer
        url={path} // Replace with your video URL
        controls // Display video controls (play, pause, volume, etc.)
        width="100%" // Set the player width
        height="auto" // Set the player height or use a fixed value
        {...props}
        onBuffer={bufferLoading}
      />
    </div>
  );
}

export default VideoPlayer;
