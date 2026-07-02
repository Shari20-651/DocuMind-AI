import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

export default function Upload() {

  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("");
  const stages = [
  "Uploading",
  "AI Extracting",
  "Generating Embeddings",
  "Indexed",
  "Completed"
];

  const handleUpload = async () => {

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);
    
    let toastId;

    try {

  setLoading(true);

  setUploading(true);

  toastId = toast.loading("Uploading document...");

  setProgress(5);
  setStage("Uploading");

      const response = await api.post(
        "/upload",
        formData,
        {
  headers: {
    "Content-Type": "multipart/form-data"
  },

  onUploadProgress: (event) => {

    const percent = Math.round(
      (event.loaded * 100) / event.total
    );

    setProgress(Math.min(percent, 55));

  }

}
      );

      setStage("AI Extracting");
setProgress(65);

await new Promise(resolve => setTimeout(resolve, 500));

setStage("Generating Embeddings");
setProgress(80);

await new Promise(resolve => setTimeout(resolve, 500));

setStage("Indexed");
setProgress(95);

await new Promise(resolve => setTimeout(resolve, 500));

setStage("Completed");
setProgress(100);

setResult(response.data);

toast.success(
  "Document uploaded successfully!",
  {
    id: toastId
  }
);

setStage("Completed");
setProgress(100);

    } 
    
    catch (error) {

      console.error(error);

      toast.error(
        "Failed to upload document.",
        {
          id: toastId
        }
      );

    } finally {

  setLoading(false);

  setTimeout(() => {

    setUploading(false);
    setProgress(0);
    setStage("");

  }, 800);

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

        {uploading && (

<div className="mt-6 bg-slate-900 rounded-xl p-6 border border-slate-700">

  <div className="flex justify-between mb-3">

    <span className="font-semibold">
      {file?.name}
    </span>

    <span>
      {progress}%
    </span>

  </div>

  <div className="w-full bg-slate-700 rounded-full h-3 mb-6">

    <div
      className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
      style={{
        width: `${progress}%`
      }}
    />

  </div>

  <h3 className="font-semibold mb-4">
    Current Stage
  </h3>

  <div className="space-y-3">

    {stages.map((item) => (

      <div
        key={item}
        className="flex items-center gap-3"
      >

        <div
          className={`w-3 h-3 rounded-full ${
            stage === item
              ? "bg-blue-500 animate-pulse"
              : progress === 100
              ? "bg-green-500"
              : "bg-slate-600"
          }`}
        />

        <span
          className={
            stage === item
              ? "text-white font-semibold"
              : "text-slate-400"
          }
        >
          {item}
        </span>

      </div>

    ))}

  </div>

</div>

)}
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