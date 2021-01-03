import React from 'react';
import {
  View, Text, StyleSheet, TextInput, Picker,
} from 'react-native';
// import NavigationService from '../NavigationService';

export default class Currency extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fromValue: 1,
      toValue: 1.2271,
      fromUnit: 'EUR',
      toUnit: 'USD',
    };
  }

  getConversions = (fromUnit, callback) => fetch(`https://api.exchangeratesapi.io/latest?base=${fromUnit}`)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      callback(responseJson.rates);
    });

  render() {
    const {
      fromUnit, fromValue, toValue, toUnit,
    } = this.state;
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
    return (
      <View style={styles.mainView}>
        <View style={styles.fromToView}>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            keyboardType="numeric"
            autoFocus
            onChangeText={(enteredFromValue) => {
              this.getConversions(enteredFromValue, (ratesFromAPICall) => {
                console.log(ratesFromAPICall);
                this.setState({ rates: ratesFromAPICall, toValue: 0 });
              });
              this.setState({ toValue: 0, fromValue: 0 });
            }}
            value={fromValue.toString()}
          />
          <Text>From</Text>

          <Picker
            mode="dropdown"
            selectedValue={fromUnit}
            onValueChange={(selectedFromUnit) => {
              this.setState({ fromUnit: selectedFromUnit });
              this.getConversions(fromUnit, (rates) => {
                console.log(rates);
              });
              this.setState({ toValue: 0 });
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
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            value={toValue.toFixed(3)}
          />
          <Text>To</Text>
          <Picker
            mode="dropdown"
            selectedValue={toUnit}
            onValueChange={(toUnit, unit) => {
              this.setState({ toUnit });
              const convertedVal = convert(fromValue)
                .from(fromUnit)
                .to(toUnit);
              this.setState({ toValue: convertedVal });
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
});
