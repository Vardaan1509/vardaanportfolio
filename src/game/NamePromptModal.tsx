import { useState, useEffect, useRef } from "react";

interface NamePromptModalProps {
  onSubmit: (name: string) => void;
}

const NamePromptModal = ({ onSubmit }: NamePromptModalProps) => {
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const submit = () => {
    const trimmed = name.trim();
    if (trimmed.length === 0) return;
    if (trimmed.length > 24) return;
    onSubmit(trimmed);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-[min(92vw,420px)] bg-slate-900 border-4 border-yellow-400 rounded-lg p-6 shadow-2xl">
        <div className="text-center mb-4">
          <p className="text-yellow-300 text-xs uppercase tracking-widest mb-1">Prof. Chen asks</p>
          <h2 className="text-white text-xl font-bold">What's your name, trainer?</h2>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
          }}
          maxLength={24}
          placeholder="Enter your name"
          className="w-full bg-slate-950 border-2 border-slate-700 focus:border-yellow-400 outline-none rounded px-3 py-2 text-white font-mono text-center"
        />
        <div className="flex justify-center mt-4">
          <button
            onClick={submit}
            disabled={name.trim().length === 0}
            className="px-6 py-2 bg-yellow-500 hover:bg-yellow-400 disabled:bg-slate-700 disabled:cursor-not-allowed text-slate-950 font-bold rounded transition-colors"
          >
            Confirm
          </button>
        </div>
        <p className="text-slate-500 text-xs text-center mt-3">
          You'll appear on the map as a trainer.
        </p>
      </div>
    </div>
  );
};

export default NamePromptModal;
