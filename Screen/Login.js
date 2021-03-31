import type {Node} from 'react';
import React, {useState} from 'react';
import axios from 'axios';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { backendUrl } from "../constant";

async function storeToken(jwtToken) {
  try {
    await EncryptedStorage.setItem('secure_token', jwtToken);
    alert('Success login');
  } catch (error) {
    console.log(error);
  }
}

async function getToken() {
  try {
    let token = await EncryptedStorage.getItem('secure_token');
    console.log(token);
    if (token != undefined) {
      alert(JSON.stringify(token));
    } else {
      alert('No values stored under that key.');
    }
  } catch (error) {
    console.log(error);
  }
}

function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function login() {
    const logInData = JSON.stringify({
      email: email,
      password: password,
    });
    axios({
      method: 'POST',
      url: backendUrl + '/login',
      data: logInData,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(function (res) {
      storeToken(res.data.token).then(() => {
        navigation.navigate('Record');
      });
    });
  }

  return (
    <View style={{height: '100%', backgroundColor: 'white'}}>
      <View
        style={{flexDirection: 'row', justifyContent: 'center', marginTop: 50}}>
        <Text style={{width: 80}}>Email:</Text>
        <TextInput
          autoFocus
          value={email}
          style={{borderColor: 'black', borderBottomWidth: 1, width: 100}}
          onChangeText={event => setEmail(event)}
        />
      </View>
      <View
        style={{flexDirection: 'row', justifyContent: 'center', marginTop: 50}}>
        <Text style={{width: 80}}>Password:</Text>
        <TextInput
          value={password}
          secureTextEntry
          style={{borderColor: 'black', borderBottomWidth: 1, width: 100}}
          onChangeText={event => setPassword(event)}
        />
      </View>
      <View style={{marginTop: 15}}>
        <TouchableOpacity
          style={{backgroundColor: '#42C0FB'}}
          onPress={() => login()}>
          <Text
            style={{
              textAlign: 'center',
              padding: 15,
              fontSize: 20,
              color: 'white',
            }}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{backgroundColor: '#42C0FB'}}
          onPress={() => navigation.navigate('Sign Up')}>
          <Text
            style={{
              textAlign: 'center',
              padding: 15,
              fontSize: 20,
              color: 'white',
            }}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Login;
