import "./Style.scss";
import { Link } from "react-router-dom";

export const Readless = ({ title, desc, media, id, userId }) => {
  const userDetails = {
    id,
    userId,
  };
  return (
    <>
      <div className="card">
        <img src={`data:image/png;base64,${media}`} alt="Card" />
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p className="card-text">{desc}</p>
          <Link to="/blog-details" state={userDetails} className="card-button" data-testid="link">
            Read More
          </Link>
        </div>
      </div>
    </>
  );
};
