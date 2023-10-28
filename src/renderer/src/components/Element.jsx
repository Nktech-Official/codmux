import VideoRender from './VideoRender'
import RenderHtml from './RenderHtml'
import RenderPdf from './RenderPdf'
const Element = ({ renderElement }) => {
  const { isVideo, isImage, isSubtitle, extension } = renderElement
  const isHtml = extension === '.html' || extension === '.htm'
  const isPdf = extension === '.pdf'
  const isText = extension === '.txt'
  if (isImage) {
    return (
      <img
        style={{ maxHeight: '400px', maxWidth: '800px' }}
        src={`media-loader://${renderElement.path}`}
      ></img>
    )
  }

  if (isVideo) {
    return <VideoRender renderElement={renderElement} />
  }
  if (isPdf) {
    return <RenderPdf renderElement={renderElement} />
  }
  if (isHtml || isText) {
    return <RenderHtml renderElement={renderElement} />
  }

  return (
    <div>
      <p>{renderElement.name ? 'Cannot  open this  File.' : 'Choose a File to Open'} </p>
    </div>
  )
}

export default Element
