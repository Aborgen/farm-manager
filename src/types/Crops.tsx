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

type Storage<T extends keyof any> = Record<T, { max: number, count: number, price: number, }>;
type SeedStorage = Storage<Crop>;

export type { Storage, SeedStorage };
export { GrowthStage, Crop };
