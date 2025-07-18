import CustomPagination from "@/components/tasks/CustomPagination";
import { render, screen, fireEvent } from "@testing-library/react";

describe("CustomPagination", () => {
  it("displays correct page information", () => {
    render(
      <CustomPagination page={2} totalPages={5} onPageChange={() => {}} />
    );
    expect(screen.getByText("Page 2 of 5")).toBeInTheDocument();
  });

  it("calls onPageChange with previous page number", () => {
    const mockFn = jest.fn();
    render(<CustomPagination page={3} totalPages={5} onPageChange={mockFn} />);
    fireEvent.click(screen.getByTestId("pagination-previous"));
    expect(mockFn).toHaveBeenCalledWith(2);
  });

  it("calls onPageChange with next page number", () => {
    const mockFn = jest.fn();
    render(<CustomPagination page={3} totalPages={5} onPageChange={mockFn} />);
    fireEvent.click(screen.getByTestId("pagination-next"));
    expect(mockFn).toHaveBeenCalledWith(4);
  });

  it("disables previous button on first page", () => {
    render(
      <CustomPagination page={1} totalPages={5} onPageChange={() => {}} />
    );
    const prev = screen.getByTestId("pagination-previous");
    expect(prev).toHaveClass("cursor-not-allowed");
  });

  it("disables next button on last page", () => {
    render(
      <CustomPagination page={5} totalPages={5} onPageChange={() => {}} />
    );
    const next = screen.getByTestId("pagination-next");
    expect(next).toHaveClass("cursor-not-allowed");
  });

  it("disables both buttons when totalPages is 1", () => {
    render(
      <CustomPagination page={1} totalPages={1} onPageChange={() => {}} />
    );
    expect(screen.getByTestId("pagination-previous")).toHaveClass(
      "cursor-not-allowed"
    );
    expect(screen.getByTestId("pagination-next")).toHaveClass(
      "cursor-not-allowed"
    );
  });

  it("handles invalid page number less than 1 gracefully", () => {
    const mockFn = jest.fn();
    render(<CustomPagination page={0} totalPages={5} onPageChange={mockFn} />);
    fireEvent.click(screen.getByTestId("pagination-previous"));
    expect(mockFn).toHaveBeenCalledWith(1);
  });

  it("renders safely when totalPages is 0", () => {
    render(
      <CustomPagination page={1} totalPages={0} onPageChange={() => {}} />
    );
    expect(screen.getByText("Page 1 of 0")).toBeInTheDocument();
  });

  it("applies cursor-pointer class on active buttons", () => {
    render(
      <CustomPagination page={2} totalPages={5} onPageChange={() => {}} />
    );
    expect(screen.getByTestId("pagination-previous")).toHaveClass(
      "cursor-pointer"
    );
    expect(screen.getByTestId("pagination-next")).toHaveClass("cursor-pointer");
  });
});
