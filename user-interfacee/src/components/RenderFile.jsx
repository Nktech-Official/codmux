export const RenderFile = (props) => {
  const { val, index, HandleFile } = props;

  return (
    <p
      style={{ cursor: "pointer" }}
      key={index}
      onClick={(e) => {
        e.target.className = "active";
        console.log(e.target.className);
        HandleFile(val);
      }}
    >
      {val.name}
    </p>
  );
};
