var React = require('react-native');
var { AppRegistry } = React;
import LeadCapture from './lead-capture.js'
import PromotedVideo from './promoted-video.js'
import TakeSelfie from './take-selfie.js'
import IntroCard from './intro-card.js'

console.disableYellowBox = true;
AppRegistry.registerComponent('IntroCard', () => IntroCard);
AppRegistry.registerComponent('LeadCapture', () => LeadCapture);
AppRegistry.registerComponent('PromotedVideo', () => PromotedVideo);
AppRegistry.registerComponent('TakeSelfie', () => TakeSelfie);
