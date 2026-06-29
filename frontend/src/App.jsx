import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Documents from "./pages/Documents";
import Search from "./pages/Search";
import Analytics from "./pages/Analytics";
import DocumentDetails from "./pages/DocumentDetails";
import { useState } from "react";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <BrowserRouter>

      <div className="flex bg-slate-950 min-h-screen">

  <Sidebar
    sidebarOpen={sidebarOpen}
    setSidebarOpen={setSidebarOpen}
  />

  <main className="flex-1 overflow-auto">

    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/documents" element={<Documents />} />
      <Route path="/search" element={<Search />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/documents/:id" element={<DocumentDetails />} />
    </Routes>

  </main>

</div>

    </BrowserRouter>
  );
}

export default App;