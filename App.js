import React,{useState, useEffect} from 'react';
import {View, FlatList, Text, ActivityIndicator, StyleSheet} from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import axios from 'axios';

const App = ()=>{
  const [loading, setLoading] = useState(true);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(()=>{
    //memanggil API menggunakan axios
    axios.get('http://localhost:5000/api/quizzes',
    {headers:{'ngrok-skip-browser-warning':'true'}})
    .then((response)=>{
      setQuizzes(response.data.data);
      setLoading(false);
      console.log(response.data.data);
    })
    .catch((error)=>{
      console.log(error);
      setLoading(false);
    });
  },[]
  );

  const renderItem = ({item})=>{
    return(
      <Card containerStyle={{ backgroundColor: '#ffffff', borderColor: '#000000', borderRadius: 10 }}>
      <Card.Title style={{ color: '#000000' }}>Quiz: {item.quiz}</Card.Title>
      <ListItem>
        <ListItem.Content>
          <ListItem.Title style={{ color: '#000000' }}>A. {item.a}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <ListItem>
        <ListItem.Content>
          <ListItem.Title style={{ color: '#000000' }}>B. {item.b}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <ListItem>
        <ListItem.Content>
          <ListItem.Title style={{ color: '#000000' }}>C. {item.c}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <ListItem>
        <ListItem.Content>
          <ListItem.Title style={{ color: '#000000' }}>D. {item.d}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <Card.Title style={{ color: 'red', marginLeft:120}}>SKOR : 10</Card.Title>
    </Card>
    )
};

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#a5d6a7' }}>
      {loading ? (
        <>
          <ActivityIndicator size='large' color='#ffffff' />
          <Text style={{ marginTop: 10, color: '#ffffff' }}>Tunggu sebentar...</Text>
        </>
      ) : (
        <FlatList
          data={quizzes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
}

export default App;