
'use client';

import React from 'react';

interface ConfirmAlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

export function ConfirmAlertDialog({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
}: ConfirmAlertDialogProps) {

  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  }

  if (!open) {
    return null;
  }

  return (
    <>
       <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes slideIn {
            from { transform: translate(-50%, -48%) scale(0.95); opacity: 0; }
            to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            to { transform: translate(-50%, -48%) scale(0.95); opacity: 0; }
        }

        .confirm-alert-overlay {
            position: fixed;
            inset: 0;
            z-index: 50;
            background-color: hsla(220, 13%, 10%, 0.8);
            animation: fadeIn 150ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .confirm-alert-overlay[data-state='closed'] {
            animation: fadeOut 150ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .confirm-alert-content {
          position: fixed;
          left: 50%;
          top: 50%;
          z-index: 50;
          transform: translate(-50%, -50%);
          width: 90%;
          max-width: 512px;
          display: grid;
          gap: 1rem;
          border: 1px solid hsl(221, 13%, 30%);
          background-color: hsl(220, 13%, 15%);
          padding: 1.5rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          border-radius: 0.5rem;
          animation: slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .confirm-alert-content[data-state='closed'] {
            animation: slideOut 150ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .confirm-alert-header {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          text-align: left;
        }
        .confirm-alert-title {
          font-size: 1.125rem;
          line-height: 1.75rem;
          font-weight: 600;
          color: hsl(216, 67%, 98%);
        }
        .confirm-alert-description {
          font-size: 0.875rem;
          line-height: 1.25rem;
          color: hsl(215, 14%, 65%);
        }
        .confirm-alert-footer {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            gap: 0.5rem;
        }
        
        .confirm-alert-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            white-space: nowrap;
            border-radius: 0.375rem;
            font-size: 0.875rem;
            line-height: 1.25rem;
            font-weight: 500;
            transition: background-color 0.2s ease-in-out;
            cursor: pointer;
            height: 2.5rem;
            padding: 0.5rem 1rem;
            border: none;
        }
        
        .confirm-alert-button.primary {
            background-color: hsl(201, 48%, 65%);
            color: hsl(216, 11%, 10%);
        }
        .confirm-alert-button.primary:hover {
            background-color: hsla(201, 48%, 65%, 0.9);
        }

        .confirm-alert-button.outline {
            background-color: transparent;
            border: 1px solid hsl(220, 13%, 18%);
            color: hsl(216, 67%, 98%);
        }
         .confirm-alert-button.outline:hover {
            background-color: hsl(224, 43%, 54%);
         }
      `}</style>
      <div data-state={open ? 'open' : 'closed'}>
        <div className="confirm-alert-overlay" onClick={() => onOpenChange(false)} data-state={open ? 'open' : 'closed'} />
        <div role="alertdialog" className="confirm-alert-content" data-state={open ? 'open' : 'closed'}>
            <div className="confirm-alert-header">
                <h2 className="confirm-alert-title">{title}</h2>
                <p className="confirm-alert-description">
                {description}
                </p>
            </div>
            <div className="confirm-alert-footer">
                <button className="confirm-alert-button outline" onClick={() => onOpenChange(false)}>NO</button>
                <button className="confirm-alert-button primary" onClick={handleConfirm}>YES</button>
            </div>
        </div>
      </div>
    </>
  );
}
