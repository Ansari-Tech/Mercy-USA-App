import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Animated,
  Image,
  Dimensions,
  Linking
} from "react-native";

import { MapView, Asset } from "expo";

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 3;
const CARD_WIDTH = width - 60;

export default class Projects extends React.Component {
  static navigationOptions = {
    title: "Projects"
  };
  state = {
    markers: [
      {
        coordinate: {
          latitude: 34.86,
          longitude: 38.86
        },
        title: "Syria",
        description:
          "Since October 2012, Mercy-USA for Aid and Development’s Syrian relief workers have been providing food aid inside Syria. Currently, we are assisting thousands of displaced and vulnerable families with monthly food baskets, medical care, seasonal food and meat distribution plus heat and shelter in northern Syria.",
        link: "https://mercyusa.org/project/syria/",
        image: require("../assets/syria.png")
      },
      {
        coordinate: {
          latitude: 33.906489,
          longitude: 35.861035
        },
        title: "Lebanon",
        description:
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia",
        link: "https://mercyusa.org/project/lebanon/",
        image: require("../assets/lebanon.png")
      },
      {
        coordinate: {
          latitude: 0.308254,
          longitude: 37.697133
        },
        title: "Kenya",
        description:
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia",
        link: "https://mercyusa.org/project/kenya/",
        image: require("../assets/kenya.png")
      },
      {
        coordinate: {
          latitude: -3.731712,
          longitude: 121.951341
        },
        title: "Indonesia",
        description:
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia",
        link: "https://mercyusa.org/project/indonesia/",
        image: require("../assets/indonesia.png")
      },
      {
        coordinate: {
          latitude: 2.249495,
          longitude: 45.237094
        },
        title: "Somalia",
        description:
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia",
        link: "https://mercyusa.org/project/somalia/",
        image: require("../assets/somalia.png")
      },
      {
        coordinate: {
          latitude: 22.029303,
          longitude: 78.927645
        },
        title: "India",
        description:
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia",
        link: "https://mercyusa.org/project/india/",
        image: require("../assets/india.png")
      },
      {
        coordinate: {
          latitude: 38.934259,
          longitude: -101.01
        },
        title: "America",
        description:
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia",
        link: "https://mercyusa.org/project/united-states/",
        image: require("../assets/america.png")
      },
      {
        coordinate: {
          latitude: 41.292131,
          longitude: 19.830913
        },
        title: "Albania",
        description:
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia",
        link: "https://mercyusa.org/project/Albania/",
        image: require("../assets/albania.png")
      },
      {
        coordinate: {
          latitude: 44.124389,
          longitude: 17.859
        },
        title: "Bosnia",
        description:
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia",
        link: "https://mercyusa.org/project/bosnia/",
        image: require("../assets/bosnia.png")
      }
    ],
    region: {
      latitude: 34.86,
      longitude: 38.86,
      latitudeDelta: 20.0,
      longitudeDelta: 20.0
    },
    isLoading: true
  };
  async _cacheResourcesAsync() {
    const images = [
      require("../assets/syria.png"),
      require("../assets/lebanon.png"),
      require("../assets/kenya.png"),
      require("../assets/indonesia.png"),
      require("../assets/somalia.png"),
      require("../assets/india.png"),
      require("../assets/america.png"),
      require("../assets/albania.png"),
      require("../assets/bosnia.png")
    ];
    await Asset.loadAsync(images);
  }
  async componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
    await Promise.all([this._cacheResourcesAsync()]);
    this.setState({ isLoading: false });
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
    if (this.state.isLoading == false) {
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
                  <Text style={styles.cardDescription}>
                    {marker.description}
                  </Text>
                  <Text
                    style={styles.readMmore}
                    onPress={() => {
                      Linking.openURL(marker.link);
                    }}
                  >
                    Read more...
                  </Text>
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
              </View>
            ))}
          </Animated.ScrollView>
        </View>
      );
    } else {
      return <ActivityIndicator />;
    }
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
    shadowOffset: {
      x: 2,
      y: -2
    },
    width: width - 80,
    margin: 10,
    height: 270,
    borderRadius: 10
  },
  textContent: {
    alignContent: "center",
    paddingTop: 15,
    paddingLeft: 15
  },
  cardTitle: {
    fontSize: 25,
    marginTop: 5,
    paddingLeft: 10,
    color: "#ffffff",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  cardDescription: {
    fontSize: 12,
    paddingLeft: 10,
    color: "#444"
  },
  readMmore: {
    fontSize: 12,
    color: "blue",
    paddingLeft: 10
  }
});

AppRegistry.registerComponent("mapfocus", () => screens);
