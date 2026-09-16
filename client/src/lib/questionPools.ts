import type { Challenge } from "@/lib/activities";
import { compositionDockBank } from "@/lib/question-banks/composition-dock";
import { frontierFinalBank } from "@/lib/question-banks/frontier-final";
import { functionScoutBank } from "@/lib/question-banks/function-scout";
import { intervalObservatoryBank } from "@/lib/question-banks/interval-observatory";
import { inversePortalBank } from "@/lib/question-banks/inverse-portal";
import { operationForgeBank } from "@/lib/question-banks/operation-forge";
import { piecewiseDispatchBank } from "@/lib/question-banks/piecewise-dispatch";
import { quadraticSkylineBank } from "@/lib/question-banks/quadratic-skyline";
import { rateOfChangeLabBank } from "@/lib/question-banks/rate-of-change-lab";
import { representationRelayBank } from "@/lib/question-banks/representation-relay";
import { symmetryScannerBank } from "@/lib/question-banks/symmetry-scanner";
import { terrainAnalyzerBank } from "@/lib/question-banks/terrain-analyzer";
import { transformationBayBank } from "@/lib/question-banks/transformation-bay";

export const QUESTION_POOLS: Record<string, Challenge[]> = {
  "function-scout": functionScoutBank,
  "representation-relay": representationRelayBank,
  "interval-observatory": intervalObservatoryBank,
  "piecewise-dispatch": piecewiseDispatchBank,
  "terrain-analyzer": terrainAnalyzerBank,
  "symmetry-scanner": symmetryScannerBank,
  "rate-of-change-lab": rateOfChangeLabBank,
  "transformation-bay": transformationBayBank,
  "operation-forge": operationForgeBank,
  "composition-dock": compositionDockBank,
  "inverse-portal": inversePortalBank,
  "quadratic-skyline": quadraticSkylineBank,
  "frontier-final": frontierFinalBank,
};

export const QUESTION_POOL_SIZES = Object.fromEntries(Object.entries(QUESTION_POOLS).map(([id, pool]) => [id, pool.length]));
