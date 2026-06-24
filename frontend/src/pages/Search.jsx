import { useState } from "react";
import api from "../services/api";

export default function Search() {

  const [filename, setFilename] = useState("");
  const [skill, setSkill] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {

  if (!filename.trim()) return;

  try {

    const response = await api.get(
      `/search?filename=${filename}`
    );

    setResults(response.data);

  } catch (error) {

    console.error(error);

  }
};
  
  const handleSkillSearch = async () => {

  if (!skill.trim()) return;

  try {

    const response = await api.get(
      `/search/skill?skill=${skill}`
    );

    setResults(response.data);

  } catch (error) {

    console.error(error);

  }
};

  return (
    <div className="p-8 text-white">

      <h1 className="text-3xl font-bold mb-6">
        Search Documents
      </h1>

      <div className="bg-slate-800 p-6 rounded-xl mb-6 flex gap-4">

        <input
          type="text"
          placeholder="Enter filename..."
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
          className="flex-1 p-3 rounded-lg bg-slate-700 text-white"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Search
        </button>

      </div>

      <div className="bg-slate-800 p-6 rounded-xl mb-6 flex gap-4">

  <input
    type="text"
    placeholder="Search by skill..."
    value={skill}
    onChange={(e) => setSkill(e.target.value)}
    className="flex-1 p-3 rounded-lg bg-slate-700 text-white"
  />

  <button
    onClick={handleSkillSearch}
    className="bg-green-600 px-6 py-3 rounded-lg hover:bg-green-700"
  >
    Skill Search
  </button>

</div>

      <div className="bg-slate-800 rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-700">

            <tr>
              <th className="p-4 text-left">File Name</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">Candidate</th>
              <th className="p-4 text-left">Email</th>
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
                  {doc.ai_output?.name || "-"}
                </td>

                <td className="p-4">
                  {doc.ai_output?.email || "-"}
                </td>
              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}