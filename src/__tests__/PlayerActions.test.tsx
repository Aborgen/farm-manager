import { renderHook, act } from '@testing-library/react-hooks';

import { usePlayerActionsContext, PlayerActionsProvider } from 'context/PlayerActions';

describe("Tests for the establishments section of FarmSupply", () => {
  let playerActions;
  beforeEach(() => {
    playerActions = renderHook(() => usePlayerActionsContext(), {
      wrapper: PlayerActionsProvider
    }).result;
  });

  test("setFocus sets a react ref in state", () => {
    const ref = { current: 1 };
    act(() => {
      playerActions.current.setFocus(ref);
    });

    expect(playerActions.current.state.focus).toBe(ref);
  });

  test("clearFocus sets focus to null", () => {
    const ref = { current: 1 };
    act(() => {
      playerActions.current.setFocus(ref);
    });

    expect(playerActions.current.state.focus).toBe(ref);

    act(() => {
      playerActions.current.clearFocus();
    });

    expect(playerActions.current.state.focus).toBeNull();
  });
});
