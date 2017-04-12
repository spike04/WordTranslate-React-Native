import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, Picker } from 'react-native';
import { Constants } from 'expo';
import { Bars} from 'react-native-loader';
import Header from './src/components/header';
import EditText from './src/components/editText';
const key = "trnsl.1.1.20170401T074425Z.a246f2e42a791ac5.a7d303ee3c1fbca9bc85d0e97cb7a18f13999136";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      word: '',
      loading: false,
      goForRequest: false,
      translatedWord: '',
      language: 'ru'
    }
  }

  onWordChange = (word) => {
    this.setState({word});
  }

  translate = () => {
    this.setState({
      loading: true
    });

    fetch('https://translate.yandex.net/api/v1.5/tr.json/translate?key='+key+'&lang='+this.state.language+'&text='+this.state.word)
      .then((response) => response.json())
      .then((responseJson) => {
        var translatedWord = responseJson.text;
        this.setState({translatedWord, loading: false});
      })
      .catch((error) => {
        this.setState({loading: false});
        Alert.alert('Something Went Wrong');
      });
  }

  checkLoading = () => {
      if(!this.state.loading) {
        return <View style={styles.translateViewStyle}>
          <Text style={styles.translatedWordHint}>English</Text>
          <Text style={styles.translatedWord}>{this.state.word}</Text>
          <Text style={styles.translatedWordHint}>Translated</Text>
          <Text style={styles.translatedWord}>{this.state.translatedWord}</Text>
        </View>;
      } else {
        return <View style={styles.progressStyle}>
          <Bars size={20} color='green' />
        </View>;
      }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title='Word Translator'/>
        <View style={styles.content}>
          <EditText onWordChange={this.onWordChange} />

          <Text>Choose Langulage to Translate</Text>
          <Picker
            selectedValue={this.state.language}
            onValueChange={(lang) => this.setState({language: lang})}>
            <Picker.Item label="Russian" value="ru" />
            <Picker.Item label="French" value="fr" />
            <Picker.Item label="Spanish" value="es" />
            <Picker.Item label="Chineese" value="zh" />
            <Picker.Item label="Nepali" value="ne" />

          </Picker>
          <Button
            onPress={this.translate}
            title="Translate"
            color="green"
            disabled={(this.state.word.toString().trim().length == 0)? true: false}
            />
        </View>

        {this.checkLoading()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
  },
  content: {
    margin: 10
  },
  translateViewStyle: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  translatedWordHint: {
    fontSize: 18,
    color: 'grey',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 20,
  },
  translatedWord: {
    fontSize: 20,
    color: 'green',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  progressStyle: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
