import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, BadgeCheck, Check, ChevronRight, CircleHelp, Copy, Fingerprint, KeyRound, LockKeyhole, Radio, RotateCcw, ShieldAlert, Sparkles, TerminalSquare, Volume2, VolumeX } from "lucide-react";
import { useAudio } from "@/contexts/AudioContext";
import { useGame } from "@/contexts/GameContext";

const CASE_IMAGE = `${import.meta.env.BASE_URL}assets/cipher-vault-case.png`;
const TARGET_MESSAGE = "MEET AT DAWN";
const ENCRYPT = (value: number) => 2 * value + 9;

const packets = TARGET_MESSAGE.split("").map((character, index) => ({
  id: index,
  encrypted: character === " " ? null : ENCRYPT(character.charCodeAt(0)),
  ascii: character === " " ? null : character.charCodeAt(0),
  character,
}));

const ASCII_ROWS = [
  ["A", 65], ["B", 66], ["C", 67], ["D", 68], ["E", 69], ["F", 70], ["G", 71], ["H", 72],
  ["I", 73], ["J", 74], ["K", 75], ["L", 76], ["M", 77], ["N", 78], ["O", 79], ["P", 80],
  ["Q", 81], ["R", 82], ["S", 83], ["T", 84], ["U", 85], ["V", 86], ["W", 87], ["X", 88],
  ["Y", 89], ["Z", 90], ["Space", 32],
] as const;

function makeTone(correct: boolean, enabled: boolean) {
  if (!enabled || typeof window === "undefined") return;
  try {
    const Audio = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const context = new Audio();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = correct ? "sine" : "square";
    oscillator.frequency.value = correct ? 880 : 160;
    gain.gain.setValueAtTime(correct ? 0.045 : 0.025, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + (correct ? 0.24 : 0.12));
    oscillator.connect(gain); gain.connect(context.destination); oscillator.start(); oscillator.stop(context.currentTime + (correct ? 0.24 : 0.12));
  } catch { /* sound effect is optional */ }
}

