"use client";
import React from "react";
import { SeekPlayer } from "./timeline-related/SeekPlayer";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import { TimeFrameView } from "./timeline-related/TimeFrameView";
import { cn } from "@/utils";

export const TimeLine = observer(() => {
  const store = React.useContext(StoreContext);
  const percentOfCurrentTime = (store.currentTimeInMs / store.maxTime) * 100;

  return (
    <div className="h-full flex flex-col"> {/* Ensure this div takes full height of its ResizablePanel parent and allows flex-col for overflow handling */}
      <SeekPlayer />
      <div className="flex-1 relative pb-4 space-y-2 overflow-y-auto"> {/* Removed max-h-[180px] and added overflow-y-auto */}
        {/* <div className="absolute w-full h-full bg-zinc-200/50 dark:bg-zinc-800/50 rounded pointer-events-none"></div> */}
        {store.editorElements.map((element) => {
          return <TimeFrameView key={element.id} element={element} />;
        })}
        <div
          className={cn(
            "w-[2px] bg-primary-600 absolute -top-2 bottom-0 z-20",
            "before:content-[''] before:absolute before:w-3 before:h-3 before:rounded-full before:bg-primary-600",
            "before:-translate-x-[5px] before:-translate-y-1"
          )}
          style={{
            left: `${percentOfCurrentTime}%`,
          }}
        ></div>
      </div>
    </div>
  );
});
