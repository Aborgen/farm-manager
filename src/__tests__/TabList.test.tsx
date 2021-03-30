import { render, screen } from '@testing-library/react';

import TabList from 'components/TabList';

const setSelected = jest.fn();
const props = {
  members: [
    { identifier: 0, name: "zero" },
    { identifier: 1, name: "one" },
    { identifier: 2, name: "two" },
  ],
  setSelected,
};

describe("Tests for the TabList component", () => {
  test("Pressing a tab invokes the parent's selected setter with identifier corresponding with tab", () => {
    render(
      <TabList { ...props }
        selected={ null }
        tabsAreToggleButtons={ false }
        style={{}} />
    );

    screen.getByRole("button", { name: "one" }).click();
    expect(setSelected).toHaveBeenCalledWith(1);
  });

  test("When tabsAreToggleButtons is false and currently selected tab is pressed again, parent's selected setter is not invoked", () => {
    render(
      <TabList { ...props }
        selected={ 2 }
        tabsAreToggleButtons={ false }
        style={{}} />
    );

    screen.getByRole("button", { name: "two" }).click();
    expect(setSelected).not.toHaveBeenCalled();
  });

  test("When tabsAreToggleButtons is true and the currently selected tab is pressed again, selected tab is unset", () => {
    render(
      <TabList { ...props }
        selected={ 0 }
        tabsAreToggleButtons={ true }
        style={{}} />
    );

    screen.getByRole("button", { name: "zero" }).click();
    expect(setSelected).toHaveBeenCalledWith(null);
  });
});
