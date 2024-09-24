/* eslint-disable react/prop-types */
const Modal = ({ isOpen, children }) => {
    if (!isOpen) return null
  
    return (
      <div className="modal">
        <div className="modal-content">{children}</div>
      </div>
    )
  }
  
  export default Modal