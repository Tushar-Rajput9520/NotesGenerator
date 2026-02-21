import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
} from "recharts";

function RechartSetup({ charts }) {
  if (!charts || charts.length === 0) return null;

  const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4"];

  // 🔥 Smart chart type selector
  const getChartType = (chart, index) => {
    if (chart.type === "bar" || chart.type === "line" || chart.type === "pie") {
      return chart.type;
    }

    // If type not valid → rotate automatically
    const types = ["bar", "line", "pie"];
    return types[index % types.length];
  };

  return (
    <div className="space-y-8">
      {charts.map((chart, index) => {
        const chartType = getChartType(chart, index);

        return (
          <div
            key={index}
            className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm"
          >
            <h4 className="font-semibold text-gray-800 mb-3">
              📊 {chart.title}
            </h4>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">

                {/* ---------------- BAR CHART ---------------- */}
                {chartType === "bar" && (
                  <BarChart data={chart.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                      {chart.data.map((_, i) => (
                        <Cell
                          key={i}
                          fill={COLORS[i % COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                )}

                {/* ---------------- LINE CHART ---------------- */}
                {chartType === "line" && (
                  <LineChart data={chart.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#6366f1"
                      strokeWidth={3}
                    />
                  </LineChart>
                )}

                {/* ---------------- PIE CHART ---------------- */}
                {chartType === "pie" && (
                  <PieChart>
                    <Tooltip />
                    <Legend />
                    <Pie
                      data={chart.data}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={100}
                      label
                    >
                      {chart.data.map((_, i) => (
                        <Cell
                          key={i}
                          fill={COLORS[i % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                )}

              </ResponsiveContainer>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RechartSetup;