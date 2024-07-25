import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import MyNav from "./Components/MyNav";
import Home from "./Pages/Home";
import Men from "./Pages/Men";
import Women from "./Pages/Women";
import Etiquette from "./Pages/Etiquette";
import Misc from "./Pages/Misc";
import EditPhotos from "./Pages/EditPhotos";
import Footer from "./Components/Footer";
import Register from "./Pages/Register";
import SignIn from "./Pages/SignIn";
import Layout from "./Components/Layout";
import Missing from "./Pages/Missing";
import RequireAuth from "./Components/RequireAuth";
import Unauthorized from "./Components/Unauthorized";
import PersistLogin from "./Components/PersistLogin";

const ROLES_LIST = {
  Admin: 5150,
  Editor: 1984,
  User: 2001,
};

const App = () => {
  return (
    <>
      <MyNav />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* PUblic routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Private routes */}
          <Route element={<PersistLogin />}>
            <Route
              element={
                <RequireAuth
                  allowedRoles={[ROLES_LIST.User, ROLES_LIST.Editor]}
                />
              }
            >
              <Route path="/" element={<Home />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES_LIST.Editor]} />}>
              <Route path="/edit_photos" element={<EditPhotos />} />
            </Route>
            <Route
              element={
                <RequireAuth
                  allowedRoles={[ROLES_LIST.Admin, ROLES_LIST.Editor]}
                />
              }
            >
              <Route path="/mens_events" element={<Men />} />
              <Route path="/womens_events" element={<Women />} />
              <Route path="/etiquette" element={<Etiquette />} />
              <Route path="/misc" element={<Misc />} />
            </Route>
          </Route>
          {/* Catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
