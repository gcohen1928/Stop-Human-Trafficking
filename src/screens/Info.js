import React, { useEffect } from "react";

import {
  View,
  Text,
  Button,
  Colors,
  Image,
  Carousel,
  PageControl,
  Card,
  Spacings,
  TouchableOpacity,
} from "react-native-ui-lib";

import { styles } from "../theme/styles";
import { useTranslation } from "react-i18next";
import { ScrollView, Linking } from "react-native";
import images from "../constants/images";
import { ColoredHeader } from "../components/ColoredHeader";
import { Link } from "@react-navigation/native";

export const Info = ({ category }) => {
  const { t } = useTranslation();
  const [pageNumber, setPageNumber] = React.useState(0);
  const buttons = ["section1", "section2", "section3"];
  var carousel = React.createRef(Carousel);
  const renderBG = (index) => {
    return pageNumber === index ? Colors.lightGrey : Colors.darkGrey;
  };
  const renderColor = (index) => {
    return pageNumber === index ? Colors.primaryColor : Colors.lightGrey;
  };

  useEffect(() => {
    if (carousel) {
      carousel.goToPage(pageNumber, true);
    }
  }, [pageNumber]);
  const logo = images.home[category];

  return (
    <ScrollView>
      <View flex>
        <ColoredHeader text={t(`info:${category}:title`)} logo={logo} />
        <View centerH marginT-125 paddingH-30>
          <Text h1>{t(`info:${category}:header`)}</Text>
          <Text center h4 marginT-s3>
            {t(`info:${category}:subheader`)}
          </Text>
        </View>
      </View>
      <View centerH>
        <View bg-darkGrey padding-2 br100 row marginV-s5 width={"80%"}>
          {buttons.map((button, index) => {
            return (
              <Button
                flex
                key={index}
                marginR-10
                backgroundColor={renderBG(index)}
                onPress={() => setPageNumber(index)}
              >
                <Text label color={renderColor(index)}>
                  {t(`info:${category}:${button}`)}
                </Text>
              </Button>
            );
          })}
        </View>
      </View>
      <View padding-20>
        <Carousel
          borderRadius={20}
          initialPage={pageNumber}
          itemSpacings={Spacings.s10}
          containerMarginHoriontal={Spacings.s10}
          onChangePage={(pageIndex, oldIndex) => {
            if (pageIndex === 0) {
              setPageNumber(0);
            } else if (pageIndex === 1) {
              setPageNumber(1);
            } else if (pageIndex === 2) {
              setPageNumber(2);
            }
          }}
          ref={(ref) => (carousel = ref)}
        >
          {buttons.map((button, index) => {
            return (
              <Card
                key={index}
                style={{ margin: 10 }}
                backgroundColor={Colors.lightGrey}
              >
                <View padding-20>
                  <Text center h2 marginB-s3 centerH>
                    {t(`info:${category}:${button}Title`)}
                  </Text>
                  <View
                    backgroundColor={Colors.darkerGrey}
                    height={1}
                    marginB-s3
                  ></View>
                  <Text body darkerGrey>
                    {t(`info:${category}:${button}Text`)}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => Linking.openURL("tel:1-800-962-2873")}
                >
                  <Card.Section
                    bg-primaryColor
                    padding-10
                    content={[
                      {
                        text: `Call 1-800-962-2873 for Help Now`,
                        text70: true,
                        white: true,
                      },
                    ]}
                    onPress={() => Linking.openURL("tel:1-800-962-2873")}
                    contentStyle={{ alignItems: "center" }}
                  ></Card.Section>
                </TouchableOpacity>
              </Card>
            );
          })}
        </Carousel>
      </View>
      <View marginB-s10>
        <PageControl
          numOfPages={3}
          color={Colors.primaryColor}
          activeColor={Colors.darkGrey}
          currentPage={pageNumber}
        />
      </View>
      <View centerH padding-10>
        <Text>
          {t(`common:source`)}: {"\n\n"}
          <Text
            onPress={() => Linking.openURL(t(`info:${category}:source`))}
            link
            style={styles.link}
          >
            {t(`info:${category}:source`)}
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};
