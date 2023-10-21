import { useState } from "react";
import { RenderFile } from "./RenderFile";

export const RenderDirList = (props) => {
  const [show, setShow] = useState("none");
  const { val, index, HandleFile } = props;
  const [subDirs] = window.dir.readDir(val.path);
  const Show = () => {
    if (show === "none") setShow("block");
    else if (show === "block") setShow("none");
  };

  return (
    <div className="dir-root" key={index}>
      <h3 className="dir" onClick={Show}>
        {val.name}
      </h3>
      <div className="sub-dir-root" style={{ display: show }}>
        <ul>
          {subDirs?.map((ele, i) => {
            if (ele.isDirectory)
              return (
                <li>
                  <RenderDirList
                    HandleFile={HandleFile}
                    val={ele}
                    key={`${index}-${i}`}
                    index={`${index}-${i}`}
                  />
                </li>
              );
            return (
              <li>
                <RenderFile
                  HandleFile={HandleFile}
                  val={ele}
                  key={`${index}-${i}`}
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
