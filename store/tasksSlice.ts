import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "@/lib/types";

type TasksState = {
  list: Task[];
};

const initialState: TasksState = {
  list: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      state.list = action.payload;
    },
  },
});

export const { setTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
