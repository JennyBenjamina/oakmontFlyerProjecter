import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import MyNav from "./Components/MyNav";
import Home from "./Pages/Home";
import Men from "./Pages/Men";
import Women from "./Pages/Women";
import Etiquette from "./Pages/Etiquette";
import Misc from "./Pages/Misc";
import EditPhotos from "./Pages/EditPhotos";
import Footer from "./Components/Footer";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <BrowserRouter>
      {/* {isLoading ? <MyNav /> : null} */}
      <MyNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/edit_photos"
          element={<EditPhotos setIsLoading={setIsLoading} />}
        />
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
      <Footer />
    </BrowserRouter>
  );
};

export default App;
