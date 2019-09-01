import React, { Component } from "react";
import { Image, View, Text, Alert, Dimensions } from "react-native";
import { Grid, Col, Row } from "react-native-easy-grid";
import { Magnetometer, ScreenOrientation } from "expo-sensors";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
const { height, width } = Dimensions.get("window");

export default class Qibla extends Component {
  static navigationOptions = {
    title: "Qibla Compass"
  };
  constructor() {
    super();
    this.state = {
      magnetometer: "0",
      mLat: 21.422518,
      mLon: 39.826192,
      latitude: 42.360427,
      longitude: -83.48042,
      qibla: 50
    };
  }
  componentDidMount() {
    this._getLocationAsync();
    this.qBearing(
      this.state.latitude,
      this.state.longitude,
      this.state.mLat,
      this.state.mLon
    );
    this._toggle();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _toggle = () => {
    if (this._subscription) {
      $;
      this._unsubscribe();
    } else {
      this._subscribe();
    }
  };

  _subscribe = async () => {
    this._subscription = Magnetometer.addListener(data => {
      this.setState({
        magnetometer: this._angle(data),
        qibla: this._qAngle(data)
      });
    });
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        locationResult: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({
      latitude: JSON.stringify(location.coords.latitude),
      longitude: JSON.stringify(location.coords.longitude)
    });
  };

  _qAngle = magnetometer => {
    if (magnetometer) {
      let { x, y, z } = magnetometer;

      if (Math.atan2(y, x) >= 0) {
        angle = Math.atan2(y, x) * (180 / Math.PI);
      } else {
        angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
      }
    }
    return Math.round(
      angle -
        this.qBearing(
          this.state.latitude,
          this.state.longitude,
          this.state.mLat,
          this.state.mLon
        )
    );
  };
  _angle = magnetometer => {
    if (magnetometer) {
      let { x, y, z } = magnetometer;

      if (Math.atan2(y, x) >= 0) {
        angle = Math.atan2(y, x) * (180 / Math.PI);
      } else {
        angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
      }
    }
    return Math.round(angle);
  };
  qBearing(lA, oA, lB, oB) {
    //Alert.alert(lB + ", " + oB);
    delta = Math.abs((oA - oB) * (Math.PI / 180));
    lA = lA * (Math.PI / 180);
    oA = oA * (Math.PI / 180);
    lB = lB * (Math.PI / 180);
    oB = oB * (Math.PI / 180);

    X = Math.cos(lB) * Math.sin(delta);
    Y =
      Math.cos(lA) * Math.sin(lB) -
      Math.sin(lA) * Math.cos(lB) * Math.cos(delta);
    this.setState({
      bearing:
        "X: " + X + "\nY: " + Y + "\n" + Math.atan2(X, Y) * (180 / Math.PI)
    });
    return Math.atan2(X, Y) * (180 / Math.PI);
  }

  _direction = degree => {
    if (degree >= 22.5 && degree < 67.5) {
      return "NE";
    } else if (degree >= 67.5 && degree < 112.5) {
      return "E";
    } else if (degree >= 112.5 && degree < 157.5) {
      return "SE";
    } else if (degree >= 157.5 && degree < 202.5) {
      return "S";
    } else if (degree >= 202.5 && degree < 247.5) {
      return "SW";
    } else if (degree >= 247.5 && degree < 292.5) {
      return "W";
    } else if (degree >= 292.5 && degree < 337.5) {
      return "NW";
    } else {
      return "N";
    }
  };

  // Match the device top with pointer 0° degree. (By default 0° starts from the right of the device.)
  _degree = magnetometer => {
    return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;
  };

  render() {
    return (
      <Grid>
        <Row style={{ alignItems: "center" }} size={0.9}>
          <Col style={{ alignItems: "center" }}>
            <Text
              style={{
                color: "#fff",
                fontSize: height / 26,
                fontWeight: "bold"
              }}
            >
              {this._direction(this._degree(this.state.magnetometer))}
            </Text>
          </Col>
        </Row>

        <Row style={{ alignItems: "center" }} size={0.1}>
          <Col style={{ alignItems: "center" }}>
            <View
              style={{
                position: "absolute",
                width: width,
                alignItems: "center",
                top: 0
              }}
            >
              <Image
                source={require("../assets/compass_pointer.png")}
                style={{
                  height: height / 26,
                  resizeMode: "contain"
                }}
              />
            </View>
          </Col>
        </Row>

        <Row style={{ alignItems: "center" }} size={2}>
          <Text
            style={{
              color: "#fff",
              fontSize: height / 27,
              width: width,
              position: "absolute",
              textAlign: "center"
            }}
          >
            {this._degree(this.state.magnetometer)}°
          </Text>

          <Col style={{ alignItems: "center" }}>
            <Image
              source={require("../assets/compass_bg.png")}
              style={{
                height: width - 80,
                justifyContent: "center",
                alignItems: "center",
                resizeMode: "contain",
                transform: [{ rotate: 360 - this.state.qibla + "deg" }]
              }}
            />
          </Col>
        </Row>

        <Row style={{ alignItems: "center" }} size={1}>
          <Col style={{ alignItems: "center" }}>
            <Text style={{ color: "#fff" }}>{this.state.qibla}</Text>
          </Col>
        </Row>
      </Grid>
    );
  }
}
