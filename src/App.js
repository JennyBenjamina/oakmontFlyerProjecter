import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import MyNav from "./Components/MyNav";
import Home from "./Pages/Home";
import Men from "./Pages/Men";
import Women from "./Pages/Women";
import Etiquette from "./Pages/Etiquette";
import Misc from "./Pages/Misc";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <BrowserRouter>
      {isLoading ? <MyNav /> : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/mens_events"
          element={<Men setIsLoading={setIsLoading} />}
        />
        <Route
          path="/womens_events"
          element={<Women setIsLoading={setIsLoading} />}
        />
        <Route
          path="/etiquette"
          element={<Etiquette setIsLoading={setIsLoading} />}
        />
        <Route path="/misc" element={<Misc setIsLoading={setIsLoading} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
