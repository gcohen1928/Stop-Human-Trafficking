import React, { useRef, useState, useEffect } from "react";
import MapView, { Polygon, Marker } from "react-native-maps";
import { Button, Colors, Text, LoaderScreen, View, TouchableOpacity } from "react-native-ui-lib";
import { uploadResourceData } from "../../firebase";
import borders from "../constants/countyborders";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Location from "expo-location";
import {useDispatch, useSelector} from 'react-redux'
import { getResources } from "../redux/resources-actions";


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
  const state = useSelector(state => state.resources)
  const mapRef = useRef(null);
  const dispatch = useDispatch()

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
    borders.forEach((element) => {
       element["geo_shape"] = converToPolygon(
         element["countyName"],
         element["geo_shape"]
       );
     });
    dispatch(getResources())
    setLoading(false)
  }, []);

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
        {!loading && 
          borders.map((element, index) => {
            return (
              <Polygon
                key={element["countyName"]}
                coordinates={element["geo_shape"]}
                strokeColor="#000"
                fillColor="rgba(44, 114, 251, 0.5)"
                

              />
            );
          })}
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
        {state.resources && state.resources.map((element, index) => {
          console.log(element)
          return (
            <Marker
              key={index}
              pinColor={Colors.primaryColor}
              coordinate={element.coords}
              title={element["name"]}
              description={element["hours"]}
            />
          );
        })}
      
          
      </MapView>
      <TouchableOpacity
          style={{position:"absolute", bottom: 20, right: 20}}
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
              console.log(state)
            }}
          >
            <Ionicons
              name="navigate-circle"
              size={50}
              color={Colors.primaryColor}
              stlye={{position: "absolute", bottom: 20, right: 20}}
            />
          </TouchableOpacity>
    </View>
  );
};
