import { useEffect, useState } from "react";
import VideoPlayer from "./components/Video";
import { RenderDirList } from "./components/RenderDirList";
import { RenderFile } from "./components/RenderFile";
import "./App.css";
import refreshIcon from "./assets/icons/refresh.svg";
import openFolderIcon from "./assets/icons/folder_open.svg";
function App() {
  const [dir, setDir] = useState();
  const [Path, setPath] = useState();
  const [imagePath, setImagePath] = useState();
  const [videoPath, setVideoPath] = useState();
  const [dirName, setDirName] = useState();

  const chagePath = (p) => {
    const [data, name] = window.dir.readDir(p);
    setDir(data);
    setPath(p);
    setDirName(name);
    setVideoPath(null);
    setImagePath(null);
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
          <div className="side-bar-header">
            <p className="side-bar-header-dirname">{dirName}</p>
            <div className="side-bar-header-button-group">
              <img
                src={openFolderIcon}
                onClick={async () => {
                  const choosenPath = await window.choose.openDir();
                  chagePath(choosenPath);
                }}
              />
              <img
                onClick={(e) => chagePath(Path)}
                src={refreshIcon}
                alt="refresh"
              />
            </div>
          </div>
          <div>
            {dir?.map((val, index) => {
              if (val.isDirectory)
                return (
                  <RenderDirList
                    HandleFile={HandleFile}
                    val={val}
                    key={index}
                    index={index}
                  />
                );
              return (
                <RenderFile
                  HandleFile={HandleFile}
                  val={val}
                  key={index}
                  index={index}
                />
              );
            })}
          </div>
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
