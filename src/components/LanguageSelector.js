import React from "react";
import { View, Text, TouchableOpacity, Colors } from "react-native-ui-lib";
import { useTranslation } from "react-i18next";
import Ionicons from "react-native-vector-icons/Ionicons";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
];

export const Selector = () => {
  const { t, i18n } = useTranslation();
  const selectedLanguageCode = i18n.language;

  const setLanguage = (code) => {
    return i18n.changeLanguage(code);
  };

  return (
    <View flex top marginT-s10>
      <View row marginT-s10 marginB-s5 spread >
        <Text h1>{t('common:languageSelector')}</Text>
        <Ionicons color="#444" size={28} name="ios-language-outline" />
      </View>
      {LANGUAGES.map((language) => {
        const selectedLanguage = language.code === selectedLanguageCode;
        return (
          <TouchableOpacity
            key={language.code}
            disabled={selectedLanguage}
            onPress={() => setLanguage(language.code)}
          >
            <Text 
            color = {selectedLanguage? Colors.primaryColor : Colors.textColor}>{language.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
