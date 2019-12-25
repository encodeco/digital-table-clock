import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from "react-native";
import { Dimensions } from 'react-native';
import moment from "moment"

import * as Localization from 'expo-localization';

export default ({orientation, fontArray}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [fontIdx, setFontIdx] = useState(0);
  var event;

  useEffect(()=>{
    setScreenWidth(Dimensions.get('window').width);
  },[orientation])

  const getTimeString = (date) => {
    const str = moment(date).format("HH:mm:ss");
    return str;
  }

  const getDateString = (date) => {
    const str = date.toLocaleDateString(Localization.locale);
    return str;
  }

  const preLoad = async () => {
    event = setInterval(()=>{setCurrentTime(new Date())}, 100);
    
    const savedFontIdx = await AsyncStorage.getItem("@FontIdx");
    if( savedFontIdx ){
      let newFontIdx =  parseInt(savedFontIdx)
      if( newFontIdx >= fontArray.length ){
        newFontIdx = 0;
      }
      setFontIdx(newFontIdx)
    }
  }

  useEffect(()=>{
    preLoad()
    return () => {
      console.log("CLEARED!!!")
      clearInterval(event);
    }
  },[])

  const handleTouchLED = () => {
    let newFontIdx = fontIdx + 1;
    if( newFontIdx >= fontArray.length ){
      newFontIdx = 0;
    }
    setFontIdx(newFontIdx)
    AsyncStorage.setItem("@FontIdx", newFontIdx.toString());
  }
  return (
  <>
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={()=>{handleTouchLED()}}>
          <Text style={{  fontFamily:fontArray[fontIdx].fontFamily,
                          color:fontArray[fontIdx].color, 
                          fontSize:fontArray[fontIdx].fontRate*screenWidth}}>
            {getTimeString(currentTime)}
          </Text>
          <Text style={{  alignSelf:"flex-end",
                          fontFamily:fontArray[fontIdx].fontFamily,
                          color:fontArray[fontIdx].color, 
                          fontSize:fontArray[fontIdx].fontRate*screenWidth/2}}>
            {getDateString(currentTime)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
   
    
  }
});
