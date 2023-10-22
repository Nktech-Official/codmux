import { useEffect, useState } from "react";
import VideoRender from "./components/VideoRender";
import { RenderDirList } from "./components/RenderDirList";
import { RenderFile } from "./components/RenderFile";
import RenderHtml from "./components/RenderHtml";
import RenderPdf from "./components/RenderPdf";
import "./App.css";
function App() {
  const [dir, setDir] = useState();
  const [Path, setPath] = useState();
  const [imagePath, setImagePath] = useState();
  const [videoPath, setVideoPath] = useState();
  const [dirName, setDirName] = useState();
  const [pdfPath, setPdfPath] = useState();
  const [htmlFile, setHtmlFile] = useState();

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
      setVideoPath(null);
      setPdfPath(null);
      setHtmlFile(null);
    }
    if (val.isVideo) {
      setVideoPath(val.path);
      setImagePath(null);
      setPdfPath(null);
      setHtmlFile(null);
    }
    if (val.extension === ".pdf") {
      setPdfPath(val.path);
      setVideoPath(null);
      setImagePath(null);
      setHtmlFile(null);
    }
    if (
      val.extension === ".html" ||
      val.extension === ".htm" ||
      val.extension === ".txt"
    ) {
      setHtmlFile(val.path);
      setPdfPath(null);
      setVideoPath(null);
      setImagePath(null);
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
                onClick={Refresh}
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
                    key={index + val.name}
                    index={index + val.name}
                  />
                );
              return (
                <RenderFile
                  HandleFile={HandleFile}
                  val={val}
                  key={index + val.name}
                  index={index + val.name}
                />
              );
            })}
          </div>
        </div>
        <div className="render-area">
          {imagePath && (
            <img
              style={{ maxHeight: "400px", maxWidth: "800px" }}
              src={`media-loader://${imagePath}`}
            ></img>
          )}

          {videoPath && <VideoRender videoPath={videoPath} />}
          {pdfPath && <RenderPdf filePath={pdfPath} />}
          {htmlFile && <RenderHtml htmlFile={htmlFile} />}
        </div>
      </div>
    </>
  );
}

export default App;
