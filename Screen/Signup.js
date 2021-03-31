import React, {useState} from 'react';
import type {Node} from 'react';
import {Text, View, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import axios from 'axios';
import {backendUrl} from "../constant";

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Signup: () => Node = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  function signup() {
    const signUpData = JSON.stringify({
      email: email,
      password: password,
      clinicName: clinicName,
      phoneNumber: phoneNumber,
      address: address,
    });
    axios({
      method: 'POST',
      url: backendUrl + '/signup',
      data: signUpData,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => {
      alert(res.data.message);
    });
  }

  return (
    <ScrollView style={{height: '100%', backgroundColor: 'white'}}>
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
      <View
        style={{flexDirection: 'row', justifyContent: 'center', marginTop: 50}}>
        <Text style={{width: 80}}>Clinic Name:</Text>
        <TextInput
          value={clinicName}
          style={{borderColor: 'black', borderBottomWidth: 1, width: 100}}
          onChangeText={event => setClinicName(event)}
        />
      </View>
      <View
        style={{flexDirection: 'row', justifyContent: 'center', marginTop: 50}}>
        <Text style={{width: 80}}>Phone Number:</Text>
        <TextInput
          value={phoneNumber}
          style={{borderColor: 'black', borderBottomWidth: 1, width: 100}}
          onChangeText={event => setPhoneNumber(event)}
        />
      </View>
      <View
        style={{flexDirection: 'row', justifyContent: 'center', marginTop: 50}}>
        <Text style={{width: 80}}>Address:</Text>
        <TextInput
          value={address}
          style={{borderColor: 'black', borderBottomWidth: 1, width: 100}}
          onChangeText={event => setAddress(event)}
        />
      </View>
      <View style={{marginTop: 15}}>
        <TouchableOpacity style={{backgroundColor: '#42C0FB'}} onPress={() => signup()}>
          <Text
            style={{
              textAlign: 'center',
              padding: 15,
              fontSize: 20,
              color: 'white',
            }}>
            Signup
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Signup;
