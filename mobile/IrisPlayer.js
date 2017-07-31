import React, { Component, PropTypes } from 'react';
import { StyleSheet, requireNativeComponent, NativeModules, View, Image } from 'react-native';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },
});

export default class IrisPlayer extends Component {

  constructor(props) {
    super(props);
  }

  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  }

  seek = (time) => {
    this.setNativeProps({ seek: time });
  };

  presentFullscreenPlayer = () => {
    this.setNativeProps({ fullscreen: true });
  };

  dismissFullscreenPlayer = () => {
    this.setNativeProps({ fullscreen: false });
  };

  _assignRoot = (component) => {
    this._root = component;
  };

  _onLoadStart = (event) => {
    if (this.props.onLoadStart) {
      this.props.onLoadStart(event.nativeEvent);
    }
  };

  _onLoad = (event) => {
    if (this.props.onLoad) {
      this.props.onLoad(event.nativeEvent);
    }
  };

  _onError = (event) => {
    if (this.props.onError) {
      this.props.onError(event.nativeEvent);
    }
  };

  _onProgress = (event) => {
    if (this.props.onProgress) {
      this.props.onProgress(event.nativeEvent);
    }
  };

  _onSeek = (event) => {
    if (this.state.showPoster) {
      this.setState({ showPoster: false });
    }

    if (this.props.onSeek) {
      this.props.onSeek(event.nativeEvent);
    }
  };

  _onEnd = (event) => {
    if (this.props.onEnd) {
      this.props.onEnd(event.nativeEvent);
    }
  };

  _onTimedMetadata = (event) => {
    if (this.props.onTimedMetadata) {
      this.props.onTimedMetadata(event.nativeEvent);
    }
  };

  _onFullscreenPlayerWillPresent = (event) => {
    if (this.props.onFullscreenPlayerWillPresent) {
      this.props.onFullscreenPlayerWillPresent(event.nativeEvent);
    }
  };

  _onFullscreenPlayerDidPresent = (event) => {
    if (this.props.onFullscreenPlayerDidPresent) {
      this.props.onFullscreenPlayerDidPresent(event.nativeEvent);
    }
  };

  _onFullscreenPlayerWillDismiss = (event) => {
    if (this.props.onFullscreenPlayerWillDismiss) {
      this.props.onFullscreenPlayerWillDismiss(event.nativeEvent);
    }
  };

  _onFullscreenPlayerDidDismiss = (event) => {
    if (this.props.onFullscreenPlayerDidDismiss) {
      this.props.onFullscreenPlayerDidDismiss(event.nativeEvent);
    }
  };

  _onReadyForDisplay = (event) => {
    if (this.props.onReadyForDisplay) {
      this.props.onReadyForDisplay(event.nativeEvent);
    }
  };

  _onPlaybackStalled = (event) => {
    if (this.props.onPlaybackStalled) {
      this.props.onPlaybackStalled(event.nativeEvent);
    }
  };

  _onPlaybackResume = (event) => {
    if (this.props.onPlaybackResume) {
      this.props.onPlaybackResume(event.nativeEvent);
    }
  };

  _onPlaybackRateChange = (event) => {
    if (this.state.showPoster && (event.nativeEvent.playbackRate !== 0)) {
      this.setState({ showPoster: false });
    }

    if (this.props.onPlaybackRateChange) {
      this.props.onPlaybackRateChange(event.nativeEvent);
    }
  };

  _onAudioBecomingNoisy = () => {
    if (this.props.onAudioBecomingNoisy) {
      this.props.onAudioBecomingNoisy();
    }
  };

  _onAudioFocusChanged = (event) => {
    if (this.props.onAudioFocusChanged) {
      this.props.onAudioFocusChanged(event.nativeEvent);
    }
  };

  _onBuffer = (event) => {
    if (this.props.onBuffer) {
      this.props.onBuffer(event.nativeEvent);
    }
  };

  render() {
    const nativeProps = Object.assign({}, this.props);
    Object.assign(nativeProps, {
      style: [styles.base, nativeProps.style],
      VODControlsEnabled: true,
      // resizeMode: nativeResizeMode,
      // src: {
      //   uri,
      //   isNetwork,
      //   isAsset,
      //   type: source.type || '',
      //   mainVer: source.mainVer || 0,
      //   patchVer: source.patchVer || 0,
      // },
      // onVideoLoadStart: this._onLoadStart,
      // onVideoLoad: this._onLoad,
      // onVideoError: this._onError,
      // onVideoProgress: this._onProgress,
      // onVideoSeek: this._onSeek,
      // onVideoEnd: this._onEnd,
      // onVideoBuffer: this._onBuffer,
      // onTimedMetadata: this._onTimedMetadata,
      // onVideoFullscreenPlayerWillPresent: this._onFullscreenPlayerWillPresent,
      // onVideoFullscreenPlayerDidPresent: this._onFullscreenPlayerDidPresent,
      // onVideoFullscreenPlayerWillDismiss: this._onFullscreenPlayerWillDismiss,
      // onVideoFullscreenPlayerDidDismiss: this._onFullscreenPlayerDidDismiss,
      // onReadyForDisplay: this._onReadyForDisplay,
      // onPlaybackStalled: this._onPlaybackStalled,
      // onPlaybackResume: this._onPlaybackResume,
      // onPlaybackRateChange: this._onPlaybackRateChange,
      // onAudioFocusChanged: this._onAudioFocusChanged,
      // onAudioBecomingNoisy: this._onAudioBecomingNoisy,
    });

    return (
      <RCTBambuserPlayer
        ref={this._assignRoot}
        {...nativeProps}
      />
    );
  }
}

IrisPlayer.propTypes = {
  /* Native only */
  resourceUri: PropTypes.string,
  seekTo: PropTypes.number,
  applicationId: PropTypes.string,
  status: PropTypes.number,
  playbackPosition: PropTypes.number,
  live: PropTypes.bool,
  VODControlsEnabled: PropTypes.bool,
  timeShiftModeEnabled: PropTypes.bool,
  seekableStart: PropTypes.number,
  seekableEnd: PropTypes.number,
  volume: PropTypes.number,

  stopVideo: PropTypes.bool,
  pauseVideo: PropTypes.bool,
  playVideo: PropTypes.bool,
  playVideoURI: PropTypes.string,

  fullscreen: PropTypes.bool,
  onVideoLoadFail: PropTypes.func,
  onPlaybackStarted: PropTypes.func,
  onPlaybackPaused: PropTypes.func,
  onPlaybackStopped: PropTypes.func,
  onPlaybackCompleted: PropTypes.func,
  onDurationKnown: PropTypes.func,
  onCurrentViewerCountUpdated: PropTypes.func,
  onTotalViewerCountUpdated: PropTypes.func,

  /* Required by react-native */
  scaleX: PropTypes.number,
  scaleY: PropTypes.number,
  translateX: PropTypes.number,
  translateY: PropTypes.number,
  rotation: PropTypes.number,
  ...View.propTypes,
};

const RCTBambuserPlayer = requireNativeComponent('RCTBambuserPlayer', IrisPlayer, {
  nativeOnly: {
    src: true,
    seek: true,
    fullscreen: true,
  },
});