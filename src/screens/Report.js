import React, { useReducer, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Incubator,
  KeyboardAwareScrollView,
  Checkbox,
  Colors,
  Image,
  Dialog,
  PanningDirections,
  PanningProvider,
} from "react-native-ui-lib";
import { useTranslation } from "react-i18next";
import { reset, sendReportAction, startForm } from "../redux/form-actions";
import { styles } from "../theme/styles";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av";
import { FormInput, SectionHeader, SquareButton } from "../components/Input";
import { Alert } from "react-native";

const ReporterInfo = ({ state, dispatch, t }) => {
  return (
    <>
      <SectionHeader title="section1" t={t} />
      <FormInput id="name" reducer={{ state, dispatch }} />
      <FormInput id="address" reducer={{ state, dispatch }} />
      <View row spread>
        <View flex marginR-s3>
          <FormInput id="city" reducer={{ state, dispatch }} />
        </View>
        <View flex>
          <FormInput id="postalCode" reducer={{ state, dispatch }} />
        </View>
      </View>
      <FormInput id="phone" reducer={{ state, dispatch }} />
      <FormInput id="relationship" reducer={{ state, dispatch }} />
      <View row spread>
        <Text label darkerGrey>
          {t("form:contactConsent")}
        </Text>
        <Checkbox
          value={state.contactConsent}
          onValueChange={(check) =>
            dispatch({ type: "UPDATE", key: "contactConsent", value: check })
          }
          borderRadius={5}
          size={17}
          color={Colors.primaryColor}
          iconColor={Colors.white}
          marginL-s5
          marginT-s1
        />
      </View>
      <FormInput id="agency" reducer={{ state, dispatch }} />
      <FormInput id="jobTitle" reducer={{ state, dispatch }} />
    </>
  );
};
const VictimInfo = ({ state, dispatch, t }) => {
  return (
    <>
      <SectionHeader title="section2" t={t} />
      <FormInput id="victimName" reducer={{ state, dispatch }} />
      <FormInput id="victimAddress" reducer={{ state, dispatch }} />
      <View row spread>
        <View flex marginR-s3>
          <FormInput id="victimCity" reducer={{ state, dispatch }} />
        </View>
        <View flex>
          <FormInput id="victimPostalCode" reducer={{ state, dispatch }} />
        </View>
      </View>
      <FormInput id="victimPhone" reducer={{ state, dispatch }} />
      <FormInput id="DOB" reducer={{ state, dispatch }} />
      <View row spread>
        <View flex marginR-s3>
          <FormInput id="sex" reducer={{ state, dispatch }} />
        </View>
        <View flex>
          <FormInput id="race" reducer={{ state, dispatch }} />
        </View>
      </View>
      <FormInput id="SSN" reducer={{ state, dispatch }} />
    </>
  );
};

const OtherInfo = ({ state, dispatch, t }) => {
  return (
    <>
      <SectionHeader title="section3" t={t} />
      <FormInput id="facilityName" reducer={{ state, dispatch }} />
      <FormInput id="otherLocations" reducer={{ state, dispatch }} />
      <SectionHeader title="descriptionTitle" t={t} />
      <FormInput large id="descriptionInput" reducer={{ state, dispatch }} />
      <SectionHeader title="vulnerableTitle" t={t} />
      <FormInput large id="vulnerableInput" reducer={{ state, dispatch }} />
    </>
  );
};

const Attatchments = ({ state, dispatch, t }) => {
  const attatchments = ["image1", "image2"];
  const pickImage = async ({ video, key }) => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      mediaTypes:
        key === "video1" || key === "video2"
          ? ImagePicker.MediaTypeOptions.Videos
          : ImagePicker.MediaTypeOptions.Images,
    });
    if (!pickerResult.canceled) {
      dispatch({
        type: "UPDATE",
        key: key,
        value: pickerResult.assets[0].uri,
      });
    }
  };
  return (
    <>
      <SectionHeader title="section4" t={t} />
      {attatchments.map((attatchment, key) => {
        return (
          <View center key={key}>
            {(attatchment === "image1" || attatchment === "image2") &&
            state[attatchment] ? (
              <Image
                style={styles.image}
                source={{ uri: state[attatchment] }}
              />
            ) : null}
            {(attatchment === "video1" || attatchment === "video2") &&
            state[attatchment] ? (
              <>
                <Video
                  source={{ uri: state[attatchment] }}
                  rate={1.0}
                  volume={1.0}
                  isMuted={false}
                  resizeMode="cover"
                  shouldPlay
                  isLooping
                  style={styles.image}
                />
                <Text>{state[attatchment]}</Text>
              </>
            ) : null}
            <SquareButton
              label={t(`form:${attatchment}`)}
              onPress={async () => await pickImage({ key: attatchment })}
            />
          </View>
        );
      })}
      <SectionHeader title="section3" t={t} />
      <FormInput id="email" reducer={{ state, dispatch }} />
      <View row spread>
        <Text label darkerGrey>
          {t("form:emailConsent")}
        </Text>
        <Checkbox
          value={state.emailConsent}
          onValueChange={(check) =>
            dispatch({ type: "UPDATE", key: "emailConsent", value: check })
          }
          borderRadius={5}
          size={17}
          color={Colors.primaryColor}
          iconColor={Colors.white}
          marginL-s5
          marginT-s1
        />
      </View>
      <Text marginV-20 smallerBody darkerGrey>
        {t("form:disclaimer")}
      </Text>
    </>
  );
};

