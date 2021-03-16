import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Header } from 'react-native-elements';
import dictionary from './localdb'

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
    };
  }

  getWord = (text) => {
    var text = text.toLowerCase()
      try{
          var wordData = dictionary[text]["word"]
          var definition =  dictionary[text]["definition"]
          var lexicalCategory =  dictionary[text]["lexicalCategory"]

          this.setState({
            word: wordData,
            definition: definition,
            lexicalCategory: lexicalCategory,
      }) 
      }    

      catch(err){
        alert('Sorry this word is not available in Dictionary')
        this.setState({
          'text':'',
          'isSearchPressed':false,
        })
      }  
        }
      
  

  render() {
    return (
      <View>
        <Header
          backgroundColor={'lime'}
          centerComponent={{
            text: 'Whitehat Dictionary',
            style: { color: '#fff', fontSize: 20 },
          }}
        />
        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({
              text: text,
              isSearchedPressed: false,
              word: 'Loading...',
              lexicalCategory: '',
              examples: [],
              definition: '',
            });
          }}
          value={this.state.text}
        />
        <TouchableOpacity
          style={styles.goButton}
          onPress={() => {
            this.setState({ isSearchedPressed: true });
            this.getWord(this.state.text);
          }}>
          <Text style={styles.buttonText}>Run</Text>
        </TouchableOpacity>

        <View style={styles.chunkButton}>
          <Text style={styles.displayText}>Word:{''}</Text>
          <Text>{this.state.word}</Text>
        </View>

                <View style={styles.chunkButton}>
          <Text style={styles.displayText}>Type:{''}</Text>
          <Text>{this.state.lexicalCategory}</Text>
        </View>

                  <View style={styles.button}>
          <Text style={styles.displayText}>Definition:{''}</Text>
          <Text>{this.state.definition}</Text>
        </View>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  inputBox: {
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    backgroundColor: 'cyan',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  goButton: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
    backgroundColor: 'cyan',
    borderWidth: 5,
    borderRadius: 20,
  },

  displayText: {
    textAlign: 'center',
    fontSize: 30,
  },
  chunkButton: {
    width: '60%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    margin: 5,
  },
  button:{
    width: '60%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    margin: 5,
    flexDirection:'row',
    flexWrap:'wrap'
  }
});
