import VideoPlayer from "./Video";

export default function VideoRender(props) {
  const { renderElement } = props;
  const { path } = renderElement;

  return (
    <div className="video" style={{ border: "1px solid red" }}>
      <VideoPlayer path={`media-loader://${path}`} />
    </div>
  );
}
