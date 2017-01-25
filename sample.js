import React, { Component } from 'react';
import ReactNative, { Alert, TouchableOpacity, Text, View, ScrollView, Image, NativeEventEmitter } from 'react-native';

const DD = ReactNative.NativeModules.DDBindings
const eventID = ReactNative.Platform.select({
  ios: () => DD.currentEvent.EventId,
  android: () => JSON.parse(DD.currentEvent).EventId
})();

const ScreenView = ReactNative.Platform.select({
  ios: () => ReactNative.View,
  android: () => ReactNative.View,
})();

class HomeView extends Component {
  constructor() {
    super()
    this.state = { events: [] }
  }

  componentDidMount() {
    DD.setTitle(`DoubleDutch Diagnostic`)

    const eventer = new NativeEventEmitter(ReactNative.NativeModules.DDBindings)
    eventer.addListener('viewDidAppear', (data) => {
      this.setState({ events: this.state.events.concat('viewDidAppear') })
    })
    eventer.addListener('viewDidDisappear', (data) => {
      this.setState({ events: this.state.events.concat('viewDidDisappear') })
    })
  }

  navigate() {
    DD.openURL('dd://activityfeed')
  }

  render() {
    return (
      <ScreenView title="" style={{ flex: 1 }}>
        <ScrollView style={ styles.container }>
          <Image style={ styles.headerImage } resizeMode="contain" source={{ uri: 'https://doubledutch.me/wp-content/uploads/2016/04/doubledutch-logo-300.png' }} />
          <Text style={ styles.welcome }>DoubleDutch Diagnostic</Text>
          <Text style={ styles.h1 }>Event</Text>
          <Text style={ styles.text }>{JSON.stringify(DD.currentEvent)}</Text>
          <Text style={ styles.h1 }>User</Text>
          <Text style={ styles.text }>{JSON.stringify(DD.currentUser)}</Text>
          <Text style={ styles.h1 }>Available Settings/Methods</Text>
          <Text style={ styles.text }>{JSON.stringify(Object.keys(DD))}</Text>
          <Text style={ styles.h1 }>Received Events</Text>
          <Text style={ styles.text }>{this.state.events.join(', ')}</Text>
          <Text style={ styles.h1 }>Interactions</Text>
          <View style={{ opacity: 1 }}>
            <TouchableOpacity style={ styles.button } onPress={() => this.navigate() }>
              <Text style={ styles.buttonText }>Navigate to Feed</Text>
            </TouchableOpacity>
            <TouchableOpacity style={ styles.button } onPress={() => DD.requestAccessToken((err, token) => Alert.alert(token)) }>
              <Text style={ styles.buttonText }>Request Access Token</Text>
            </TouchableOpacity>
            <TouchableOpacity style={ styles.button } onPress={() => Alert.alert('Hi!') }>
              <Text style={ styles.buttonText }>Show Alert</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ScreenView>
    )
  }
}

const styles = ReactNative.StyleSheet.create({
  buttonText: {
    color: '#fff',
    fontWeight: '600'
  },
  button: {
    backgroundColor: DD.primaryColor,
    paddingHorizontal: 50,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  headerImage: {
    marginHorizontal: 20,
    marginVertical: 10,
    flex: 1,
    height: 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#dedede',
    padding: 10,
    paddingTop: 70,
  },
  welcome: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 10,
  },
  h1: {
    fontSize: 18,
    textAlign: 'left',
    fontWeight: 'bold',
    marginVertical: 4,
  },
  h2: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'left',
    marginVertical: 2,
  },
  h3: {
    fontSize: 14,
    textAlign: 'left',
    marginVertical: 2,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default HomeView