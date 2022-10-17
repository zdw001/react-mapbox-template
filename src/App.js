import './App.scss';
import React from "react";
import Core from './containers/Core';
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import "@fontsource/roboto";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faTimes, faLocationDot, faSignature, faImage } from "@fortawesome/free-solid-svg-icons";

library.add(faSearch, faTimes, faLocationDot, faSignature, faImage);

const router = createBrowserRouter([
    {
        path: "/",
        element: <Core/>,
    },
]);

function App() {
  return (
    <div className="App">
        <RouterProvider router={router} />
    </div>
  );
}

export default App;
