export const SubmitButton = ({ onClick, type, name }) => {
  return (
    <button onClick={(e) => onClick(e)} type={type}>
      {name}
    </button>
  );
};
