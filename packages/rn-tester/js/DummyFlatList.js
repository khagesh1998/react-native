import React, { useState, useEffect, useLayoutEffect } from 'react';

import {ScrollView, Text,View,LogBox} from 'react-native';
// import { setMount, setStart, printLogs } from '../../../log-file/log-file';
import { setLayoutEffect, setStateEnd, setStateStart } from '../../../log-file/log-file.prod';

// import TestRenderer from 'react-test-renderer';

LogBox.ignoreAllLogs();

// export const useLogFile = (state) => {
//   const ref = useRef(true);
//   if (ref.current){
//     ref.current = false;
//     setStart();
//   }
//
//   useEffect(()=>{
//     setMount();
//     printLogs();
//   },[state]);
// };

const ActualList = ()=>{
  const [state, setState] = useState(10);

  // useLogFile(state);

  useEffect(()=>{
    setTimeout(()=>{
      // console.log('--------------------------- start ---------------------');
      setStateStart();
      setState(20);
    },10000);
  },[]);

  useEffect(()=>{
    setStateEnd();
  },[state]);

  useLayoutEffect(()=>{
    setLayoutEffect();
  },[state]);

  return (
    <ScrollView
      accessible
      accessibilityLabel={'customScrollView'}
    >
      {Array.from({length:state}).map((_,index)=>(
        <View
          key={index}
          accessible
          accessibilityLabel={`listViewItem${index}`}
          style={{height:36,paddingHorizontal:16,justifyContent:'center',borderBottomWidth:1,borderBottomColor:'#e5e5e5'}}
        >
          <Text
            accessible
            accessibilityLabel={`listTextView${index}`}
          >
            {`Item index: ${index}`}
          </Text>
        </View>
      ))}
    </ScrollView>
  );

  // return  <View style={{backgroundColor: "grey", width:100,height:100}} accessible accessibilityLabel={"customView"} />
};

// ActualList.displayName = '---------------------------------------------------------------------------';

export const DummyFlatList = ()=>{
  const [state, setState] = useState(false);

  // const onPress = useCallback(()=>{
  //   setState((localState)=>!localState);
  // },[]);

  useEffect(()=>{
    setTimeout(()=>{
      setStateStart();
      setState(true);
    },10000);
  },[]);

  return (
    <>
      {/*<Button title={'Button'} onPress={onPress} />*/}
      {state && <ActualList />}
    </>
  );
};

