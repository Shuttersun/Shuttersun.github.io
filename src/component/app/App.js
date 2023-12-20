import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "../../pages/mainPage/MainPage";

import "./App.scss";
const PrintingPage = lazy(() =>
  import("../../pages/printingPage/PrintingPage")
);
const ModelingPage = lazy(() =>
  import("../../pages/modelingPage/ModelingPage")
);
const ContactsPage = lazy(() =>
  import("../../pages/contactsPage/ContactsPage")
);
const NotFound = lazy(() => import("../../pages/notFound/NotFound"));

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Suspense>
          <Routes>
            <Route path="/">
              <Route index element={<MainPage />} />
              <Route path="print" element={<PrintingPage />} />
              <Route path="modeling" element={<ModelingPage />} />
              <Route path="contacts" element={<ContactsPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
