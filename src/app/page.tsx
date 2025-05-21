import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center max-w-4xl px-4 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          ChyllApp Video Editor
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mb-10">
          A powerful web-based video editing platform designed for content creators.
          Edit, trim, and enhance your videos directly in your browser.
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 mb-16">
          <Link 
            href="/editor"
            className="rounded-md border border-solid border-transparent bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg px-8 py-3 transition-colors"
          >
            Launch Editor
          </Link>
          
          <Link 
            href="#"
            className="rounded-md border border-border hover:border-border text-zinc-300 hover:text-white font-medium text-lg px-8 py-3 transition-colors"
          >
            View Documentation
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <div className="bg-zinc-800/50 rounded-xl p-6 border border-border">
            <h3 className="text-xl font-bold mb-3">Video Import</h3>
            <p className="text-zinc-400">Upload videos from your device or drag and drop files directly into the editor.</p>
          </div>

          <div className="bg-zinc-800/50 rounded-xl p-6 border border-border">
            <h3 className="text-xl font-bold mb-3">Basic Editing</h3>
            <p className="text-zinc-400">Trim your videos with precise controls using our intuitive timeline interface.</p>
          </div>

          <div className="bg-zinc-800/50 rounded-xl p-6 border border-border">
            <h3 className="text-xl font-bold mb-3">Export</h3>
            <p className="text-zinc-400">Export your edited videos with a single click and download them to your device.</p>
          </div>
        </div>
      </main>
      
      <footer className="py-8 text-center text-zinc-500 text-sm">
        <p>ChyllApp Video Editor - Built with Next.js, FFmpeg.wasm, and React</p>
      </footer>
    </div>
  );
}
