import React, { memo, useState, useEffect, useRef } from "react";

import {ScrollView, Text,View,LogBox} from 'react-native';
import { setMount, setStart } from "../../../log-file/log-file";

// import TestRenderer from 'react-test-renderer';

LogBox.ignoreAllLogs();

export const useLogFile = () => {
  const ref = useRef(true);
  if (ref.current){
    ref.current = false;
    setStart();
  }

  useEffect(()=>{
    setMount();
  },[]);
};

const ActualList = memo(()=>{
  const [state] = useState(0);

  useLogFile();

  return (
    <ScrollView
      accessible
      accessibilityLabel={'customScrollView'}
    >
      {Array.from({length:10}).map((_,index)=>(
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
            {`Item index: ${index}, current state: ${state}`}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
});

// ActualList.displayName = '---------------------------------------------------------------------------';

export const DummyFlatList = memo(()=>{
  const [state, setState] = useState(false);

  // const onPress = useCallback(()=>{
  //   setState((localState)=>!localState);
  // },[]);

  useEffect(()=>{
    setTimeout(()=>{
      setState(true);
    },5000);
  },[]);

  return (
    <>
      {/*<Button title={'Button'} onPress={onPress} />*/}
      {state && <ActualList />}
    </>
  );
});

// const testRenderer = TestRenderer.create(
//   <ActualList />
// );
//
// console.log('------',testRenderer.toJSON());
