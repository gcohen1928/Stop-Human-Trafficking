import { chatActions } from './chat-slice';
import { uploadMessage, createChat } from '../../firebase';


export const startChat = (chatNumber) => {
    return async (dispatch) => {
        try {
            const chatNumber = await createChat();
            if (!chatNumber) {
                alert("Couldn not create chat, please try again later")
                return false
            }
            dispatch(chatActions.startChat(chatNumber));
        } catch (err) {
            console.log(err)
            alert("Couldn not create chat, please try again later")
            return false
        }
    };
};


export const sendMessage = (message, chatNumber) => {
  return async (dispatch) => {
    try {
     await uploadMessage(message, chatNumber);
      dispatch(chatActions.addMessage(message));
    } catch (err) {
        alert("Could not send message, please try again later")
        return false
    }
  };
};
export const receiveMessages = (messages) => {
  return (dispatch, getState) => {
    try {
      dispatch(chatActions.receiveMessage(messages));
    } catch (err) {
        console.log(err)
        alert("Could not receive message, please try again later")
        return false
    }
  };
};