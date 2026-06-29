import { Link } from "react-router-dom";
import {
  Menu,
  LayoutDashboard,
  Upload,
  FileText,
  Search,
  BarChart3
} from "lucide-react";

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen
}) {
  return (
    <div
  className={`${
    sidebarOpen ? "w-64" : "w-20"
  } min-h-screen bg-slate-900 text-white p-5 transition-all duration-300`}
>

      <div
  className={`flex items-center mb-10 ${
    sidebarOpen ? "justify-between" : "justify-center"
  }`}
>
  {sidebarOpen && (
    <h1 className="text-2xl font-bold">
      DocuMind-AI
    </h1>
  )}

  <button
    onClick={() => setSidebarOpen(!sidebarOpen)}
    className="hover:text-blue-400 transition"
  >
    <Menu size={24} />
  </button>
</div>

      <nav className="flex flex-col gap-3">

  <Link
  to="/"
  className={`flex items-center rounded-lg p-3 hover:bg-slate-800 transition ${
    sidebarOpen
      ? "gap-3 justify-start"
      : "justify-center"
  }`}
>
  <LayoutDashboard size={22} />
  {sidebarOpen && <span>Dashboard</span>}
</Link>

  <Link
    to="/upload"
    className={`flex items-center rounded-lg p-3 hover:bg-slate-800 transition ${
      sidebarOpen
        ? "gap-3 justify-start"
        : "justify-center"
    }`}
  >
    <Upload size={22} />
    {sidebarOpen && "Upload"}
  </Link>

  <Link
    to="/documents"
    className={`flex items-center rounded-lg p-3 hover:bg-slate-800 transition ${
      sidebarOpen
        ? "gap-3 justify-start"
        : "justify-center"
    }`}
  >
    <FileText size={22} />
    {sidebarOpen && "Documents"}
  </Link>

  <Link
    to="/search"
    className={`flex items-center rounded-lg p-3 hover:bg-slate-800 transition ${
      sidebarOpen
        ? "gap-3 justify-start"
        : "justify-center"
    }`}
  >
    <Search size={22} />
    {sidebarOpen && "Search"}
  </Link>

  <Link
    to="/analytics"
    className={`flex items-center rounded-lg p-3 hover:bg-slate-800 transition ${
      sidebarOpen
        ? "gap-3 justify-start"
        : "justify-center"
    }`}
  >
    <BarChart3 size={22} />
    {sidebarOpen && "Analytics"}
  </Link>

</nav>

    </div>
  );
}