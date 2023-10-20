import { useEffect, useState } from "react";
import VideoPlayer from "./components/Video";
import { RenderDirList } from "./components/RenderDirList";
import { RenderFile } from "./components/RenderFile";
import "./App.css";
function App() {
  const [dir, setDir] = useState();
  const [Path, setPath] = useState();
  const [imagePath, setImagePath] = useState();
  const [videoPath, setVideoPath] = useState();

  const chagePath = (p) => {
    setDir(window.dir.readDir(p));
    setPath(p);
    localStorage.setItem("path", p);
  };

  const HandleFile = (val) => {
    if (val.isImage) {
      setImagePath(val.path);
    }
    if (val.isVideo) {
      setVideoPath(val.path);
    }
  };

  const Refresh = () => {
    chagePath(Path);
  };

  useEffect(() => {
    const p = localStorage.getItem("path");
    if (p) {
      chagePath(p);
    }
  }, []);

  return (
    <>
      <div className="root">
        <div className="side-bar">
          <button
            onClick={async () => {
              const choosenPath = await window.choose.openDir();
              chagePath(choosenPath);
            }}
          >
            open folder
          </button>
          <button onClick={Refresh}>refresh</button>

          {dir?.map((val, index) => {
            if (val.isDirectory)
              return (
                <RenderDirList HandleFile={HandleFile} val={val} key={index} />
              );
            return <RenderFile HandleFile={HandleFile} val={val} key={index} />;
          })}
        </div>
        <div className="video-container">
          {imagePath && (
            <img
              style={{ maxHeight: "400px", maxWidth: "800px" }}
              src={`media-loader://${imagePath}`}
            ></img>
          )}

          {videoPath && (
            <div className="video" style={{ border: "1px solid red" }}>
              <VideoPlayer path={`media-loader://${videoPath}`} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
