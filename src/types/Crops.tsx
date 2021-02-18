enum GrowthStage {
  Planted,
  Growing,
  Finished,
};

enum Crop {
  Carrot = "carrot",
  Corn = "corn",
  Celery = "celery",
};

type SeedInfo = Record<Crop, { max: number, count: number }>;

export type { SeedInfo };
export { GrowthStage, Crop };
