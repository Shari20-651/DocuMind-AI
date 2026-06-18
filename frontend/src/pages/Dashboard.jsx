import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {

  const [stats, setStats] = useState({
    total_documents: 0,
    resume_count: 0,
    invoice_count: 0
  });

  useEffect(() => {

    const fetchAnalytics = async () => {
      try {

        const response = await api.get(
          "/platform-analytics"
        );

        setStats(response.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchAnalytics();

  }, []);

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold text-white mb-6">
        DocuMind-AI Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-slate-800 p-6 rounded-xl">
          <h2 className="text-gray-400">
            Documents
          </h2>

          <p className="text-3xl text-white font-bold">
            {stats.total_documents}
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl">
          <h2 className="text-gray-400">
            Resumes
          </h2>

          <p className="text-3xl text-white font-bold">
            {stats.resume_count}
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl">
          <h2 className="text-gray-400">
            Invoices
          </h2>

          <p className="text-3xl text-white font-bold">
            {stats.invoice_count}
          </p>
        </div>

      </div>

    </div>
  );
}