interface Props extends React.PropsWithChildren {
  open: boolean;
  onClose: () => void;
}

const Modal: React.FC<Props> = ({ open, onClose, children }) => {
  return (
    <div
      className={`fixed inset-0 flex justify-center items-end md:items-center transition-colors z-50 ${
        open ? "visible bg-black/20 " : "invisible"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-t-lg md:rounded-lg shadow-lg p-4 md:p-6 transition-all w-full md:max-w-md md:mx-4 max-h-[90vh] overflow-y-auto ${
          open ? "translate-y-0 md:scale-100 opacity-100" : "translate-y-full md:translate-y-0 md:scale-110 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
