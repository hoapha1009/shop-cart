import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import store, { persistor } from './app/store';
import './index.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <Provider store={store}>
        <SnackbarProvider
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <BrowserRouter>
                <PersistGate persistor={persistor} loading={null}>
                    <App />
                </PersistGate>
            </BrowserRouter>
        </SnackbarProvider>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
