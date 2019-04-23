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
      {
        name: "Zakat Calculator",
        desc: "Donate to our Zakat Fund",
        id: "Assets"
      },
      { name: "Qibla Compass", desc: "description here", id: "Qibla" },
      { name: "Donate", desc: "Make a General Donation", id: "Donate" }
      //{ name: "Currency Conversion", desc: "description here", id: "Donate" },
      //{ name: "Settings", desc: "", id: "Settings"}
    ];

    return (
      <View style={styles.container}>
        <View style={{ flex: 0.75 }}>
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

        {/*}				<TouchableOpacity
					onPress={() => {
						NavigationService.navigate("Locations");
					}}>
					<ImageBackground
						source={require("../assets/whatwedo.jpg")}
						style={{
							width: width - 20,
							height: height / 6,
							alignSelf: "center",
							resizeMode: "contain"
						}}>
						<Text style={styles.whatWeDo}>View our global locations</Text>
					</ImageBackground>
				</TouchableOpacity>
					*/}
        <FlatGrid
          itemDimension={width - 10}
          items={items}
          style={styles.gridView}
          // staticDimension={300}
          // fixed
          // spacing={20}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                NavigationService.navigate(item.id);
              }}
            >
              <ImageBackground
                source={require("../assets/squareglobe.png")}
                style={[styles.itemContainer]}
              >
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemCode}>{item.desc}</Text>
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
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 10,
    height: 150
  },
  itemName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600"
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
