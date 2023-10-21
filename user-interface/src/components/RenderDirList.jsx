import { useState } from "react";
import { RenderFile } from "./RenderFile";

export const RenderDirList = (props) => {
  const [show, setShow] = useState(false);
  const { val, index, HandleFile } = props;
  const [subDirs] = window.dir.readDir(val.path);
  const Show = () => {
    setShow(!show);
  };

  return (
    <div className="dir-root" key={index}>
      <div className="dir" onClick={Show}>
        <i className="material-symbols-outlined icon filled-icon">
          {show ? "folder_open" : "folder"}
        </i>

        <h3>{val.name}</h3>
      </div>
      <div
        className="sub-dir-root"
        style={{ display: show ? "block" : "none" }}
      >
        <ul>
          {subDirs?.map((ele, i) => {
            if (ele.isDirectory)
              return (
                <li key={`${index}-${i}`}>
                  <RenderDirList
                    HandleFile={HandleFile}
                    val={ele}
                    index={`${index}-${i}`}
                  />
                </li>
              );
            return (
              <li key={`${index}-${i}`}>
                <RenderFile
                  HandleFile={HandleFile}
                  val={ele}
                  index={`${index}-${i}`}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
