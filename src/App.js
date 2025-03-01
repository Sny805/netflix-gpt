import { createBrowserRouter } from 'react-router-dom';
import './App.css';
import Body from './components/Body';
import Login from './components/Login';
import appStore from './utils/appStore';
import { Provider } from 'react-redux';

function App() {


  return (
    <Provider store={appStore} >
      <Body />
    </Provider>
  );
}

export default App;
