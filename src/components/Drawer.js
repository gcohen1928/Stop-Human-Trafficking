import React from "react";

import { View, Text, Button, Colors, Card } from "react-native-ui-lib";
import { useTranslation } from "react-i18next";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Linking } from "react-native";
import { styles } from "../theme/styles";

export const Drawer = ({ resource }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <View padding-20>
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
        <Card center>
          <View row paddingV-20>
            <Text marginR-10 h3>
              {t(resource.title)}
            </Text>
            {isOpen ? (
              <Ionicons name="chevron-up" size={30} color={Colors.darkerGrey} />
            ) : (
              <Ionicons
                name="chevron-down"
                size={30}
                color={Colors.darkerGrey}
              />
            )}
          </View>
          <Card.Section
            bg-primaryColor
            padding-10
            style={{ alignItems: "center", width: "100%" }}
          />
        </Card>
      </TouchableOpacity>
      {isOpen && (
        <View paddingH-20>
          <Card center padding-15>
            <View paddingV-20 spread>
              <Text marginR-10 marginB-20 bold>
                {t(resource.subtitle)}
              </Text>
              <View marginH-10>
              {resource.website && (
                <Text marginB-20
                  onPress={() => Linking.openURL(t(resource.website))}
                  style={styles.link}
                >
                  {t(resource.website)}
                </Text>
              )}
              {resource.phoneNumber && (
                <Text
                marginB-20
                    onPress={() => Linking.openURL(`tel:${t(resource.phoneNumber)}`)}
                    style={styles.link}
                >
                    {t(resource.phoneNumber)}
                </Text>
              )}
              {resource.hours && (
                <Text marginB-20 smallerBody>
                    {t(resource.hours)}
                </Text>
              )}
              {resource.email && (
                <Text
                marginB-20
                    onPress={() => Linking.openURL(`mailto:${t(resource.email)}`)}
                    style={styles.link}
                >
                    {t(resource.email)}
                </Text>
              )}
              </View>
            </View>
          </Card>
        </View>
      )}
    </View>
  );
};
