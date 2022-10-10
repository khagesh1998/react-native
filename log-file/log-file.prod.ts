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

let isRenderStarted = false;

let dispatchSetStateStartTime = 0;
let dispatchSetStateEndTime = 0;

let setStateStartTime = 0;
let setStateEndTime = 0;
let setLayoutEffectTime = 0;

let beginWorkStartTime = 0;
let beginWorkEndTime = 0;
let beginWorkCount = 0;

let completeWorkStartTime = 0;
let completeWorkEndTime = 0;
let completeWorkCount = 0;

let uiManagerCreateViewStartTime = 0;
let uiManagerCreateViewEndTime = 0;
let uiManagerCreateViewCount = 0;

let uiManagerSetChildrenStartTime = 0;
let uiManagerSetChildrenEndTime = 0;
let uiManagerSetChildrenCount = 0;

let commitWorkTime = 0;

function clearAll(){
  isRenderStarted = false;

  dispatchSetStateStartTime = 0;
  dispatchSetStateEndTime = 0;

  setStateStartTime = 0;
  setStateEndTime = 0;
  setLayoutEffectTime = 0;

  beginWorkStartTime = 0;
  beginWorkEndTime = 0;
  beginWorkCount = 0;

  completeWorkStartTime = 0;
  completeWorkEndTime = 0;
  completeWorkCount = 0;

  uiManagerCreateViewStartTime = 0;
  uiManagerCreateViewEndTime = 0;
  uiManagerCreateViewCount = 0;

  uiManagerSetChildrenStartTime = 0;
  uiManagerSetChildrenEndTime = 0;
  uiManagerSetChildrenCount = 0;

  commitWorkTime = 0;
}

function printLogs(){
  console.log(`
    ----------------------------------- Logs for render: ${++renderCount} -----------------------------------
    start                 : ${setStateStartTime}
    dispatchSetStateStart : ${dispatchSetStateStartTime}
    beginWork             : ${beginWorkCount}
                            ${beginWorkStartTime} -  ${beginWorkEndTime} : ${beginWorkEndTime - beginWorkStartTime}
    completeWork          : ${completeWorkCount}
                            ${completeWorkStartTime} - ${completeWorkEndTime} : ${completeWorkEndTime - completeWorkStartTime}
                            
                            createView  : ${uiManagerCreateViewCount} 
                                          ${uiManagerCreateViewStartTime} - ${uiManagerCreateViewEndTime} : ${uiManagerCreateViewEndTime - uiManagerCreateViewStartTime}
                            setChildren : ${uiManagerSetChildrenCount}
                                          ${uiManagerSetChildrenStartTime} - ${uiManagerSetChildrenEndTime} : ${uiManagerSetChildrenEndTime - uiManagerSetChildrenStartTime}
                            bridgeCalls : ${uiManagerSetChildrenEndTime - uiManagerCreateViewStartTime}
                            
    commitWork            : ${commitWorkTime}
    dispatchSetStateEnd   : ${dispatchSetStateEndTime}
    setLayoutEffect       : ${setLayoutEffectTime}
    end (Mount)           : ${setStateEndTime}
  `)

}

export function dispatchSetStateStart(){
  dispatchSetStateStartTime = Date.now();
}

export function dispatchSetStateEnd(){
  dispatchSetStateEndTime = Date.now()
}

export function setStateStart(){
  isRenderStarted = true
  setStateStartTime = Date.now()
}

export function setStateEnd(){
  setStateEndTime = Date.now()
  printLogs()
  clearAll()
}

export function setLayoutEffect(){
  setLayoutEffectTime = Date.now()
}

export function beginWork(){
  if(!isRenderStarted){
    return
  }
  beginWorkCount++;
  const time = Date.now()
  if(!beginWorkStartTime){
    beginWorkStartTime = time
  }
  beginWorkEndTime = time
}

export function completeWork(){
  if(!isRenderStarted){
    return
  }
  completeWorkCount++;
  const time = Date.now()
  if(!completeWorkStartTime){
    completeWorkStartTime = time
  }
  completeWorkEndTime = time
}

export function uiManagerCreateView(){
  if(!isRenderStarted){
    return
  }
  uiManagerCreateViewCount++;
  const time = Date.now();
  if(!uiManagerCreateViewStartTime){
    uiManagerCreateViewStartTime = time
  }
  uiManagerCreateViewEndTime = time
}

export function uiManagerSetChildren(){
  if(!isRenderStarted){
    return
  }
  uiManagerSetChildrenCount++;
  const time = Date.now();
  if(!uiManagerSetChildrenStartTime){
    uiManagerSetChildrenStartTime = time
  }
  uiManagerSetChildrenEndTime = time
}

export function commitWork(){
  if(!isRenderStarted){
    return
  }
  commitWorkTime = Date.now()
}


