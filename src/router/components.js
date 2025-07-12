import React from 'react';
// 创建一个require.context，搜索pages目录下的所有js文件
const requireComponent = require.context('../pages', true, /\.(js|jsx)$/);
// 创建一个对象来存储所有组件的引用
export const components = {};
// 遍历require.context返回的所有模块ID
requireComponent.keys().forEach((fileName) => {
    
  // 获取文件名（不带路径和扩展名）作为组件名
  const componentName = fileName.replace(/^\.\//, '').replace(/\/index\.(js|jsx)$/, '');
  
  // 动态导入组件并存储到components对象中
  components[componentName] = React.lazy(() => import(`../pages/${componentName}/index`));

});
export default components;