import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./configureStore";

export type TypeFilter = "noDone" | "done";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export interface taskListState {
  list: Task[];
  notification: string;
  filter: TypeFilter | null;
}

const initialState: taskListState = {
  list: [],
  notification: "",
  filter: null,
};

export const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task["header"]>) => {
      state.list.push({
        id: String(getRandomInt(1000000000)),
        header: action.payload,
        done: false,
      });
    },
    completeTask: (state, action: PayloadAction<Task["id"]>) => {
      const task = state.list.find((x) => x.id === action.payload);

      if (task) {
        task.done = true;
      }
    },
    toggleTask: (state, action: PayloadAction<Task["id"]>) => {
      const task = state.list.find((x) => x.id === action.payload);

      if (task) {
        task.done = !task.done;

        if (task.done) {
          state.notification = `Задача "${task.header}" завершена`;
        }
      }
    },
    deleteTask: (state, action: PayloadAction<Task["id"]>) => {
      state.list = state.list.filter((x) => x.id !== action.payload);
    },
    setNotification: (state, action: PayloadAction<Task["header"]>) => {
      state.notification = `Задача "${action.payload}" завершена`;
    },
    clearNotification: (state) => {
      state.notification = "";
    },
    setFilter: (state, action: PayloadAction<TypeFilter | null>) => {
      state.filter = action.payload;
    },
  },
});

export const {
  addTask,
  completeTask,
  deleteTask,
  toggleTask,
  clearNotification,
  setFilter,
} = taskListSlice.actions;

export default taskListSlice.reducer;

export const tasksSelector = (state: RootState) => state.taskList.list;

export const fullCount = (state: RootState) => state.taskList.list.length;

export const completeCount = (state: RootState) =>
  state.taskList.list.filter((x) => x.done).length;

export const uncompleteCount = (state: RootState) =>
  state.taskList.list.filter((x) => !x.done).length;

export const getNotification = (state: RootState) =>
  state.taskList.notification;

export const getFilter = (state: RootState) => state.taskList.filter;
