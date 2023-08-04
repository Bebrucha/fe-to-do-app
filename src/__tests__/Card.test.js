import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TaskCard from "../Components/Card";

const sampleTask = {
  id: 1,
  title: "Test Task",
  description: "This is a test task",
  status: false,
};

describe("TaskCard component testing", () => {
  test("renders the task title and description", () => {
    const { getByText } = render(<TaskCard task={sampleTask} />);
    const titleElement = getByText("Test Task");
    const descriptionElement = getByText("This is a test task");

    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });

  test("calls the onDeleteTask function when the delete button is clicked", () => {
    const onDeleteTaskMock = jest.fn();
    const { getByText } = render(
      <TaskCard task={sampleTask} onDeleteTask={onDeleteTaskMock} />
    );

    const deleteButton = getByText("Delete");
    fireEvent.click(deleteButton);

    expect(onDeleteTaskMock).toHaveBeenCalledTimes(1);
    expect(onDeleteTaskMock).toHaveBeenCalledWith(1);
  });

  test("calls the onUpdateTask function when the 'Finish' button is clicked and task status is not completed", () => {
    const onUpdateTaskMock = jest.fn();
    const { getByText } = render(
      <TaskCard task={sampleTask} onUpdateTask={onUpdateTaskMock} />
    );

    const finishButton = getByText("Finish");
    fireEvent.click(finishButton);

    expect(onUpdateTaskMock).toHaveBeenCalledTimes(1);
    expect(onUpdateTaskMock).toHaveBeenCalledWith(1, { status: true });
  });

  test("calls the onUpdateTask function when the 'Undo' button is clicked and task status is completed", () => {
    const onUpdateTaskMock = jest.fn();
    const { getByText } = render(
      <TaskCard
        task={{ ...sampleTask, status: true }}
        onUpdateTask={onUpdateTaskMock}
      />
    );

    const undoButton = getByText("Undo");
    fireEvent.click(undoButton);

    expect(onUpdateTaskMock).toHaveBeenCalledTimes(1);
    expect(onUpdateTaskMock).toHaveBeenCalledWith(1, { status: false });
  });
});
