"use client";
import React from "react";
import { EditorElement } from "@/types";
import { StoreContext } from "@/store";
import { observer } from "mobx-react";
import DragableView from "./DragableView";
import { cn } from "@/utils";

const formatTime = (timeInSeconds: number): string => {
  return `${timeInSeconds.toFixed(1)}s`;
};

interface TrackMoverProps {
  position: "start" | "end";
  disabled: boolean;
  className?: string;
  children?: React.ReactNode;
}

const TrackMover = ({ position, disabled, className, children }: TrackMoverProps) => (
  <div
    className={cn(
      "absolute top-0 h-full w-4 z-20 group",
      disabled ? "cursor-no-drop" : "cursor-ew-resize",
      position === "start" ? "-left-1" : "-right-1",
      className
    )}
  >
    <div className="h-full flex items-center justify-center">
      {children || (
        <div
          className={cn(
            "w-1 h-8 bg-yellow-500",
            "border border-white group-hover:bg-orange-500",
            disabled && "opacity-50"
          )}
        />
      )}
    </div>
  </div>
);

export const TimeFrameView = observer((props: { element: EditorElement }) => {
  const store = React.useContext(StoreContext);
  const { element } = props;
  const disabled = element.type === "audio";
  const isSelected = store.selectedElement?.id === element.id;
  const disabledCursor = disabled ? "cursor-no-drop" : "cursor-ew-resize";

  return (
    <div
      onClick={() => {
        store.setSelectedElement(element);
      }}
      key={element.id}
      className={cn(
        "relative width-full h-[40px] rounded-lg",
        isSelected
          ? "bg-yellow-500/50 shadow-md"
          : "hover:bg-yellow-500/20 bg-yellow-500/10"
      )}
    >
      {/* Start handle */}
      <DragableView
        className="z-10"
        value={element.timeFrame.start}
        total={store.maxTime}
        disabled={disabled}
        onChange={(value) => {
          store.updateEditorElementTimeFrame(element, {
            start: value,
          });
        }}
      >
        <TrackMover position="start" disabled={disabled}>
          <div
            className={cn(
              "w-1 h-8",
              isSelected
                ? "bg-yellow-500 border border-white"
                : "bg-zinc-400 border border-border dark:bg-zinc-600",
              disabled && "opacity-50"
            )}
          />
        </TrackMover>
      </DragableView>

      {/* Middle section */}
      <DragableView
        className={disabled ? "cursor-no-drop" : "cursor-move"}
        value={element.timeFrame.start}
        disabled={disabled}
        style={{
          width: `${
            ((element.timeFrame.end - element.timeFrame.start) /
              store.maxTime) *
            100
          }%`,
        }}
        total={store.maxTime}
        onChange={(value) => {
          const { start, end } = element.timeFrame;
          store.updateEditorElementTimeFrame(element, {
            start: value,
            end: end + (value - start),
          });
        }}
      >
        <div
          className={cn(
            "h-[40px] flex items-center justify-between px-2 py-1",
            isSelected
              ? "bg-yellow-500/50 border border-yellow-600"
              : "bg-yellow-500/20 border border-yellow-600/30"
          )}
        >
          <span className="text-[0.625rem] font-mono text-zinc-800 dark:text-zinc-200 truncate">
            {element.name}
          </span>
          <div className="flex space-x-2 items-center text-[0.625rem] opacity-75 font-mono">
            <span>{formatTime(element.timeFrame.start)}</span>
            <span>-</span>
            <span>{formatTime(element.timeFrame.end)}</span>
          </div>
        </div>
      </DragableView>

      {/* End handle */}
      <DragableView
        className="z-10"
        value={element.timeFrame.end}
        total={store.maxTime}
        disabled={disabled}
        onChange={(value) => {
          store.updateEditorElementTimeFrame(element, {
            end: value,
          });
        }}
      >
        <TrackMover position="end" disabled={disabled}>
          <div
            className={cn(
              "w-1 h-8",
              isSelected
                ? "bg-yellow-500 border border-white"
                : "bg-zinc-400 border border-border dark:bg-zinc-600",
              disabled && "opacity-50"
            )}
          />
        </TrackMover>
      </DragableView>
    </div>
  );
});
