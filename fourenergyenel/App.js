import React, { Component } from 'react';
import { View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight} from 'react-native';
import { getUserInfo } from './src/services/FetchUser';
import DashboardComponent from './src/components/DashboardComponent';

export default class SearchComponent extends Component {
  constructor(props) {
      super(props);
      this.state = {
        username: '',
        error: false
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
      this.setState({
        username: e.nativeEvent.text
      });
    }
    handleSubmit() {
      getUserInfo(this.state.username)
          .then((res) => {
              if(res.message === 'Not Found') {
                this.setState({
                    error: 'User not found'
                });
              }
            else {
              this.props.navigator.push({
                title: res.name || 'No Title',
                passProps: {userInfo: res},
                component: DashboardComponent
              });
              this.setState({
                error: false,
                username: ''
              })
            }
        });
    }
  render() {
    let showErr = (
      this.state.error ?
      <Text>
        {this.state.error}
      </Text> :
      <View></View>
    );
    return (
      <View style={styles.main}>
        <Text style={styles.title}>Unidade Consumidora (UC)</Text>
        <TextInput
              style={styles.searchInput}
              onChange={this.handleChange}
            />
        <TouchableHighlight
                style = {styles.button}
                underlayColor= "white"
                onPress = {this.handleSubmit}
              >
              <Text
                  style={styles.buttonText}>
                  Buscar
              </Text>
            </TouchableHighlight>
            {showErr}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: '#ff5a10',
    borderRadius: 8,
    color: '#ff5a10'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor:'#ff5a10',
    borderColor: '#ff5a10',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});