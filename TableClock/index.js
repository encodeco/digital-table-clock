import { Ionicons } from "@expo/vector-icons";
import React, {useState, useEffect} from "react"
import {StyleSheet, View, StatusBar, Text} from "react-native"
import TableClock from "./TableClock"
import LoadingView from "./LoadingView"
import * as Font from "expo-font";

import { Dimensions } from 'react-native';
import { ScreenOrientation } from 'expo';

import useDeviceOrientation from './device-orientation';


export default () => {
  const deviceOrientation = useDeviceOrientation();
  const [loaded, setLoaded] = useState(false);
  const [fontArray, setFontArray] = useState([])

  useEffect(()=>{
  }, [deviceOrientation]);

  const preLoad = async () => {
    // rotatable
    await ScreenOrientation.unlockAsync();

    // font init
    await Font.loadAsync({
      ...Ionicons.font,
      'lcd' : require('../assets/fonts/LCD_Solid.ttf'),
      'led' : require('../assets/fonts/Led_Bus.ttf'),
      'dotty' : require('../assets/fonts/dotty.ttf'),
      'alarmclock' : require('../assets/fonts/alarm_clock.ttf'),
      'computerfont' : require('../assets/fonts/Computerfont.ttf'),
    });
    fontArray.push( { fontFamily:"lcd", fontRate:0.18, color:"#00FF03" } );
    fontArray.push( { fontFamily:"led", fontRate:0.18, color:"black" } );
    fontArray.push( { fontFamily:"dotty", fontRate:0.4, color:"black" } );
    fontArray.push( { fontFamily:"alarmclock", fontRate:0.22, color:"#F8034D" } );
    fontArray.push( { fontFamily:"computerfont", fontRate:0.23, color:"black" } );
    setLoaded(true);
  }
  useEffect(()=>{
    preLoad();
  }, []);

  return (
    <> 
      <StatusBar hidden />
      { loaded ?  <TableClock orientation={deviceOrientation} fontArray={fontArray}/> : <LoadingView/> } 
    </>
  );
};
