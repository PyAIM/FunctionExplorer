import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, BookOpen, Check, CircleHelp, ClipboardList, Compass, LockKeyhole, Map, Play, RotateCcw, Sparkles, Target, Trophy, X } from "lucide-react";
import { ACTIVITIES, ART, BOSS, TOPIC_GUIDES, type Activity } from "@/lib/activities";
import CreditsModal from "@/components/CreditsModal";
import ScorecardModal from "@/components/ScorecardModal";
import { useAudio } from "@/contexts/AudioContext";
import { useGame } from "@/contexts/GameContext";

const HERO = `${import.meta.env.BASE_URL}assets/hero-function-frontier.png`;

export default function Home() {
  const { playerName, setPlayerName, totalXP, earnedBadges, bestScores, isActivityUnlocked, isCipherUnlocked, cipherCleared, nextMissionId, resetProgress, frontierComplete } = useGame();
  const [welcomeOpen, setWelcomeOpen] = useState(!playerName);
  const [guideOpen, setGuideOpen] = useState(false);
  const [creditsOpen, setCreditsOpen] = useState(false);
  const [scorecardOpen, setScorecardOpen] = useState(false);
  const [name, setName] = useState("");
  const [filter, setFilter] = useState<"All" | Activity["category"]>("All");
  const { setScene } = useAudio();
  const completed = earnedBadges.length;
  const nextMission = useMemo(() => ACTIVITIES.find((activity) => activity.id === nextMissionId) ?? (nextMissionId === BOSS.id ? BOSS : ACTIVITIES[0]), [nextMissionId]);
  const visibleMissions = filter === "All" ? ACTIVITIES : ACTIVITIES.filter((activity) => activity.category === filter);

  useEffect(() => { setScene(guideOpen ? "guide" : "home"); }, [guideOpen, setScene]);

  return <main className="frontier-home">
    <nav className="home-nav"><Link href="/" className="brand-mark"><span>ƒ</span><b>Function Frontier</b></Link><div className="nav-links"><button onClick={() => document.getElementById("missions")?.scrollIntoView({ behavior: "smooth" })}>Missions</button><button onClick={() => setGuideOpen(true)}>Field guide</button><button onClick={() => setScorecardOpen(true)}>Scorecard</button></div><div className="nav-player"><div className="xp-pill"><Sparkles size={15}/>{totalXP} XP</div><div className="avatar">{(playerName || "P").slice(0, 1).toUpperCase()}</div></div></nav>
    <section className="hero-section" style={{ backgroundImage: `linear-gradient(90deg, rgba(5,15,31,.98) 0%, rgba(5,15,31,.88) 38%, rgba(5,15,31,.20) 74%, rgba(5,15,31,.22) 100%), url(${HERO})` }}>
      <div className="hero-content"><div className="hero-kicker"><span className="pulse-dot"/> PRECÁLCULUS / FUNCTIONS</div><h1>{frontierComplete ? <>Frontier <em>mapped.</em></> : <>Navigate every <em>function.</em></>}</h1><p>{frontierComplete ? "You earned the Pathfinder badge. Open your scorecard to export the record of your completed expedition." : "Train your graph sense, build algebraic fluency, and map the relationships that make functions work. One focused mission at a time."}</p><div className="hero-actions">{frontierComplete ? <button className="primary-btn" onClick={() => setScorecardOpen(true)}><ClipboardList size={17}/> Open scorecard</button> : <Link href={`/mission/${nextMission.id}`} className="primary-btn"><Play size={17} fill="currentColor"/> {completed ? `Continue: ${nextMission.shortTitle}` : "Launch first mission"}</Link>}<button className="ghost-btn" onClick={() => document.getElementById("missions")?.scrollIntoView({ behavior: "smooth" })}><Map size={17}/> Explore the map</button></div><div className="hero-signal"><div><b>{completed}</b><span>sectors mapped</span></div><i/><div><b>{ACTIVITIES.length + 1}</b><span>missions total</span></div><i/><div><b>8–9</b><span>questions per regular run</span></div></div></div>
      <div className="hero-orbit"><div className="orbit-card"><span>Current signal</span><b>{nextMission.title}</b><p>{nextMission.subtitle}</p><div><i style={{ width: `${(completed / ACTIVITIES.length) * 100}%` }}/></div></div></div>
    </section>
    <section className="mission-map" id="missions"><div className="section-heading"><div><p className="eyebrow">EXPEDITION MAP</p><h2>Build your functions toolkit.</h2><p>Each badge unlocks the next sector. Clear a mission with 60% mastery; the final requires 80%.</p></div><button className="guide-inline" onClick={() => setGuideOpen(true)}><BookOpen size={17}/> Review field guide</button></div>
      <div className="filter-row">{(["All", "Foundation", "Graph Lab", "Function Forge"] as const).map((item) => <button key={item} onClick={() => setFilter(item)} className={filter === item ? "active" : ""}>{item}</button>)}</div>
      <div className="mission-grid">{visibleMissions.map((mission) => <MissionCard key={mission.id} mission={mission} unlocked={isActivityUnlocked(mission.id)} complete={earnedBadges.includes(mission.badgeId)} score={bestScores[mission.id] ?? 0} />)}</div>
      <CipherVaultCard unlocked={isCipherUnlocked} complete={cipherCleared}/>
      <BossCard unlocked={isActivityUnlocked(BOSS.id)} complete={earnedBadges.includes(BOSS.badgeId)} score={bestScores[BOSS.id] ?? 0}/>
    </section>
    <section className="learning-section"><div className="learning-copy"><p className="eyebrow">YOUR MISSION CONTROL</p><h2>Designed for the moments students usually get stuck.</h2><p>Function Frontier gives immediate feedback, concise worked reasoning, and a focused field guide. It deliberately distinguishes an extremum <b>point</b> from its extreme <b>value</b>, and makes inside-x transformations a repeated visual habit.</p><div className="feature-list"><div><Target size={18}/><span><b>Mastery loops</b> — retry a sector until its core move feels automatic.</span></div><div><Compass size={18}/><span><b>Graph intuition</b> — visualize domain, extrema, symmetry, inverse, and transformation ideas.</span></div><div><Trophy size={18}/><span><b>Connected algebra</b> — operations and composition emphasize resulting-domain restrictions.</span></div></div></div>
      <div className="learning-art"><img src={ART.transforms} alt="Glowing transformed parabola"/><div className="floating-tag one">inside x → opposite direction</div><div className="floating-tag two">f(g(x)) → g first</div></div>
    </section>
    <footer className="home-footer"><div><span className="footer-symbol">ƒ</span><b>Function Frontier</b><small>Precalculus functions — first expedition.</small></div><div className="footer-actions"><button onClick={() => setGuideOpen(true)}><CircleHelp size={15}/> Field guide</button><button onClick={() => setScorecardOpen(true)}><ClipboardList size={15}/> Scorecard</button><button onClick={() => setCreditsOpen(true)}>Credits</button><button onClick={resetProgress}><RotateCcw size={15}/> Reset progress</button></div></footer>
    {welcomeOpen && <WelcomeModal name={name} setName={setName} onStart={() => { if (name.trim()) { setPlayerName(name); setWelcomeOpen(false); } }} />}
    {guideOpen && <FieldGuide onClose={() => setGuideOpen(false)} />}
    {creditsOpen && <CreditsModal onClose={() => setCreditsOpen(false)} />}
    {scorecardOpen && <ScorecardModal onClose={() => setScorecardOpen(false)} />}
  </main>;
}

