import React from "react";

import { View, Text, Card, Button } from "react-native-ui-lib";
import { ColoredHeader } from "../components/ColoredHeader";
import images from "../constants/images";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import {Drawer} from '../components/Drawer'
import { resources } from "../constants/resources";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
export const Resources = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  var arr = []
  return (
    <ScrollView>
      <View flex>
        <ColoredHeader
          text={t("info:resources:title")}
          logo={images.home.resources}
        />
        <View centerH marginT-125 paddingH-30>
          <Text h1>{t(`info:resources:header`)}</Text>
          <Text center h4 marginT-s3>
            {t(`info:resources:subheader`)}
          </Text>
        </View>
        <Button onPress = {async () => {
         navigation.navigate("map")
          }} marginV-s10 marginH-20 body bg-primaryColor >
            <Text white>{t(`info:resources:mapButton`)}{"     "}</Text>
            <Ionicons name="map" size={20} color="white" />
          </Button>

        {Object.keys(resources).map((key, index) => {
            return <Drawer key={index} resource={resources[key]} />
        })}
      </View>
    </ScrollView>
  );
};
