import { useState } from "react";
import { Music2, Pause, Play, Volume2, VolumeX, X } from "lucide-react";
import { useAudio } from "@/contexts/AudioContext";

export default function MusicControl() {
  const [open, setOpen] = useState(false);
  const { track, isPlaying, isMuted, volume, startMusic, pauseMusic, toggleMute, setVolume } = useAudio();
  const isAudible = isPlaying && !isMuted;

  return <div className="music-dock">
    {open && <div className="music-panel" aria-label="Soundtrack controls">
      <div className="music-panel-head"><div><p className="eyebrow">ARCADE SOUNDTRACK</p><b>{track.title}</b></div><button onClick={() => setOpen(false)} aria-label="Close soundtrack controls"><X size={17}/></button></div>
      <p className="music-track-note">{track.subtitle}</p>
      <div className="music-actions"><button className="music-play" onClick={isAudible ? pauseMusic : startMusic}>{isAudible ? <><Pause size={16} fill="currentColor"/> Pause</> : <><Play size={16} fill="currentColor"/> {isPlaying && isMuted ? "Resume sound" : "Start music"}</>}</button><button className="music-mute" onClick={toggleMute} aria-label={isMuted ? "Unmute soundtrack" : "Mute soundtrack"}>{isMuted ? <VolumeX size={17}/> : <Volume2 size={17}/>}</button></div>
      <label className="volume-row"><span>Volume</span><input aria-label="Music volume" type="range" min="0" max="100" value={Math.round(volume * 100)} onChange={(event) => setVolume(Number(event.target.value) / 100)} /><b>{Math.round(volume * 100)}%</b></label>
      <small>Music begins only after you click Start music. Tracks loop and change with each activity.</small>
    </div>}
    <button className={`music-launcher ${isAudible ? "playing" : ""}`} onClick={() => setOpen((value) => !value)} aria-label="Open soundtrack controls"><Music2 size={19}/><span>{isAudible ? "Music on" : "Soundtrack"}</span><i /></button>
  </div>;
}
