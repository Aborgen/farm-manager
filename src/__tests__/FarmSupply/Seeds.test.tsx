import { renderHook, act } from '@testing-library/react-hooks';

import { Crop } from 'types/Crops';
import { useSeeds } from 'context/FarmSupply/Seeds';

describe("Tests for the seeds section of FarmSupply", () => {
  let seeds;
  beforeEach(() => {
    seeds = renderHook(() => useSeeds()).result;
  });

  test("incSeeds results in an incremented count for specific seed type", () => {
    const count = seeds.current.getSeeds(Crop.Carrot);
    act(() => {
      seeds.current.incSeeds(Crop.Carrot);
    });

    expect(seeds.current.getSeeds(Crop.Carrot)).toEqual(count + 1);
  });

  test("incSeeds throws an error if it is invoked when count is equal to the maximum", () => {
    act(() => {
      seeds.current.setSeeds(Crop.Carrot, seeds.current.state[Crop.Carrot].max);
    });

    // TODO: Doesn't throw? The test won't pass if this is removed...
    act(() => {
      seeds.current.incSeeds(Crop.Carrot);
    });

    const f = () => act(() => {
      seeds.current.incSeeds(Crop.Carrot);
    });

    expect(f).toThrow(/tried to increment/i);
  });

  test("decSeeds results in a decremented count for specific seed type", () => {
    const count = seeds.current.state[Crop.Carrot].count;
    act(() => {
      seeds.current.decSeeds(Crop.Carrot);
    });

    expect(seeds.current.state[Crop.Carrot].count).toEqual(count - 1);
  });

  test("decSeeds throws an error if it is invoked when count is equal to 0", () => {
    act(() => {
      seeds.current.setSeeds(Crop.Carrot, 0);
    });

    // TODO: [Same issue as increment past max]
    // Alternatively, if f is invoked before being passed into expect, the test also passes.
    const f = () => act(() => {
      seeds.current.decSeeds(Crop.Carrot);
    });

    f();
    expect(f).toThrow(/tried to decrement/i);
  });

  test("setSeeds sets the count of a particular seed", () => {
    act(() => {
      seeds.current.setSeeds(Crop.Carrot, 5);
    });

    expect(seeds.current.getSeeds(Crop.Carrot)).toEqual(5);
  });

  test("setSeeds throws an error if setting the count of a particular seed to be greater than its maximum", () => {
    const f = () => act(() => {
      seeds.current.setSeeds(Crop.Carrot, seeds.current.getMax(Crop.Carrot) + 1);
    });

    f();
    expect(f).toThrow(/tried to set.*above.*max/i);
  });

  test("setSeeds throws an error if setting the count of a particular seed to be less than 0", () => {
    const f = () => act(() => {
      seeds.current.setSeeds(Crop.Carrot, -1);
    });

    f();
    expect(f).toThrow(/tried to set.*below.*0/i);
  });

  test("getSeeds returns the count of a particular seed", () => {
    expect(seeds.current.getSeeds(Crop.Carrot)).toEqual(seeds.current.state[Crop.Carrot].count);
  });

  test("hasSeeds returns true if the count of a particular seed is greater than 0", () => {
    act(() => {
      seeds.current.setSeeds(Crop.Carrot, 5);
    });

    expect(seeds.current.hasSeeds(Crop.Carrot)).toEqual(true);
  });

  test("hasSeeds returns false if the count of a particular seed is 0", () => {
    act(() => {
      seeds.current.setSeeds(Crop.Carrot, 0);
    });

    expect(seeds.current.hasSeeds(Crop.Carrot)).toEqual(false);
  });

  test("atCapacity returns true if the count of a particular seed is equal to its maximum", () => {
    act(() => {
      seeds.current.setSeeds(Crop.Carrot, seeds.current.state[Crop.Carrot].max);
    });

    expect(seeds.current.atCapacity(Crop.Carrot)).toEqual(true);
  });

  test("atCapacity returns false if the count of a particular seed is less than its maximum", () => {
    act(() => {
      seeds.current.setSeeds(Crop.Carrot, 0);
    });

    expect(seeds.current.atCapacity(Crop.Carrot)).toEqual(false);
  });

  test("setMax sets the maximum of a particular seed", () => {
    act(() => {
      seeds.current.setMax(Crop.Carrot, 5);
    });

    expect(seeds.current.getMax(Crop.Carrot)).toEqual(5);
  });

  test("setMax throws an error when setting the maximum of a particular seed to a value less than 0", () => {
    const f = () => act(() => {
      seeds.current.setMax(Crop.Carrot, -1);
    });

    f();
    expect(f).toThrow(/tried to set.*less than 0/i);
  });

  test("setMax truncates count when setting a maximum value that is less than count", () => {
    act(() => {
      seeds.current.setSeeds(Crop.Carrot, 5);
    });

    act(() => {
      seeds.current.setMax(Crop.Carrot, 2);
    });

    expect(seeds.current.getSeeds(Crop.Carrot)).toEqual(2);
  });

  test("getMax returns the maximum of a particular seed", () => {
    expect(seeds.current.getMax(Crop.Carrot)).toEqual(seeds.current.state[Crop.Carrot].max);
  });
});
