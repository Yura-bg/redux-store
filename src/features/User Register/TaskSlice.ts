import { createSlice } from "@reduxjs/toolkit";
import { Task } from "./type";

const initialState: { tasks: Task[] } = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((elm) => elm.id !== action.payload);
    },
    updateTask: (state, action) => {
      const { id, name, description } = action.payload;
      const taskToUpdate = state.tasks.find((task) => task.id === id);
      if (taskToUpdate) {
        taskToUpdate.name = name;
        taskToUpdate.description = description;
      }
    },
  },
});

export const { addTask, deleteTask ,updateTask} = taskSlice.actions;
export default taskSlice.reducer;
