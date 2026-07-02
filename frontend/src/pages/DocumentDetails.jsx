import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import {
    FileText,
    BrainCircuit,
    FileSearch
} from "lucide-react";

export default function DocumentDetails() {

  const { id } = useParams();

  const [document, setDocument] = useState(null);

  useEffect(() => {

    const fetchDocument = async () => {
  try {
    const response = await api.get(`/documents/${id}`);

    setDocument(response.data);

  } catch (error) {
    console.error(error);
  }
};

    fetchDocument();

  }, [id]);

  if (!document) {
    return (
      <div className="p-8 text-white">
        Loading...
      </div>
    );
  }

  const ai = document.ai_output;

  return (
    <div className="p-8 text-white">

      <div className="mb-8">

    <Link
        to="/documents"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition mb-6"
    >
        <ArrowLeft size={18} />
        Back to Documents
    </Link>

    <h1 className="text-4xl font-bold">
        {document.filename}
    </h1>

    <div className="flex gap-3 mt-4">

        <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm">
            {document.document_type || "Unknown"}
        </span>

        <span className="bg-emerald-600 text-white px-4 py-1 rounded-full text-sm">
    {document.processing_status}
</span>

    </div>

</div>

      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-lg">

        <div className="flex items-center gap-3 mb-6">

    <FileText className="text-blue-400" />

    <h2 className="text-xl font-semibold">
        Document Information
    </h2>

</div>

<div className="grid md:grid-cols-3 gap-6">

    <div>

        <p className="text-slate-400 text-sm">
            Filename
        </p>

        <p className="font-semibold mt-2">
            {document.filename}
        </p>

    </div>

    <div>

        <p className="text-slate-400 text-sm">
            Document Type
        </p>

        <p className="font-semibold mt-2 capitalize">
            {document.document_type}
        </p>

    </div>

    <div>

        <p className="text-slate-400 text-sm">
            Status
        </p>

        <p className="text-emerald-400 font-semibold mt-2">
    {document.processing_status}
</p>

    </div>

</div>

      </div>

{/* PASTE THE NEW DYNAMIC METADATA SECTION HERE */}

<div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-lg mt-6">

  <div className="flex items-center gap-3 mb-6">

    <BrainCircuit className="text-purple-400" />

    <h2 className="text-2xl font-bold">
      AI Extracted Metadata
    </h2>

  </div>

  {Object.entries(ai || {})
    .filter(
      ([key]) =>
        !["name", "email", "phone", "location"].includes(key)
    )
    .map(([key, value]) => (

      <div
        key={key}
        className="mb-6 border-b border-slate-700 pb-4"
      >

        <h3 className="text-blue-400 font-semibold capitalize mb-3">
          {key.replaceAll("_", " ")}
        </h3>

        {Array.isArray(value) ? (

          <div className="flex flex-wrap gap-2">

            {value.map((item, index) => (

              <span
                key={index}
                className="bg-blue-600 px-3 py-1 rounded-lg"
              >
                {typeof item === "object"
  ? Object.values(item).join(" • ")
  : item}
              </span>

            ))}

          </div>

        ) : typeof value === "object" ? (

          <pre className="bg-slate-900 rounded-lg p-4 overflow-auto text-sm">
            {JSON.stringify(value, null, 2)}
          </pre>

        ) : (

          <p className="text-slate-300">
            {value?.toString()}
          </p>

        )}

      </div>

    ))}

</div>

<div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-lg mt-6">

  <div className="flex items-center gap-3 mb-4">

    <FileSearch className="text-cyan-400" />

    <h2 className="text-xl font-bold">
        Extracted Text
    </h2>

</div>

  <pre className="whitespace-pre-wrap text-slate-300 leading-7 max-h-[700px] overflow-y-auto">
    {document.extracted_text}
  </pre>

</div>
    </div>
  );
}