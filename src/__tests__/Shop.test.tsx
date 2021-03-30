import { render, screen, within } from '@testing-library/react';

import { FarmSupplyProvider, useFarmSupplyContext } from 'context/FarmSupply';
import { Crop } from 'types/Crops';
import Shop from 'components/TheUI/internal/MenuTabs/internal/Shop';

function CountComponent(props) {
  const { seeds, farmhands } = useFarmSupplyContext();
  function render() {
    switch (props.type) {
      case "seeds":
        return (
          <>
          <label htmlFor="count-seeds">Count Seeds</label>
          <input readOnly id="count-seeds" value={ seeds.getSeeds(Crop.Carrot) }/>
          </>
        );
      case "farmhands": 
        return (
          <>
          <label htmlFor="count-farmhands">Count Farmhands</label>
          <input readOnly id="count-farmhands" value={ farmhands.state.farmhandCount }/>
          </>
        );
    }
  }
  return (
    <div>
      {
        render()
      }
    </div>
  );
}

function queryCarrotSeedButton(text = null) {
  const container = screen.getByLabelText(/carrot.*seed/i);
  if (text === null) {
    return container.closest("button");
  }

  return within(container.parentNode).queryByRole("button", { name: new RegExp(text, "i") });
}

function queryHireButton(text = null) {
  if (text === null) {
    return screen.queryByText(/hire|no/i);
  }

  return screen.queryByRole("button", { name: new RegExp(text, "i") });
}

describe("Tests for the Shop component", () => {
  beforeEach(() => {
    render(
      <FarmSupplyProvider>
        <Shop />
        <CountComponent type={ "seeds" }/>
        <CountComponent type={ "farmhands" }/>
      </FarmSupplyProvider>
    );
  });

  test("Pressing the open button opens up the SeedStall section of the shop", () => {
    screen.getByRole("button", { name: /enter/i }).click();
    expect(screen.queryByRole("heading", { name: /seeds/i })).not.toBeNull();
  });

  test("When inside SeedStall, pressing a buy button will increment the corresponding seed count by one", () => {
    screen.getByRole("button", { name: /enter/i }).click();

    const count = Number(screen.getByRole("textbox", { name: "Count Seeds" }).value);
    queryCarrotSeedButton().click();
    expect(Number(screen.getByRole("textbox", { name: "Count Seeds" }).value)).toEqual(count + 1);
  });

  test("When inside SeedStall, seeds can be purchased until at max capacity of that particular seed", () => {
    screen.getByRole("button", { name: /enter/i }).click();

    // While the button's text contains the word "buy"
    expect(queryCarrotSeedButton()).toBeEnabled();
    let buy = queryCarrotSeedButton("buy");
    while (buy) {
      buy.click();
      buy = queryCarrotSeedButton("buy");
    }

    expect(queryCarrotSeedButton()).toBeDisabled();
  });

  test("Selecting the Job Board tab opens up the JobBoard", () => {
    screen.getByRole("button", { name: /enter/i }).click();

    screen.queryByRole("button", { name: /job/i }).click();
    expect(screen.queryByRole("heading", { name: /job/i })).not.toBeNull();
  });

  test("When inside JobBoard, pressing the hire button increments the number of farmhands by one", () => {
    screen.getByRole("button", { name: /enter/i }).click();
    screen.queryByRole("button", { name: /job/i }).click();

    const count = Number(screen.getByRole("textbox", { name: "Count Farmhands" }).value);
    screen.getByRole("button", { name: /hire/i }).click();
    expect(Number(screen.getByRole("textbox", { name: "Count Farmhands" }).value)).toEqual(count + 1);
  });

  test("When inside JobBoard, farmhands can be hired until there are no more vacancies", () => {
    screen.getByRole("button", { name: /enter/i }).click();
    screen.queryByRole("button", { name: /job/i }).click();

    // While the button's text contains the word "hire"
    expect(queryHireButton()).toBeEnabled();
    let hire = queryHireButton("hire");
    while (hire) {
      hire.click();
      hire = queryHireButton("hire");
    }

    expect(queryHireButton()).toBeDisabled();
  });

  test("While the Shop is open, clicking on the exit button closes the Shop", () => {
    screen.getByRole("button", { name: /enter/i }).click();

    expect(screen.queryByRole("heading", { name: /seeds/i })).not.toBeNull();
    screen.getByRole("button", { name: /exit/i }).click();
    expect(screen.queryByRole("heading", { name: /seeds/i })).toBeNull();
  });
});
