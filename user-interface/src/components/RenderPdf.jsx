import { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

const options = {
  cMapUrl: "/cmaps/",
};
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
export default function RenderPdf({ renderElement }) {
  const { path } = renderElement;
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [rotateDeg, setRotateDeg] = useState(0);
  const containerRef = useRef(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();

      if (containerRect.bottom <= window.innerHeight && pageNumber < numPages) {
        setPageNumber(pageNumber + 1);
      }
    }
  };

  const keyBoardShortcut = (e) => {
    const keyPressed = e.key;
    console.log(keyPressed);
    if (keyPressed === "r") {
      let r = (rotateDeg + 90) % 360;
      if (r === 1) r = 0;
      console.log(r);
      setRotateDeg(r);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keypress", keyBoardShortcut);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keypress", keyBoardShortcut);
    };
  }, [pageNumber, numPages, rotateDeg]);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="pdf-reader-root" ref={containerRef}>
      <div>
        <Document
          rotate={rotateDeg}
          options={options}
          className="pdf-reader-document"
          file={`media-loader://${path}`}
          onLoadSuccess={onDocumentLoadSuccess}
          scale={2}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              className={"pdf-page"}
              pageNumber={index + 1}
            >
              <div className="pageNumber">
                <p>
                  Page {index + 1} of {numPages}
                </p>
              </div>
            </Page>
          ))}
        </Document>
      </div>
    </div>
  );
}
