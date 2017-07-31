import React, { Component } from 'react'
import ReactNative, {
  Alert, TouchableOpacity, Text, View,
  ScrollView, Image, NativeEventEmitter,
  TouchableHighlight, Modal,
  Dimensions, Platform
} from 'react-native'

import Video from 'react-native-video'
import * as Progress from 'react-native-progress'
import RNFetchBlob from 'react-native-fetch-blob'

import IrisPlayer from './IrisPlayer'
import YouTube from 'react-native-youtube'

const DD = ReactNative.NativeModules.DDBindings

class HomeView extends Component {
  static getHeight() {
    return 100
  }

  constructor(props) {
    super()
    this.state = {
      paused: true, muted: true,
      loading: true, progress: 0.0,
      height: 241,
      showModal: false
    }

    // File caching
    let dirs = RNFetchBlob.fs.dirs
    const filePath = dirs.DocumentDir + '/big_buck_bunny_720p_1mb.mp4'
    RNFetchBlob.fs.exists(filePath)
      .then((exist) => {
        if (!exist) {
          RNFetchBlob
            .config({
              // add this option that makes response data to be stored as a file,
              // this is much more performant.
              fileCache: true,
              path: filePath
            })
            .fetch('GET', 'https://dd-bazaar.s3.amazonaws.com/SampleVideo_1280x720_1mb.mp4', {
              //some headers ..
            })
            // listen to download progress event
            .progress({ count: 50 }, (received, total) => {
              console.log(received / total)
              console.log(received)
              console.log(total)
              this.setState({ progress: received / total })
            })
            .then((res) => {
              // the temp file path
              console.log('The file saved to ', res.path())
              this.setState({ videoSource: res.path() })
            })
        } else {
          this.setState({ videoSource: filePath })
        }
      })
      .catch((err) => { alert(err) })
  }

  onPressVideo = () => {
    this.setState({
      paused: !this.state.paused
    })
  }

  onVideoEnd = () => {
    this.setState({ paused: true })
  }

  onVideoLoad = (data) => {
    const height = ((data.naturalSize.height / data.naturalSize.width) * this.props.frame.width) + 44
    this.setState({ loading: false, height: height })
  }

  onButtonPress = () => {
    this.setState({ showModal: true })
  }

  onVideoLoadFail = (a, b, c) => {
    debugger
  }

  renderPlayer() {
    if (this.props.payload.VideoUrl) {
      const videoId = this.props.payload.VideoUrl.replace(/.+v=(.+?)(&|$)/g, '$1')
      return (
        <YouTube
          videoId={videoId}   // The YouTube video ID
          play={false}             // control playback of video with true/false
          fullscreen={false}       // control whether the video should play in fullscreen or inline
          loop={false}             // control whether the video should loop when ended

          onReady={e => this.setState({ isReady: true })}
          onChangeState={e => this.setState({ status: e.state })}
          onChangeQuality={e => this.setState({ quality: e.quality })}
          onError={e => this.setState({ error: e.error })}

          style={styles.video}
        />
      )
    }
    return (
      <YouTube
        videoId="KVZ-P-ZI6W4"   // The YouTube video ID
        play={false}             // control playback of video with true/false
        fullscreen={false}       // control whether the video should play in fullscreen or inline
        loop={false}             // control whether the video should loop when ended

        onReady={e => this.setState({ isReady: true })}
        onChangeState={e => this.setState({ status: e.state })}
        onChangeQuality={e => this.setState({ quality: e.quality })}
        onError={e => this.setState({ error: e.error })}

        style={styles.video}
      />
    )
  }

  render() {
    //alert(JSON.stringify())
    return (
      <View style={[styles.container, { height: this.state.height }]}>
        <TouchableHighlight style={[styles.videoButton]} onPress={this.onPressVideo}>
          <View style={[styles.video]}>
            {/* {this.state.videoSource &&
              <IrisPlayer
                ref={(ref) => this.player = ref}
                //applicationId='bu4rwtu1xzofdxkhn39ccc9kk'
                onVideoLoadFail={this.onVideoLoadFail}
                playVideoURI={'https://cdn.bambuser.net/broadcasts/b30c5aba-9198-5cb2-d85a-47ee33c0d055?da_signature_method=HMAC-SHA256&da_id=9e1b1e83-657d-7c83-b8e7-0b782ac9543a&da_timestamp=1498015909&da_static=1&da_ttl=0&da_signature=21fdb4f8e3511ec2fa21c64f8fc9c3b22c484e2be1a34d348e643de5fc83e905'}
                style={styles.video}
                paused={this.state.paused}
                repeat={true}
                onEnd={this.onVideoEnd}
                onLoad={this.onVideoLoad}
                resizeMode='cover'
                VODControlsEnabled={true}
              />
            }
            {this.state.progress > 0 &&
              <Progress.Circle size={100} thickness={6} showsText={true} progress={this.state.progress} style={styles.progress} color={DD.primaryColor} />
            } */}
            {this.renderPlayer()}
          </View>
        </TouchableHighlight>
        <TouchableOpacity style={styles.button} onPress={this.onButtonPress}>
          <Text style={styles.buttonText}>View Fullscreen</Text>
        </TouchableOpacity>
        <Modal visible={this.state.showModal}>
          <TouchableHighlight onPress={() => this.setState({ showModal: false })} style={{ marginTop: 146, marginLeft: -146, width: Dimensions.get('window').height, height: Dimensions.get('window').width, transform: [{ rotate: '90deg' }] }}>
            <Video
              ref={(ref) => this.playerModal = ref}
              source={{ uri: this.state.videoSource }}
              style={styles.video}
              paused={false}
              repeat={true}
              onEnd={this.onVideoEnd}
              onLoad={this.onVideoLoad}
              resizeMode='contain'
            />
          </TouchableHighlight>
        </Modal>
      </View >
    )
  }
}

const styles = ReactNative.StyleSheet.create({
  progress: {
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
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
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
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