import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CaseTracker from "@/components/tasks/CaseTracker";

// Header ve TaskList içindeki metinleri göre özelleştir
describe("CaseTracker", () => {
  it("renders Header and TaskList components", () => {
    render(<CaseTracker />);
    const createTaskButtons = screen.getAllByText(/Create Task/i);
    expect(createTaskButtons.length).toBeGreaterThanOrEqual(1);
  });

  //   it("creates a new task and displays it", () => {
  //     render(<CaseTracker />);

  //     // "Add Task" butonuna tıkla
  //     const addTaskButton = screen.getByText(/Add Task/i);
  //     fireEvent.click(addTaskButton);

  //     // Modal açıldıktan sonra inputlara task bilgisi gir
  //     const titleInput = screen.getByLabelText(/Title/i);
  //     const descriptionInput = screen.getByLabelText(/Description/i);
  //     const saveButton = screen.getByText(/Save/i);

  //     fireEvent.change(titleInput, { target: { value: "Test Task" } });
  //     fireEvent.change(descriptionInput, { target: { value: "Test Desc" } });
  //     fireEvent.click(saveButton);

  //     // Task listede görünüyor mu?
  //     expect(screen.getByText("Test Task")).toBeInTheDocument();
  //   });

  //   it("filters tasks by search query", () => {
  //     render(<CaseTracker />);

  //     // Direkt task oluşturalım (modal olmadan state üzerinden)
  //     const inputTitle = "My Awesome Task";

  //     // simulate task creation
  //     const createButton = screen.getByText(/Add Task/i);
  //     fireEvent.click(createButton);

  //     fireEvent.change(screen.getByLabelText(/Title/i), {
  //       target: { value: inputTitle },
  //     });
  //     fireEvent.change(screen.getByLabelText(/Description/i), {
  //       target: { value: "Lorem ipsum" },
  //     });

  //     fireEvent.click(screen.getByText(/Save/i));

  //     // filtrele
  //     const searchInput = screen.getByPlaceholderText(/Search/i);
  //     fireEvent.change(searchInput, { target: { value: "Awesome" } });

  //     expect(screen.getByText(inputTitle)).toBeInTheDocument();
  //   });
});
