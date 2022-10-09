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
let itemCount = 0;
let itemList = [];
let scrollViewList = [];
let startTime = 0;
let mountTime = 0;
let totalEnqueueTime = 0;



function reactElementLog(element: any){
  // console.log("==================customView", element?.props?.accessibilityLabel)
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

let startSetStateTime = 0;
let endSetStateTime = 0;

function startSetState(){
  startSetStateTime = Date.now()
}

function endSetState(){
  endSetStateTime = Date.now()
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


function printLogs(){
  setTimeout(()=>{
    console.log("---------------------------- logs -------------------------------")
    const minItemTime = Math.min.apply(Math, itemList);
    const maxItemTime = Math.max.apply(Math, itemList);
    console.info('items: ', minItemTime, maxItemTime, maxItemTime - minItemTime);

    const minScrollViewTime = Math.min.apply(Math, scrollViewList);
    const maxScrollViewTime = Math.max.apply(Math, scrollViewList);
    console.info('scrollView: ', minScrollViewTime, maxScrollViewTime, maxScrollViewTime - minScrollViewTime);

    console.info({ 'startTime': startTime, 'mountTime': mountTime });
    console.info('totalTime', Math.max(maxScrollViewTime,maxItemTime) - startTime);

    console.log(":::: queueTime: ", queueStartTime, queueEndTime, queueEndTime - queueStartTime);
    console.log("setState", startSetStateTime, endSetStateTime, endSetStateTime - startSetStateTime);

    itemList = [];
    scrollViewList = [];
    queueStartTime = 0;
    queueEndTime = 0;
    startSetStateTime = 0;
    endSetStateTime = 0;
    startTime = 0;

  },20000);
}

module.exports = {
  reactElementLog,
  setStart,
  setMount,
  addEnqueueNativeCall,
  queueLog,
  printLogs,
  startSetState,
  endSetState
};

