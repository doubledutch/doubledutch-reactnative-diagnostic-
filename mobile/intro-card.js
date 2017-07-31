import React, { Component } from 'react';
import ReactNative, {
  Dimensions, Alert, TouchableHighlight,
  Text, View, ScrollView, Image, NativeEventEmitter
} from 'react-native';

const DD = ReactNative.NativeModules.DDBindings

class HomeView extends Component {
  static getHeight() {
    return 100
  }

  constructor() {
    super()
    this.state = {
      messages: [
        'Hello this is a demo!',
        'But I also know some things about you...',
        `Like your name is ${DD.currentUser.FirstName} ${DD.currentUser.LastName}`,
        `And you are attending ${DD.currentEvent.Name}`,
        'How do I know this?',
        'React components can now be cards in the feed...',
        'What else can you do?'
      ],
      index: 0
    }
  }

  onButtonPress = () => {
    this.setState({ index: (this.state.index + 1) % this.state.messages.length })
  }

  render() {
    const user = DD.currentUser
    return (
      <TouchableHighlight underlayColor='#ffffff0f' onPress={this.onButtonPress} style={[styles.container]}>
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>{this.state.messages[this.state.index]}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = ReactNative.StyleSheet.create({
  container: {
    height: 200,
    backgroundColor: DD.primaryColor,
    borderWidth: 1,
    borderColor: '#f1f1f1'
  },
  overlay: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: DD.primaryColor,
    paddingHorizontal: 40,
  },
  overlayText: {
    padding: 14,
    color: '#fff',
    backgroundColor: '#ffffff4f',
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