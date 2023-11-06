/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { Document, Page, pdfjs, Outline } from 'react-pdf'
import Spinner from './Spinner'

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
  const [outline, setOutline] = useState(true)
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

  function onDocumentLoadSuccess(doc) {
    const { numPages } = doc
    setNumPages(numPages)
  }
  const onZoomIn = () => {
    setScale((prevScale) => {
      if (prevScale < 5) return prevScale + 0.25
      return prevScale
    })
  }

  const onZoomOut = () => {
    setScale((prevScale) => {
      if (prevScale > 0.25) return prevScale - 0.25
      return prevScale
    })
  }

  return (
    <div className="pdf-reader-root">
      <div className="pdf-header">
        <div id="tool-1" className="tools">
          <div
            onClick={() => {
              setOutline((prev) => !prev)
            }}
            id="outline-toggle"
          >
            <i className="material-symbols-outlined" style={{ fontSize: '38px' }}>
              {outline ? 'menu_open' : 'menu'}
            </i>
          </div>
        </div>
        <div id="tool-2" className="tools">
          {' '}
          <p>tool2</p>
        </div>
        <div id="tool-3" className="tools">
          <p>tool2</p>
        </div>
      </div>
      <Document
        rotate={rotateDeg}
        options={options}
        className="pdf-reader-document"
        file={`media-loader://${path}`}
        onLoadSuccess={onDocumentLoadSuccess}
        scale={scale}
        loading={Spinner}
      >
        <div
          className="outline-sidebar"
          style={{
            width: outline ? '20%' : '0px',
            minWidth: outline ? '200px' : '0px'
          }}
        >
          <Outline />
        </div>
        <div className="pages-root">
          <div className="pages">
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                scale={scale}
                key={`page_${index + 1}`}
                className={'pdf-page'}
                pageNumber={index + 1}
                loading={Spinner}
              >
                <div className="pageNumber">
                  <p>
                    Page {index + 1} of {numPages}
                  </p>
                </div>
              </Page>
            ))}
          </div>
        </div>
      </Document>
    </div>
  )
}
