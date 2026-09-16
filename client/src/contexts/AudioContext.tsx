import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

export type SoundtrackScene = "home" | "practice" | "boss" | "completion" | "guide" | "cipher";

type Track = { title: string; subtitle: string; src: string };

const ASSET_BASE = `${import.meta.env.BASE_URL}assets/`;

const TRACKS: Record<SoundtrackScene, Track> = {
  home: { title: "Home Screen", subtitle: "Function Frontier opening theme", src: `${ASSET_BASE}home_screen.mp3` },
  practice: { title: "Practice Run", subtitle: "Standard mission soundtrack", src: `${ASSET_BASE}practice.mp3` },
  boss: { title: "Boss Battle", subtitle: "Final review soundtrack", src: `${ASSET_BASE}Boss_battle.mp3` },
  cipher: { title: "Cipher Vault", subtitle: "Investigation soundtrack", src: `${ASSET_BASE}Boss_battle.mp3` },
  completion: { title: "Completion", subtitle: "Mission celebration soundtrack", src: `${ASSET_BASE}Completion.mp3` },
  guide: { title: "Field Guide", subtitle: "Reference-deck soundtrack", src: `${ASSET_BASE}field_guide.mp3` },
};

type AudioContextValue = {
  scene: SoundtrackScene;
  track: Track;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  setScene: (scene: SoundtrackScene) => void;
  startMusic: () => void;
  pauseMusic: () => void;
  toggleMute: () => void;
  setVolume: (value: number) => void;
};

const AudioContext = createContext<AudioContextValue | undefined>(undefined);
const SETTINGS_KEY = "function-frontier-audio-settings";

function getStoredSettings() {
  if (typeof window === "undefined") return { muted: false, volume: 0.42 };
  try {
    const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY) ?? "{}");
    return { muted: Boolean(saved.muted), volume: typeof saved.volume === "number" ? Math.min(1, Math.max(0, saved.volume)) : 0.42 };
  } catch {
    return { muted: false, volume: 0.42 };
  }
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [scene, setSceneState] = useState<SoundtrackScene>("home");
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [settings, setSettings] = useState(getStoredSettings);

  const setScene = useCallback((nextScene: SoundtrackScene) => setSceneState(nextScene), []);
  const currentTrack = TRACKS[scene];

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = settings.volume;
    audio.muted = settings.muted;
  }, [settings]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || audio.src.endsWith(currentTrack.src)) return;
    audio.src = currentTrack.src;
    audio.load();
    if (hasStarted && isPlaying && !settings.muted) {
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [currentTrack.src, hasStarted, isPlaying, settings.muted]);

  const startMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = TRACKS[scene].src;
    audio.volume = settings.volume;
    audio.muted = false;
    setSettings((previous) => ({ ...previous, muted: false }));
    setHasStarted(true);
    audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  }, [scene, settings.volume]);

  const pauseMusic = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const toggleMute = useCallback(() => {
    const nextMuted = !settings.muted;
    setSettings((previous) => ({ ...previous, muted: nextMuted }));
    if (!nextMuted && hasStarted) {
      const audio = audioRef.current;
      audio?.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [hasStarted, settings.muted]);

  const setVolume = useCallback((value: number) => {
    const nextVolume = Math.min(1, Math.max(0, value));
    setSettings((previous) => ({ ...previous, volume: nextVolume }));
  }, []);

  const value = useMemo(() => ({ scene, track: currentTrack, isPlaying, isMuted: settings.muted, volume: settings.volume, setScene, startMusic, pauseMusic, toggleMute, setVolume }), [scene, currentTrack, isPlaying, settings, setScene, startMusic, pauseMusic, toggleMute, setVolume]);

  return <AudioContext.Provider value={value}>{children}<audio ref={audioRef} loop preload="metadata" /></AudioContext.Provider>;
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) throw new Error("useAudio must be used inside AudioProvider");
  return context;
}
