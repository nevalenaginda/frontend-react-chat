import Route from "./configs/router/MainRoute";
import "./global.css";
import store from "./configs/redux/store";
import { Provider } from "react-redux";




function App() {
  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
}

export default App;
