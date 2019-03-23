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

import { MapView, Marker } from "expo";

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 3;
const CARD_WIDTH = width - 60;

export default class Locations extends React.Component {
  state = {
    markers: [
      {
        coordinate: {
          latitude: 42.360406,
          longitude: -83.480501
        },
        title: "Mercy USA Headquarters",
        description: "stuff here"
      },
      {
        coordinate: {
          latitude: 41.328679,
          longitude: 19.814329
        },
        title: "Mercy USA Albania",
        description: "stuff here"
      },
      {
        coordinate: {
          latitude: 34.436622,
          longitude: 35.83
        },
        title: "Mercy USA Lebanon",
        description: "more stuff here"
      },
      {
        coordinate: {
          latitude: 44.539998,
          longitude: 18.66
        },
        title: "Mercy USA Bosnia",
        description: "stuff"
      },
      {
        coordinate: {
          latitude: 3.56,
          longitude: 98.64
        },
        title: "Mercy USA Indonesia",
        description: "stuff"
      },
      {
        coordinate: {
          latitude: 2.046,
          longitude: 45.3
        },
        title: "Mercy USA Somalia",
        description: "stuff"
      },
      {
        coordinate: {
          latitude: -1.298,
          longitude: 36.779
        },
        title: "Mercy USA Kenya",
        description: "stuff"
      },
      {
        coordinate: {
          latitude: 36.2207,
          longitude: 36.1498
        },
        title: "Mercy USA Turkey",
        description: "stuff"
      }
    ],
    region: {
      latitude: 32.360406,
      longitude: -83.480501,
      latitudeDelta: 35.0,
      longitudeDelta: 0
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
              latitude: lat - 10,
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
          style={styles.container}>
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
          contentContainerStyle={styles.endPadding}>
          {this.state.markers.map((marker, index) => (
            <View style={styles.card} key={index}>
              <Image
                source={marker.image}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>
                  {marker.title}
                </Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                  {marker.description}
                </Text>
              </View>
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
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    width: width - 80,
    margin: 10,
    height: 200,
    borderRadius: 10
  },
  textContent: {
    flex: 1,
    alignContent: "center"
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold"
  },
  cardDescription: {
    fontSize: 12,
    color: "#444"
  }
});

AppRegistry.registerComponent("mapfocus", () => screens);
