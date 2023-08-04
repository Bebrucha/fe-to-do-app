import React, { useState, useEffect } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CustomSnackbar from "./Components/SnackBar";
import TaskCard from "./Components/Card";
import {
  getAllTasks,
  addTask,
  updateTask,
  deleteTask,
} from "./Utils/task-axios-utils";

function App() {
  const [tasks, setTasks] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");

  useEffect(() => {
    handleFetchTasks();
  }, []);

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleFetchTasks = async () => {
    try {
      const tasksData = await getAllTasks();
      if (tasksData) {
        setTasks(tasksData);
      }
    } catch (error) {}
  };

  const handleAddTask = async () => {
    try {
      if (!newTaskDescription || !newTaskTitle) {
        setSnackbarSeverity("error");
        handleSnackbarOpen("Please fill in all fields");
        return;
      } else {
        setSnackbarSeverity("success");
        handleSnackbarOpen("Task added successfully");
      }
      const newTask = {
        title: newTaskTitle,
        description: newTaskDescription,
        status: false,
      };
      const addedTask = await addTask(newTask);
      if (addedTask) {
        setTasks((prevTasks) => [...prevTasks, addedTask]);
        setOpenModal(false);
        setNewTaskTitle("");
        setNewTaskDescription("");
      }
    } catch (error) {}
  };

  const handleDeleteTask = (taskId) => {
    const taskToDelete = tasks.find((task) => task.id === taskId);
    setTaskToDelete(taskToDelete);
    setConfirmDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (taskToDelete) {
        const deletedTask = await deleteTask(taskToDelete.id);
        if (deletedTask) {
          setTasks((prevTasks) =>
            prevTasks.filter((task) => task.id !== deletedTask.id)
          );
        }
      }

      setConfirmDeleteModalOpen(false);
      setTaskToDelete(null);
      handleFetchTasks();
      setSnackbarMessage("Task deleted successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {}
  };

  const handleUpdateTask = async (taskId, updatedTaskData) => {
    try {
      await updateTask(taskId, updatedTaskData);
      handleFetchTasks();
      setSnackbarMessage("Task updated successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {}
  };

  return (
    <div className="main-container">
      <h1>List of your tasks</h1>
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={handleSnackbarClose}
        severity={snackbarSeverity}
      />
      <Button
        variant="contained"
        color="success"
        startIcon={<AddCircleRoundedIcon />}
        onClick={() => setOpenModal(true)}
      >
        Add a new task
      </Button>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            p: 4,
            backgroundColor: "#fff",
            boxShadow: 24,
            borderRadius: 4,
          }}
        >
          <h2 id="modal-title">Add a new task</h2>
          <TextField
            style={{ marginBottom: "1rem" }}
            label="Task Title"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            fullWidth
          />
          <TextField
            style={{ marginBottom: "1rem" }}
            label="Task Description"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            fullWidth
            multiline
            rows={4}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleAddTask}
          >
            Add Task
          </Button>
        </Box>
      </Modal>
      <Modal
        open={confirmDeleteModalOpen}
        onClose={() => setConfirmDeleteModalOpen(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            p: 4,
            backgroundColor: "#fff",
            boxShadow: 24,
            borderRadius: 4,
          }}
        >
          <h2 id="modal-title">Confirm Deletion</h2>
          <p>Are you sure you want to delete this task?</p>
          <p>{taskToDelete?.title}</p>
          <Button
            style={{ marginBottom: "1rem" }}
            variant="contained"
            color="error"
            fullWidth
            onClick={handleConfirmDelete}
          >
            Confirm
          </Button>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => setConfirmDeleteModalOpen(false)}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
      <div className="grid-container">
        {tasks.map((task) => (
          <TaskCard
            id={task.id}
            task={task}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
