import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function DocumentDetails() {

  const { id } = useParams();

  const [document, setDocument] = useState(null);

  useEffect(() => {

    const fetchDocument = async () => {
  try {
    const response = await api.get(`/documents/${id}`);

    console.log("FULL AXIOS RESPONSE");
    console.log(response);

    console.log("RESPONSE.DATA");
    console.log(response.data);

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

console.log("FULL RESPONSE");
console.log(document);

console.log("AI OUTPUT");
console.log(document?.ai_output);

  return (
    <div className="p-8 text-white">

      <h1 className="text-3xl font-bold mb-6">
        Document Details
      </h1>

      <div className="bg-slate-800 p-6 rounded-xl">

        <p>
          <strong>Filename:</strong> {document.filename}
        </p>

        <p>
          <strong>Document Type:</strong> {document.document_type || "Unknown"}
        </p>

        <p>
          <strong>Indexed:</strong> ✅ Yes
        </p>

      </div>

{/* PASTE THE NEW DYNAMIC METADATA SECTION HERE */}

<div className="bg-slate-800 p-6 rounded-xl mt-6">

  <h2 className="text-2xl font-bold mb-6">
    AI Extracted Metadata
  </h2>

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
                  ? JSON.stringify(item)
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

<div className="bg-slate-800 p-6 rounded-xl mt-6">

  <h2 className="text-xl font-bold mb-4">
    Extracted Text
  </h2>

  <pre className="whitespace-pre-wrap text-slate-300">
    {document.extracted_text}
  </pre>

</div>

    </div>
  );
}