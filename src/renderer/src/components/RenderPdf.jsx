export default function RenderPdf({ renderElement }) {
  const { path } = renderElement

  return (
    <div className="pdf-reader-root">
      <iframe id="pdfFrame" src={`file://${path}`} width="100%" height="100%"></iframe>
    </div>
  )
}
