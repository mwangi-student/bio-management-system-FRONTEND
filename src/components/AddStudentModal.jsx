function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        {/* Close Button */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            &times;
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

export default Modal;
