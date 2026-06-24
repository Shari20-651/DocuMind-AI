import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function DocumentDetails() {

  const { id } = useParams();

  const [document, setDocument] = useState(null);

  useEffect(() => {

    const fetchDocument = async () => {

      try {

        const response = await api.get(
          `/documents/${id}`
        );

        setDocument(response.data[0]);

        console.log("API RESPONSE");
console.log(response.data);

console.log("FIRST DOCUMENT");
console.log(response.data[0]);

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
        Candidate Profile
      </h1>

      <div className="bg-slate-800 p-6 rounded-xl">

        <p><strong>Name:</strong> {ai?.name}</p>
        <p><strong>Email:</strong> {ai?.email}</p>
        <p><strong>Phone:</strong> {ai?.phone}</p>
        <p><strong>Location:</strong> {ai?.location}</p>

      </div>

      <div className="bg-slate-800 p-6 rounded-xl mt-6">

  <h2 className="text-xl font-bold mb-4">
    Skills
  </h2>

  {Array.isArray(ai?.skills) ? (

    <div className="flex flex-wrap gap-2">

      {ai.skills.map((skill, index) => (
        <span
          key={index}
          className="bg-blue-600 px-3 py-1 rounded-lg"
        >
          {skill}
        </span>
      ))}

    </div>

  ) : (

    Object.entries(ai?.skills || {}).map(
      ([category, skills]) => (

        <div key={category} className="mb-4">

          <h3 className="font-semibold text-blue-400 mb-2">
            {category.replaceAll("_", " ")}
          </h3>

          <div className="flex flex-wrap gap-2">

            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-600 px-3 py-1 rounded-lg"
              >
                {skill}
              </span>
            ))}

          </div>

        </div>

      )
    )

  )}

</div>

  <div className="bg-slate-800 p-6 rounded-xl mt-6">

  <h2 className="text-xl font-bold mb-4">
    Education
  </h2>

  {(ai?.education || []).map((edu, index) => (

    <div
      key={index}
      className="mb-6 border-b border-slate-700 pb-4"
    >

      <h3 className="font-bold text-lg">
        {edu.degree}
      </h3>

      <p className="text-slate-300">
        {edu.institution}
      </p>

      <p>
        {edu.years}
      </p>

      <p>
        {edu.details}
      </p>

    </div>

  ))}

</div>

    </div>
  );
}