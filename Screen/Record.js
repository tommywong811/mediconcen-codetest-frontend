import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Text, TextInput, TouchableOpacity, View, FlatList} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { backendUrl } from "../constant";

export default function Record({navigation}) {
  const [recordList, setRecordList] = useState(null);

  async function fetchRecord() {
    let token = await EncryptedStorage.getItem('secure_token');
    axios({
      method: 'get',
      url: backendUrl + '/record',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token,
      },
    }).then(res => {
      console.log(res.data);
      setRecordList(res.data);
    });
  }
  useEffect(() => {
    fetchRecord();
  }, []);

  return (
    <View>
      <TouchableOpacity
        style={{backgroundColor: '#42C0FB'}}
        onPress={() => navigation.navigate('New Record')}>
        <Text
          style={{
            textAlign: 'center',
            padding: 15,
            fontSize: 20,
            color: 'white',
          }}>
          New Record
        </Text>
      </TouchableOpacity>
      <FlatList
        data={recordList}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{backgroundColor: '#42C0FB'}}
            onPress={() => navigation.navigate('Record Data', {userId: item.record_id})}>
            <Text
              style={{
                textAlign: 'center',
                padding: 15,
                fontSize: 20,
                color: 'white',
              }}>
              Record Id: {item.record_id}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.record_id}
      />
    </View>
  );
}
