import { useEffect } from 'react';
import { render, screen, within } from '@testing-library/react';

import Plot from 'components/Plot';
import { PlayerActionsProvider } from 'context/PlayerActions';
import { FarmSupplyProvider, useFarmSupplyContext } from 'context/FarmSupply';

const props = {
  grade: 0,
  index: 0,
  name: "",
};

function findPlotRoot() {
  return screen.getByRole("heading", { name: /name:/i }).parentNode;
}

function findRows () {
  return findPlotRoot().querySelectorAll(".row");
}

function TestAssignmentButton() {
  const { farmhands, establishments } = useFarmSupplyContext();
  useEffect(() => {
    farmhands.hire();
  }, []);

  return (<button onClick={ () => establishments.get()[0].current.props.assignTo(farmhands.state.unassigned) }>assign to</button>);
}

describe("Tests for the Plot component", () => {
  beforeEach(() => {
    render(
      <PlayerActionsProvider>
      <FarmSupplyProvider>
        <Plot { ...props } />
        <TestAssignmentButton />
      </FarmSupplyProvider>
      </PlayerActionsProvider>
    );
  });

  test("When clicked, Plot gains Focus and a collection of planting buttons appears", () => {
    expect(screen.queryAllByRole("button", { name: /plant/i }).length).toEqual(0);
    findPlotRoot().click();
    expect(screen.getAllByRole("button", { name: /plant/i }).length).toBeGreaterThan(0);
  });

  test("When planting button is clicked, a new row is planted", () => {
    // buttons mentioned below do not exist if Plot hasn't been given Focus by clicking on it first.
    findPlotRoot().click();

    expect(findRows().length).toEqual(0);
    screen.queryAllByRole("button", { name: /plant/i })[0].click();
    expect(findRows().length).toEqual(1);
  });

  test("When planting button is clicked, the row counter is incremented by one", () => {
    findPlotRoot().click();

    expect(findPlotRoot().querySelector(".plot-row-counter").textContent).toMatch(/0.*/);
    screen.queryAllByRole("button", { name: /plant/i })[0].click();
    expect(findPlotRoot().querySelector(".plot-row-counter").textContent).toMatch(/1.*/);
  });

  test("When farmhands are assigned to Plot, they are rendered within the component", () => {
    expect(findPlotRoot().querySelectorAll(".farmhand").length).toEqual(0);
    screen.getByRole("button", { name: "assign to" }).click();
    expect(findPlotRoot().querySelectorAll(".farmhand").length).toEqual(1);
  });

  test("When clicked, Row gains Focus and a dialogue appears within it", () => {
    findPlotRoot().click();
    screen.queryAllByRole("button", { name: /plant/i })[0].click();

    expect(findRows()[0].querySelector(".dialogue")).toBeNull();
    findRows()[0].click();
    expect(findRows()[0].querySelector(".dialogue")).not.toBeNull();
  });

  test("When Row's sell button is clicked, Row no longer exists", () => {
    findPlotRoot().click();
    screen.queryAllByRole("button", { name: /plant/i })[0].click();
    findRows()[0].click();

    expect(findRows().length).toEqual(1);
    within(findRows()[0]).queryByRole("button", { name: /sell/i }).click();
    expect(findRows().length).toEqual(0);
  });

  test("When Row's sell button is clicked, the row counter is decremented by one", () => {
    findPlotRoot().click();
    screen.queryAllByRole("button", { name: /plant/i })[0].click();
    findRows()[0].click();

    expect(findPlotRoot().querySelector(".plot-row-counter").textContent).toMatch(/1.*/);
    within(findRows()[0]).queryByRole("button", { name: /sell/i }).click();
    expect(findPlotRoot().querySelector(".plot-row-counter").textContent).toMatch(/0.*/);
  });
});
