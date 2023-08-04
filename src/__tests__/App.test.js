import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";

describe("App component testing", () => {
  test("renders App component without crashing", () => {
    render(<App />);
  });

  test("clicking 'Add a new task' button should open the modal", () => {
    const { getByText, getByRole } = render(<App />);
    const addButton = getByText("Add a new task");
    fireEvent.click(addButton);
    const modal = getByRole("presentation");
    expect(modal).toBeInTheDocument();
  });

  test("check if snackbar appears when adding a task", async () => {
    const { getByText, getByLabelText } = render(<App />);

    const addButton = getByText("Add a new task");
    fireEvent.click(addButton);

    const titleInput = getByLabelText("Task Title");
    const descriptionInput = getByLabelText("Task Description");
    const addTaskButton = getByText("Add Task");

    fireEvent.change(titleInput, { target: { value: "Test Task" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Test Description" },
    });

    fireEvent.click(addTaskButton);

    await waitFor(() => {
      expect(getByText("Task added successfully")).toBeInTheDocument();
    });
  });

  test("does not allow adding a task without title and description", async () => {
    const { getByText, queryByText } = render(<App />);

    const addButton = getByText("Add a new task");
    fireEvent.click(addButton);

    const addTaskButton = getByText("Add Task");

    fireEvent.click(addTaskButton);

    await waitFor(() => {
      expect(getByText("Please fill in all fields")).toBeInTheDocument();
    });

    expect(queryByText("Test Task")).toBeNull();
    expect(queryByText("Test Description")).toBeNull();
  });

  test("initially, the task list should be empty", () => {
    const { queryByText } = render(<App />);

    expect(queryByText("Test Task")).toBeNull();
    expect(queryByText("Test Description")).toBeNull();
  });

  test("the modal is not visible initially", () => {
    const { queryByRole } = render(<App />);
    const modal = queryByRole("presentation");
    expect(modal).not.toBeInTheDocument();
  });
});
