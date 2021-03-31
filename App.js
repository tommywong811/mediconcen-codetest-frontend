/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import axios from 'axios';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Signup from './Screen/Signup';
import {Screen} from 'react-native-screens';
import Login from './Screen/Login';
import Record from './Screen/Record';
import NewRecord from './Screen/NewRecord';
import RecordData from './Screen/RecordData';

const Stack = createStackNavigator();

const App: () => Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={'Log In'} component={Login} />
        <Stack.Screen name={'Sign Up'} component={Signup} />
        <Stack.Screen name={'Record'} component={Record} />
        <Stack.Screen name={'New Record'} component={NewRecord} />
        <Stack.Screen name={'Record Data'} component={RecordData} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
