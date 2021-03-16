import { renderHook, act } from '@testing-library/react-hooks';

import { useFarmhands } from 'context/FarmSupply/Farmhands';
import { Specialty } from 'types/Farmhands';

describe("Tests for the farmhands section of FarmSupply", () => {
  let farmhands;
  beforeEach(() => {
    farmhands = renderHook(() => useFarmhands()).result;
  });

  test("hire adds a new farmhand to state", () => {
    expect(farmhands.current.state.farmhandCount).toEqual(0);
    act(() => {
      farmhands.current.hire();
    });

    expect(farmhands.current.state.farmhandCount).toEqual(1);
  });

  test("hire throws an error if invoked when at farmhand limit", () => {
    act(() => {
      farmhands.current.setFarmhandLimit(0);
    });

    const f = () => act(() => {
      farmhands.current.hire();
    });

    f();
    expect(f).toThrow(/tried to.*farmhand.*above/i);
  });

  test("fire removes a farmhand from state", () => {
    act(() => {
      farmhands.current.hire();
    });
    expect(farmhands.current.state.farmhandCount).toEqual(1);

    act(() => {
      const { specialty, id } = farmhands.current.state.unassigned[0];
      farmhands.current.fire(specialty, id);
    });
    expect(farmhands.current.state.farmhandCount).toEqual(0);
  });

  test("fire throws an error if invoked when at 0 farmhands", () => {
    const f = () => act(() => {
      farmhands.current.fire();
    });

    f();
    expect(f).toThrow(/tried to.*farmhand.*below 0/i);
  });

  test("fire throws an error if farmhand does not exist", () => {
    act(() => {
      farmhands.current.hire();
    });
    expect(farmhands.current.state.farmhandCount).toEqual(1);

    const specialty = Specialty.None;
    const id = "-1";
    const f = () => act(() => {
      farmhands.current.fire(specialty, id);
    });

    f();
    expect(f).toThrow(/tried to.*nonexistant.*farmhand/i);
  });

  test("setFarmhandLimit is a setter for farmhandLimit in state", () => {
    act(() => {
      farmhands.current.setFarmhandLimit(5);
    });
    expect(farmhands.current.state.farmhandLimit).toEqual(5);
  });

  test("setFarmhandLimit throws an error if new limit is less than current number of farmhands", () => {
    act(() => {
      farmhands.current.hire();
    });

    const f = () => act(() => {
      farmhands.current.setFarmhandLimit(0);
    });

    f();
    expect(f).toThrow(/tried to set farmhandLimit.*less than/i);
  });

  test("hasFarmhands returns true if there are any farmhands", () => {
    act(() => {
      farmhands.current.hire();
    });
    expect(farmhands.current.hasFarmhands()).toEqual(true);
  });

  test("hasFarmhands returns false if there are no farmhands", () => {
    expect(farmhands.current.state.farmhandCount).toEqual(0);
    expect(farmhands.current.hasFarmhands()).toEqual(false);
  });

  test("atCapacity returns true if farmhandCount is equal to farmhandLimit", () => {
    act(() => {
      farmhands.current.setFarmhandLimit(0);
    });
    expect(farmhands.current.state.farmhandCount).toEqual(0);
    expect(farmhands.current.atCapacity()).toEqual(true);
  });

  test("atCapacity returns false if farmhandCount is not equal to farmhandLimit", () => {
    act(() => {
      farmhands.current.setFarmhandLimit(1);
    });
    expect(farmhands.current.state.farmhandCount).toEqual(0);
    expect(farmhands.current.atCapacity()).toEqual(false);
  });
  
  test("overwriteUnassigned is a setter for unassigned in state", () => {
    const unassigned = [1, 2, 3, 4];
    act(() => {
      farmhands.current.overwriteUnassigned(unassigned);
    });
    expect(farmhands.current.state.unassigned).toBe(unassigned);
  });
});