export default function CipherVaultPage() {
  const { totalXP, isCipherUnlocked, cipherCleared, completeCipher } = useGame();
  const { setScene, isPlaying, isMuted, startMusic, pauseMusic } = useAudio();
  const [showBriefing, setShowBriefing] = useState(true);
  const [inverseEntry, setInverseEntry] = useState("");
  const [inverseChecked, setInverseChecked] = useState(false);
  const [inverseCorrect, setInverseCorrect] = useState(false);
  const [entries, setEntries] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [flash, setFlash] = useState<Record<number, "correct" | "wrong">>({});
  const [messageEntry, setMessageEntry] = useState("");
  const [messageResult, setMessageResult] = useState<"correct" | "wrong" | null>(null);

  useEffect(() => { setScene("cipher"); }, [setScene]);

  const decodedCount = packets.filter((packet) => packet.encrypted !== null && checked[packet.id]).length;
  const allPacketsCracked = decodedCount === packets.filter((packet) => packet.encrypted !== null).length;
  const isAudible = isPlaying && !isMuted;

  const checkInverse = () => {
    const cleaned = inverseEntry.toLowerCase().replaceAll(" ", "").replaceAll("−", "-");
    const accepted = ["(x-9)/2", "(x-9)/2", "(1/2)x-9/2", "x/2-9/2", ".5x-4.5", "0.5x-4.5"];
    const correct = accepted.includes(cleaned);
    setInverseCorrect(correct); setInverseChecked(true); makeTone(correct, isAudible);
  };

  const checkPacket = (packetId: number) => {
    const packet = packets.find((item) => item.id === packetId);
    if (!packet || packet.ascii === null) return;
    const correct = Number(entries[packetId]) === packet.ascii;
    setFlash((prev) => ({ ...prev, [packetId]: correct ? "correct" : "wrong" }));
    if (correct) setChecked((prev) => ({ ...prev, [packetId]: true }));
    makeTone(correct, isAudible);
  };

  const submitMessage = () => {
    const correct = messageEntry.trim().toUpperCase().replaceAll(/\s+/g, " ") === TARGET_MESSAGE;
    setMessageResult(correct ? "correct" : "wrong");
    makeTone(correct, isAudible);
    if (correct) completeCipher();
  };

  const restart = () => {
    setInverseEntry(""); setInverseChecked(false); setInverseCorrect(false); setEntries({}); setChecked({}); setFlash({}); setMessageEntry(""); setMessageResult(null); setShowBriefing(false);
  };

  if (!isCipherUnlocked) return <main className="cipher-page cipher-locked-page">
    <CipherTopbar totalXP={totalXP} audible={isAudible} onToggleSound={isAudible ? pauseMusic : startMusic}/>
    <section className="cipher-locked"><LockKeyhole size={38}/><p className="eyebrow">SIDE INVESTIGATION LOCKED</p><h1>Access requires inverse clearance.</h1><p>Complete the Inverse Portal mission first. The Cipher Vault uses the same inverse-function process—swap, solve, and run the intercepted values backward.</p><Link className="primary-btn" href="/mission/inverse-portal">Open Inverse Portal <ChevronRight size={17}/></Link></section>
  </main>;

  return <main className="cipher-page" style={{ backgroundImage: `linear-gradient(90deg, rgba(3,10,23,.98) 0%, rgba(3,10,23,.91) 37%, rgba(3,10,23,.38) 73%, rgba(3,10,23,.77) 100%), url(${CASE_IMAGE})` }}>
    <CipherTopbar totalXP={totalXP} audible={isAudible} onToggleSound={isAudible ? pauseMusic : startMusic}/>
    <section className="cipher-hero">
      <div className="cipher-case-tag"><Radio size={14}/> INTERCEPT 4A-17 · LIVE CHANNEL</div>
      <p className="eyebrow">SIDE INVESTIGATION · INVERSE FUNCTIONS</p>
      <h1>Crack the <em>Cipher Vault.</em></h1>
      <p>A rogue network encoded its rendezvous order with a function. Recover the inverse, push each intercepted number backward through it, then translate the outputs from ASCII to reveal the message.</p>
      <div className="cipher-hero-signals"><span><Fingerprint size={15}/> Evidence packets: {packets.filter((packet) => packet.encrypted !== null).length}</span><span><Sparkles size={15}/> Reward: 60 XP</span><span><ShieldAlert size={15}/> Clearance: Inverse Portal</span></div>
    </section>

    <section className="cipher-workspace">
      <div className="cipher-rail">
        <Link href="/" className="back-link"><ArrowLeft size={16}/> Return to mission map</Link>
        <div className={`cipher-status ${inverseCorrect ? "complete" : ""}`}><span>01</span><div><b>Reverse the cipher</b><small>{inverseCorrect ? "Inverse verified" : "Find E⁻¹(x)"}</small></div>{inverseCorrect && <Check size={16}/>}</div>
        <div className={`cipher-status ${allPacketsCracked ? "complete" : ""}`}><span>02</span><div><b>Decode packets</b><small>{decodedCount} / {packets.filter((packet) => packet.encrypted !== null).length} recovered</small></div>{allPacketsCracked && <Check size={16}/>}</div>
        <div className={`cipher-status ${cipherCleared ? "complete" : ""}`}><span>03</span><div><b>Confirm message</b><small>{cipherCleared ? "Case resolved" : "Submit the plaintext"}</small></div>{cipherCleared && <Check size={16}/>}</div>
        <button className="cipher-briefing-trigger" onClick={() => setShowBriefing((value) => !value)}><CircleHelp size={16}/> {showBriefing ? "Hide ASCII briefing" : "Open ASCII briefing"}</button>
      </div>

      <div className="cipher-main">
        {showBriefing && <AsciiBriefing onClose={() => setShowBriefing(false)}/>} 
        <section className="cipher-stage inverse-stage">
          <div className="cipher-stage-head"><div><p className="eyebrow">STEP 01 · REVERSE THE RULE</p><h2>Identify the decoder.</h2></div><KeyRound size={24}/></div>
          <p className="cipher-copy">The rogue cell transformed each original ASCII number with <strong>E(x) = 2x + 9</strong>. Write the inverse function that reverses the transformation.</p>
          <div className="proof-tape"><span>Start: y = 2x + 9</span><i>→</i><span>Swap: x = 2y + 9</span><i>→</i><span>Solve for y</span></div>
          <div className="cipher-answer-row"><label>E⁻¹(x) = <input value={inverseEntry} onChange={(event) => setInverseEntry(event.target.value)} onKeyDown={(event) => event.key === "Enter" && checkInverse()} disabled={inverseChecked && inverseCorrect} placeholder="(x − 9) / 2" aria-label="Inverse function"/></label><button className="cipher-check" onClick={checkInverse} disabled={!inverseEntry.trim() || (inverseChecked && inverseCorrect)}>Verify inverse</button></div>
          {inverseChecked && <div className={`cipher-feedback ${inverseCorrect ? "success" : "error"}`}>{inverseCorrect ? <><BadgeCheck size={18}/><span><b>Decoder accepted.</b> E⁻¹(x) = (x − 9) / 2. Subtract 9 first, then divide by 2.</span></> : <><ShieldAlert size={18}/><span><b>Transmission mismatch.</b> Swap x and y in y = 2x + 9, then isolate y. Undo +9 before undoing ×2.</span></>}</div>}
        </section>

        <section className={`cipher-stage packet-stage ${inverseCorrect ? "unlocked" : "locked"}`}>
          <div className="cipher-stage-head"><div><p className="eyebrow">STEP 02 · PACKET ANALYSIS</p><h2>Run the values backward.</h2></div><TerminalSquare size={24}/></div>
          <p className="cipher-copy">Each redacted packet is an encrypted number. Evaluate <strong>E⁻¹(encrypted)</strong> to get an ASCII code, then use the briefing table to identify its letter.</p>
          <div className="cipher-formula-callout">E⁻¹(x) = <b>(x − 9) / 2</b> <span>Example: E⁻¹(163) = (163 − 9) / 2 = 77 → ASCII 77 = M</span></div>
          <div className="packet-grid" aria-label="Encrypted message packets">{packets.map((packet) => packet.encrypted === null ? <div className="packet-space" key={packet.id}><span>space</span></div> : <PacketCard key={packet.id} packet={packet} value={entries[packet.id] ?? ""} checked={Boolean(checked[packet.id])} flash={flash[packet.id]} disabled={!inverseCorrect} onChange={(value) => setEntries((prev) => ({ ...prev, [packet.id]: value }))} onCheck={() => checkPacket(packet.id)}/>)}</div>
          {!inverseCorrect && <div className="cipher-lock-note"><LockKeyhole size={16}/> Verify the inverse function to unlock the evidence packets.</div>}
        </section>

        <section className={`cipher-stage reveal-stage ${allPacketsCracked ? "unlocked" : "locked"}`}>
          <div className="cipher-stage-head"><div><p className="eyebrow">STEP 03 · FINAL TRANSMISSION</p><h2>Read the recovered order.</h2></div><Fingerprint size={24}/></div>
          <p className="cipher-copy">Record the letters in packet order. Preserve the space shown between the two groups.</p>
          <div className="recovered-strip">{packets.map((packet) => packet.character === " " ? <i key={packet.id}>·</i> : <span key={packet.id} className={checked[packet.id] ? "revealed" : ""}>{checked[packet.id] ? packet.character : "?"}</span>)}</div>
          <div className="cipher-answer-row final-answer"><label>Plaintext message <input value={messageEntry} onChange={(event) => setMessageEntry(event.target.value.toUpperCase())} onKeyDown={(event) => event.key === "Enter" && submitMessage()} disabled={!allPacketsCracked || cipherCleared} placeholder="TYPE THE REVEALED ORDER" aria-label="Decoded message"/></label><button className="cipher-check" onClick={submitMessage} disabled={!allPacketsCracked || !messageEntry.trim() || cipherCleared}>Submit evidence</button></div>
          {messageResult && <div className={`case-resolution ${messageResult}`}>{messageResult === "correct" ? <><BadgeCheck size={24}/><div><p className="eyebrow">CASE RESOLVED</p><h3>“MEET AT DAWN”</h3><p>The intercepted order has been authenticated. You reversed the function, decoded the ASCII values, and broke the Cipher Vault.</p><span>{cipherCleared ? "Cipher Specialist clearance logged · 60 XP secured" : "Evidence accepted"}</span></div></> : <><ShieldAlert size={23}/><div><b>Phrase does not match the packet order.</b><p>Recheck the decoded characters and include the space between the two words.</p></div></>}</div>}
          {(cipherCleared || messageResult === "correct") && <div className="case-actions"><button className="secondary-btn" onClick={restart}><RotateCcw size={16}/> Replay case</button><Link className="primary-btn" href="/mission/inverse-portal">Return to inverses <ChevronRight size={17}/></Link></div>}
        </section>
      </div>
    </section>
  </main>;
}

