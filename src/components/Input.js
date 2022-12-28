import React from 'react'
import { Incubator, View, Text, Button, Colors} from 'react-native-ui-lib'
import { styles } from '../theme/styles';
import { useTranslation } from 'react-i18next';
const { TextField } = Incubator;
export const SectionHeader = ({ title, t }) => {
    return (
      <View row marginT-s10 marginB-s5 spread paddingB-s5 style={styles.divider}>
        <Text h4>{t(`form:${title}`)}</Text>
      </View>
    );
  };
  
  export const FormInput = ({ id, reducer, large }) => {
    const { t } = useTranslation();
    return (
      <TextField
        label={t(`form:${id}`)}
        labelStyle={large ? styles.multilineLabel : styles.label}
        onChangeText={(text) => {
          reducer.dispatch({ type: "UPDATE", key: id, value: text });
        }}
        value={reducer.state[`${id}`]}
        placeholder={t(`form:${id}`)}
        placeholderStyle={styles.placeholder}
        text70
        maxLength={large ? 2000 : 40}
        multiline={large ? true : false}
        fieldStyle={styles.withFrame}
      />
    );
  };

  export const SquareButton = (props) => {
    return (
      <Button
        {...props}
        marginH-50
        marginB-s10
        bg-primaryColor
        borderRadius={5}
        labelStyle={{ color: Colors.white }}
      />
    );
  };