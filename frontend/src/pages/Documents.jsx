import { useEffect, useState } from "react";
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

    fetchDocuments();

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
              <th className="p-4 text-left">File Name</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">Candidate</th>
              <th className="p-4 text-left">Email</th>
            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>
                <td colSpan="4" className="p-4">
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

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}