import React, { useRef, useState, useEffect } from "react";
import MapView, { Polygon, Marker, Callout } from "react-native-maps";
import {
  Colors,
  Text,
  View,
  TouchableOpacity,
  Dialog,
  PanningProvider,
  Incubator,
  Button,
} from "react-native-ui-lib";
import { uploadResourceData } from "../../firebase";
import borders from "../constants/countyborders";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { getResources } from "../redux/resources-actions";
import { styles } from "../theme/styles";
import { ScrollView } from "react-native-gesture-handler";
import { getDistance } from "geolib";
import {showLocation} from 'react-native-map-link';


const converToPolygon = (name, arr) => {
  var polygon = [];
  arr = arr[0];
  if (name === "Dixie County" || name === "Monroe County") {
    arr = arr[0];
  }
  arr.forEach((element) => {
    polygon.push({
      latitude: element[1],
      longitude: element[0],
    });
  });
  return polygon;
};

export const Map = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const state = useSelector((state) => state.resources);
  const mapRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
    // borders.forEach((element) => {
    //    element["geo_shape"] = converToPolygon(
    //      element["countyName"],
    //      element["geo_shape"]
    //    );
    //  });
    dispatch(getResources());
    setLoading(false);
  }, []);

  const renderPopup = (resource) => {};

  return (
    <View flex>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 26.994402,
          longitude: -83.760254,
          latitudeDelta: 10.522,
          longitudeDelta: 8.521,
        }}
        ref={mapRef}
      >
        {/* {!loading && 
          borders.map((element, index) => {
            return (
              <Polygon
                key={element["countyName"]}
                coordinates={element["geo_shape"]}
                strokeColor="#000"
                fillColor="rgba(44, 114, 251, 0.5)"
              />
            );
          })} */}
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="My Location"
            description="This is my location"
          />
        )}
        {state.resources &&
          state.resources.map((element, index) => {
            const name = element["name"] ? element["name"] : "No name";
            return (
              <>
                <Marker
                  key={index}
                  pinColor={Colors.primaryColor}
                  coordinate={element.coords}
                  title={element["name"]}
                  description={element["hours"]}
                >
                  <Callout
                    tooltip={false}
                    onPress={() => {
                      setSelectedResource(element);
                      setDialogVisible(true);
                    }}
                  >
                    <Text>{name.substring(0, 20)}...</Text>
                    <Text label primaryColor>
                      Show more ...
                    </Text>
                  </Callout>
                </Marker>
              </>
            );
          })}
      </MapView>
      <TouchableOpacity
        style={{ position: "absolute", bottom: 20, right: 20, backgroundColor: "white", borderRadius: 50,}}
        onPress={() => {
          mapRef.current.animateToRegion(
            {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            },
            1000
          );
          console.log(state);
        }}
      >
        <Ionicons
          name="navigate-circle"
          size={50}
          color={Colors.primaryColor}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ position: "absolute", bottom: 80, right: 20, backgroundColor: "white", borderRadius: 50, padding: 10}}
        onPress={() => {
          console.log("list")
        }}
      >
        <Ionicons
          name="list"
          size={30}
          color={Colors.primaryColor}
          stlye={{ position: "absolute", bottom: 20, right: 20 }}
        />
      </TouchableOpacity>
      <Dialog
        visible={dialogVisible}
        onDismiss={() => setDialogVisible(false)}
        width="90%"
        height="50%"
        overlayBackgroundColor="rgba(0,0,0,0.2)"
        containerStyle={{ borderRadius: 10, marginBottom: "30%" }}
        bottom={true}
      >
        {selectedResource && (
          <View bg-white>
              <ScrollView>
              <Incubator.Dialog.Header title={selectedResource.name} showKnob />
              <View paddingH-30 paddingV-10>
                {selectedResource.coords && <Text marginB-s3>{(getDistance(location.coords, selectedResource.coords)/1609).toFixed(1)} miles away</Text>}
                <Button marginV-s5 bg-primaryColor label ={"Open in Maps"}
                onPress = {() => {
                  showLocation({
                    latitude: selectedResource.coords.latitude,
                    longitude: selectedResource.coords.longitude,
                    title: selectedResource.name, // optional
                    alwaysIncludeGoogle: true, // optional, true will always add Google Maps to iOS and open in Safari, even if app is not installed (default: false)
                    googleForceLatLon: false, // optionally force GoogleMaps to use the latlon for the query instead of the title
                  });
                }}
                />
                {selectedResource.address && <Text marginT-s4 marginB-s3>{selectedResource.address}</Text>}
                {selectedResource.hours && <Text marginB-s3>{selectedResource.hours}</Text>}
                {selectedResource.phone && selectedResource.phone.map((element, index) => {
                return <Text  style={styles.link} onPress={() => Linking.openURL(`tel:${selectedResource.phoneNumber}`)}
                marginB-s3 key={index}>{element}</Text>;
              })}
              {selectedResource.website && <Text marginB-s3 style={styles.link} onPress={() => Linking.openURL(selectedResource.website)}>{selectedResource.website}</Text>}
              {selectedResource.email && <Text onPress={() => Linking.openURL(`mailto:${selectedResource.email}`)}
                    style={styles.link} marginB-s3>{selectedResource.email}</Text>}
                    <Button bg-tertiaryColor label={"Close"}
                onPress={() => setDialogVisible(false)}
                margin-15
              >
                </Button>
              </View>
              
              </ScrollView>

          </View>
        )}
      </Dialog>
    </View>
  );
};
