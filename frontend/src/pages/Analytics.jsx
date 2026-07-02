import { useEffect, useState } from "react";
import api from "../services/api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";
import {
  FileText,
  Receipt,
  CheckCircle,
  Clock
} from "lucide-react";

export default function Analytics() {

  const [stats, setStats] = useState({
    total_documents: 0,
    resume_count: 0,
    invoice_count: 0,
    top_skills: [],
    upload_trends: [],
    status_counts: {},
    recent_documents: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAnalytics = async () => {

  setError("");

  try {

    const response = await api.get(
      "/platform-analytics"
    );

    setStats(response.data);

  } catch (error) {

    console.error(error);

    setError(
      "Unable to load analytics. Please try again."
    );

  } finally {

    setLoading(false);

  }

};

useEffect(() => {

  const loadInitialAnalytics = async () => {

    setLoading(true);

    await fetchAnalytics();

    setLoading(false);

  };

  loadInitialAnalytics();

  const interval = setInterval(() => {

    fetchAnalytics();

  }, 30000);

  return () => clearInterval(interval);

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

  const statusData = Object.entries(
  stats.status_counts || {}
)
  .filter(([_, count]) => count > 0)
  .map(([status, count]) => ({
    status,
    count
  }));

const statusColors = {
  Completed: "#22C55E",
  Queued: "#EAB308",
  Processing: "#F97316",
  "AI Extracting": "#A855F7",
  Indexed: "#06B6D4",
  "Generating Embeddings": "#3B82F6"
};

const skillColors = [
  "#3B82F6", // Blue
  "#10B981", // Green
  "#8B5CF6", // Purple
  "#F59E0B", // Orange
  "#EC4899"  // Pink
];

if (loading) {

  return (

    <div className="flex items-center justify-center h-screen bg-slate-900">

      <div className="text-center">

        <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-700 border-t-blue-500 mx-auto"></div>

        <p className="mt-6 text-slate-300 text-lg">
          Loading Analytics...
        </p>

      </div>

    </div>

  );

}

if (error) {

  return (

    <div className="flex items-center justify-center h-screen bg-slate-900">

      <div className="text-center">

        <h2 className="text-3xl font-bold text-red-400">
          Something went wrong
        </h2>

        <p className="text-slate-400 mt-4">
          {error}
        </p>

        <button

          onClick={() => window.location.reload()}

          className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"

        >

          Retry

        </button>

      </div>

    </div>

  );

}

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

        <div className="bg-slate-800 rounded-xl p-6 h-[520px]">

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
  cx="50%"
  cy="52%"
  outerRadius={118}
  label={({ cx, cy, midAngle, outerRadius, value }) => {
  const RADIAN = Math.PI / 180;

  const x =
    cx +
    (outerRadius + 18) *
      Math.cos(-midAngle * RADIAN);

  const y =
    cy +
    (outerRadius + 18) *
      Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#FFFFFF"
      fontSize={18}
      fontWeight="700"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {value}
    </text>
  );
}}
  labelLine
  stroke="#fff"
  strokeWidth={2}
>

                <Cell fill="#3B82F6" />
                <Cell fill="#10B981" />

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        <div className="bg-slate-800 rounded-xl p-6 h-[520px]">

  <h2 className="text-2xl font-bold mb-6">
    Top Resume Skills
  </h2>

  <ResponsiveContainer
  width="100%"
  height={360}
>

    <BarChart
      data={stats.top_skills}
      layout="vertical"
      margin={{
  top: 20,
  right: 20,
  left: 40,
  bottom: 20
}}
    >

      <CartesianGrid
        strokeDasharray="3 3"
        stroke="#334155"
      />

      <XAxis
        type="number"
        stroke="#94A3B8"
      />

      <YAxis
  dataKey="skill"
  type="category"
  stroke="#94A3B8"
  width={120}
  tick={{ fontSize: 13 }}
/>

      <Tooltip />

      <Bar
  dataKey="count"
  radius={[8, 8, 0, 0]}
  barSize={36}
>
  {stats.top_skills.map((entry, index) => (
    <Cell
      key={index}
      fill={skillColors[index % skillColors.length]}
    />
  ))}
</Bar>

    </BarChart>

  </ResponsiveContainer>

</div>

        <div className="bg-slate-800 p-6 rounded-xl h-[380px]">

  <h2 className="text-xl font-bold mb-6">
    Upload Trends
  </h2>

  <ResponsiveContainer
    width="100%"
    height="90%"
  >

    <LineChart
      data={stats.upload_trends}
    >

      <CartesianGrid
        strokeDasharray="3 3"
        stroke="#334155"
      />

      <XAxis
  dataKey="date"
  stroke="#94A3B8"
  tickFormatter={(date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short"
    })
  }
  tick={{
    fontSize: 14,
    fill: "#CBD5E1"
  }}
/>

<YAxis
  stroke="#94A3B8"
  tick={{
    fontSize: 14,
    fill: "#CBD5E1"
  }}
/>

      <Tooltip />

      <Line
        type="monotone"
        dataKey="count"
        stroke="#3B82F6"
        strokeWidth={3}
      />

    </LineChart>

  </ResponsiveContainer>

</div>

<div className="bg-slate-800 p-6 rounded-xl h-[380px]">

  <h2 className="text-2xl font-bold mb-6">
    Processing Status
  </h2>

  <ResponsiveContainer
    width="100%"
    height="90%"
  >
    <BarChart data={statusData}>

      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey="status" />

      <YAxis />

      <Tooltip />

      <Bar
  dataKey="count"
  fill="#3B82F6"
  radius={[0,8,8,0]}
  barSize={36}
/>

    </BarChart>
  </ResponsiveContainer>

</div>

      </div>

      <div className="bg-slate-800 rounded-xl p-6 mt-8">

  <h2 className="text-2xl font-bold mb-6">
    Recent Activity
  </h2>

  <div className="space-y-4">

    {stats.recent_documents.map((doc, index) => (

      <div
        key={index}
        className="flex items-center justify-between bg-slate-700 rounded-xl px-5 py-3 hover:bg-slate-600 hover:scale-[1.01] transition-all duration-300"
      >

        <div className="flex items-center gap-4">

          <div className="bg-slate-600 p-4 rounded-xl">

  {doc.document_type === "resume" ? (

    <FileText
      className="text-blue-400"
      size={26}
    />

  ) : (

    <Receipt
      className="text-green-400"
      size={26}
    />

  )}

</div>

          <div>

            <h3 className="font-semibold">
              {doc.filename}
            </h3>

            <span
  className={`inline-block mt-2 px-2 py-1 rounded-md text-xs font-medium
    ${
      doc.document_type === "resume"
        ? "bg-blue-500/20 text-blue-400"
        : "bg-green-500/20 text-green-400"
    }`}
>
  {doc.document_type.charAt(0).toUpperCase() + doc.document_type.slice(1)}
</span>

          </div>

        </div>

        <div className="text-right">

          <div className="flex items-center justify-end gap-2">

  {doc.processing_status === "Completed" ? (
    <>
      <CheckCircle
        size={18}
        className="text-green-400"
      />

      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
        Completed
      </span>
    </>
  ) : (
    <>
      <Clock
        size={18}
        className="text-yellow-400"
      />

      <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium">
        {doc.processing_status}
      </span>
    </>
  )}

</div>
          <p className="text-slate-400 text-sm mt-2">
  {new Date(doc.created_at).toLocaleDateString()} •{" "}
  {new Date(doc.created_at).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}
</p>

        </div>

      </div>

    ))}

  </div>

</div>

    </div>
  );
}