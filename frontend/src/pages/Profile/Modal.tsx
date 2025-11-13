import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  /** Optional Tailwind max-width class, e.g., 'max-w-3xl', 'max-w-4xl'. Defaults to 'max-w-lg'. */
  widthClass?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, widthClass = 'max-w-lg' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal */}
      <div className={`relative bg-[#21242B] border border-border rounded-xl shadow-2xl ${widthClass} mx-auto max-h-[90vh] flex flex-col`}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-muted rounded-[8px] transition-colors z-10"
        >
          <X className="h-5 w-5 text-[#FFFFFF]" />
        </button>
        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;