function CipherTopbar({ totalXP, audible, onToggleSound }: { totalXP: number; audible: boolean; onToggleSound: () => void }) {
  return <header className="mission-topbar"><Link href="/" className="brand-mark"><span>ƒ</span><b>Function Frontier</b></Link><div className="top-center">Cipher Vault investigation</div><div className="top-actions"><div className="xp-pill"><Sparkles size={15}/>{totalXP} XP</div><button className="sound-button" onClick={onToggleSound} aria-label={audible ? "Pause music" : "Start music"}>{audible ? <Volume2 size={18}/> : <VolumeX size={18}/>}</button></div></header>;
}

function PacketCard({ packet, value, checked, flash, disabled, onChange, onCheck }: { packet: typeof packets[number]; value: string; checked: boolean; flash?: "correct" | "wrong"; disabled: boolean; onChange: (value: string) => void; onCheck: () => void }) {
  return <article className={`packet-card ${checked ? "decoded" : ""} ${flash ?? ""}`}>
    <span className="packet-id">PACKET {String(packet.id + 1).padStart(2, "0")}</span>
    <b>{packet.encrypted}</b><small>encrypted signal</small>
    {checked ? <div className="packet-output"><span>{packet.ascii}</span><b>{packet.character}</b><small>ASCII → letter</small></div> : <><label>ASCII output<input type="number" inputMode="numeric" disabled={disabled} value={value} onChange={(event) => onChange(event.target.value)} onKeyDown={(event) => event.key === "Enter" && onCheck()} placeholder="?" aria-label={`ASCII output for packet ${packet.id + 1}`}/></label><button disabled={disabled || !value.trim()} onClick={onCheck}>Decode</button></>}</article>;
}

function AsciiBriefing({ onClose }: { onClose: () => void }) {
  return <section className="ascii-briefing"><div className="ascii-briefing-head"><div><p className="eyebrow">FIELD BRIEFING · ASCII</p><h2>How letters become numbers.</h2></div><button onClick={onClose} aria-label="Close ASCII briefing">×</button></div><div className="ascii-explainer"><div><b>ASCII is a lookup code.</b><p>Computers store characters as numbers. In the ASCII code, every capital letter has its own number—for example, <strong>M is 77</strong> and <strong>T is 84</strong>.</p></div><div><b>Your job in this case</b><p>The rogue network encrypted ASCII numbers. Once you use the inverse function to recover a number, match it to the table to reveal the letter.</p></div><div><b>Important detail</b><p>A blank between words is not a packet. Keep the space shown in the recovered strip when you submit the final message.</p></div></div><div className="ascii-table">{ASCII_ROWS.map(([character, code]) => <span key={character}><b>{character}</b><i>{code}</i></span>)}</div><p className="ascii-tip"><Copy size={14}/> Quick anchor: the capital letters A through Z are consecutive ASCII numbers from 65 through 90.</p></section>;
}
