import React from "react";
import MapView, { Polygon, Marker } from "react-native-maps";
import { Button, Colors, Text, LoaderScreen } from "react-native-ui-lib";
import { uploadResourceData } from "../../firebase";
import Geolocation from "@react-native-community/geolocation";

const converToPolygon = (name, arr) => {
  var polygon = [];

  arr.forEach((element) => {
    polygon.push({
      latitude: element[1],
      longitude: element[0],
    });
  });

  return polygon;
};

const loadCountyData = async () => {
  var arr = [];
  const res = fetch(
    "https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-county-boundaries&q=&rows=67&facet=statefp&facet=countyfp&facet=name&facet=namelsad&facet=stusab&facet=state_name&refine.stusab=FL"
  )
    .then((res) => res.json())
    .then((json) => {
      json["records"].forEach((element) => {
        const countyName = element["fields"]["namelsad"];
        arr.push({
          countyName: countyName,
          geo_shape: element["fields"]["geo_shape"]["coordinates"],
        });
      });
      return arr;
    });
  return res;
  //return arr
};

export const Map = () => {
  const [arr, setArr] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setLoading(true)
    const getData = async () => {
      const data = await loadCountyData();
      setArr(data);
    };
    getData().then(() => setLoading(false));
  }, []);
  return (
    <>
    {loading && <LoaderScreen message={'Loading ... '} color={Colors.primaryColor}/>}
    {!loading && <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 26.994402,
          longitude: -83.760254,
          latitudeDelta: 10.522,
          longitudeDelta: 8.521,
        }}
      >
        {loading && <Text>Loading...</Text>}
        {arr &&
          arr.map((element, index) => {
            if (
              element["geo_shape"][0][0][0] &&
              typeof element["geo_shape"][0][0][0] === "object"
            ) {
              const p1 = converToPolygon(
                element["countyName"],
                element["geo_shape"][0][0]
              );
              return (
                <Polygon
                  key={element["countyName"]}
                  coordinates={p1}
                  strokeColor="#000"
                  fillColor={Colors.primaryColor}
                />
              );
            }
            const polygon = converToPolygon(
              element["countyName"],
              element["geo_shape"][0]
            );

            return (
              <Polygon
                key={element["countyName"]}
                coordinates={polygon}
                strokeColor="#000"
                fillColor={Colors.primaryColor}
              />
            );
          })}
      </MapView>}
    </>
  );
};
