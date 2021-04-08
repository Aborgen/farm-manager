import { render, screen, within, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FarmSupplyProvider } from 'context/FarmSupply';
import { PlayerActionsProvider } from 'context/PlayerActions';
import TheUI from 'components/TheUI';

function querySeedInput(crop: string) {
  const inputList = screen.getAllByText(new RegExp(crop, "i"));
  for (const item of inputList) {
    const element = within(item.parentNode).queryByLabelText(/count/i);
    if (element !== null) {
      return element;
    }
  }

  return null;
}

describe("Tests for rendering separate features of the ui", () => {
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

  test("Pressing any other menu tab while AssignmentPanel is open closes the AssignmentPanel", () => {
    screen.getByRole("button", { name: /assign/i }).click();
    expect(screen.queryByRole("combobox", { name: /assign/i })).not.toBeNull();

    screen.getByRole("button", { name: /shop/i }).click();
    expect(screen.queryByRole("combobox", { name: /assign/i })).toBeNull();
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

  test("Pressing any other menu tab while Shop is open closes the Shop", () => {
    screen.getByRole("button", { name: /shop/i }).click();
    expect(screen.queryByRole("button", { name: /seed/i })).not.toBeNull();

    screen.getByRole("button", { name: /assign/i }).click();
    expect(screen.queryByRole("button", { name: /seed/i })).toBeNull();
  });
});

//describe("Tests for the assign feature of the ui", () => {
//  beforeEach(() => {
//    render(
//      <PlayerActionsProvider>
//      <FarmSupplyProvider>
//        <TheUI />
//      </FarmSupplyProvider>
//      </PlayerActionsProvider>
//    );
//  });
//
//});

describe("Tests for the SeedStall section of the shop feature of the ui", () => {
  beforeEach(() => {
    render(
      <PlayerActionsProvider>
      <FarmSupplyProvider>
        <TheUI />
      </FarmSupplyProvider>
      </PlayerActionsProvider>
    );

    screen.getByRole("button", { name: /shop/i }).click();
    screen.getByRole("button", { name: /seed/i }).click();
    expect(screen.queryByRole("button", { name: /buy/i })).not.toBeNull();
  });

  test("When shop is open, pressing the seed section button when any other section is opened causes the seed store to be available", () => {
    screen.getByRole("button", { name: /job/i }).click();
    expect(screen.queryByRole("button", { name: /buy/i })).toBeNull();

    screen.getByRole("button", { name: /seed/i }).click();
    expect(screen.queryByRole("button", { name: /buy/i })).not.toBeNull();
  });

  test.each([["carrot", 2], ["corn", 1], ["celery", 10]])("Setting input value for a seed is reflected in that seed's section in the summary [%s input]", (crop, quantity) => {
    const input = querySeedInput(crop);
    expect(input).not.toBeNull();
    userEvent.type(input, String(quantity));

    const container = screen.getByRole("heading", { name: /total/i }).closest("div");
    expect(container).toHaveTextContent(new RegExp(crop, "i"));
    expect(container).toHaveTextContent(quantity);
    expect(container).toHaveTextContent(new RegExp(screen.getByTestId(`${crop}ListingPrice`).textContent * quantity), "i");
  });

  test("When seed inputs have a non-zero number and are then set to 0, the same seed's section in the summary is removed", () => {
    const input = querySeedInput("carrot");
    expect(input).not.toBeNull();
    userEvent.type(input, "3");
    userEvent.clear(input);
    userEvent.type(input, "0");

    const container = screen.getByRole("heading", { name: /total/i }).closest("div");
    expect(container).not.toHaveTextContent(/carrot/i);
    expect(container).not.toHaveTextContent("3");
    expect(container).not.toHaveTextContent(String(screen.getByTestId("carrotListingPrice").textContent * 3));
  });

  test("Seed inputs cannot be set below minimum", () => {
    const input = querySeedInput("carrot");
    expect(input).not.toBeNull();
    // To demonstrate behavior, set the input to any number first. At the start, nothing happens unless a number greater than 0 is input.
    userEvent.type(input, "5");
    userEvent.type(input, "-1");

    expect(input.value).toEqual(input.min);
  });

  test("Seed inputs cannot be set above the max property (controlled by component state)", () => {
    const input = querySeedInput("carrot");
    expect(input).not.toBeNull();
    userEvent.type(input, String(+input.max + 1));

    expect(input.value).toEqual(input.max);
  });

  test("Nothing happens if non-numeric values are input into seed inputs", () => {
    const input = querySeedInput("carrot");
    expect(input).not.toBeNull();
    userEvent.type(input, "one");

    expect(input.value).toEqual("");
  });

  test("Previous value is remembered when user clears input and then blurs from input", () => {
    const input = querySeedInput("carrot");
    expect(input).not.toBeNull();
    userEvent.type(input, "5");
    expect(input.value).toEqual("5");

    userEvent.clear(input);
    expect(input.value).toEqual("");
    fireEvent.blur(input);
    expect(input.value).toEqual("5");
  });

  test("Seed inputs remember the leftmost digit when pressing backspace at end of text until the input is empty, and then bluring from input", () => {
    const input = querySeedInput("carrot");
    expect(input).not.toBeNull();
    userEvent.type(input, "15");
    expect(input.value).toEqual("15");

    userEvent.type(input, "{backspace}{backspace}");
    expect(input.value).toEqual("");
    fireEvent.blur(input);
    expect(input.value).toEqual("1");
  });

  test.each([
    [ 3,  /three | 3/i, [3, 6, 9, 12, 15] ],
    [ 10, /ten | 10/i,  [10, 15] ],
  ])("Pressing add %i button adds an equal amount to that particular seed count, clamped by the input.max property", (n, re, expectedValues) => {
    const input = querySeedInput("carrot");
    const button = within(querySeedInput("carrot").parentNode.parentNode.parentNode).getByRole("button", { name: re });

    let i = 1;
    const values = [];
    expect(input.value).toEqual("");
    while (+input.value < +input.max) {
      button.click();
      if (n * i < +input.max) {
        expect(input.value).toEqual(String(n * i));
      }
      else {
        expect(input.value).toEqual(input.max);
      }

      values.push(+input.value);
      ++i;
    }

    expect(expectedValues).toEqual(values);
  });

  test("Pressing max button sets seed count to the maximum available seed count", () => {
    const input = querySeedInput("carrot");
    const button = within(querySeedInput("carrot").parentNode.parentNode).getByRole("button", { name: /max/i });
    expect(input.value).toEqual("");
    button.click();
    expect(input.value).toEqual(input.max);
  });

  test("If user changes the max property of a seed input, it will be reset when setting the value", () => {
    const input = querySeedInput("carrot");
    const oldMax = input.max;
    input.max = "1000";
    userEvent.type(input, "1000");
    expect(input.max).toEqual(oldMax);
    expect(input.value).toEqual(input.max);
  });

  test("If user changes the min property of a seed input, it will be reset when setting the value", () => {
    const input = querySeedInput("carrot");
    // Need to set an initial value, otherwise this behavior will not be properly tested.
    userEvent.type(input, "5");

    const oldMin = input.min;
    input.min = "-50";
    userEvent.type(input, "-1");
    expect(input.min).toEqual(oldMin);
    expect(input.value).toEqual(input.min);
  });

  test("Tabulation area of the SeedStall contains a grand total value", () => {
    const carrot = querySeedInput("carrot");
    expect(carrot).not.toBeNull();
    userEvent.type(carrot, "3");
    const corn = querySeedInput("corn");
    expect(corn).not.toBeNull();
    userEvent.type(corn, "2");
    const celery = querySeedInput("celery");
    expect(celery).not.toBeNull();
    userEvent.type(celery, "1");

    const carrotPrice = screen.getByTestId("carrotListingPrice").textContent * 3;
    const cornPrice = screen.getByTestId("cornListingPrice").textContent * 2;
    const celeryPrice = screen.getByTestId("celeryListingPrice").textContent * 1;
    const summary = screen.getByRole("heading", { name: new RegExp(`total: ${carrotPrice + cornPrice + celeryPrice}`, "i") }).closest("div");
    expect(summary).toHaveTextContent(String(carrotPrice));
    expect(summary).toHaveTextContent(String(cornPrice));
    expect(summary).toHaveTextContent(String(celeryPrice));
  });
});

describe.only("Tests for the JobBoard section of the shop feature of the ui", () => {
  beforeEach(() => {
    render(
      <PlayerActionsProvider>
      <FarmSupplyProvider>
        <TheUI />
      </FarmSupplyProvider>
      </PlayerActionsProvider>
    );

    screen.getByRole("button", { name: /shop/i }).click();
    screen.getByRole("button", { name: /job/i }).click();
    expect(screen.queryByRole("button", { name: /hire/i })).not.toBeNull();
  });

  test("When shop is open, pressing the job section button when any other section is opened causes the job board to be available", () => {
    screen.getByRole("button", { name: /seed/i }).click();
    expect(screen.queryByRole("button", { name: /hire/i })).toBeNull();

    screen.getByRole("button", { name: /job/i }).click();
    expect(screen.queryByRole("button", { name: /hire/i })).not.toBeNull();
  });

  test("Pressing the hire button increases the number of employed farmhands shown in farmhand count by one", () => {
    const countElement = screen.getByTestId("jobBoard-farmhand-count");
    expect(countElement).toHaveTextContent("0");
    screen.getByRole("button", { name: /hire/i }).click();
    expect(countElement).toHaveTextContent("1");
  });

  test("Pressing the hire button when at max capacity doesn't do anything", () => {
    const button = screen.getByRole("button", { name: /hire/i });
    const countElement = screen.getByTestId("jobBoard-farmhand-count");
    const capacity = +screen.getByTestId("jobBoard-farmhand-capacity").textContent;

    expect(button).toBeEnabled();
    for (let i = 0; i < capacity; ++i) {
      expect(+countElement.textContent).toBeLessThan(capacity);
      button.click();
    }

    expect(button).toBeDisabled();
    expect(+countElement.textContent).toEqual(capacity);
    button.click();
    expect(+countElement.textContent).toEqual(capacity);
  });
});
