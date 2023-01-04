import RootNavigator from "./src/navigation/RootNavigator";
import { themeInit } from "./src/theme/ComponentsConfig";
import "./src/constants/IMLocalize";
import { Provider } from "react-redux";
import store from "./src/redux/index";
import 'react-native-gesture-handler';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications


themeInit();

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}
