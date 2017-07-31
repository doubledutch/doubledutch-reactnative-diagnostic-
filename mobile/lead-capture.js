import React, { Component } from 'react';
import ReactNative, {
  Dimensions, Alert, TouchableOpacity,
  Text, View, ScrollView, Image, NativeEventEmitter
} from 'react-native';

const DD = ReactNative.NativeModules.DDBindings

class HomeView extends Component {
  static getHeight() {
    return 100
  }

  constructor() {
    super()
  }

  onButtonPress = () => {
    DD.openURL('https://greenevents.wespire.com/?ref=app&ddusebrowser=true')
    //Alert.alert('Thanks for registering!')
  }

  render() {
    const user = DD.currentUser
    return (
      <View style={[styles.container, { height: this.props.frame.width }]}>
        <Image style={styles.image} source={{ uri: 'https://lh3.googleusercontent.com/uvrLI0uqWwaMQobUFy2em63khhoy6ijb0-4Z3UCa_ttB6T-pnbB6_nPHZTjGchS2tsk=w300' }} />
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>Hey {user.FirstName}!</Text>
          <Text style={styles.overlayText}>Thanks for coming to {DD.currentEvent.Name}</Text>
          <Text style={styles.overlayText}>Ready to sign up for next year?</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={this.onButtonPress}>
          <Text style={styles.buttonText}>Register for Build 2018</Text>
        </TouchableOpacity>
      </View >
    )
  }
}

const styles = ReactNative.StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: DD.primaryColor,
    borderWidth: 1,
    borderColor: '#f1f1f1'
  },
  overlay: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  overlayText: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#ffffffcf',
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '500',
    borderRadius: 2,
    overflow: 'hidden'
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    color: '#fff',
    backgroundColor: 'transparent',
    flex: 1,
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'contain'
  },
  button: {
    position: 'absolute',
    height: 44,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fffffff0',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: DD.primaryColor
  }
});

export default HomeView