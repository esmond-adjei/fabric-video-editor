"use client";

import { fabric } from "fabric";
import React, { useEffect, useState } from "react";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import { ElementsPanel } from "./panels/ElementsPanel";
import { Menu } from "./Menu";
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
      height: 500,
      width: 800,
      backgroundColor: theme === 'dark' ? "#374151" : "#f1f5f9",
    });
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = "#2563eb";
    fabric.Object.prototype.cornerStyle = "circle";
    fabric.Object.prototype.cornerStrokeColor = "#1d4ed8";
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
  }, [store, theme]);
  
  return (
    <div className="flex h-screen text-white editor-theme">
      <Menu />

      <main className="flex flex-col flex-1 h-full overflow-hidden">
        <header className="h-14 bg-background border-b border-border flex items-center justify-between p-4 z-10">
          <Link href="/" className="text-xl font-bold text-blue-500 flex items-center gap-2">
            <Clapperboard /> ChyllCut
          </Link>
          
          <div className="text-muted">start creating</div>
        </header>

        <div className="canvas-editor flex-1 overflow-hidden flex justify-center items-center bg-background">
          {/* <div
            id="grid-canvas-container"
            className="col-start-3 bg-[rgb(var(--canvas-bg))] flex justify-center items-center shadow-inner"
          >
          </div> */}
          <canvas id="canvas" className="h-[500px] w-[800px] row shadow-lg" />
        </div>
        
        <div className="timeline bg-background/95 border-t border-border">
          <TimeLine />
        </div>
    </main>
      <div className="elements border-l border-border">
        <ElementsPanel />
      </div>
  </div>
  );
});