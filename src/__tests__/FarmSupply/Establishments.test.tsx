import { renderHook, act } from '@testing-library/react-hooks';

import { useEstablishments } from 'context/FarmSupply/Establishments';

describe("Tests for the establishments section of FarmSupply", () => {
  let establishments;
  beforeEach(() => {
    establishments = renderHook(() => useEstablishments()).result;
  });

  test("get is a getter that returns array of registered establishments", () => {
    const result = establishments.current.get();
    expect(result).toBe(establishments.current.state.establishments);
  });

  test("push appends an establishment to the end of the establishment array", () => {
    const establishment = 1;
    act(() => {
      establishments.current.push(establishment);
    });

    expect(establishments.current.state.establishments[0]).toBe(establishment);
  });

  test("assignTo invokes establishment's internal assingTo method, passing an array of farmhands as argument", () => {
    const assignTo = jest.fn().mockName("assignTo");
    const farmhands = [1, 2, 3, 4];
    const establishment = {
      current: {
        props: { assignTo }
      }
    };

    act(() => {
      establishments.current.assignTo(establishment, farmhands);
    });

    expect(assignTo.mock.calls.length).toEqual(1);
    expect(assignTo.mock.calls[0][0]).toBe(farmhands);
  });
});
