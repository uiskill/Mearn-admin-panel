import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sign from './admin/pages/Sign';
import Dashboard from './admin/pages/Dashboard';
import Error_404 from './admin/pages/Error_404';
import Header from "./admin/component/Header";
import Sidebar from "./admin/component/Sidebar";
import Footer from "./admin/component/Footer";
import Editplacement from "./admin/pages/Placements/Editplacement";
import Addplacements from "./admin/pages/Placements/Addplacements";
import Placement from "./admin/pages/Placements/Placement";
import Listfaculty from "./admin/pages/Faculty/Listfaculty";
import Addfaculty from "./admin/pages/Faculty/Addfaculty";
import Editfaculty from "./admin/pages/Faculty/Editfaculty";


const Layout = ({ children, hideHeaderFooter }) => {
  return (
    <>
      {!hideHeaderFooter && <Header />}
      {!hideHeaderFooter && <Sidebar />}
      <main>{children}</main>
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

function App() {
  const [Session, setSession] = useState(1);
  const [userData, setuserData] = useState();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout hideHeaderFooter={true}>
              <Sign setuserData={setuserData}
                Session={Session}
                setSession={setSession} />
            </Layout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Layout hideHeaderFooter={false}>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/placement-list"
          element={
            <Layout hideHeaderFooter={false}>
              <Placement />
            </Layout>
          }
        />

        <Route
          path="/add-placement"
          element={
            <Layout hideHeaderFooter={false}>
              <Addplacements />
            </Layout>
          }
        />


        <Route
          path="/edit-placement/:id"
          element={
            <Layout hideHeaderFooter={false}>
              <Editplacement />
            </Layout>
          }
        />
 <Route
          path="/edit-faculty/:id"
          element={
            <Layout hideHeaderFooter={false}>
              <Editfaculty />
            </Layout>
          }
        />








         <Route
          path="/facultylist"
          element={
            <Layout hideHeaderFooter={false}>
              <Listfaculty />
            </Layout>
          }
        />


<Route
          path="/add-faculty"
          element={
            <Layout hideHeaderFooter={false}>
              <Addfaculty />
            </Layout>
          }
        />
        <Route
          path="*"
          element={
            <Layout hideHeaderFooter={false}>
              <Error_404 />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
