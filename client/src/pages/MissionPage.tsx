import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useParams } from "wouter";
import { ArrowLeft, ArrowRight, BookOpen, Check, ChevronRight, HelpCircle, Lightbulb, LockKeyhole, RotateCcw, Sparkles, TerminalSquare, Volume2, VolumeX, X } from "lucide-react";
import { ACTIVITIES, BOSS, TOPIC_GUIDES, type Challenge } from "@/lib/activities";
import { useAudio } from "@/contexts/AudioContext";
import { useGame } from "@/contexts/GameContext";
import { FunctionVisual } from "@/components/FunctionVisual";
import { MathInputTools, MathLine, PiecewiseNotation } from "@/components/MathNotation";
import { QUESTION_POOLS } from "@/lib/questionPools";
import { regularRunLength, selectQuestions } from "@/lib/questionSelector";

function normalize(value: string) {
  return value.toLowerCase().replaceAll(" ", "").replaceAll("∞", "infinity").replaceAll("−", "-").replaceAll("∪", "u").replaceAll("²", "^2");
}

function matchesAnswer(input: string, challenge: Challenge) {
  const expected = [challenge.answer ?? "", ...(challenge.accepted ?? [])].map(normalize);
  return expected.includes(normalize(input));
}

function playTone(correct: boolean, enabled: boolean) {
  if (!enabled || typeof window === "undefined") return;
  try {
    const Audio = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const context = new Audio();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = correct ? "sine" : "triangle";
    oscillator.frequency.value = correct ? 660 : 180;
    gain.gain.setValueAtTime(0.04, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.18);
    oscillator.connect(gain); gain.connect(context.destination); oscillator.start(); oscillator.stop(context.currentTime + 0.18);
  } catch { /* browser sound is optional */ }
}

