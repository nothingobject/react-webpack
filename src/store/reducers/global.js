import { createSlice } from '@reduxjs/toolkit'
import { isDataInLocalStorageAndNotEmpty } from "@/utils/utils";

// 缓存menus
const catchMenus = isDataInLocalStorageAndNotEmpty('menus') ?JSON.parse(localStorage.getItem('menus')):[];

// 缓存的userinfo
const userinfo = isDataInLocalStorageAndNotEmpty('userinfo')?JSON.parse(localStorage.getItem('userinfo')):{};

export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    // 用户信息
    userInfo: {...userinfo},
    // 权限信息
    permissionInfo:{},
    // 菜单
    menus:[...catchMenus],
    // progress状态
    isLoading:true
  },
  reducers: {
    initmenus: (state, action) => {
        state.menus = action.payload
    },
    setmenus: (state, action) => {
        state.menus = action.payload
        localStorage.setItem("menus", JSON.stringify(action.payload));
    },
    login: (state, action) => {
        state.userInfo = action.payload.userinfo
        localStorage.setItem('userinfo', JSON.stringify(state.userInfo));
        localStorage.setItem('token', action.payload.token);
    },
    setPermissions: (state, action) => {
      state.permissionInfo = action.payload;
    },
    logout: (state) => {
      state.userInfo = {};
      state.menus = [];
      state.permissionInfo = {};
      localStorage.removeItem('menus');
      localStorage.removeItem('userInfo');
      localStorage.removeItem('token');
    },
    // 修改加载状态
    changeLoading: (state,action) => {
        state.isLoading = action.payload;
    },
    setPermissionInfo: (state, action) => {
        state.permissionInfo = action.payload;
    },
  }
})
// 每个 case reducer 函数会生成对应的 Action creators
export const { login, logout, setPermissionInfo ,setmenus,changeLoading} = globalSlice.actions

export default globalSlice.reducer
