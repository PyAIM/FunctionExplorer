import { AlertCircle, Home } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return <main className="min-h-screen grid place-items-center bg-[#061321] px-5 text-center text-[#eaf7ff]">
    <section className="max-w-md rounded-2xl border border-cyan-200/20 bg-[#0d2844] p-10 shadow-2xl">
      <AlertCircle className="mx-auto mb-5 text-cyan-300" size={52}/>
      <p className="mb-2 font-mono text-xs tracking-[.2em] text-cyan-300">FUNCTION FRONTIER</p>
      <h1 className="mb-3 font-serif text-4xl">Signal lost.</h1>
      <p className="mb-7 text-sm leading-6 text-[#b8d0e2]">This route is not on the current expedition map.</p>
      <button onClick={() => setLocation("/")} className="inline-flex items-center gap-2 rounded-lg bg-cyan-300 px-5 py-3 text-sm font-bold text-[#062132] transition hover:bg-cyan-200"><Home size={16}/> Return to mission map</button>
    </section>
  </main>;
}
