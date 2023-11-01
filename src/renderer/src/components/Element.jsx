import VideoRender from './VideoRender'
import RenderHtml from './RenderHtml'
import RenderPdf from './RenderPdf'
import AppIcon from '../assets/Icons/logo-transparent-bg.png'
const Element = ({ renderElement }) => {
  const { isVideo, isImage, isSubtitle, extension } = renderElement
  const isHtml = extension === '.html' || extension === '.htm'
  const isPdf = extension === '.pdf'
  const isText = extension === '.txt'
  if (isSubtitle) return <></>
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
    <div className="default-Element">
      {renderElement.name ? (
        <p>Cannot open this File.</p>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            flexDirection: 'column'
          }}
        >
          <img height={60} src={AppIcon} alt="appIcon" />
          <div style={{ marginTop: '175px', width: '100%', minWidth: '400px' }}>
            <div
              style={{
                width: '100%',
                margin: '5px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItem: 'center'
              }}
            >
              <kbd>L</kbd> <text>Increase PlayBack Speed </text> <kbd>+0.10 </kbd>
            </div>
            <div
              style={{
                width: '100%',
                margin: '5px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItem: 'center'
              }}
            >
              <kbd>J</kbd> <text>Decrease PlayBack by </text> <kbd>-0.10 </kbd>
            </div>
            <div
              style={{
                width: '100%',
                margin: '5px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItem: 'center'
              }}
            >
              <kbd>R</kbd> <text> Reset PlayBack Speed to </text> <kbd>1.00 </kbd>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Element