const initialState = {
  name: "",
  address: "",
  phone: "",
  city: "",
  postalCode: "",
  contactConsent: false,
  agency: "",
  jobTitle: "",
  relationship: "",
  victimName: "",
  victimAddress: "",
  victimPhone: "",
  victimCity: "",
  victimPostalCode: "",
  DOB: "",
  sex: "",
  race: "",
  SSN: "",
  image1: "",
  image2: "",
  video1: "",
  video2: "",
  email: "",
  emailConsent: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      return {
        ...state,
        [action.key]: action.value,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const Report = ({ navigation }, props) => {
  const { t } = useTranslation();
  const data = useSelector((state) => state.form);
  const [state, dispatch] = useReducer(reducer, initialState);
  const globalDispatch = useDispatch()
  const [activeIndex, setActiveIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(true);

  const renderCurrentStep = ({ navigation, state, dispatch, t }) => {
    switch (activeIndex) {
      case 0:
      default:
        return (
          <ReporterInfo
            navigation={navigation}
            state={state}
            dispatch={dispatch}
            t={t}
          />
        );
      case 1:
        return (
          <VictimInfo
            navigation={navigation}
            state={state}
            dispatch={dispatch}
            t={t}
          />
        );
      case 2:
        return <OtherInfo state={state} dispatch={dispatch} t={t} />;
      case 3:
        return <Attatchments state={state} dispatch={dispatch} t={t} />;
    }
  };

  const goToNextStep = () => {
    if (activeIndex === 3) {
      handleSubmit();
      setActiveIndex(0);
    } else {
      setActiveIndex(activeIndex + 1);
    }
  };
  const goToPrevStep = () => {
    if (activeIndex === 0) {
      navigation.goBack();
    } else {
      setActiveIndex(activeIndex - 1);
    }
  };

  const NextButton = () => {
    const complete = activeIndex === 3;
    return (
      <Button
        marginH-50
        marginB-s10
        bg-primaryColor
        label={complete ? t("common:submit") : t("common:next")}
        labelStyle={{ color: Colors.white }}
        onPress={
          complete
            ? () => {
                Alert.alert(t("common:submit"), t("common:submitConfirm"), [
                  {
                    text: t("common:cancel"),
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  { text: t("common:submit"), onPress: handleSubmit },
                ]);
              }
            : goToNextStep
        }
      />
    );
  };

  const handleSubmit = async () => {
    globalDispatch(sendReportAction(state));
  };

  useEffect(() => {
    if (data.complete) {
      alert("Report Submitted!");
      dispatch({ type: "RESET" });
      setActiveIndex(0);
    } else if (data.failed) {
      alert("Report Upload Failed!");
    }
    globalDispatch(reset);
  }, [data.complete, data.failed]);

  useEffect(() => {
    globalDispatch(startForm());
  }, []);

  return (
    <KeyboardAwareScrollView>
      <View flex padding-page top marginT-s10>
        <View row marginT-s2 marginB-s5>
          <View left>
            <TouchableOpacity body textColor onPress={goToPrevStep}>
              <Text body primaryColor>
                {t("common:back")}
              </Text>
            </TouchableOpacity>
          </View>
          <View marginL-70>
            <Text h1>{t("common:reportTitle")}</Text>
          </View>
        </View>
        {renderCurrentStep({ navigation, state, dispatch, t })}
      </View>
      <NextButton />
      <Dialog visible={showPopup} containerStyle={styles.popup}
      panDirection={PanningProvider.Directions.DOWN}
      bottom = {true}
      >
        <Incubator.Dialog.Header title={t("form:popupTitle")} />
        <View padding-20>
          <Text smallerBody>{t("form:popupText")}</Text>
          <Button
            marginT-20
            bg-primaryColor
            onPress={() => setShowPopup(false)}
          >
            <Text white>{t("common:ok")}</Text>
          </Button>
        </View>
      </Dialog>
    </KeyboardAwareScrollView>
  );
};

export default Report;
