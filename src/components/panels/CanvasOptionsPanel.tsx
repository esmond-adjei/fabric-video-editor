"use client";
import React from "react";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";

export const CanvasOptionsPanel = observer(() => {
  const store = React.useContext(StoreContext);

  const handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = parseInt(event.target.value, 10);
    if (!isNaN(newWidth) && newWidth > 0) {
      store.setCanvasWidth(newWidth);
    }
  };

  const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = parseInt(event.target.value, 10);
    if (!isNaN(newHeight) && newHeight > 0) {
      store.setCanvasHeight(newHeight);
    }
  };

  return (
    <div className="bg-popover border-t border-border p-4">
      <h3 className="text-sm font-medium mb-2 text-foreground">Canvas Dimensions</h3>
      <div className="flex flex-col space-y-2">
        <div>
          <label htmlFor="canvas-width" className="text-xs text-muted-foreground">
            Width:
          </label>
          <input
            id="canvas-width"
            type="number"
            value={store.canvasWidth}
            onChange={handleWidthChange}
            className="w-full p-1 border-border rounded bg-transparent text-foreground placeholder-muted-foreground"
          />
        </div>
        <div>
          <label htmlFor="canvas-height" className="text-xs text-muted-foreground">
            Height:
          </label>
          <input
            id="canvas-height"
            type="number"
            value={store.canvasHeight}
            onChange={handleHeightChange}
            className="w-full p-1 border-border rounded bg-transparent text-foreground placeholder-muted-foreground"
          />
        </div>
      </div>
    </div>
  );
});