export default function MissionPage() {
  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { setScene, isPlaying, isMuted } = useAudio();
  const { playerName, totalXP, earnedBadges, bestScores, completeActivity, isActivityUnlocked } = useGame();
  const normalMission = useMemo(() => {
    return ACTIVITIES.find((item) => item.id === params.id);
  }, [params.id]);
  const currentMission = params.id === BOSS.id ? BOSS : normalMission;
  const pool = params.id ? QUESTION_POOLS[params.id] : undefined;
  const isBoss = params.id === BOSS.id;
  const [runKey, setRunKey] = useState(0);
  const challenges = useMemo(() => {
    if (!pool) return undefined;
    return selectQuestions(pool, isBoss ? 20 : regularRunLength());
  }, [pool, isBoss, runKey]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [entry, setEntry] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showTeach, setShowTeach] = useState(false);
  const [timeLeft, setTimeLeft] = useState(480);
  const [completion, setCompletion] = useState<{ earned: boolean; xpAdded: number } | null>(null);

  useEffect(() => {
    setRunKey(0);
    setIndex(0);
    setSelected(null);
    setEntry("");
    setSubmitted(false);
    setCorrectCount(0);
    setShowTeach(false);
    setTimeLeft(480);
    setCompletion(null);
  }, [params.id]);

  useEffect(() => {
    if (!currentMission || !challenges || !isActivityUnlocked(currentMission.id)) navigate("/");
  }, [currentMission, challenges, isActivityUnlocked, navigate]);

  useEffect(() => {
    if (showTeach) setScene("guide");
    else if (index >= (challenges?.length ?? 0)) setScene("completion");
    else setScene(isBoss ? "boss" : "practice");
  }, [showTeach, index, challenges?.length, isBoss, setScene]);

  useEffect(() => {
    if (!isBoss || completion) return;
    const interval = window.setInterval(() => setTimeLeft((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearInterval(interval);
  }, [isBoss, completion]);

  useEffect(() => {
    if (isBoss && timeLeft === 0 && !completion) setIndex(challenges?.length ?? 0);
  }, [timeLeft, isBoss, completion, challenges?.length]);

  useEffect(() => {
    if (!challenges || !currentMission || index < challenges.length || completion) return;
    const score = correctCount * 10;
    const passed = isBoss ? correctCount >= 16 : correctCount >= Math.ceil(challenges.length * 0.6);
    setCompletion(completeActivity(currentMission.id, score, correctCount, challenges.length, passed));
  }, [index, challenges, currentMission, correctCount, completion, completeActivity, isBoss]);

  if (!currentMission || !challenges) return null;
  if (!isActivityUnlocked(currentMission.id)) return null;

  const current = challenges[index];
  const correct = current?.type === "mc" ? selected === current.correctIndex : matchesAnswer(entry, current ?? { type: "fill", question: "", answer: "", explanation: "", hint: "" });
  const isLast = index === challenges.length - 1;
  const required = isBoss ? 16 : Math.ceil(challenges.length * 0.6);

  const checkAnswer = () => {
    if (submitted || !current) return;
    if (current.type === "mc" && selected === null) return;
    if (current.type === "fill" && !entry.trim()) return;
    setSubmitted(true);
    if (correct) setCorrectCount((count) => count + 1);
    playTone(correct, isPlaying && !isMuted);
  };

  const next = () => {
    if (isLast) setIndex(challenges.length);
    else { setIndex((value) => value + 1); setSelected(null); setEntry(""); setSubmitted(false); }
  };

  const restart = () => { setRunKey((value) => value + 1); setIndex(0); setSelected(null); setEntry(""); setSubmitted(false); setCorrectCount(0); setCompletion(null); setTimeLeft(480); };

  if (index >= challenges.length) {
    const percentage = Math.round((correctCount / challenges.length) * 100);
    const passed = correctCount >= required;
    return <main className="mission-shell">
      <TopBar missionTitle={currentMission.shortTitle} totalXP={totalXP} />
      <section className="completion-wrap">
        <div className={`completion-orb ${passed ? "success" : "retry"}`}>{passed ? <Sparkles size={52} /> : <RotateCcw size={46} />}</div>
        <p className="eyebrow">MISSION {passed ? "COMPLETE" : "NEEDS A TUNE-UP"}</p>
        <h1>{passed ? isBoss ? "Frontier mapped." : "New sector unlocked." : "Keep the engines warm."}</h1>
        <p className="completion-copy">{passed ? isBoss ? `You cleared the Function Frontier Final with a ${percentage}% score and earned the Pathfinder badge.` : `You cleared ${currentMission.title} with a ${percentage}% mission score.` : `You need ${required} correct (${isBoss ? "80" : "60"}%) to earn this badge. Use the feedback to tune your next attempt.`}</p>
        <div className="completion-score"><strong>{correctCount}</strong><span>/ {challenges.length} correct</span><em>{correctCount * 10} XP</em></div>
        <div className="badge-reveal"><span>{currentMission.icon}</span><div><b>{completion?.earned ? "Badge earned" : passed ? "Badge secured" : "Badge on standby"}</b><small>{isBoss ? "Function Pathfinder" : `${currentMission.title} badge`}</small></div></div>
        {passed && <div className="next-callout"><ChevronRight size={18} /><span>{isBoss ? "The entire Functions Frontier is now mapped. Your final checkpoint is marked Cleared on the mission map." : "Return to the map to launch your next mission."}</span></div>}
        {passed && currentMission.id === "inverse-portal" && <Link href="/mission/cipher-vault" className="cipher-completion-link"><TerminalSquare size={18}/> New side investigation: Cipher Vault <ArrowRight size={17}/></Link>}
        <div className="completion-actions"><button className="secondary-btn" onClick={restart}><RotateCcw size={17}/> New randomized run</button><Link href="/" className="primary-btn">Mission map <ArrowRight size={17}/></Link></div>
      </section>
    </main>;
  }

  return <main className="mission-shell">
    <TopBar missionTitle={currentMission.shortTitle} totalXP={totalXP} />
    <div className="mission-layout">
      <aside className="mission-sidebar">
        <Link href="/" className="back-link"><ArrowLeft size={16}/> All missions</Link>
        <div className={`mission-emblem ${currentMission.color}`}><span>{currentMission.icon}</span></div>
        <p className="eyebrow">MISSION {String(currentMission.order).padStart(2, "0")}{isBoss ? " · FINAL" : ""}</p>
        <h1>{currentMission.title}</h1>
        <p className="sidebar-subtitle">{currentMission.subtitle}</p>
        <div className="mission-stats"><div><span>Progress</span><b>{index + 1} / {challenges.length}</b></div><div><span>Correct</span><b>{correctCount}</b></div><div><span>Best score</span><b>{bestScores[currentMission.id] ?? 0}</b></div></div>
        <div className="mission-progress"><i style={{ width: `${(index / challenges.length) * 100}%` }} /></div>
        <button className="teach-trigger" onClick={() => setShowTeach(true)}><BookOpen size={17}/> Open field guide</button>
        <div className="mastery-note"><Lightbulb size={15}/><span>Earn {required}/{challenges.length} correct to secure this sector. This run was selected from a larger question bank.</span></div>
      </aside>
      <section className="challenge-panel">
        <div className="challenge-topline"><span>{isBoss ? `BOSS BATTLE · ${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, "0")}` : `CHALLENGE ${String(index + 1).padStart(2, "0")}`}</span><button onClick={() => setShowTeach(true)}><HelpCircle size={17}/> Need a hand?</button></div>
        {current.visual && <FunctionVisual type={current.visual} />}
        <div className="challenge-copy"><p className="challenge-label">{current.type === "mc" ? "Choose the best response" : "Enter a precise response"}</p><h2>{current.question}</h2>{current.mathLines?.map((line, lineIndex) => <MathLine key={`${line}-${lineIndex}`}>{line}</MathLine>)}{current.piecewise && <PiecewiseNotation definition={current.piecewise}/>}</div>
        {current.type === "mc" ? <div className="answers">{current.options?.map((option, optionIndex) => {
          const isSelected = selected === optionIndex;
          const isCorrectOption = optionIndex === current.correctIndex;
          let classes = "answer-option";
          if (submitted && isCorrectOption) classes += " correct";
          else if (submitted && isSelected) classes += " wrong";
          else if (isSelected) classes += " selected";
          return <button disabled={submitted} key={option} className={classes} onClick={() => setSelected(optionIndex)}><span>{String.fromCharCode(65 + optionIndex)}</span>{option}{submitted && isCorrectOption && <Check size={18}/>}</button>;
        })}</div> : <><div className="fill-row"><input ref={inputRef} autoFocus value={entry} disabled={submitted} onChange={(event) => setEntry(event.target.value)} onKeyDown={(event) => event.key === "Enter" && checkAnswer()} placeholder="Type your answer" aria-label="Your answer"/><button className="check-button" disabled={submitted || !entry.trim()} onClick={checkAnswer}>Check <ArrowRight size={17}/></button></div><MathInputTools inputRef={inputRef} value={entry} onChange={setEntry}/></>}
        {!submitted && current.type === "mc" && <div className="action-row"><button className="hint-button" onClick={() => setShowTeach(true)}><Lightbulb size={16}/> Hint</button><button className="check-button" disabled={selected === null} onClick={checkAnswer}>Check answer <ArrowRight size={17}/></button></div>}
        {submitted && <div className={`feedback-card ${correct ? "correct" : "wrong"}`}><div className="feedback-icon">{correct ? <Check size={21}/> : <X size={21}/>}</div><div><b>{correct ? "Signal confirmed." : "Almost—recalibrate."}</b><p>{current.explanation}</p><small><Lightbulb size={13}/> {current.hint}</small></div><button className="next-button" onClick={next}>{isLast ? "Finish" : "Next"} <ArrowRight size={17}/></button></div>}
      </section>
    </div>
    {showTeach && <FieldGuide onClose={() => setShowTeach(false)} />}
  </main>;
}

function TopBar({ missionTitle, totalXP }: { missionTitle: string; totalXP: number }) {
  const { isPlaying, isMuted, startMusic, pauseMusic } = useAudio();
  const isAudible = isPlaying && !isMuted;
  return <header className="mission-topbar"><Link href="/" className="brand-mark"><span>ƒ</span><b>Function Frontier</b></Link><div className="top-center">{missionTitle}</div><div className="top-actions"><div className="xp-pill"><Sparkles size={15}/>{totalXP} XP</div><button className="sound-button" onClick={isAudible ? pauseMusic : startMusic} aria-label={isAudible ? "Pause music" : "Start music"}>{isAudible ? <Volume2 size={18}/> : <VolumeX size={18}/>}</button></div></header>;
}

function FieldGuide({ onClose }: { onClose: () => void }) {
  const [active, setActive] = useState(0);
  const guide = TOPIC_GUIDES[active];
  return <div className="guide-overlay" role="dialog" aria-modal="true" aria-label="Function field guide"><div className="guide-modal"><div className="guide-head"><div><p className="eyebrow">REFERENCE DECK</p><h2>Function field guide</h2></div><button onClick={onClose} aria-label="Close guide"><X size={20}/></button></div><div className="guide-body"><nav>{TOPIC_GUIDES.map((topic, index) => <button key={topic.title} onClick={() => setActive(index)} className={active === index ? "active" : ""}><span>{topic.icon}</span>{topic.title}</button>)}</nav><article><div className="guide-icon">{guide.icon}</div><h3>{guide.title}</h3><p>{guide.text}</p><section><small>KEY IDEA</small><code>{guide.formula}</code></section><section><small>WORKED EXAMPLE</small><p>{guide.example}</p></section><aside><Lightbulb size={17}/><div><b>Watch out</b><p>{guide.watch}</p></div></aside></article></div></div></div>;
}
