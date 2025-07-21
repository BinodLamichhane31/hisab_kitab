// src/components/ConfirmationModal.js
import React from 'react';
import { X, AlertTriangle, Loader2 } from 'lucide-react';

export const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, confirmText, isPending }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out bg-black bg-opacity-50">
      <div className="relative w-full max-w-md transition-all duration-300 ease-in-out transform scale-95 bg-white rounded-lg shadow-xl animate-in fade-in-0 zoom-in-95">
        <div className="flex items-start justify-between p-4 border-b rounded-t">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-start">
            <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
              <AlertTriangle className="w-6 h-6 text-red-600" aria-hidden="true" />
            </div>
            <div className="ml-4 text-left">
              <p className="text-sm text-gray-600">{message}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end p-4 space-x-2 border-t border-gray-200 rounded-b">
          <button
            onClick={onClose}
            type="button"
            className="text-gray-600 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-300 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isPending}
            type="button"
            className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center disabled:bg-red-400 disabled:cursor-not-allowed"
          >
            {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {isPending ? 'Deleting...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};