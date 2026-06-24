import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white p-6">

      <h1 className="text-2xl font-bold mb-10">
        DocuMind-AI
      </h1>

      <nav className="flex flex-col gap-4">

        <Link
          to="/"
          className="hover:bg-slate-800 p-3 rounded-lg"
        >
          Dashboard
        </Link>

        <Link
          to="/upload"
          className="hover:bg-slate-800 p-3 rounded-lg"
        >
          Upload Documents
        </Link>

        <Link
          to="/documents"
          className="hover:bg-slate-800 p-3 rounded-lg"
        >
          Documents
        </Link>

        <Link
          to="/search"
          className="hover:bg-slate-800 p-3 rounded-lg"
        >
          Search
        </Link>

        <Link
          to="/job-match"
          className="hover:bg-slate-800 p-3 rounded-lg"
        >
          Job Match
        </Link>

        <Link
          to="/analytics"
          className="hover:bg-slate-800 p-3 rounded-lg"
        >
          Analytics
        </Link>

        <Link
  to="/resume-ranking"
  className="hover:bg-slate-800 p-3 rounded-lg"
>
  Resume Ranking
</Link>

      </nav>

    </div>
  );
}