export enum PlotGrade {
  Poor,
  Good,
  Great,
  Excellent,
};

export interface Plot {
  grade: PlotGrade,
  index: number,
  name: string,
};

