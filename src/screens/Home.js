import { useNavigation } from "@react-navigation/native";
import React, { Component } from "react";
import { Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  View,
  Text,
  Card,
  Button,
  Image,
  Colors,
  TouchableOpacity,
} from "react-native-ui-lib";
import { HomeListItem } from "../components/HomeList";
import { useTranslation } from "react-i18next";
import { Linking } from "react-native";
const categories = [ "resources","financial", "physical", "neglect",];

export const Home = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View flex padding-page>
        <Text h2 marginT-85 marginB-s10>
          Stop Human Trafficking
        </Text>
        {categories.map((category) => {
          return <HomeListItem key={category} category={category} />;
        })}

        <Button
          marginT-10
          onPress={() => Linking.openURL("tel:911")}
          body
          bg-tertiaryColor
        >
          <Text text70 underline white>Call 911</Text>
        </Button>
        <Button
          marginT-10
          label={"File a Report Now"}
          onPress={() => navigation.navigate("Report")}
          body
          bg-primaryColor
        />
        <Button
          marginT-10
          label={"Chat with a Counselor"}
          onPress={() => {
            Alert.alert(
              "You are about to join a live chat",
              "If this is an emergency, please call the police instead",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                {
                  text: "OK",
                  onPress: () => {
                    navigation.navigate("Chat");
                  },
                },
              ]
            );
          }}
          body
          bg-lightGrey
          labelStyle={{ color: Colors.primaryColor }}
        ></Button>
      </View>
    </ScrollView>
  );
};
