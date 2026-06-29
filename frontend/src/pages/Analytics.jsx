import { useEffect, useState } from "react";
import api from "../services/api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Analytics() {

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

  const documentData = [
    {
      name: "Resumes",
      value: stats.resume_count
    },
    {
      name: "Invoices",
      value: stats.invoice_count
    }
  ];

  return (
    <div className="p-8 text-white">

      <h1 className="text-3xl font-bold mb-8">
        Analytics Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6 mb-8">

        <div className="bg-slate-800 p-6 rounded-xl">
          <h2 className="text-gray-400">
            Total Documents
          </h2>

          <p className="text-4xl font-bold">
            {stats.total_documents}
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl">
          <h2 className="text-gray-400">
            Resumes
          </h2>

          <p className="text-4xl font-bold">
            {stats.resume_count}
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl">
          <h2 className="text-gray-400">
            Invoices
          </h2>

          <p className="text-4xl font-bold">
            {stats.invoice_count}
          </p>
        </div>

      </div>

      <div className="grid grid-cols-2 gap-8">

        <div className="bg-slate-800 p-6 rounded-xl">

          <h2 className="text-xl font-bold mb-4">
            Document Types
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <PieChart>

              <Pie
                data={documentData}
                dataKey="value"
                outerRadius={100}
                label
              >

                <Cell fill="#3B82F6" />
                <Cell fill="#10B981" />

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        <div className="bg-slate-800 p-6 rounded-xl">

  <h2 className="text-xl font-bold mb-6">
    Platform Insights
  </h2>

  <div className="space-y-4">

    <div className="bg-slate-700 p-4 rounded-lg">
      <p className="text-gray-400 text-sm">
        Total Indexed Documents
      </p>

      <p className="text-2xl font-bold">
        {stats.total_documents}
      </p>
    </div>

    <div className="bg-slate-700 p-4 rounded-lg">
      <p className="text-gray-400 text-sm">
        Most Common Type
      </p>

      <p className="text-2xl font-bold">
        {stats.resume_count >= stats.invoice_count
          ? "Resume"
          : "Invoice"}
      </p>
    </div>

    <div className="bg-slate-700 p-4 rounded-lg">
      <p className="text-gray-400 text-sm">
        AI Search Ready
      </p>

      <p className="text-2xl font-bold text-green-400">
        Yes
      </p>
    </div>

    <div className="bg-slate-700 p-4 rounded-lg">
      <p className="text-gray-400 text-sm">
        Vector Indexed Documents
      </p>

      <p className="text-2xl font-bold">
        {stats.total_documents}
      </p>
    </div>

  </div>

</div>

      </div>

    </div>
  );
}