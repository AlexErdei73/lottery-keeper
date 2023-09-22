// Modal as a separate component
import { useEffect, useRef } from "react";
import "./modal.css";

function Modal({ openModal, closeModal, children, headerText = "Dialog" }) {
  const dialog = useRef();
  const cover = useRef();

  useEffect(() => {
    if (openModal) {
      dialog.current.showModal();
      dialog.current.style.animation = "600ms fadeIn";
      cover.current.style = "display: flex";
      setTimeout(() => {
        dialog.current.style.animation = "";
      }, 600);
    } else {
      dialog.current.style.animation = "600ms reverse fadeIn";
      setTimeout(() => {
        dialog.current.close();
        dialog.current.style = "";
        cover.current.style = "";
      }, 600);
    }
  }, [openModal]);

  return (
    <div className="cover" ref={cover}>
      <dialog
        ref={dialog}
        onCancel={closeModal}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          closeModal();
        }}
      >
        <div className="head">
          <button
            type="button"
            className="close"
            onClick={closeModal}
            area-aria-labelledby="tac"
          >
            X
          </button>
          <span id="tac" hidden>
            Close
          </span>
          {headerText}
        </div>
        <div className="body">{children}</div>
      </dialog>
    </div>
  );
}

export default Modal;
