
import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "./reducers/global";

// configureStore创建一个redux数据
const store = configureStore({
  // 合并多个Slice
  reducer: {
    global: globalSlice
  },
});

export default store;
