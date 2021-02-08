/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  View, Text, StyleSheet, TextInput, Picker, ActivityIndicator,
} from 'react-native';
import NavigationService from '../NavigationService';

export default class Currency extends React.Component {
  static navigationOptions = {
    title: 'Currency Conversion',
  };

  constructor(props) {
    super(props);

    this.state = {
      fromValue: 1,
      fromUnit: 'EUR',
      toUnit: 'USD',
      rate: null,
    };
  }

  componentDidMount() {
    this.getConversions((rateFromAPICall) => {
      this.setState({ rate: rateFromAPICall[Object.keys(rateFromAPICall)[0]] }, () => {
        console.log(this.state.rate);
      });
    });
  }

  getConversions = (callback) => fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.fromUnit}&symbols=${this.state.toUnit}`)
    .then((response) => response.json())
    .then((responseJson) => {
      callback(responseJson.rates);
    });

  render() {
    if (!this.state.rate) {
      return (
        <ActivityIndicator
          animating
          style={styles.indicator}
          size="large"
          color="#005487"
        />
      );
    }
    const currencyList = {
      USD: 'US Dollar ',
      EUR: 'Euro',
      JPY: 'Japanese Yen',
      BGN: 'Bulgarian lev',
      CZK: 'Czech koruna',
      DKK: 'Danish krone',
      GBP: 'Pound sterling',
      HUF: 'Hungarian forint',
      PLN: 'Polish zloty',
      RON: 'Romanian leu',
      SEK: 'Swedish krona',
      CHF: 'Swiss franc',
      ISK: 'Icelandic krona',
      NOK: 'Norwegian krone',
      HRK: 'Croatian kuna',
      RUB: 'Russian rouble',
      TRY: 'Turkish lira',
      AUD: 'Australian dollar',
      BRL: 'Brazilian real',
      CAD: 'Canadian dollar',
      CNY: 'Chinese yuan renminbi',
      HKD: 'Hong Kong dollar',
      IDR: 'Indonesian rupiah',
      ILS: 'Israeli shekel',
      INR: 'Indian rupee',
      KRW: 'South Korean won',
      MXN: 'Mexican peso',
      MYR: 'Malaysian ringgit',
      NZD: 'New Zealand dollar',
      PHP: 'Phillipine peso',
      SGD: 'Singapore dollar',
      THB: 'Thai baht',
      ZAR: 'South African rand',
    };
    const symbolList = {
      USD: '$',
      EUR: '€',
      JPY: '¥',
      BGN: 'Лв',
      CZK: 'Kč',
      DKK: 'kr',
      GBP: '£',
      HUF: 'Ft',
      PLN: 'zł',
      RON: 'L',
      SEK: 'kr',
      CHF: 'CHF',
      ISK: 'Íkr',
      NOK: 'kr',
      HRK: 'kn',
      RUB: '₽',
      TRY: '₺',
      AUD: '$',
      BRL: 'R$',
      CAD: '$',
      CNY: '¥ ',
      HKD: '元',
      IDR: 'Rp',
      ILS: '₪',
      INR: '₹',
      KRW: '₩',
      MXN: '$',
      MYR: 'RM',
      NZD: 'RM',
      PHP: '₱',
      SGD: '$',
      THB: '฿',
      ZAR: 'R',
    };
    return (
      <View style={styles.mainView}>
        <View style={styles.fromToView}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            autoFocus
            onChangeText={(enteredFromValue) => {
              this.setState({ fromValue: enteredFromValue.slice(2) });
            }}
            value={`${symbolList[this.state.fromUnit]} ${this.state.fromValue.toString()}`}
          />
          <Text>From</Text>

          <Picker
            mode="dropdown"
            selectedValue={this.state.fromUnit}
            onValueChange={(selectedFromUnit) => {
              this.setState({ fromUnit: selectedFromUnit }, () => {
                this.getConversions((ratesFromAPICall) => {
                  this.setState({ rate: ratesFromAPICall[Object.keys(ratesFromAPICall)[0]] });
                });
              });
            }}
          >
            {Object.keys(currencyList).map((key) => (
              <Picker.Item label={currencyList[key]} value={key} key={key} />
            ))}
          </Picker>
        </View>
        <View style={styles.fromToView}>
          <TextInput
            editable={false}
            style={styles.input}
            value={`${symbolList[this.state.toUnit]} ${(this.state.rate * this.state.fromValue).toFixed(2)}`}
          />
          <Text>To</Text>
          <Picker
            mode="dropdown"
            selectedValue={this.state.toUnit}
            onValueChange={(selectedToUnit) => {
              this.setState({ toUnit: selectedToUnit }, () => {
                this.getConversions((ratesFromAPICall) => {
                  this.setState({ rate: ratesFromAPICall[Object.keys(ratesFromAPICall)[0]] });
                });
              });
            }}
          >
            {Object.keys(currencyList).map((key) => (
              <Picker.Item label={currencyList[key]} value={key} key={key} />
            ))}
          </Picker>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'row',
  },
  fromToView: {
    minWidth: 200,
    padding: 20,
  },
  picker: {
    flex: 1,
  },
  input: {
    paddingLeft: 10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
