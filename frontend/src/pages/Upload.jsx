import { useState } from "react";
import api from "../services/api";

export default function Upload() {

  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    try {

      setLoading(true);

      const response = await api.post(
        "/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      setResult(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="p-8 text-white">

      <h1 className="text-3xl font-bold mb-6">
        Upload Document
      </h1>

      <div className="bg-slate-800 p-6 rounded-xl max-w-2xl">

        <input
          type="file"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
          className="mb-4"
        />

        <button
          onClick={handleUpload}
          className="bg-blue-600 px-4 py-2 rounded-lg"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>

      </div>

      {result && (

        <div className="bg-slate-800 mt-6 p-6 rounded-xl">

          <h2 className="text-xl font-bold mb-4">
            AI Analysis
          </h2>

          <pre className="whitespace-pre-wrap">
            {JSON.stringify(result, null, 2)}
          </pre>

        </div>

      )}

    </div>
  );
}