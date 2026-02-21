import React from "react";

function Sidebar({ result }) {

  // Safety check (important in real projects)
  if (
    !result ||
    !result.subTopics ||
    !result.questions ||
    !result.questions.short ||
    !result.questions.long
  ) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-2">
        <span className="text-xl">📌</span>
        <h3 className="font-semibold text-gray-800">
          Quick Exam View
        </h3>
      </div>

      {/* SubTopics List */}
      <section>
        <p className="text-sm font-semibold text-gray-700 mb-3"> ⭐ Sub Topics (Priority Wise)</p>
        {
        Object.entries(result.subTopics).map(([star, topics]) => (
          <div
            key={star}
            className="mb-3 rounded-lg bg-gray-50 border border-gray-200 p-3"
          >
            <p className="text-sm font-semibold text-yellow-600 mb-1">
              {star} Priority
            </p>

            <ul className="text-sm text-gray-700 list-disc ml-4">
              {topics.map((topic, index) => (
                <li key={index}>{topic}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      {/* Exam Importance */}
<section className="rounded-lg bg-yellow-50 border border-yellow-200 p-3">
  <p className="text-sm font-semibold text-gray-700 mb-1">
    📌 Exam Importance
  </p>

  <span className="text-yellow-700 font-bold text-sm">
    {result?.importance}
  </span>



{/* Important Questions */}

  <p className="text-sm mt-4 font-semibold text-gray-700 mb-3">
    ❓ Important Questions
  </p>

  {/* Short Questions */}
  <div className="mb-4 rounded-lg bg-indigo-50 border border-indigo-200 p-3">
    <p className="text-sm font-medium text-indigo-700 mb-2">
      Short Questions
    </p>

    <ul className="list-disc ml-4 text-sm text-gray-700 space-y-1">
      {result?.questions?.short?.map((q, i) => (
        <li key={i}>{q}</li>
      ))}
    </ul>
  </div>

  {/* Long Questions */}
  <div className="rounded-lg bg-purple-50 border border-purple-200 p-3">
    <p className="text-sm font-medium text-purple-700 mb-2">
      Long Questions
    </p>

    <ul className="list-disc ml-4 text-sm text-gray-700 space-y-1">
      {result?.questions?.long?.map((q, i) => (
        <li key={i}>{q}</li>
      ))}
    </ul>
  </div>
  <div className="mb-4 mt-4 rounded-lg bg-blue-50 border border-blue-200 p-3">
    <p className="text-sm font-medium text-blue-700 mb-2">
      Diagram Questions
    </p>

    <ul className="list-disc ml-4 text-sm text-gray-700 space-y-1">
     <li>{result.questions.diagram}</li>
    </ul>
  </div>
</section>


    </div>
  );
}

export default Sidebar;