import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Schedule } from "@/types";
import { WeekDay } from "@/types/constants";

export interface ScheduleState {
  schedule: Schedule[];
}

const initialState: ScheduleState = {
  schedule: [],
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<{ schedule: Schedule[] }>) {
      state.schedule = action.payload.schedule;
    },
    clearMealId(state, action: PayloadAction<WeekDay>) {
      const index = state.schedule.findIndex(
        (item) => item.day === action.payload
      );
      if (index !== -1) {
        state.schedule[index].meal_id = undefined;
      }
    },
    addItem(state, action: PayloadAction<Schedule>) {
      state.schedule = state.schedule.concat(action.payload);
    },
    updateItem(state, action: PayloadAction<{ day: WeekDay; mealId: number }>) {
      const { day, mealId } = action.payload;
      const index = state.schedule.findIndex((item) => item.day === day);
      if (index !== -1) {
        state.schedule[index].meal_id = mealId;
      }
    },
  },
});

export const scheduleActions = scheduleSlice.actions;

export default scheduleSlice;
