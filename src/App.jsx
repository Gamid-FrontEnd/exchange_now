import Header from "./components/Header/Header";
import { useDispatch } from 'react-redux';

import './app.scss'
import { useEffect } from "react";
import { getRates } from "./store/rates";
import Body from "./components/body/Body";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRates());
  }, [dispatch])

  return (
    <div className="App">
     <Header/>
     <Body/>
    </div>
  );
}

export default App;
