var React = require('react-native');
var { AppRegistry } = React;
import SampleView from './sample.js'

console.disableYellowBox = true;
AppRegistry.registerComponent('AppStoreSample', () => SampleView);
