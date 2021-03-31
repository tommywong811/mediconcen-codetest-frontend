import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Switch,
  ScrollView,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { backendUrl } from "../constant";

export default function RecordData({route, navigation}) {
  let {userId} = route.params;
  const [doctorName, setDoctorName] = useState('');
  const [patientName, setPatientName] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [medication, setMedication] = useState('');
  const [consultationFee, setConsultationFee] = useState('');
  const [hasFollowUp, setHasFollowUp] = useState('');

  async function fetchData(){
    let token = await EncryptedStorage.getItem('secure_token');
    axios({
      method: 'get',
      url: backendUrl + '/record/' + userId,
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token,
      },
    }).then(res => {
      console.log(res);
      setDoctorName(res.data.doctor_name);
      setPatientName(res.data.patient_name);
      setDiagnosis(res.data.diagnosis);
      setMedication(res.data.medication);
      setConsultationFee(res.data.consultation_fee);
      setHasFollowUp(res.data.has_follow_up == 1 ? 'yes' : 'no');
    });
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <View>
      <View
        style={{flexDirection: 'row', justifyContent: 'center', marginTop: 50}}>
        <Text style={{width: 80}}>Doctor Name</Text>
        <Text style={{ width: 100}}>
          {doctorName}
        </Text>
      </View>
      <View
        style={{flexDirection: 'row', justifyContent: 'center', marginTop: 50}}>
        <Text style={{width: 80}}>Patient Name</Text>
        <Text style={{ width: 100}}>
          {patientName}
        </Text>
      </View>
      <View
        style={{flexDirection: 'row', justifyContent: 'center', marginTop: 50}}>
        <Text style={{width: 80}}>Diagnosis</Text>
        <Text style={{ width: 100}}>
          {diagnosis}
        </Text>
      </View>
      <View
        style={{flexDirection: 'row', justifyContent: 'center', marginTop: 50}}>
        <Text style={{width: 80}}>Medication</Text>
        <Text style={{ width: 100}}>
          {medication}
        </Text>
      </View>
      <View
        style={{flexDirection: 'row', justifyContent: 'center', marginTop: 50}}>
        <Text style={{width: 80}}>Consultant Fee</Text>
        <Text style={{ width: 100}}>
          {consultationFee}
        </Text>
      </View>
      <View
        style={{flexDirection: 'row', justifyContent: 'center', marginTop: 50}}>
        <Text style={{width: 80}}>Follow-up</Text>
        <Text style={{ width: 100}}>
          {hasFollowUp}
        </Text>
      </View>
    </View>
  );
}
