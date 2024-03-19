import { Provider } from "react-redux";
import store from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import { Toaster } from "react-hot-toast";
import Router from "./routes";
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistStore(store)}>
          <Toaster />
          <Router />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
