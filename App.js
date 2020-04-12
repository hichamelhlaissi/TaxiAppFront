import React from 'react';
import Home from './src/screens/Home';
import Navigator from './src/routes/drawer';
export default class App extends React.Component{
  render() {
    console.disableYellowBox = true;
    return (
        <Navigator/>
    );
  }


}

