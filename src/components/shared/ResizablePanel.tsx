"use client";

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/utils';

interface ResizablePanelProps {
  initialHeight: number;
  minHeight: number;
  maxHeight: number;
  children: React.ReactNode;
  className?: string;
  resizerClassName?: string;
}

export const ResizablePanel = ({
  initialHeight = 200,
  minHeight = 100,
  maxHeight = 500,
  children,
  className = '',
  resizerClassName = '',
}: ResizablePanelProps) => {
  const [height, setHeight] = useState(initialHeight);
  const [isResizing, setIsResizing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !panelRef.current) return;
      
      // Calculate new height based on mouse position relative to the panel's top
      // We want to resize from the top edge, so we need to adjust the calculation
      // The new height will be the panel's current bottom - new mouse Y position.
      // However, it's simpler to track the change in Y and apply it to the current height.
      // For a top resizer, the change in height is (initialMouseY - currentMouseY)
      // So, newHeight = currentHeight + (initialMouseY - currentMouseY) if dragging upwards from top
      // Let's adjust to a simpler model: the panel's height is determined by its distance from the bottom of its container
      // or by direct setting. For a top resizer, we are changing the top position.

      // Let's assume the parent container handles the layout, and this panel just declares its height.
      // The mouse Y position is relative to the viewport.
      // If the resizer is on top, dragging it up decreases height, dragging down increases it.
      // This calculation assumes the panel's bottom is fixed or managed by its parent.
      // A simpler approach:
      // Let panelTop be the panel's top offset when resizing started.
      // newHeight = panelBottom - e.clientY; where panelBottom is fixed.
      // This requires knowing panelBottom.

      // Alternative: Direct height manipulation based on clientY change
      // This needs to be relative to the panel's bounding box if resizing from top/bottom internal handle
      // For a resizer on the top border:
      // The panel's bottom is fixed. New height = panelRef.current.getBoundingClientRect().bottom - e.clientY;
      // This ensures the bottom of the panel stays put, and the top moves.
      
      // Let's use a simpler direct height adjustment for now, assuming the parent layout can handle it.
      // This means the resizer effectively changes the 'height' style property.
      // If resizing from the top, dragging mouse down increases height, dragging up decreases.
      // This feels more natural if the resizer is at the top.
      
      // Mouse movement delta based calculation:
      // This needs an initial mouse position captured on mousedown.
      // For this example, let's assume the resizer is at the top of the panel.
      // Dragging it upwards should decrease height, downwards should increase.
      // The current `e.clientY` provides the mouse's vertical position in the viewport.
      
      // Let's assume the panel is fixed at the bottom, and we are changing its height by moving the top border.
      // The panel's height is `current_bottom_position - new_top_position (e.clientY)`
      // This requires knowing the panel's bottom position relative to the viewport.
      // const panelRect = panelRef.current.getBoundingClientRect();
      // let newHeight = panelRect.bottom - e.clientY;


      // The provided ResizableSidebar calculates width based on e.clientX directly.
      // For vertical resizing, if the resizer is on top, moving the mouse down should increase height.
      // If the resizer is on the bottom, moving mouse down should increase height.
      // Let's assume a resizer on the top edge.
      // Initial click sets a reference point.
      // Change in Y from that point adjusts height.
      // This is not how the original sidebar worked. It used clientX directly.
      // Let's adapt the original logic: clientY becomes the new height, assuming 0 is top of viewport.
      // This is problematic. Height is a dimension, not a position.

      // Let's try a simpler model: the height is set directly.
      // The mouse move event gives clientY.
      // We need to determine the height relative to some fixed point or initial state.

      // Simplest adaptation of original: treat clientY as a measure for height,
      // but this is not correct. Height is a dimension.
      // The original sidebar's logic: newWidth = e.clientX;
      // This implies the sidebar is anchored at x=0.
      // For a horizontal panel, if it's anchored at y=0 (top of its container),
      // then e.clientY (relative to container) could be its height.

      // Let's reconsider. The resizer is a bar. When you drag it, you change the boundary.
      // If the resizer is at the top of the panel, and the panel's bottom is fixed (e.g. timeline at bottom of screen):
      // newHeight = initialHeightDuringDrag - (e.clientY - initialMouseYDuringDrag)
      // This means dragging up decreases height.
      // Let's stick to a simpler model where the panel's height is set directly,
      // and the parent flex layout adjusts.
      // The key is how clientY maps to height.
      // For a top resizer, if we drag down, clientY increases. This should increase height.
      // This requires knowing the *starting* clientY and *starting* height.
      // deltaY = e.clientY - startResizeData.mouseY;
      // newHeight = startResizeData.height + deltaY; (if dragging down increases height for a top resizer)
      // This seems more robust.

      // Storing initial mouse Y and initial height on resize start:
      // This is typically done in onMouseDown.
      // For now, let's assume a simplified direct mapping for clientY, and adjust if needed.
      // The ResizableSidebar implies it's anchored on the left.
      // If our panel is anchored at the top of its immediate container, clientY (relative to container) could be height.
      // This is getting complicated without knowing the exact parent layout.

      // Let's use the panel's getBoundingClientRect().top as the anchor for calculation.
      // newHeight = e.clientY - panelRef.current.getBoundingClientRect().top;
      // This means dragging down increases height. This is good for a resizer at the bottom.
      // For a resizer at the top, dragging down should also increase height.
      // This means the *distance* from the drag point to the *opposite* fixed edge changes.
      // If bottom is fixed: newHeight = panelRef.current.getBoundingClientRect().bottom - e.clientY; (for top resizer)
      // If top is fixed: newHeight = e.clientY - panelRef.current.getBoundingClientRect().top; (for bottom resizer)

      // Let's assume the resizer is on the TOP of the panel.
      // The panel's bottom position is considered fixed by its container (e.g. bottom of viewport).
      const panelRect = panelRef.current.getBoundingClientRect();
      let newHeight = panelRect.bottom - e.clientY;
      
      if (newHeight >= minHeight && newHeight <= maxHeight) {
        setHeight(newHeight);
        // panelRef.current.style.height = `${newHeight}px`; // Managed by React state
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.body.classList.remove('select-none', 'cursor-ns-resize');
      document.body.style.cursor = '';
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.classList.add('select-none', 'cursor-ns-resize');
      document.body.style.cursor = 'ns-resize';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.classList.remove('select-none', 'cursor-ns-resize');
      document.body.style.cursor = '';
    };
  }, [isResizing, minHeight, maxHeight]);

  const startResizing = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent text selection, etc.
    setIsResizing(true);
  };

  return (
    <div 
      className={cn(`relative`, className)} 
      ref={panelRef}
      style={{ height: `${height}px` }}
    >
      <div 
        className={cn(
          `resizer absolute top-0 left-0 w-full h-[6px] cursor-ns-resize bg-border hover:bg-primary transition-colors duration-200 z-10`,
          isResizing ? 'resizing bg-primary' : '',
          resizerClassName,
        )}
        onMouseDown={startResizing}
      />
      <div className="h-full overflow-auto pt-[6px]"> {/* Add padding-top to account for resizer height */}
        {children}
      </div>
    </div>
  );
};

[end of src/components/shared/ResizablePanel.tsx]
