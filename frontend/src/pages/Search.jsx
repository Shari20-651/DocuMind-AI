import { useState } from "react";
import {
  Bot,
  FileText,
  Receipt
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import ReactMarkdown from "react-markdown";

export default function Search() {

  const [semanticQuery, setSemanticQuery] = useState("");
  const [results, setResults] = useState([]);
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const handleAISearch = async () => {

  if (!semanticQuery.trim()) return;

  try {

    const response = await api.post(
      `/ask?question=${encodeURIComponent(semanticQuery)}`
    );

    setAnswer(response.data.answer);

    setResults(response.data.documents);

  } catch (error) {

    console.error(error);

  }

};

  return (
    <div className="p-8 text-white">

      <div className="mb-8">

  <h1 className="text-4xl font-bold text-white">
    AI Document Search
  </h1>

  <p className="text-slate-400 mt-3 text-lg">
    Ask natural language questions about your documents. The AI will retrieve the most relevant files and generate an intelligent answer.
  </p>

</div>

      <div className="bg-slate-800 rounded-2xl p-6 mb-8">

  <h2 className="text-xl font-semibold mb-4">
    Ask AI
  </h2>

  <div className="flex gap-4">

    <input
      type="text"
      placeholder="Example: Find resumes with Python and AWS experience..."
      value={semanticQuery}
      onChange={(e) => setSemanticQuery(e.target.value)}
      className="flex-1 bg-slate-700 rounded-xl p-4 text-white outline-none focus:ring-2 focus:ring-blue-500"
    />

    <button
      onClick={handleAISearch}
      className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 rounded-xl hover:scale-105 transition"
    >
      Ask AI
    </button>

  </div>

</div>

{answer && (

<div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 mb-8 border border-slate-700 shadow-xl">

  <div className="flex items-center gap-3 mb-6">

    <div className="bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center">
  <Bot size={22} className="text-white" />
</div>

    <div>

      <h2 className="text-2xl font-bold">
        AI Answer
      </h2>

      <p className="text-slate-400 text-sm">
        Generated using semantic search + Gemini
      </p>

    </div>

  </div>

  <div className="prose prose-invert max-w-none">
  <ReactMarkdown>
    {answer}
  </ReactMarkdown>
</div>

</div>

)}

<p className="text-slate-400 mb-5 text-sm uppercase tracking-wide">
  Search Results • {results.length} documents
</p>

      <div className="space-y-5">

  {results.map((doc) => (

    <div
      key={doc.id}
      className="bg-slate-800 rounded-2xl p-5 border border-slate-700 hover:border-blue-500 hover:shadow-xl transition-all duration-300"
    >

      <div className="flex justify-between items-center">

        <div className="flex items-center gap-4">

  <div
  className={`p-3 rounded-xl ${
    doc.document_type === "resume"
      ? "bg-blue-500/10"
      : "bg-green-500/10"
  }`}
>

  {doc.document_type === "resume" ? (

    <FileText
      className="text-blue-400"
      size={24}
    />

  ) : (

    <Receipt
      className="text-green-400"
      size={24}
    />

  )}

</div>

  <div>

    <h3 className="text-lg font-semibold text-white">
      {doc.filename}
    </h3>

    <div className="flex gap-3 mt-3">

      <span
        className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm capitalize"
      >
        {doc.document_type}
      </span>

      <span
        className={`px-3 py-1 rounded-full text-sm ${
          doc.processing_status === "Completed"
            ? "bg-green-500/20 text-green-400"
            : "bg-yellow-500/20 text-yellow-400"
        }`}
      >
        {doc.processing_status}
      </span>

    </div>

  </div>

</div>

        <button
          onClick={() => navigate(`/documents/${doc.id}`)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2 rounded-xl hover:scale-105 transition"
        >
          View Document
        </button>

      </div>

    </div>

  ))}

</div>

    </div>
  );
}