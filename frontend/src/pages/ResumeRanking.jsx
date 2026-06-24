import { useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function ResumeRanking() {

  const [jobDescription, setJobDescription] = useState("");
  const [results, setResults] = useState([]);

  const handleRanking = async () => {

    try {

      const response = await api.post(
        `/resume-ranking?job_description=${jobDescription}`
      );

      setResults(response.data);

    } catch (error) {

      console.error(error);

    }
  };

  return (
    <div className="p-8 text-white">

      <h1 className="text-3xl font-bold mb-6">
        Resume Ranking
      </h1>

      <div className="bg-slate-800 p-6 rounded-xl mb-6">

        <textarea
          rows="6"
          value={jobDescription}
          onChange={(e) =>
            setJobDescription(e.target.value)
          }
          placeholder="Paste Job Description..."
          className="w-full p-4 rounded-lg bg-slate-700"
        />

        <button
          onClick={handleRanking}
          className="mt-4 bg-blue-600 px-6 py-3 rounded-lg"
        >
          Rank Resumes
        </button>

      </div>

      {results.length > 0 && (

        <div className="bg-slate-800 rounded-xl overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-700">

              <tr>
                <th className="p-4 text-left">Rank</th>
                <th className="p-4 text-left">Candidate</th>
                <th className="p-4 text-left">Resume</th>
                <th className="p-4 text-left">Score</th>
              </tr>

            </thead>

            <tbody>

              {results.map((resume, index) => (

                <tr
                  key={index}
                  className="border-t border-slate-700"
                >
                  <td className="p-4">
                    #{index + 1}
                  </td>

                  <td className="p-4">

  <Link
    to={`/documents/${resume.id}`}
    className="text-blue-400 hover:underline"
  >
    {resume.candidate}
  </Link>

</td>

                  <td className="p-4">
                    {resume.filename}
                  </td>

                  <td className="p-4">
                    {resume.score}%
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}