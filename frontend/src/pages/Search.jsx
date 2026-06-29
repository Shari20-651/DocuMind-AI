import { useState } from "react";
import {
  Bot,
  BrainCircuit,
  Sparkles,
  Cpu,
  MessageSquareText
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

      <div className="bg-slate-800 rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-700">

            <tr>
              <th className="p-4 text-left">File Name</th>
              <th className="p-4 text-left">Document Type</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">View</th>
            </tr>

          </thead>

          <tbody>

            {results.map((doc) => (

              <tr
                key={doc.id}
                className="border-t border-slate-700"
              >
                <td className="p-4">
                  {doc.filename}
                </td>

                <td className="p-4">
                  {doc.document_type || "-"}
                </td>

                <td className="p-4">
  {doc.processing_status || "-"}
</td>

<td className="p-4">
  <button
  onClick={() => navigate(`/documents/${doc.id}`)}
  className="bg-blue-600 px-3 py-1 rounded-lg hover:bg-blue-700"
>
  View
</button>
</td>
              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}