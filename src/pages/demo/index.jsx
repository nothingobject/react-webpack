import React, {useMemo,useState,useEffect,memo} from 'react';
import moment from 'moment';
import {  Button } from 'antd';

import styles from './index.less'


const Child = memo(() => <div>{console.log("子组件又渲染")}<h3>子组件</h3></div>)

function Demo() {
  const [selectedNum, setSelectedNum] = useState(100);

  const [num, setNum] = useState(0);

  const clickHadler = () => {
    setNum(num + 1)
  }
  
  const time = useTime();

  const allPrimesRes = useMemo(()=>{
    const allPrimes = [];
    console.log('运行');
    
    for (let counter = 2; counter < selectedNum; counter++) {
      if (isPrime(counter)) {
        allPrimes.push(counter);
      }
    }
    return allPrimes;
  }, [selectedNum])

  // 使用 useMemo 缓存计算的结果
//   const computeResult = useMemo(() => {
//     for(let i = 0; i < 10000; i++) {
//       console.log(i)
//     }

//     console.log('进行了大量计算')
//   }, [])

//   const computeResult = () => {
//     for(let i = 0; i < 10000; i++) {
//       console.log(i)
//     }

//     console.log('进行了大量计算')
//   }

  
  
  return (
    <div className={styles.container}>
                                            
        <h2>useMemo、React.memo使用</h2>

        {/* <h2>{computeResult()}</h2> */}
        {/* <div>{computeResult} */}
      {/* number值: {num}</div> */}

      <Button
        type='primary'
        onClick={() => clickHadler()}
      >
        点击计算
      </Button>

    
        <p className="date">
        {moment(time,).format('MMMM Do YYYY')}
        </p>
        <p className="clock">
            {moment(time,).format('hh:mm:ss a')}
        </p>
        <form>
            <label htmlFor="num">Your number:</label>
            <input
            type="number"
            value={selectedNum}
            onChange={(event) => {
                // To prevent computers from exploding,
                // we'll max out at 100k
                let num = Math.min(100_000, Number(event.target.value));
                
                setSelectedNum(num);
            }}
            />
        </form>
      <Child/>
        <p>
            There are {allPrimesRes.length} prime(s) between 1 and {selectedNum}:
            {' '}
            <span className="prime-list">
            {allPrimesRes.join()}
            </span>
            
        </p>
    </div>
  );
}

function useTime() {
  const [time, setTime] = useState(new Date());
  
    useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTime(new Date());
    }, 1000);
  
    return () => {
      window.clearInterval(intervalId);
    }
  }, []);
  
  return time;
}

function isPrime(n){
  const max = Math.ceil(Math.sqrt(n));
  
  if (n === 2) {
    return true;
  }
  
  for (let counter = 2; counter <= max; counter++) {
    if (n % counter === 0) {
      return false;
    }
  }

  return true;
}

export default Demo;
