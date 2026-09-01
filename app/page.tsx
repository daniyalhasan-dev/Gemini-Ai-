"use client";

import { generateText } from "@/app/Actions/aiActions";
import { useState, KeyboardEvent } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!prompt.trim() || isLoading) return;

    const currentPrompt = prompt;
    setPrompt(""); // Clear input on submit
    setIsLoading(true);

    try {
      const userResponse = await generateText(currentPrompt);
      setResponse(userResponse);
    } catch (err) {
      setResponse("⚠️ Failed to reach the server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <main className="min-h-screen bg-[#08090d] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-300px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-white/[0.025] blur-3xl" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex h-16 items-center justify-between border-b border-white/[0.07] px-5 md:px-10">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm font-bold text-black">
            A
          </div>
          <div>
            <h1 className="text-sm font-semibold tracking-tight">AI Assistant</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="hidden rounded-lg px-3 py-2 text-xs text-white/40 sm:block">
            About
          </button>
          <button 
            onClick={() => { setResponse(""); setPrompt(""); }} 
            className="rounded-lg border border-white/10 px-3 py-2 text-xs text-white/60 hover:bg-white/5"
          >
            New Chat
          </button>
        </div>
      </nav>

      {/* Main Section */}
      <section className="relative z-10 flex min-h-[calc(100vh-64px)] flex-col">
        <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center px-5 py-12 md:px-8">
          
          {/* Intro Heading */}
          <div className="mb-10">
            <h2 className="max-w-3xl text-4xl font-semibold leading-[1.1] tracking-[-0.03em] md:text-6xl">
              What would you like <br />
              <span className="text-white/30">to create today?</span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-6 text-white/35">
              Ask questions, explore ideas, write content, or solve problems with your AI assistant.
            </p>

            {/* AI Response Output Container */}
            {(response || isLoading) && (
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="mb-2 text-xs text-white/30">
                  {isLoading ? "Generating Answer..." : "AI Assistant Response:"}
                </p>

                {isLoading ? (
                  <div className="flex items-center gap-2 text-sm text-white/50">
                    <span className="h-2 w-2 animate-ping rounded-full bg-white/70"></span>
                    <span>Thinking...</span>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap text-sm leading-6 text-white/80">
                    {response}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Prompt Input Footer */}
        <div className="w-full px-5 pb-7 md:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="overflow-hidden rounded-[20px] border border-white/[0.10] bg-[#101117] shadow-2xl shadow-black/30">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                placeholder={isLoading ? "Please wait for response..." : "Message Ai Assistant... (Press Enter to send)"}
                rows={3}
                className="w-full resize-none bg-transparent px-5 pt-5 text-sm leading-6 text-white outline-none placeholder:text-white/25 disabled:opacity-50"
              />

              <div className="flex items-center justify-between px-4 pb-4">
                <div className="flex items-center gap-1">
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg text-lg text-white/30 hover:bg-white/5">
                    +
                  </button>
                  <button className="rounded-lg px-2 py-1.5 text-xs text-white/30 hover:bg-white/5">
                    Attach
                  </button>
                </div>

                {/* Submit Action Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || !prompt.trim()}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  {isLoading ? "..." : "↑"}
                </button>
              </div>
            </div>

            <p className="mt-3 text-center text-[10px] text-white/20">
              AI can make mistakes. Check important information.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}