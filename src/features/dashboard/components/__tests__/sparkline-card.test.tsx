import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderWithProviders } from "@/test/test-utils";
import SparklineCard from "../sparkline-card";

describe("SparklineCard Component", () => {
  test("does not render if is loading is true", () => {
    //arrange
    renderWithProviders(
      <SparklineCard title="Completed" total={42} color="green" isLoading={true}>
        <div data-testid="spark">spark</div>
      </SparklineCard>
    );

    // assert
    expect(screen.queryByText("Completed")).not.toBeInTheDocument();
  });

  test("renders title and total and children", () => {
    // arrange
    renderWithProviders(
      <SparklineCard title="Completed" total={42} color="green" isLoading={false}>
        <div data-testid="spark">spark</div>
      </SparklineCard>
    );

    //   assert
    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  test("render the children pass to it", () => {
    // arrange
    renderWithProviders(
      <SparklineCard title="Completed" total={42} color="green" isLoading={false}>
        <div data-testid="spark">spark</div>
      </SparklineCard>
    );

    //   assert
    expect(screen.getByTestId("spark")).toBeInTheDocument();
  });
});
