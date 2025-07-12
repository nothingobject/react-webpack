import React,{useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { decrement, increment } from "@/store/reducers/global";
// import styles from './Counter.module.css'

const Home=()=> {
  const count = useSelector((state) => state.global.value);
  const dispatch = useDispatch()

  useEffect(()=>{
    console.log('home')
  },[])

  return (
    <div>
      <h2>这是首页</h2>
    </div>
  )
}

export default Home;