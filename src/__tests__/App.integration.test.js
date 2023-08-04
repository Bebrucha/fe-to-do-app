import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import TaskCard from "../Components/Card";
import App from "../App";

jest.mock("axios");

test("renders App component and fetches tasks", async () => {
  axios.get.mockResolvedValueOnce({
    data: {
      tasks: [
        {
          id: 1,
          title: "Test Task",
          description: "Test Description",
          status: "true",
        },
      ],
    },
  });
  render(<App />);

  await waitFor(() => {
    expect(
      screen.getByText((content, element) => content.includes("Test Task"))
    ).toBeInTheDocument();
  });
});

test("adds a new task", async () => {
  axios.post.mockResolvedValueOnce({
    data: {
      id: 2,
      title: "New Task Title",
      description: "New Task Description",
      status: false,
    },
  });

  render(<App />);

  fireEvent.click(screen.getByText("Add a new task"));

  fireEvent.change(screen.getByLabelText("Task Title"), {
    target: { value: "New Task Title" },
  });
  fireEvent.change(screen.getByLabelText("Task Description"), {
    target: { value: "New Task Description" },
  });

  fireEvent.click(screen.getByText("Add Task"));

  await screen.findByText("Task added successfully");

  await screen.findByText("New Task Title");
  await screen.findByText("New Task Description");
});

test("updates a task", async () => {
  axios.put.mockResolvedValueOnce({
    data: {
      id: 1,
      title: "Updated Task Title",
      description: "Updated Task Description",
      status: false,
    },
  });

  render(<App />);

  const mockTask = {
    id: 1,
    title: "Existing Task",
    description: "Existing Description",
    status: false,
  };

  render(<TaskCard id={mockTask.id} task={mockTask} />);

  await screen.findByText("Existing Task");
  await screen.findByText("Existing Description");

  fireEvent.change(screen.getByLabelText("Task Title"), {
    target: { value: "Updated Task Title" },
  });
  fireEvent.change(screen.getByLabelText("Task Description"), {
    target: { value: "Updated Task Description" },
  });

  fireEvent.click(screen.getByText("Save"));

  await waitFor(() => {
    expect(screen.getByText("Task updated successfully")).toBeInTheDocument();
  });

  await screen.findByText("Updated Task Title");
  await screen.findByText("Updated Task Description");
});

test("deletes a task", async () => {
  const mockTask = {
    id: 1,
    title: "Task to Delete",
    description: "Description of Task to Delete",
    status: false,
  };

  axios.delete.mockResolvedValueOnce({
    data: {
      id: 1,
      title: "Task to Delete",
      description: "Description of Task to Delete",
      status: false,
    },
  });

  render(<TaskCard id={mockTask.id} task={mockTask} />);

  await screen.findByText("Task to Delete");
  await screen.findByText("Description of Task to Delete");

  fireEvent.click(screen.getByText("Delete"));

  fireEvent.click(screen.getByText("Confirm"));

  await screen.findByText("Task deleted successfully");

  expect(screen.queryByText("Task to Delete")).not.toBeInTheDocument();
});
