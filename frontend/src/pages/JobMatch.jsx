import { useState } from "react";
import api from "../services/api";

export default function JobMatch() {

  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);

  const handleMatch = async () => {

    if (!jobDescription.trim()) return;

    try {

      const response = await api.post(
        `/job-match?job_description=${encodeURIComponent(jobDescription)}`
      );

      setResult(response.data);

    } catch (error) {

      console.error(error);

    }
  };

  return (
    <div className="p-8 text-white">

      <h1 className="text-3xl font-bold mb-6">
        Job Match
      </h1>

      <div className="bg-slate-800 p-6 rounded-xl mb-6">

        <textarea
          rows="6"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste job description here..."
          className="w-full p-4 rounded-lg bg-slate-700 text-white"
        />

        <button
          onClick={handleMatch}
          className="mt-4 bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Analyze Match
        </button>

      </div>

      {result && (

        <div className="bg-slate-800 p-6 rounded-xl">

          <h2 className="text-2xl font-bold mb-4">
            Match Score: {result.match_score}%
          </h2>

          <div className="mb-6">

            <h3 className="font-bold mb-2">
              Matched Skills
            </h3>

            <ul>
              {result.matched_skills.map((skill) => (
                <li key={skill}>✅ {skill}</li>
              ))}
            </ul>

          </div>

          <div className="mb-6">

            <h3 className="font-bold mb-2">
              Missing Skills
            </h3>

            <ul>
              {result.missing_skills.map((skill) => (
                <li key={skill}>❌ {skill}</li>
              ))}
            </ul>

          </div>

          <div>

            <h3 className="font-bold mb-2">
              Best Matching Resume
            </h3>

            <p>
              {result.matches[0]?.filename}
            </p>

          </div>

        </div>

      )}

    </div>
  );
}