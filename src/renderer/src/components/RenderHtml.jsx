import React, { useState, useEffect } from 'react'

export default function RenderHtml(props) {
  const { renderElement } = props
  const { path } = renderElement
  const [htmlContent, setHtmlContent] = useState(null)

  useEffect(() => {
    const htmlData = window.file.readHtml(path)
    setHtmlContent(htmlData)
  }, [path])
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  )
}
