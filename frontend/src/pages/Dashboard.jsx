import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Bot,
  Brain,
  Database,
  CheckCircle2,
  Upload,
  FolderOpen,
  Search,
  BarChart3,
  ArrowRight,
  Receipt
} from "lucide-react";

import api from "../services/api";

export default function Dashboard() {

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total_documents: 0,
    resume_count: 0,
    invoice_count: 0
  });

  useEffect(() => {

    const fetchAnalytics = async () => {
      try {

        const response = await api.get(
          "/platform-analytics"
        );

        setStats(response.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchAnalytics();

  }, []);

  return (
  <div className="p-8">

    {/* Hero Section */}

    <div className="mb-10">

      <h1 className="text-5xl font-bold text-white mb-3">
        AI Document Intelligence Platform
      </h1>

      <p className="text-slate-400 text-lg max-w-3xl">
        Process, search and analyze enterprise documents using
        AI-powered extraction, semantic search, OCR and vector indexing.
      </p>

    </div>

    {/* Statistics */}

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {/* Documents */}

      <div className="bg-slate-800 rounded-2xl p-6 hover:bg-slate-700 transition">

        <div className="mb-4">
  <FileText size={42} className="text-blue-400" />
</div>

        <p className="text-slate-400">
          Total Documents
        </p>

        <h2 className="text-4xl font-bold text-white mt-2">
          {stats.total_documents}
        </h2>

      </div>

      {/* AI Processed */}

      <div className="bg-slate-800 rounded-2xl p-6 hover:bg-slate-700 transition">

        <div className="mb-4">
  <Bot size={42} className="text-purple-400" />
</div>

        <p className="text-slate-400">
          AI Processed
        </p>

        <h2 className="text-4xl font-bold text-white mt-2">
          {stats.total_documents}
        </h2>

      </div>

      {/* Resumes */}

      <div className="bg-slate-800 rounded-2xl p-6 hover:bg-slate-700 transition">

        <div className="mb-4">
  <FileText size={42} className="text-green-400" />
</div>

        <p className="text-slate-400">
          Resume Documents
        </p>

        <h2 className="text-4xl font-bold text-white mt-2">
          {stats.resume_count}
        </h2>

      </div>

      {/* Invoices */}

      <div className="bg-slate-800 rounded-2xl p-6 hover:bg-slate-700 transition">

        <div className="mb-4">
  <Receipt size={42} className="text-yellow-400" />
</div>

        <p className="text-slate-400">
          Invoice Documents
        </p>

        <h2 className="text-4xl font-bold text-white mt-2">
          {stats.invoice_count}
        </h2>

      </div>

     </div>

    {/* Quick Actions */}

<div className="mt-12">

  <h2 className="text-2xl font-bold text-white mb-6">
    Quick Actions
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

    <button
      onClick={() => navigate("/upload")}
      className="bg-slate-800 rounded-2xl p-6 hover:bg-blue-700 transition text-left"
    >
      <div className="mb-3">
  <Upload size={42} className="text-blue-400" />
</div>

      <h3 className="text-white text-xl font-semibold">
        Upload Document
      </h3>

      <p className="text-slate-400 mt-2">
        Upload a new document for AI processing.
      </p>
    </button>

    <button
      onClick={() => navigate("/documents")}
      className="bg-slate-800 rounded-2xl p-6 hover:bg-blue-700 transition text-left"
    >
      <div className="mb-3">
  <FolderOpen size={42} className="text-blue-400" />
</div>

      <h3 className="text-white text-xl font-semibold">
        Browse Documents
      </h3>

      <p className="text-slate-400 mt-2">
        View all indexed documents.
      </p>
    </button>

    <button
      onClick={() => navigate("/search")}
      className="bg-slate-800 rounded-2xl p-6 hover:bg-blue-700 transition text-left"
    >
      <div className="mb-3">
  <Search size={42} className="text-blue-400" />
</div>

      <h3 className="text-white text-xl font-semibold">
        AI Search
      </h3>

      <p className="text-slate-400 mt-2">
        Search documents using semantic AI.
      </p>
    </button>

    <button
      onClick={() => navigate("/analytics")}
      className="bg-slate-800 rounded-2xl p-6 hover:bg-blue-700 transition text-left"
    >
      <div className="mb-3">
  <BarChart3 size={42} className="text-blue-400" />
</div>

      <h3 className="text-white text-xl font-semibold">
        Analytics
      </h3>

      <p className="text-slate-400 mt-2">
        View platform insights and usage.
      </p>
    </button>

  </div>

</div>
{/* AI Processing Pipeline */}

<div className="mt-14">

  <h2 className="text-2xl font-bold text-white mb-8">
    AI Processing Pipeline
  </h2>

  <div className="bg-slate-800 rounded-2xl p-8">

  <div className="flex flex-wrap items-center justify-center gap-4">

  {/* Upload */}

  <div className="flex flex-col items-center">

    <Upload size={42} className="text-blue-500 mb-2" />

    <p className="text-white font-semibold">
      Upload
    </p>

  </div>

  <ArrowRight className="text-blue-500" />

  {/* OCR */}

  <div className="flex flex-col items-center">

    <FileText size={42} className="text-gray-300 mb-2" />

    <p className="text-white font-semibold">
      OCR
    </p>

  </div>

  <ArrowRight className="text-blue-500" />

  {/* AI */}

  <div className="flex flex-col items-center">

    <Bot size={42} className="text-purple-400 mb-2" />

    <p className="text-white font-semibold">
      AI Extraction
    </p>

  </div>

  <ArrowRight className="text-blue-500" />

  {/* Embeddings */}

  <div className="flex flex-col items-center">

    <Brain size={42} className="text-pink-400 mb-2" />

    <p className="text-white font-semibold">
      Embeddings
    </p>

  </div>

  <ArrowRight className="text-blue-500" />

  {/* Vector */}

  <div className="flex flex-col items-center">

    <Database size={42} className="text-cyan-400 mb-2" />

    <p className="text-white font-semibold">
      Vector DB
    </p>

  </div>

  <ArrowRight className="text-green-500" />

  {/* Ready */}

  <div className="flex flex-col items-center">

    <CheckCircle2 size={42} className="text-green-500 mb-2" />

    <p className="text-green-400 font-semibold">
      Search Ready
    </p>

  </div>

</div>  

  </div>

</div>

    </div>

  );
}