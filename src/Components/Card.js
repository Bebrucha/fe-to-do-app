import React from "react";
import Card from "@mui/material/Card";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import DeleteIcon from "@mui/icons-material/Delete";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";

const TaskCard = ({ task, onUpdateTask, onDeleteTask }) => {
  const handleStatusToggle = () => {
    onUpdateTask(task.id, { status: !task.status });
  };

  const handleDelete = () => {
    onDeleteTask(task.id);
  };

  return (
    <Card variant="outlined" className="card">
      <h2 className="card-header">{task.title}</h2>
      <p className="card-body">{task.description}</p>
      <div className="card-footer">
        Status: {task.status ? "Completed" : "Not Completed"}{" "}
        {task.status ? (
          <CheckCircleRoundedIcon
            className="check-icon"
            style={{ fill: "green" }}
          />
        ) : (
          <CancelRoundedIcon className="cancel-icon" style={{ fill: "red" }} />
        )}
      </div>
      <div className="grid">
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item>
            <Button
              variant="outlined"
              onClick={handleStatusToggle}
              startIcon={
                task.status ? (
                  <UndoRoundedIcon />
                ) : (
                  <CheckCircleRoundedIcon style={{ fill: "green" }} />
                )
              }
            >
              {task.status ? "Undo" : "Finish"}
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              onClick={handleDelete}
              startIcon={<DeleteIcon style={{ fill: "black" }} />}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </div>
    </Card>
  );
};

export default TaskCard;
