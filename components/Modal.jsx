import React from "react";

const Modal = ({ children, htmlFor = "my-modal-3" }) => {
  return (
    <>
      <input type="checkbox" id={htmlFor} className="modal-toggle" />
      <div className="modal cursor-pointer">
        <div className="modal-box relative bg-custom-background">
          <label
            htmlFor={htmlFor}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
