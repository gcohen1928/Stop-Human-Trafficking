import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, View, Image, Text, Colors } from "react-native-ui-lib";
import images from "../constants/images";

export const HomeListItem = ({ category }) => {
    const navigation = useNavigation()
    const {t} = useTranslation();
    const logo = images.home[category]
  return (
    <TouchableOpacity onPress={() => navigation.navigate(category)}>
      <View row borderBottomWidth={1} borderBottomColor={Colors.darkGrey}>
        <View>
          <Image
            source={logo}
            style={{ width: 100, height: 100, resizeMode: "contain" }}
          />
        </View>
        <View marginR-80>
          <Text h4 marginT-s2>
            {t(`info:${category}:title`)}
          </Text>
          <Text h5 marginT-s2>
           {t(`info:${category}:homeSubtitle`)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
