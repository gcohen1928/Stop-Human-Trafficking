import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View, Text, Image } from "react-native-ui-lib";
import { styles } from "../theme/styles";

export const ColoredHeader = ({ text, logo }) => {
  return (
    <View maxHeight={200} bg-primaryColor>
      <View centerH row marginT-80>
        <View bg-primaryColor>
          <Text white h1>
            {text}
          </Text>
        </View>
      </View>

      <View marginT-s5 centerH>
        <View center style={styles.circle}>
          <Image source={logo} style={styles.logo} />
        </View>
      </View>
    </View>
  );
};
