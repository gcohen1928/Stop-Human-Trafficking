import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Modal,
  Colors,
} from "react-native-ui-lib";
import { GiftedChat, InputToolbar, Send } from "react-native-gifted-chat";
import { useSelector, useDispatch } from "react-redux";
import { listenForMessages } from "../../firebase";
import { startChat, receiveMessages, sendMessage } from "../redux/chat-actions";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";
import { Alert, BackHandler } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import images from "../constants/images";

export const Chat = ({ navigation }) => {
  const messages = useSelector((state) => state.chat.messages);
  const chatNumber = useSelector((state) => state.chat.chatNumber);
  const reversedMessages = [...messages].reverse();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  const onSend = (messages = []) => {
    const newMessages = messages.map((message) => ({
      ...message,
      createdAt: message.createdAt.toISOString(),
    }));

    dispatch(sendMessage(newMessages, chatNumber));
  };
  useEffect(() => {
    const createChat = async () => {
      await dispatch(startChat());
    };

    createChat();
  }, []);

  useEffect(() => {
    const listen = async (chatNumber) => {
      const res = await listenForMessages(
        dispatch,
        receiveMessages,
        chatNumber
      );
      return res;
    };
    if (chatNumber) {
      listen(chatNumber);
    }
  }, [chatNumber]);

  // useEffect(() => {
  //   console.log(messages)
  // }, [messages]);

  const renderInputToolbar = (props) => {
    //Add the extra styles via containerStyle
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          marginHorizontal: 10,
          borderRadius: 10,
          backgroundColor: "white",
          borderWidth: 1,
          borderTopWidth: 1,
          borderTopColor: Colors.lightGrey,
          borderColor: Colors.lightGrey,
        }}
      />
    );
  };
  const renderSend = (props) => {
    return <Send {...props} containerStyle={{ borderWidth: 0 }} />;
  };

  return (
    <>
      <View>
        <View row marginT-68 marginL-20>
          <View left>
            <TouchableOpacity
              body
              textColor
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text body primaryColor>
                {t("common:back")}
              </Text>
            </TouchableOpacity>
          </View>
          <View marginL-90>
            <Text h1>{t("common:chatTitle")}</Text>
          </View>
        </View>
      </View>

      <GiftedChat
        messages={reversedMessages}
        onSend={onSend}
        user={{
          _id: 1,
        }}
        alwaysShowSend
        maxInputLength={300}
        renderInputToolbar={renderInputToolbar}
        renderSend={renderSend}
      />
    </>
  );
};
