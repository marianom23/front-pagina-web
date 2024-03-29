import React from 'react';
import { createRoot } from 'react-dom/client';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { App } from './routes/App';


const container = document.getElementById("root");
const root = createRoot(container);


root.render(
      <App/>
);

