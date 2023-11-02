import VideoPlayer from './Video'

export default function VideoRender(props) {
  const { renderElement } = props
  const { path, Subtitle } = renderElement
  return <VideoPlayer path={`media-loader://${path}`} sub={`media-loader://${Subtitle}`} />
}
