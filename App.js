import RootNavigator from "./src/navigation/RootNavigator";
import { themeInit } from "./src/theme/ComponentsConfig";
import "./src/constants/IMLocalize";
import { Provider } from "react-redux";
import store from "./src/redux/index";
import 'react-native-gesture-handler';


themeInit();

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}
