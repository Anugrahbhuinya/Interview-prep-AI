import React from 'react';

function Modal({ children, isOpen, title, onClose, hideheader }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black/50">
      <div className="relative flex flex-col w-full max-w-md bg-white rounded-lg">
        {!hideheader && (
          <div className="flex items-center justify-between w-full px-4 py-2 bg-white rounded-t-lg border-b border-gray-200">
            <h3 className="md:text-lg font-medium text-gray-900">{title}</h3>
            <button
              className="text-gray-400 bg-transparent hover:bg-orange-100 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center justify-center"
              type="button"
              onClick={onClose}
              aria-label="Close Modal"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1l12 12M1 13L13 1"
                />
              </svg>
            </button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;