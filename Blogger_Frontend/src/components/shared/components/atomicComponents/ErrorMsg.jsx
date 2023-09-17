export const ErrorMsg = ({ msg }) => {
  return (
    <div className="error-message" data-testid="error">
      <p>{msg}</p>
    </div>
  );
};
