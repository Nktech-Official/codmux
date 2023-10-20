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
    <div key={index} style={{ cursor: "pointer", border: "1px solid white" }}>
      <h3 onClick={Show}>{val.name}</h3>
      <div style={{ display: show }}>
        <ul>
          {subDirs?.map((ele, i) => {
            if (ele.isDirectory)
              return (
                <RenderDirList
                  HandleFile={HandleFile}
                  val={ele}
                  key={`${index}-${i}`}
                  index={`${index}-${i}`}
                />
              );
            return (
              <RenderFile
                HandleFile={HandleFile}
                val={ele}
                key={`${index}-${i}`}
                index={`${index}-${i}`}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};
