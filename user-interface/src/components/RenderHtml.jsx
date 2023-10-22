import React, { useState, useEffect } from "react";

export default function RenderHtml(props) {
  const { htmlFile } = props;
  const [htmlContent, setHtmlContent] = useState(null);

  useEffect(() => {
    const htmlData = window.file.readHtml(htmlFile);
    setHtmlContent(htmlData);
  }, [htmlFile]);
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}
