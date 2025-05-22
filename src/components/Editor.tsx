"use client";

import { fabric } from "fabric";
import React, { useEffect, useState } from "react";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import { ElementsPanel } from "./panels/ElementsPanel";
import { CanvasOptionsPanel } from "./panels/CanvasOptionsPanel";
import { Menu } from "./Menu";
import { ResizablePanel } from "./shared/ResizablePanel"; // Import ResizablePanel
import { TimeLine } from "./TimeLine";
import { Store } from "@/store/Store";
import { Clapperboard } from 'lucide-react';
import { useTheme } from "./theme/ThemeProvider";
import "@/utils/fabric-utils";
import Link from "next/link";

export const EditorWithStore = () => {
  const [store] = useState(new Store());
  return (
    <StoreContext.Provider value={store}>
      <Editor></Editor>
    </StoreContext.Provider>
  );
}

export const Editor = observer(() => {
  const store = React.useContext(StoreContext);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = new fabric.Canvas("canvas", {
      height: store.canvasHeight, // Use store value
      width: store.canvasWidth,   // Use store value
      backgroundColor: theme === 'dark' ? "rgb(var(--card))" : "rgb(var(--card))",
    });
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = "rgb(var(--primary))"; // Use theme variable
    fabric.Object.prototype.cornerStyle = "circle";
    fabric.Object.prototype.cornerStrokeColor = "rgb(var(--primary-hover))"; // Use theme variable
    fabric.Object.prototype.cornerSize = 10;
    
    // canvas mouse down without target should deselect active object
    canvas.on("mouse:down", function (e) {
      if (!e.target) {
        store.setSelectedElement(null);
      }
    });

    store.setCanvas(canvas);
    fabric.util.requestAnimFrame(function render() {
      canvas.renderAll();
      fabric.util.requestAnimFrame(render);
    });
    // Add store.canvasWidth and store.canvasHeight to dependency array
  }, [store, theme, store.canvasWidth, store.canvasHeight]); 
  
  return (
    <div className="flex h-screen text-white editor-theme">
      <Menu />

      <main className="flex flex-col flex-1 h-full overflow-hidden">
        <header className="h-14 bg-background border-b border-border flex items-center justify-between p-4 z-10">
          <Link href="/" className="text-xl font-bold text-primary flex items-center gap-2"> {/* Use theme variable */}
            <Clapperboard /> ChyllCut
          </Link>
          
          <div className="text-muted-foreground">start creating</div> {/* Use theme variable */}
        </header>

        <div className="canvas-editor overflow-hidden flex justify-center items-center bg-background">
          {/* <div
            id="grid-canvas-container"
            className="col-start-3 bg-[rgb(var(--canvas-bg))] flex justify-center items-center shadow-inner"
          >
          </div> */}
          {/* Apply inline styles for dynamic width and height */}
          <canvas 
            id="canvas" 
            className="row shadow-lg" 
            style={{ height: store.canvasHeight, width: store.canvasWidth }}
          />
        </div>
        
        <ResizablePanel
          initialHeight={180}
          minHeight={100}
          maxHeight={400}
          className="bg-background/95 border-t border-border"
        >
          <TimeLine />
        </ResizablePanel>
    </main>
      <div className="elements border-l border-border w-[250px] flex flex-col">
        <ElementsPanel />
        <CanvasOptionsPanel /> {/* Add CanvasOptionsPanel here */}
      </div>
  </div>
  );
});