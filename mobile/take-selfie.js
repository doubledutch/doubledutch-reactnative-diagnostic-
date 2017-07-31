import React, { Component } from 'react'
import ReactNative, {
  Alert, TouchableOpacity, Text, View,
  ScrollView, Image, NativeEventEmitter,
  TouchableHighlight
} from 'react-native'

import Camera from 'react-native-camera'

const DD = ReactNative.NativeModules.DDBindings

class HomeView extends Component {
  static getHeight() {
    return 100
  }

  constructor(props) {
    super()
    this.state = {
      photoURI: 'https://xpresi.co/wp-content/uploads/2015/11/taking-a-selfie-Stock-Photo.jpg',
      showCamera: false
    }
  }

  onButtonPress = () => {
    if (this.state.showCamera) {
      const options = {};
      //options.location = ...
      this.camera.capture({ metadata: options })
        .then((data) => {
          this.setState({ showCamera: false, photoURI: data.path })
        })
        .catch(err => console.error(err));
    } else {
      this.setState({ showCamera: true })
    }
  }

  render() {
    return (
      <View style={[styles.container, { height: this.props.frame.width + 44 }]}>
        {this.state.showCamera ?
          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            type="front"
            style={[styles.video, { height: this.props.frame.width }]}
            aspect={Camera.constants.Aspect.fill}>
          </Camera> :
          <Image
            style={[styles.video, { height: this.props.frame.width }]}
            source={{ uri: this.state.photoURI }}
          />
        }
        <TouchableOpacity style={styles.button} onPress={this.onButtonPress}>
          <Text style={styles.buttonText}>Take my Selfie</Text>
        </TouchableOpacity>
      </View >
    )
  }
}

const styles = ReactNative.StyleSheet.create({
  progress: {
  },
  video: {
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
  container: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f1f1f1'
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    color: '#fff',
    backgroundColor: 'transparent',
    flex: 1,
  },
  videoButton: {
    height: 197,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    height: 44,
    backgroundColor: DD.primaryColor,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff'
  }
});

export default HomeView