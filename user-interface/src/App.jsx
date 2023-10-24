import { useEffect, useState } from "react";
import { RenderDirList } from "./components/RenderDirList";
import { RenderFile } from "./components/RenderFile";
import Element from "./components/Element";
import "./App.css";

function App() {
  const [dir, setDir] = useState();
  const [Path, setPath] = useState();
  const [dirName, setDirName] = useState();
  const [renderElement, setrenderElement] = useState({});

  const chagePath = (p) => {
    const [data, name] = window.dir.readDir(p);
    setDir(data);
    setPath(p);
    setDirName(name);
    setrenderElement({});
    localStorage.setItem("path", p);
  };

  const HandleFile = (val) => {
    setrenderElement(val);
    localStorage.setItem("renderElement", JSON.stringify(val));
  };

  const Refresh = () => {
    chagePath(Path);
    localStorage.setItem("renderElement", JSON.stringify({}));
  };

  useEffect(() => {
    const p = localStorage.getItem("path");
    const rE = localStorage.getItem("renderElement");
    if (p) {
      chagePath(p);
    }
    if (rE) {
      console.log(rE);
      setrenderElement(JSON.parse(rE));
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
                    isActive={renderElement.parent === val.path}
                    renderElement={renderElement}
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
          <div className="navigation-area">
            <i className="material-symbols-outlined">navigate_before</i>
            <p className="fileTitle">{renderElement?.name}</p>
            <i className="material-symbols-outlined">navigate_next</i>
          </div>
          <Element renderElement={renderElement} />
        </div>
      </div>
    </>
  );
}

export default App;
