export const RenderFile = (props) => {
  const { val, index, HandleFile } = props;

  return (
    <p
      className="files"
      key={index}
      onClick={() => {
        HandleFile(val);
      }}
    >
      {val.name}
    </p>
  );
};
