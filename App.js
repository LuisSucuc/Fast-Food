import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import LoginScreen from './Screens/LoginScreen';

import FlashMessage from "react-native-flash-message";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const navigationOptions = ({ navigation }) => ( {
    headerPressColorAndroid: '#308e56',
    headerStyle: {height: 0},
    headerLeft: null,
    navigationOptions: (
      <View style={{backgroundColor: '#308e56'}}>
      </View>
    ),
    headerForceInset: { top: 'never', bottom: 'never' },
  }
)

const AppNavigator = createStackNavigator({
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: navigationOptions,
    headerMode: 'none'
  },
  
},
{
  initialRouteName: 'LoginScreen',
  animationEnabled: true
});


const AppContainer = createAppContainer(AppNavigator);



class App extends React.Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppContainer/>
        <FlashMessage position="top" />
      </View>
    );
  }
}

  export default App;

