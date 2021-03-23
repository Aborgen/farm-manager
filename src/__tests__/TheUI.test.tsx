import { render, screen } from '@testing-library/react';

import { FarmSupplyProvider } from 'context/FarmSupply';
import { PlayerActionsProvider } from 'context/PlayerActions';
import TheUI from 'components/TheUI';

describe("Tests for TheUI component", () => {
  beforeEach(() => {
    render(
      <PlayerActionsProvider>
      <FarmSupplyProvider>
        <TheUI />
      </FarmSupplyProvider>
      </PlayerActionsProvider>
    );
  });

  test("Pressing assign menu tab opens the AssignmentPanel", () => {
    expect(screen.queryByRole("combobox", { name: /assign/i })).toBeNull();
    screen.getByRole("button", { name: /assign/i }).click();
    expect(screen.queryByRole("combobox", { name: /assign/i })).not.toBeNull();
  });

  test("Pressing assign menu tab while AssignmentPanel is already open closes the AssignmentPanel", () => {
    screen.getByRole("button", { name: /assign/i }).click();
    expect(screen.queryByRole("combobox", { name: /assign/i })).not.toBeNull();

    screen.getByRole("button", { name: /assign/i }).click();
    expect(screen.queryByRole("combobox", { name: /assign/i })).toBeNull();
  });
});
