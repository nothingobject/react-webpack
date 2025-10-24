import { createSlice } from '@reduxjs/toolkit'
import { isDataInLocalStorageAndNotEmpty } from "@/utils/utils";

// 缓存menus
const catchMenus = isDataInLocalStorageAndNotEmpty('menus') ?JSON.parse(localStorage.getItem('menus')):[];

// 缓存按钮权限
const catchButtons = isDataInLocalStorageAndNotEmpty('buttons') ?JSON.parse(localStorage.getItem('buttons')):[];

// 缓存的userinfo
const userinfo = isDataInLocalStorageAndNotEmpty('userinfo')?JSON.parse(localStorage.getItem('userinfo')):{};

export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    // 用户信息
    userInfo: {...userinfo},
    // 菜单
    menus:[...catchMenus],
    // 按钮权限信息
    permission:[...catchButtons],
    // 动态加载页面
    asyncfiles:[],
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
    setbuttons: (state, action) => {
        state.permission = action.payload
        localStorage.setItem("buttons", JSON.stringify(action.payload));
    },
    setasyncfiles: (state, action) => {
        state.asyncfiles = action.payload
        localStorage.setItem("asyncfiles", JSON.stringify(action.payload));
    },
    login: (state, action) => {
        state.userInfo = action.payload.userinfo
        
        localStorage.setItem('userinfo', JSON.stringify(state.userInfo));
        localStorage.setItem('access_token', action.payload.accessToken);
        localStorage.setItem('refresh_token', action.payload.refreshToken);
    },
    logout: (state) => {
      state.userInfo = {};
      state.menus = [];
      state.permission = {};
      localStorage.clear()
    //   localStorage.removeItem('menus');
    //   localStorage.removeItem('userInfo');
    //   localStorage.removeItem('token');
    },
    // 修改加载状态
    changeLoading: (state,action) => {
        state.isLoading = action.payload;
    },
  }
})
// 每个 case reducer 函数会生成对应的 Action creators
export const { login, logout ,setmenus,setbuttons,setasyncfiles,changeLoading} = globalSlice.actions

export default globalSlice.reducer
