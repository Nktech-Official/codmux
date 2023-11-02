/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

const options = {
  cMapUrl: '/cmaps/'
}
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString()

export default function RenderPdf({ renderElement }) {
  const { path } = renderElement
  const [numPages, setNumPages] = useState()
  const [rotateDeg, setRotateDeg] = useState(0)
  const [scale, setScale] = useState(1) // Initial scale
  const keyBoardShortcut = (e) => {
    const keyPressed = e.key
    console.log(keyPressed)
    if (keyPressed === 'r') {
      let r = (rotateDeg + 90) % 360
      if (r === 1) r = 0
      console.log(r)
      setRotateDeg(r)
    }
    if (keyPressed === '+') onZoomIn()
    if (keyPressed === '-') onZoomOut()
  }

  useEffect(() => {
    window.addEventListener('keypress', keyBoardShortcut)
    return () => {
      window.removeEventListener('keypress', keyBoardShortcut)
    }
  }, [numPages, rotateDeg])
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }
  const onZoomIn = () => {
    setScale((prevScale) => prevScale + 0.25)
  }

  const onZoomOut = () => {
    setScale((prevScale) => prevScale - 0.25)
  }

  return (
    <div className="pdf-reader-root">
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
              scale={scale}
              className={'pdf-page'}
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
  )
}
