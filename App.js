import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Vibration } from 'react-native'
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

const App = () => {
  const [toggle, setToggle] = useState(false);
  const handlePress = () => {
    setToggle(!toggle);
  }

  useEffect(() => {
    Torch.switchState(toggle);
  }, [toggle])

  useEffect(() => {
    const subscription = RNShake.addListener(() => {
      handlePress();
      Vibration.vibrate(150);
    })
    return () => subscription.remove();
  }, [toggle])

  return (
    <View style={
      toggle ?
        styles.containerLight :
        styles.container
    }>
      <TouchableOpacity onPress={handlePress}>
        <Image
          source={
            toggle ?
              require('./assets/icons/eco-light.png') :
              require('./assets/icons/eco-light-off.png')
          }
          style={
            toggle ?
              styles.lightImgOn :
              styles.lightImgOff
          } />
        <Image
          source={
            toggle ?
              require('./assets/icons/logo-dio.png') :
              require('./assets/icons/logo-dio-white.png')
          }
          style={styles.dioLogo} />
      </TouchableOpacity>
    </View>
  );
}

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightImgOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  lightImgOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: '#fff',
    width: 150,
    height: 150,
  },
  dioLogo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    height: 250,
  },
});