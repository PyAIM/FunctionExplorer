import { Download, FileSpreadsheet, Medal, Printer, X } from "lucide-react";
import { ACTIVITIES, BOSS } from "@/lib/activities";
import { useGame } from "@/contexts/GameContext";

const reportDate = () => new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date());

function download(name: string, content: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function ScorecardModal({ onClose }: { onClose: () => void }) {
  const { playerName, totalXP, earnedBadges, activityStats } = useGame();
  const missions = [...ACTIVITIES, BOSS];
  const cleared = missions.filter((mission) => activityStats[mission.id]?.passed || earnedBadges.includes(mission.badgeId)).length;
  const stamp = reportDate();
  const rows = missions.map((mission) => {
    const stat = activityStats[mission.id];
    const clearedMission = stat?.passed || earnedBadges.includes(mission.badgeId);
    return { mission, stat, status: clearedMission ? "Cleared" : stat ? "Attempted" : "Not attempted", best: stat ? `${stat.bestCorrect}/${stat.bestTotal} (${stat.bestPercent}%)` : "—", recent: stat ? `${stat.lastCorrect}/${stat.lastTotal} (${stat.lastPercent}%)` : "—" };
  });
  const safeName = (playerName || "student").trim().replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "student";
  const exportCsv = () => {
    const lines = ["Function Frontier Student Scorecard", `Student,${playerName || "Unnamed learner"}`, `Generated,${stamp}`, `Total XP,${totalXP}`, `Activities Cleared,${cleared}/${missions.length}`, "", "Mission,Status,Attempts,Best Result,Most Recent Result"];
    rows.forEach(({ mission, stat, status, best, recent }) => lines.push(`"${mission.title}",${status},${stat?.attempts ?? 0},"${best}","${recent}"`));
    download(`function-frontier-scorecard-${safeName}.csv`, lines.join("\n"), "text/csv;charset=utf-8");
  };
  const exportText = () => {
    const lines = ["FUNCTION FRONTIER — STUDENT SCORECARD", `Student: ${playerName || "Unnamed learner"}`, `Generated: ${stamp}`, `Total XP: ${totalXP}`, `Activities cleared: ${cleared}/${missions.length}`, "", ...rows.map(({ mission, stat, status, best, recent }) => `${mission.order.toString().padStart(2, "0")}. ${mission.title}\n    Status: ${status} | Attempts: ${stat?.attempts ?? 0}\n    Best: ${best} | Most recent: ${recent}`), "", "This local scorecard summarizes practice completed in this browser."];
    download(`function-frontier-scorecard-${safeName}.txt`, lines.join("\n"), "text/plain;charset=utf-8");
  };

  return <div className="scorecard-overlay" role="dialog" aria-modal="true" aria-label="Student scorecard"><section className="scorecard-modal"><header className="scorecard-header"><div><p className="eyebrow">STUDENT REPORT</p><h2>Expedition scorecard</h2><p>{playerName || "Unnamed learner"} · {stamp}</p></div><button onClick={onClose} aria-label="Close scorecard"><X size={20}/></button></header><div className="scorecard-summary"><div><Medal size={20}/><span><b>{cleared} / {missions.length}</b> activities cleared</span></div><div><b>{totalXP}</b><span>total XP</span></div><div><b>{earnedBadges.length}</b><span>badges</span></div></div><div className="scorecard-actions"><button onClick={exportCsv}><FileSpreadsheet size={16}/> Export CSV</button><button onClick={exportText}><Download size={16}/> Download text</button><button onClick={() => window.print()}><Printer size={16}/> Print / save PDF</button></div><div className="scorecard-table-wrap"><table><thead><tr><th>Mission</th><th>Status</th><th>Attempts</th><th>Best result</th><th>Most recent</th></tr></thead><tbody>{rows.map(({ mission, stat, status, best, recent }) => <tr key={mission.id}><td><span>{String(mission.order).padStart(2, "0")}</span>{mission.title}</td><td><i className={status === "Cleared" ? "cleared" : status === "Attempted" ? "attempted" : "idle"}>{status}</i></td><td>{stat?.attempts ?? 0}</td><td>{best}</td><td>{recent}</td></tr>)}</tbody></table></div><p className="scorecard-note">Export this report after work is completed and share the downloaded file with your instructor.</p></section></div>;
}
