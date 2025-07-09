import React,{useContext,useEffect,useState} from 'react';
// import img1 from "@/assets/imgs/image1.png";
// import { ErrorContext } from "@/components/errorhandler/ErrorContext";


function ExampleComponent() {
    // const { handleError } = useContext(ErrorContext);

    // const [count, setCount] = useState(0);
    // setCount(count + 1); // 直接调用可能导致无限循环或状态未及时更新的问题

    const [imageSrc, setImageSrc] = useState('https://httpstat.us/404'); // 模拟404错误

    useEffect(()=>{
        // console.log(a,'a')
        // window.addEventListener("error", function(event){
        //     event.stopPropagation()
        //     // event.preventDefault()
        //     console.log("捕获到错误1")
        // },true);
//         let x = 5;
// let y = 6,
// x = y ((10);
        // window.addEventListener("error", function(event){
        //     event.stopPropagation()
//         let x = null;
// console.log(x.length);
// console.log(undeclaredVariable); 
// let arr = [];
// arr.length = Number.MAX_VALUE + 1;
// decodeURI('%')
// throw new EvalError('这是一个示例 EvalError')
// const promise = new Promise((resolve, reject) => {
//     reject(new Error("Promise rejected"));
// });
       
    },[])

    useEffect(() => {
    const img = new Image();
    img.src = imageSrc;
  }, [imageSrc]);

  const handleSyncError = () => {
    throw new Error('同步错误示例');
  };

  const handleAsyncError = async () => {
   
    setTimeout(() => { throw new Error('异步错误'); });
  };

  return (
    <div>
      <h2>示例组件</h2>
      <button onClick={() => handleSyncError()}>触发同步错误</button>
      <button onClick={handleAsyncError}>触发异步错误</button>
      <button onClick={() => someFunctionThatMightFail()}>触发其他错误</button>
      <img src={imageSrc} alt="示例图片" />
    </div>
  );
}

export default ExampleComponent;