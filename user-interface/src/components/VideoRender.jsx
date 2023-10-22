import VideoPlayer from "./Video";

export default function VideoRender(props) {
  const { videoPath } = props;

  return (
    <div className="video" style={{ border: "1px solid red" }}>
      <VideoPlayer path={`media-loader://${videoPath}`} />
    </div>
  );
}
