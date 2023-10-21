import { useEffect, useState } from "react";
import VideoPlayer from "./components/Video";
import { RenderDirList } from "./components/RenderDirList";
import { RenderFile } from "./components/RenderFile";
import RenderPdf from "./components/RenderPdf";
import "./App.css";
function App() {
  const [dir, setDir] = useState();
  const [Path, setPath] = useState();
  const [imagePath, setImagePath] = useState();
  const [videoPath, setVideoPath] = useState();
  const [dirName, setDirName] = useState();
  const [pdfPath, setPdfPath] = useState();

  const chagePath = (p) => {
    const [data, name] = window.dir.readDir(p);
    setDir(data);
    setPath(p);
    setDirName(name);
    setVideoPath(null);
    setImagePath(null);
    setPdfPath(null);
    localStorage.setItem("path", p);
  };

  const HandleFile = (val) => {
    if (val.isImage) {
      setImagePath(val.path);
    }
    if (val.isVideo) {
      setVideoPath(val.path);
    }
    if (val.extension === ".pdf") {
      setPdfPath(val.path);
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
              <i
                className="material-symbols-outlined filled-icon"
                onClick={async () => {
                  const choosenPath = await window.choose.openDir();
                  chagePath(choosenPath);
                }}
              >
                create_new_folder
              </i>
              <i
                onClick={(e) => chagePath(Path)}
                className="material-symbols-outlined"
                alt="refresh"
              >
                refresh
              </i>
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
          {pdfPath && <RenderPdf filePath={pdfPath} />}
        </div>
      </div>
    </>
  );
}

export default App;