function MissionCard({ mission, unlocked, complete, score }: { mission: Activity; unlocked: boolean; complete: boolean; score: number }) {
  const content = <><div className="mission-card-top"><span className={`mission-number ${mission.color}`}>{String(mission.order).padStart(2, "0")}</span>{complete ? <span className="complete-chip"><Check size={13}/> Cleared</span> : <span className="mission-category">{mission.category}</span>}</div><div className="mission-icon">{mission.icon}</div><div className="mission-card-copy"><p>{mission.subtitle}</p><h3>{mission.title}</h3><span>{mission.description}</span></div><div className="mission-card-bottom"><div>{complete ? <><span>Best score</span><b>{score} XP</b></> : <><span>{unlocked ? "Ready to launch" : "Locked"}</span><b>{unlocked ? "8 challenges" : "Complete prior mission"}</b></>}</div><div className="launch-icon">{unlocked ? <ArrowRight size={18}/> : <LockKeyhole size={16}/>}</div></div></>;
  if (!unlocked) return <article className="mission-card locked" aria-label={`${mission.title} locked`}>{content}</article>;
  return <Link href={`/mission/${mission.id}`} className={`mission-card ${complete ? "complete" : ""}`}>{mission.artwork && <img className="card-art" src={mission.artwork} alt=""/>}{content}</Link>;
}

