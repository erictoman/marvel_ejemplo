const Modal = ({ imagen, open, close }) => {
  return (
    <div className={"modal " + (open ? "is-active" : "")}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <p className="image is-4by3">
          <img src={imagen} alt="" />
        </p>
      </div>
      <button
        onClick={close}
        className="modal-close is-large"
        aria-label="close"
      ></button>
    </div>
  );
};

export default Modal;
