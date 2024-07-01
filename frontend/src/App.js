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
  return (
    <BrowserRouter>
      <MyNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit_photos" element={<EditPhotos />} />
        <Route path="/mens_events" element={<Men />} />
        <Route path="/womens_events" element={<Women />} />
        <Route path="/etiquette" element={<Etiquette />} />
        <Route path="/misc" element={<Misc />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