function BossCard({ unlocked, complete, score }: { unlocked: boolean; complete: boolean; score: number }) {
  const content = <><div className="boss-sigil">✦</div><div><p className="eyebrow">FINAL CHECKPOINT · 8 MINUTES</p><h3>The Function Frontier Final</h3><p>{complete ? "Pathfinder badge secured — revisit the final anytime for a newly randomized mixed review." : "A 20-question mixed review of every sector: foundations, graphs, operations, composition, inverses, and quadratics."}</p><div className="boss-meta"><span><Trophy size={15}/> {complete ? "Pathfinder cleared" : "80% to earn Pathfinder"}</span>{complete && <span><Check size={15}/> Best: {score} XP</span>}</div></div><div className="boss-action">{complete ? "Cleared · replay" : unlocked ? "Enter final" : `${earnedRequired()} badges required`} {unlocked ? <ArrowRight size={18}/> : <LockKeyhole size={16}/>}</div></>;
  return unlocked ? <Link href={`/mission/${BOSS.id}`} className="boss-card unlocked">{content}</Link> : <article className="boss-card">{content}</article>;
}

function CipherVaultCard({ unlocked, complete }: { unlocked: boolean; complete: boolean }) {
  const content = <><div className="cipher-card-emblem">⌘</div><div><p className="eyebrow">SIDE INVESTIGATION · INVERSE FUNCTIONS</p><h3>Cipher Vault</h3><p>{complete ? "Intercept resolved. Replay the case to crack the inverse-function cipher again." : unlocked ? "A rogue network encrypted an ASCII message. Reverse the rule, decode the packets, and identify the rendezvous order." : "Clear Inverse Portal to receive the encrypted transmission."}</p><div className="boss-meta"><span><Sparkles size={15}/> 60 XP investigation</span><span>{complete ? <><Check size={15}/> Cipher Specialist</> : unlocked ? <><Target size={15}/> ASCII decoder required</> : <><LockKeyhole size={15}/> Inverse Portal required</>}</span></div></div><div className="boss-action">{complete ? "Resolved · replay" : unlocked ? "Open case" : "Locked"} {unlocked ? <ArrowRight size={18}/> : <LockKeyhole size={16}/>}</div></>;
  return unlocked ? <Link href="/mission/cipher-vault" className={`cipher-map-card ${complete ? "complete" : ""}`}>{content}</Link> : <article className="cipher-map-card locked">{content}</article>;
}
function earnedRequired() { return `${ACTIVITIES.length}`; }

function WelcomeModal({ name, setName, onStart }: { name: string; setName: (value: string) => void; onStart: () => void }) {
  return <div className="welcome-overlay"><div className="welcome-modal"><div className="welcome-emblem">ƒ</div><p className="eyebrow">WELCOME, EXPLORER</p><h2>Set your launch name.</h2><p>Your mission map will keep track of XP, badges, and best scores on this device.</p><input autoFocus maxLength={24} value={name} onChange={(event) => setName(event.target.value)} onKeyDown={(event) => event.key === "Enter" && onStart()} placeholder="What should we call you?"/><button className="primary-btn welcome-button" disabled={!name.trim()} onClick={onStart}>Start the expedition <ArrowRight size={17}/></button><small>No sign-in needed. Your progress stays in this browser.</small></div></div>;
}

function FieldGuide({ onClose }: { onClose: () => void }) {
  const [active, setActive] = useState(0); const guide = TOPIC_GUIDES[active];
  return <div className="guide-overlay" role="dialog" aria-modal="true"><div className="guide-modal"><div className="guide-head"><div><p className="eyebrow">REFERENCE DECK</p><h2>Function field guide</h2></div><button onClick={onClose} aria-label="Close guide"><X size={20}/></button></div><div className="guide-body"><nav>{TOPIC_GUIDES.map((topic, index) => <button key={topic.title} onClick={() => setActive(index)} className={active === index ? "active" : ""}><span>{topic.icon}</span>{topic.title}</button>)}</nav><article><div className="guide-icon">{guide.icon}</div><h3>{guide.title}</h3><p>{guide.text}</p><section><small>KEY IDEA</small><code>{guide.formula}</code></section><section><small>WORKED EXAMPLE</small><p>{guide.example}</p></section><aside><Target size={17}/><div><b>Watch out</b><p>{guide.watch}</p></div></aside></article></div></div></div>;
}
