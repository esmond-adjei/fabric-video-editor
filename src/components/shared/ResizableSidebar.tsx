"use client";

import React, { useEffect, useRef, useState } from 'react';

interface ResizableSidebarProps {
  initialWidth: number;
  minWidth: number;
  maxWidth: number;
  children: React.ReactNode;
  className?: string;
}

export const ResizableSidebar = ({
  initialWidth = 300,
  minWidth = 200,
  maxWidth = 500,
  children,
  className = '',
}: ResizableSidebarProps) => {
  const [width, setWidth] = useState(initialWidth);
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      
      const newWidth = e.clientX;
      
      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setWidth(newWidth);
        if (sidebarRef.current) {
          sidebarRef.current.style.width = `${newWidth}px`;
        }
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.classList.remove('select-none');
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.classList.add('select-none');
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.classList.remove('select-none');
    };
  }, [isResizing, minWidth, maxWidth]);

  const startResizing = () => {
    setIsResizing(true);
  };

  return (
    <div 
      className={`flex relative ${className}`} 
      ref={sidebarRef}
      style={{ width: `${width}px` }}
    >
      <div className="flex-grow overflow-auto">
        {children}
      </div>
      <div 
        className={`resizer absolute top-0 right-0 h-full ${isResizing ? 'resizing' : ''}`}
        onMouseDown={startResizing}
      />
    </div>
  );
};
