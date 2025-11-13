
'use client';

import React from 'react';

interface InfoAlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
}

export function InfoAlertDialog({
  open,
  onOpenChange,
  title,
  description,
}: InfoAlertDialogProps) {

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

        .info-alert-overlay {
            position: fixed;
            inset: 0;
            z-index: 50;
            background-color: hsla(220, 13%, 10%, 0.8);
            animation: fadeIn 150ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .info-alert-overlay[data-state='closed'] {
            animation: fadeOut 150ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .info-alert-content {
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
        .info-alert-content[data-state='closed'] {
            animation: slideOut 150ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .info-alert-header {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          text-align: left;
        }
        .info-alert-title {
          font-size: 1.125rem;
          line-height: 1.75rem;
          font-weight: 600;
          color: hsl(216, 67%, 98%);
        }
        .info-alert-description {
          font-size: 0.875rem;
          line-height: 1.25rem;
          color: hsl(215, 14%, 65%);
        }
        .info-alert-footer {
            display: flex;
            justify-content: flex-end;
        }
        
        .info-alert-button {
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
            background-color: hsl(201, 48%, 65%);
            color: hsl(216, 11%, 10%);
            border: none;
        }
        .info-alert-button:hover {
            background-color: hsla(201, 48%, 65%, 0.9);
        }
      `}</style>
      <div data-state={open ? 'open' : 'closed'}>
        <div className="info-alert-overlay" onClick={() => onOpenChange(false)} data-state={open ? 'open' : 'closed'} />
        <div role="alertdialog" className="info-alert-content" data-state={open ? 'open' : 'closed'}>
          <div className="info-alert-header">
            <h2 className="info-alert-title">{title}</h2>
            <p className="info-alert-description">
              {description}
            </p>
          </div>
          <div className="info-alert-footer">
            <button className="info-alert-button" onClick={() => onOpenChange(false)}>OK</button>
          </div>
        </div>
      </div>
    </>
  );
}
