import { useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import GlobalStyle from '../styles/globalStyles';
import store, { persistor } from '../app/store';

function MyApp({ Component, pageProps }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const onDropdownToggle = (e) => {
    const toggleTarget = e.target.getAttribute('data-attr') === 'input_toggle';
    if (toggleTarget) {
      setDropdownOpen(true);
    } else {
      setDropdownOpen(false);
    }
  };

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GlobalStyle />
        <Component
          {...pageProps}
          onDropdownToggle={onDropdownToggle}
          dropdownOpen={dropdownOpen}
          setDropdownOpen={setDropdownOpen}
        />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
