import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Outlet, useLocation, Navigate, useOutlet } from "react-router-dom";
// import { decrement, increment } from "@/store/reducers/global";
// import styles from './Counter.module.css'

const Admindetail=()=> {
  const count = useSelector((state) => state.global.value);
  const dispatch = useDispatch()

  return (
    <div>
      <h2>这是详情页</h2>

      {/* <Outlet /> */}
    </div>
  );
}

export default Admindetail;