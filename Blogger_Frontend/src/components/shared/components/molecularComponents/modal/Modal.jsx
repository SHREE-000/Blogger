import "./Style.scss";

export const Modal = ({ confirmHandler, cancelHandler }) => {
  return (
    <div className="confirmation-box">
      <p>Are you sure you want to delete this item?</p>
      <div className="button-container">
        <button
          className="confirm-button"
          onClick={(e) => confirmHandler("delete")}
        >
          Delete
        </button>
        <button
          className="cancel-button"
          onClick={(e) => cancelHandler("cancel")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
