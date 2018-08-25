import { AppRegistry , YellowBox } from 'react-native';
import App from './App';

console.disableYellowBox = true;

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: componentWillUpdate is deprecated',
]);

AppRegistry.registerComponent('Namatel', () => App);
