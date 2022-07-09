import React from 'react';
import { createRoot } from 'react-dom/client';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './routes/AppRouter';


const container = document.getElementById("root");
const root = createRoot(container);


root.render(
  <BrowserRouter>
      <AppRouter/>
  </BrowserRouter>
);

