import { useState } from "react";
import { RenderFile } from "./RenderFile";

export const RenderDirList = (props) => {
  const [show, setShow] = useState("none");
  const { val, key, HandleFile } = props;
  const subDirs = window.dir.readDir(val.path);
  console.log(subDirs);
  const Show = () => {
    if (show === "none") setShow("block");
    else if (show === "block") setShow("none");
  };

  return (
    <div key={key} style={{ cursor: "pointer" }}>
      <h3 onClick={Show}>{val.name}</h3>
      <div style={{ display: show }}>
        <ul>
          {subDirs?.map((ele, index) => {
            if (ele.isDirectory)
              return (
                <RenderDirList
                  HandleFile={HandleFile}
                  val={ele}
                  key={`${key}-${index}`}
                />
              );
            return (
              <RenderFile
                HandleFile={HandleFile}
                val={ele}
                key={`${key}-${index}`}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};
