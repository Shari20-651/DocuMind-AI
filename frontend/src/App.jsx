import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Documents from "./pages/Documents";
import Search from "./pages/Search";
import JobMatch from "./pages/JobMatch";
import Analytics from "./pages/Analytics";
import DocumentDetails from "./pages/DocumentDetails";
import ResumeRanking from "./pages/ResumeRanking";

function App() {
  return (
    <BrowserRouter>

      <div className="flex">

        <Sidebar />

        <div className="flex-1 bg-slate-950 min-h-screen">

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/search" element={<Search />} />
            <Route path="/job-match" element={<JobMatch />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/documents/:id" element={<DocumentDetails />} />
            <Route path="/resume-ranking" element={<ResumeRanking />} />
          </Routes>

        </div>

      </div>

    </BrowserRouter>
  );
}

export default App;