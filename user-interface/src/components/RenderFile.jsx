import { useEffect, useState } from "react";

export const RenderFile = (props) => {
  const { val, index, HandleFile } = props;
  const { isVideo, isImage, isSubtitle, extension } = val;
  const isHtml = extension === ".html" || extension === ".htm";
  const isPdf = extension === ".pdf";
  const isText = extension === ".txt";
  const [icon, setIcon] = useState("unknown_document");

  useEffect(() => {
    if (isVideo) setIcon("play_circle");
    else if (isImage) setIcon("image");
    else if (isPdf) setIcon("picture_as_pdf");
    else if (isHtml) setIcon("html");
    else if (isSubtitle) setIcon("subtitles");
    else if (isText) setIcon("text_snippet");
  }, []);
  return (
    <div key={index} className="files">
      <i className="material-symbols-outlined icon">{icon}</i>
      <p
        onClick={() => {
          console.log(extension);
          HandleFile(val);
        }}
      >
        {val.name}
      </p>
    </div>
  );
};
