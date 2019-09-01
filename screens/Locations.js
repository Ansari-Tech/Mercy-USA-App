import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";

import MapView from "react-native-maps";

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 3;
const CARD_WIDTH = width - 60;

export default class Locations extends React.Component {
  static navigationOptions = {
    title: "Offices"
  };
  state = {
    markers: [
      {
        coordinate: {
          latitude: 42.360406,
          longitude: -83.480501
        },
        title: "USA Headquarters",
        description:
          "44450 Pinetree Drive Suite 201 \nPlymouth, Michigan 48170-3869",
        image: require("../assets/offices/usa.png")
      },
      {
        coordinate: {
          latitude: 41.328679,
          longitude: 19.814329
        },
        title: "Albania",
        description:
          "Rruga Kajo Karafili Pall 1, Shk 1, 3rd Floor Tirana, Albania",
        image: require("../assets/offices/albania.png")
      },
      {
        coordinate: {
          latitude: 34.436622,
          longitude: 35.83
        },
        title: "Lebanon",
        description:
          "Alboraque Building, 5th Floor, Unit 5 Nour Square, Altall Tripoli Lebanon",
        image: require("../assets/offices/lebanon.png")
      },
      {
        coordinate: {
          latitude: 44.539998,
          longitude: 18.66
        },
        title: "Bosnia",
        description: "Rudarska 13/1 Tuzla 75000 Bosnia & Herzegovina",
        image: require("../assets/offices/bosnia.png")
      },
      {
        coordinate: {
          latitude: 3.56,
          longitude: 98.64
        },
        title: "Indonesia",
        description:
          "Jln, Setia Budi, Komplek Setia Budi Point No. 15-A Medan, Indonesia",
        image: require("../assets/offices/indonesia.png")
      },
      {
        coordinate: {
          latitude: 2.046,
          longitude: 45.3
        },
        title: "Somalia",
        description: "Hodan District, Mogadishu, Somalia",
        image: require("../assets/offices/somalia.png")
      },
      {
        coordinate: {
          latitude: -1.298,
          longitude: 36.779
        },
        title: "Kenya",
        description:
          "Rose Avenue, Gate No. 3 (next to avenue 5)\n Kilimani, Nairobi",
        image: require("../assets/offices/kenya.png")
      },
      {
        coordinate: {
          latitude: 36.2207,
          longitude: 36.1498
        },
        title: "Turkey",
        description:
          "Aksaray Mah. 75. Yıl Bulvarı Ishakoglu- 2 Apt No: 116/9 Antakya, Hatay Turkey",
        image: require("../assets/offices/Turkey.png")
      }
    ],
    region: {
      latitude: 37.360406,
      longitude: -83.480501,
      latitudeDelta: 20.0,
      longitudeDelta: 20.0
    }
  };

  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }
  componentDidMount() {
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      if (index >= this.state.markers.length) {
        index = this.state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          let lat = this.state.markers[index].coordinate.latitude;
          let lon = this.state.markers[index].coordinate.longitude;
          this.map.animateToRegion(
            {
              latitude: lat - 5,
              longitude: lon,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta
            },
            2000
          );
        }
      }, 10);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref={map => (this.map = map)}
          initialRegion={this.state.region}
          style={styles.container}
        >
          {this.state.markers.map((marker, index) => {
            return (
              <MapView.Marker key={index} coordinate={marker.coordinate} />
            );
          })}
        </MapView>
        <Animated.ScrollView
          pagingEnabled={true}
          horizontal={true}
          decelerationRate={0}
          snapToInterval={width - 60}
          snapToAlignment={"center"}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation
                  }
                }
              }
            ],
            {
              useNativeDriver: true
            }
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
          {this.state.markers.map((marker, index) => (
            <View style={styles.card} key={index}>
              <View style={styles.textContent}>
                <Image
                  source={marker.image}
                  style={{
                    width: width - 110,
                    height: 120
                  }}
                />
                <Text style={styles.cardDescription}>{marker.description}</Text>
              </View>
              <View
                style={{
                  position: "absolute",
                  top: 15,
                  left: 15
                }}
              >
                <Text numberOfLines={1} style={styles.cardTitle}>
                  {marker.title}
                </Text>
              </View>
              <View
                style={{
                  position: "absolute",
                  bottom: 10,
                  left: 0,
                  right: 0
                }}
              />
            </View>
          ))}
        </Animated.ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 0
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH
  },
  card: {
    elevation: 1,
    marginTop: 100,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.2,
    shadowOffset: {
      x: 2,
      y: -2
    },
    width: width - 80,
    margin: 10,
    height: 200,
    borderRadius: 10
  },
  textContent: {
    alignContent: "center",
    paddingTop: 15,
    paddingLeft: 10
  },
  cardTitle: {
    fontSize: 25,
    marginTop: 5,
    paddingLeft: 10,
    color: "#ffffff",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    shadowOpacity: 1.5
  },
  cardDescription: {
    fontSize: 12,
    paddingLeft: 0,
    paddingRight: 25,
    color: "#444"
  },
  readMmore: {
    fontSize: 12,
    color: "blue",
    paddingLeft: 0
  }
});

AppRegistry.registerComponent("mapfocus", () => screens);
