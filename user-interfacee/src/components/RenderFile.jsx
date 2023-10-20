export const RenderFile = (props) => {
  const { val, key, HandleFile } = props;

  return (
    <p style={{ cursor: "pointer" }} key={key} onClick={() => HandleFile(val)}>
      {val.name}
    </p>
  );
};
