"use client";

import { StoreContext } from "@/store";
import { formatTimeToMinSecMili } from "@/utils";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Play, Pause } from "lucide-react";
import { useTheme } from "../theme/ThemeProvider";
import { ScaleRangeInput } from "./ScaleRangeInput";

const MARKINGS = [
	{
		interval: 5000,
		color: "var(--play-marker-color, #2563eb)",
		size: 16,
		width: 1,
	},
	{
		interval: 1000,
		color: "var(--time-marker-color, #64748b)",
		size: 8,
		width: 1,
	},
];

export type SeekPlayerProps = {};

export const SeekPlayer = observer((_props: SeekPlayerProps) => {
	const store = useContext(StoreContext);
	const { theme } = useTheme();
	const Icon = store.playing ? Pause : Play;
	const formattedTime = formatTimeToMinSecMili(store.currentTimeInMs);
	const formattedMaxTime = formatTimeToMinSecMili(store.maxTime);

	return (
		<div className="seek-player flex flex-col">
			<div className="flex justify-between items-center p-2 border-b border-border">
				<div/>
				<div className="flex items-center text-[0.75rem]">
					<button
						className="flex items-center justify-center w-10 h-10 rounded-full bg-background/80 hover:bg-primary-100 dark:hover:bg-primary-900/30 text-primary-600 dark:text-primary-400 transition-colors"
						onClick={() => store.setPlaying(!store.playing)}
					><Icon size={18} /></button>
					<span className="font-mono text-zinc-800 dark:text-zinc-200">{formattedTime}</span>
					<div className="w-[1px] h-[25px] bg-border mx-2"></div>
					<span className="font-mono text-zinc-600 dark:text-zinc-400">{formattedMaxTime}</span>
				</div>
				<div/>
			</div>
			<ScaleRangeInput
				max={store.maxTime}
				value={store.currentTimeInMs}
				onChange={(value) => {
					store.handleSeek(value);
				}}
				height={30}
				markings={MARKINGS}
				backgroundColor={theme === "dark" ? "#1e293b" : "#ffffff"}
			/>
		</div>
	);
});
