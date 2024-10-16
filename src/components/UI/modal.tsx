import React, { FC, PropsWithChildren } from 'react';

interface ModalProps {
  isShow: boolean;
  setIsShow: (isOpen: boolean) => void;
}

const Modal: FC<PropsWithChildren<ModalProps>> = ({ isShow, setIsShow, children }) => {
  return (
    <div className={isShow ? 'modal show' : 'modal'} onClick={() => setIsShow(false)}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;