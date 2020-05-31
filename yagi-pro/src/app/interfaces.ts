export interface YagiInterface {
  frequency: number; // MHz
  elements: number;
  gain: number; // dBd
  boomLength: number; // mm
  parasiticDiameter: number; // mm
  boomDiameter: number; // mm
  boomIsolated: boolean;
  yagiElements: YagiElementInterface;
}

export interface YagiElementInterface {
  name: string;
  length: number;
  position: number;
  distance: number;
}
