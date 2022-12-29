import React from "react";
import MapView, { Polygon, Marker} from "react-native-maps";
import { Button, Colors, Text, LoaderScreen } from "react-native-ui-lib";
import { uploadResourceData } from "../../firebase";
import * as Location from 'expo-location';
//import borders from "src/constants/countyborders.js"

// const converToPolygon = (name, arr) => {
//   var polygon = [];

//   arr.forEach((element) => {
//     polygon.push({
//       latitude: element[1],
//       longitude: element[0],
//     });
//   });
//   return polygon;
// };
// const loadCountyData = async () => {
//   var arr = [];
//   const res = fetch(
//     "https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-county-boundaries&q=&rows=67&facet=statefp&facet=countyfp&facet=name&facet=namelsad&facet=stusab&facet=state_name&refine.stusab=FL"
//   )
//     .then((res) => res.json())
//     .then((json) => {
//       json["records"].forEach((element, index) => {
//         const countyName = element["fields"]["namelsad"];
//         arr.push({
//           countyName: countyName,
//           geo_shape: element["fields"]["geo_shape"]["coordinates"],
//         });
//         if (index === 1){
//         }
//       });
//       return arr;
//     });
//   return res;
//   //return arr
// };

export const Map = () => {
  const [location, setLocation] = React.useState(null);


  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);


  return (
    <>
    { <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 26.994402,
          longitude: -83.760254,
          latitudeDelta: 10.522,
          longitudeDelta: 8.521,
        }}
      >
        {/* {
          borders.map((element, index) => {
            return (
              <Polygon
                key={element["countyName"]}
                coordinates={element["geo_shape"]}
                strokeColor="#000"
                fillColor={Colors.primaryColor}
              />
            );
          })} */}
          {location && <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            }}
            title="My Location"
            description="This is my location"
            />
          }
      </MapView>}
    </>
  );
};
