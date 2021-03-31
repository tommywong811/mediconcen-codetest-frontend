import React, {useState} from 'react';
import axios from 'axios';
import {Text, TextInput, TouchableOpacity, View, Switch, ScrollView} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { backendUrl } from "../constant";

export default function NewRecord({navigation}) {
  const [doctorName, setDoctorName] = useState('');
  const [patientName, setPatientName] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [medication, setMedication] = useState('');
  const [consultationFee, setConsultationFee] = useState('');
  const [hasFollowUp, setHasFollowUp] = useState(false);

  async function createNewRecord() {
    let token = await EncryptedStorage.getItem('secure_token');
    const recordData = JSON.stringify({
      doctorName,
      patientName,
      diagnosis,
      medication,
      consultationFee,
      hasFollowUp: hasFollowUp ? 1 : 0,
    });
    axios({
      method: 'POST',
      url: backendUrl + '/record',
      data: recordData,
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token,
      },
    }).then(res => {
      alert(res.data.message);
      navigation.navigate('Record');
    });
  }

  return (
    <ScrollView style={{height: '100%', backgroundColor: 'white'}}>
      <View
        style={{flexDirection: 'row', justifyContent: 'center', marginTop: 50}}>
        <Text style={{width: 80}}>Doctor Name</Text>
        <TextInput
          autoFocus
          value={doctorName}
          style={{borderColor: 'black', borderBottomWidth: 1, width: 100}}
          onChangeText={event => setDoctorName(event)}
        />
      </View>
      <View
        style={{flexDirection: 'row', justifyContent: 'center', marginTop: 50}}>
        <Text style={{width: 80}}>Patient Name</Text>
        <TextInput
          value={patientName}
          style={{borderColor: 'black', borderBottomWidth: 1, width: 100}}
          onChangeText={event => setPatientName(event)}
        />
      </View>
      <View
        style={{flexDirection: 'row', justifyContent: 'center', marginTop: 50}}>
        <Text style={{width: 80}}>Diagnosis</Text>
        <TextInput
          value={diagnosis}
          style={{borderColor: 'black', borderBottomWidth: 1, width: 100}}
          onChangeText={event => setDiagnosis(event)}
        />
      </View>
      <View
        style={{flexDirection: 'row', justifyContent: 'center', marginTop: 50}}>
        <Text style={{width: 80}}>Medication</Text>
        <TextInput
          value={medication}
          style={{borderColor: 'black', borderBottomWidth: 1, width: 100}}
          onChangeText={event => setMedication(event)}
        />
      </View>
      <View
        style={{flexDirection: 'row', justifyContent: 'center', marginTop: 50}}>
        <Text style={{width: 80}}>Consultant Fee</Text>
        <TextInput
          value={consultationFee}
          keyboardType="numeric"
          style={{borderColor: 'black', borderBottomWidth: 1, width: 100}}
          onChangeText={event => setConsultationFee(event)}
        />
      </View>
      <View
        style={{flexDirection: 'row', justifyContent: 'center', marginTop: 50}}>
        <Text style={{width: 80}}>Follow-up Consultation</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={hasFollowUp ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setHasFollowUp(!hasFollowUp)}
          value={hasFollowUp}
        />
      </View>
      <View style={{marginTop: 15}}>
        <TouchableOpacity
          style={{backgroundColor: '#42C0FB'}}
          onPress={() => createNewRecord()}>
          <Text
            style={{
              textAlign: 'center',
              padding: 15,
              fontSize: 20,
              color: 'white',
            }}>
            Create Record
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
