import { TooltipProvider } from "@/components/ui/tooltip";
import MusicControl from "@/components/MusicControl";
import NotFound from "@/pages/NotFound";
import { Route, Router, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ErrorBoundary from "./components/ErrorBoundary";
import { AudioProvider } from "./contexts/AudioContext";
import { GameProvider } from "./contexts/GameContext";
import Home from "./pages/Home";
import MissionPage from "./pages/MissionPage";
import CipherVaultPage from "./pages/CipherVaultPage";

function AppRouter() {
  return <Router hook={useHashLocation}><Switch><Route path="/" component={Home} /><Route path="/mission/cipher-vault" component={CipherVaultPage} /><Route path="/mission/:id" component={MissionPage} /><Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch></Router>;
}

function App() {
  return <ErrorBoundary><GameProvider><AudioProvider><TooltipProvider><AppRouter /><MusicControl /></TooltipProvider></AudioProvider></GameProvider></ErrorBoundary>;
}

export default App;
