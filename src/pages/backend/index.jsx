import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { decrement, increment } from "@/store/reducers/global";
// import styles from './Counter.module.css'

const Backend=()=> {
  const count = useSelector((state) => state.global.value);
  const dispatch = useDispatch()

  return (
    <div>
      <h2>非管理员页</h2>
    </div>
  )
}

export default Backend;