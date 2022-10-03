/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 * @format
 */

'use strict';

let renderCount = 0;
const itemCount = 0;
const itemList = [];
const scrollViewList = [];
let startTime = 0;
let mountTime = 0;
var totalEnqueueTime = 0;



function reactElementLog(element: any){
  ++renderCount;
  // console.log("react.development", ++itemCount, renderCount , element);
  if (element?.props?.accessibilityLabel?.includes('listTextView')){
    // console.log("react.development", ++itemCount, renderCount , element);
    itemList.push(Date.now());
  }
  if (element?.props?.accessibilityLabel?.includes('customScrollView')){
    // console.log("react.development", ++itemCount, renderCount , element);
    // dateList.push(Date.now())
    // console.log("customScrollView", element)
    scrollViewList.push(Date.now());
  }
}

function setStart(){
  console.log("----------- start ------------")
  startTime = Date.now();
}

function setMount(){
  mountTime = Date.now();
}

function addEnqueueNativeCall(time: number){
  totalEnqueueTime+=time;
}

var queueStartTime = 0;
var queueEndTime = 0;

function queueLog(props){
  const isView = props?.accessibilityLabel?.includes("listViewItem");
  const isText = props?.accessibilityLabel?.includes("listTextView");
  const isScrollView = props?.accessibilityLabel?.includes("customScrollView");
  const isCustomAccessibilityLabel = props.accessibilityLabel?.includes("customAccessibilityLabel");
  if(!isView && !isText && !isScrollView && !isCustomAccessibilityLabel){
    // console.log("--------------------- got to hell; no log --------------------")
    return
  }
  const currentTime = Date.now();
  if(!queueStartTime){
    queueStartTime = currentTime;
  }
  queueEndTime = currentTime;
}

function logTime(){
  console.info("----------------------------- console logs -----------------------------")
  const a = Date.now();
  for(let i=0;i<10;i++){
    console.log("simple log")
  }
  console.info("------------ type1", Date.now() - a);

  const b = Date.now();
  for(let i=0;i<10;i++){
    console.log({
      a:10,
      b:10,
      c:10,
      d:10,
      e:10,
      f:10,
      g:10,
      h:10,
      i:10,
    })
  }
  console.info("------------ type2", Date.now() - b);

  const c = Date.now();
  for(let i=0;i<100;i++){
    console.log("simple log")
  }
  console.info("------------ type3", Date.now() - c);
}

setTimeout(()=>{
  const minItemTime = Math.min.apply(Math, itemList);
  const maxItemTime = Math.max.apply(Math, itemList);
  console.info('items: ', minItemTime, maxItemTime, maxItemTime - minItemTime);

  const minScrollViewTime = Math.min.apply(Math, scrollViewList);
  const maxScrollViewTime = Math.max.apply(Math, scrollViewList);
  console.info('scrollView: ', minScrollViewTime, maxScrollViewTime, maxScrollViewTime - minScrollViewTime);

  console.info({ 'startTime': startTime, 'mountTime': mountTime });
  console.info('totalTime', Math.max(maxScrollViewTime,maxItemTime) - startTime);

  console.log(":::: queueTime: ", queueStartTime, queueEndTime, queueEndTime - queueStartTime);
},20000);

module.exports = {
  reactElementLog,
  setStart,
  setMount,
  addEnqueueNativeCall,
  queueLog
};

