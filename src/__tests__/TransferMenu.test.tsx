import { render, screen } from '@testing-library/react';

import TransferMenu, { TransferMenuProps } from 'components/TransferMenu';

interface TestProps {
  id: number,
};

function TestContainer(props: TestProps) {
  return <div data-testid="element">{ props.id }</div>;
}

const inc = jest.fn();
const dec = jest.fn();
const reset = jest.fn();
const props: TransferMenuProps<TestProps> = {
  DisplayComponent: TestContainer,
  available: [{id: 0}],
  commitTransfer: jest.fn(),
  transferCountInc: inc,
  transferCountDec: dec,
  transferCountReset: reset,
};

describe("Tests for TransferMenu component", () => {
  beforeEach(() => {
    render(<TransferMenu { ...props } />);
  });

  test("Clicking an element inside the available pane transfers it to the outbound pane", () => {
    expect(screen.getByRole("heading", {name: "Available"}).parentNode.querySelector("[data-testId=element]")).not.toBeNull();
    expect(screen.getByRole("heading", {name: "Outbound"}).parentNode.querySelector("[data-testId=element]")).toBeNull();
    screen.getByTestId("element").click();
    expect(screen.getByRole("heading", {name: "Available"}).parentNode.querySelector("[data-testId=element]")).toBeNull();
    expect(screen.getByRole("heading", {name: "Outbound"}).parentNode.querySelector("[data-testId=element]")).not.toBeNull();
    expect(inc.mock.calls.length).toEqual(1);
  });

  test("Clicking an element inside the outbound pane transfers it to the available pane", () => {
    screen.getByTestId("element").click();

    expect(screen.getByRole("heading", {name: "Outbound"}).parentNode.querySelector("[data-testId=element]")).not.toBeNull();
    expect(screen.getByRole("heading", {name: "Available"}).parentNode.querySelector("[data-testId=element]")).toBeNull();
    screen.getByTestId("element").click();
    expect(screen.getByRole("heading", {name: "Outbound"}).parentNode.querySelector("[data-testId=element]")).toBeNull();
    expect(screen.getByRole("heading", {name: "Available"}).parentNode.querySelector("[data-testId=element]")).not.toBeNull();
    expect(inc.mock.calls.length).toEqual(1);
    expect(dec.mock.calls.length).toEqual(1);
  });
});
