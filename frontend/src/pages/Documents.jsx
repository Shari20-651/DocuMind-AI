import { useEffect, useState } from "react";
import { User, Mail, Building2, IndianRupee, Receipt } from "lucide-react";
import api from "../services/api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Documents() {

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {

  const fetchDocuments = async () => {

    try {

      const response = await api.get("/documents");

      setDocuments(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  // Initial fetch
  fetchDocuments();

  // Refresh every 3 seconds
  const interval = setInterval(fetchDocuments, 3000);

  return () => clearInterval(interval);

}, []);

  return (
    <div className="p-8 text-white">

      <h1 className="text-3xl font-bold mb-6">
        Documents
      </h1>

      <div className="bg-slate-800 rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-700">

            <tr>
              <th className="p-4 text-left">Document</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">AI Metadata</th>
              <th className="p-4 text-left">Uploaded</th>
              <th className="p-4 text-left">Status</th>
            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>
                <td colSpan="5" className="p-4">
                  Loading...
                </td>
              </tr>

            ) : (

              documents.map((doc) => (

                                <tr
  key={doc.id}
  onClick={() => navigate(`/documents/${doc.id}`)}
  className="border-t border-slate-700 hover:bg-slate-700 cursor-pointer"
>
                <td className="p-4">
  <span className="block max-w-xs truncate text-blue-400 hover:underline">
    {doc.filename}
  </span>
</td>

<td className="p-4">
  <span
    className={`px-3 py-1 rounded-full text-sm font-semibold ${
      doc.document_type?.toUpperCase() === "RESUME"
        ? "bg-blue-600"
        : "bg-purple-600"
    }`}
  >
    {doc.document_type
  ? doc.document_type.charAt(0).toUpperCase() +
    doc.document_type.slice(1)
  : "Unknown"}
  </span>
</td>

<td className="p-4">
  {doc.ai_output ? (
    doc.document_type?.toUpperCase() === "RESUME" ? (
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <User size={16} className="text-purple-400" />
          <span>{doc.ai_output?.name || "-"}</span>
        </div>

        <div className="flex items-center gap-2">
          <Mail size={16} className="text-blue-400" />
          <span className="text-slate-400">{doc.ai_output?.email || "-"}</span>
        </div>
      </div>
    ) : (
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Building2 size={16} className="text-cyan-400" />
          <span>{doc.ai_output?.vendor || "-"}</span>
        </div>

        <div className="flex items-center gap-2">
          <IndianRupee size={16} className="text-yellow-400" />
          <span>{doc.ai_output?.amount || "-"}</span>
        </div>

        <div className="flex items-center gap-2">
          <Receipt size={16} className="text-gray-400" />
          <span className="text-slate-400">{doc.ai_output?.invoice_number || "-"}</span>
        </div>
      </div>
    )
  ) : (
    <span>-</span>
  )}
</td>

<td className="p-4 text-slate-400">
  {new Date(doc.created_at).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })}
</td>

<td className="p-4">

  <span
    className={`px-3 py-1 rounded-full text-sm font-semibold ${
      doc.processing_status === "Completed"
        ? "bg-green-600"
        : doc.processing_status === "Queued"
        ? "bg-yellow-500 text-black"
        : doc.processing_status === "Processing"
        ? "bg-blue-600"
        : doc.processing_status === "AI Extracting"
        ? "bg-purple-600"
        : doc.processing_status === "Generating Embeddings"
        ? "bg-pink-600"
        : doc.processing_status === "Indexed"
        ? "bg-cyan-600"
        : doc.processing_status === "Failed"
        ? "bg-red-600"
        : "bg-slate-600"
    }`}
  >
    {doc.processing_status}
  </span>

</td>  
                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}