import VideoPlayer from './Video'

export default function VideoRender(props) {
  const { renderElement } = props
  const { path } = renderElement

  return <VideoPlayer path={`media-loader://${path}`} />
}
