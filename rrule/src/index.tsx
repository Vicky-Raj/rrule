import ReactDOM from 'react-dom'
import React from 'react'
import App from './App';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
initializeIcons();

ReactDOM.render(<App/>,document.getElementById("root"));