import { render, screen } from '@testing-library/react';

import { FarmSupplyProvider } from 'context/FarmSupply';
import { PlayerActionsProvider } from 'context/PlayerActions';
import TheUI from 'components/TheUI';

describe("Tests for the assign feature of the ui", () => {
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

describe("Tests for the shop feature of the ui", () => {
  beforeEach(() => {
    render(
      <PlayerActionsProvider>
      <FarmSupplyProvider>
        <TheUI />
      </FarmSupplyProvider>
      </PlayerActionsProvider>
    );
  });

  test("Pressing shop menu tab opens the Shop", () => {
    expect(screen.queryByRole("button", { name: /seed/i })).toBeNull();
    screen.getByRole("button", { name: /shop/i }).click();
    expect(screen.queryByRole("button", { name: /seed/i })).not.toBeNull();
  });

  test("Pressing shop menu tab while Shop is already open closes the Shop", () => {
    screen.getByRole("button", { name: /shop/i }).click();
    expect(screen.queryByRole("button", { name: /seed/i })).not.toBeNull();

    screen.getByRole("button", { name: /shop/i }).click();
    expect(screen.queryByRole("button", { name: /seed/i })).toBeNull();
  });

  test("When shop is open, pressing the seed section button causes the seed store to be available", () => {
    screen.getByRole("button", { name: /shop/i }).click();
    expect(screen.queryByRole("button", { name: /seed/i })).not.toBeNull();

    screen.getByRole("button", { name: /seed/i }).click();
    expect(screen.queryByRole("button", { name: /buy/i })).not.toBeNull();
  });

  test("When shop is open, pressing the job section button causes the job board to be available", () => {
    screen.getByRole("button", { name: /shop/i }).click();
    expect(screen.queryByRole("button", { name: /seed/i })).not.toBeNull();

    screen.getByRole("button", { name: /job/i }).click();
    expect(screen.queryByRole("button", { name: /hire/i })).not.toBeNull();
  });
});
