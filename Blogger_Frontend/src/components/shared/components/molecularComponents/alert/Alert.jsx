import "./Style.scss";

export const Alert = ({ msg }) => {
  return (
    <div className="alert" data-testid="alert">
      <span className="alert-close">{/* &times; */}</span>
      <p>{msg}</p>
    </div>
  );
};
