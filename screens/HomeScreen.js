import React from "react";
import { FlatGrid } from "react-native-super-grid";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions
} from "react-native";
import NavigationService from "../NavigationService";
const { width, height } = Dimensions.get("window");

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    headerBackground: (
      <Image
        source={require("../assets/logo.png")}
        style={{
          width: "auto",
          height: "auto",
          alignSelf: "center",
          resizeMode: "contain"
        }}
      />
    )
  };
  render() {
    const items = [
      { name: "Donate", id: "Donate" },
      {
        name: "Zakat Calculator",
        id: "Assets"
      },
      {
        name: "Global Projects",
        id: "Projects"
      },
      {
        name: "Unit Conversions",
        id: "Measurements"
      },
      {
        name: "Salat Times",
        id: "SalatTimes"
      },
      {
        name: "Qibla Compass",
        id: "Qibla"
      },
      {
        name: "Islamic Calendar",
        id: "IslamicCalendar"
      },
      {
        name: "Weather",
        id: "Weather"
      }
    ];

    return (
      <View style={styles.container}>
        <View style={{ flex: 0.3 }}>
          <Image
            source={require("../assets/logo.png")}
            style={{
              width: width - 20,
              height: height - height / 1.25,
              alignSelf: "center",
              resizeMode: "contain"
            }}
          />
        </View>
        <FlatGrid
          itemDimension={130}
          items={items}
          style={styles.gridView}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                NavigationService.navigate(item.id);
              }}
            >
              <ImageBackground
                source={require("../assets/squareglobe.png")}
                style={styles.itemContainer}
                imageStyle={{ borderRadius: 20 }}
              >
                <Text style={styles.itemName}>{item.name}</Text>
              </ImageBackground>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    alignItems: "center",
    fontSize: 25
  },
  button: {
    padding: 20
  },
  gridView: {
    marginTop: 0,
    flex: 1,
    alignSelf: "center"
  },
  itemContainer: {
    justifyContent: "center",
    borderRadius: 25,
    padding: 10,
    height: 150,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12
  },
  itemName: {
    fontSize: 25,
    alignSelf: "flex-start",
    color: "#fff"
  },
  whatWeDo: {
    paddingTop: 30,
    fontSize: 40,
    color: "#fff",
    fontWeight: "600",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    textShadowColor: "#000"
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff"
  }
});
