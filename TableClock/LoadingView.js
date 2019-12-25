import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dimensions } from 'react-native';

export default () => {
  return (
  <>
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Loading...</Text>
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
    fontSize:0.15*Dimensions.get('window').width,
    fontFamily:"System",
  }
});
