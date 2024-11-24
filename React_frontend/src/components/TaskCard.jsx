import React from "react";

const TaskCard = ({ task }) => {
    const { id, title, description, created_by, due_date, status, priority } = task;

    const statusColors = {
        pending: "bg-yellow-500",
        completed: "bg-green-500",
        overdue: "bg-red-500",
    };

    const priorityColors = {
        low: "text-green-600",
        medium: "text-yellow-600",
        high: "text-red-600",
    };

    return (
        <div
            className="m-2 p-2 md:p-5 rounded-lg shadow-md bg-white w-full max-w-sm md:m-4 flex flex-col  "
            style={{
                background: "linear-gradient(to bottom, #649173, #DBD5A4)",
                color: "#333",
            }}
        >
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-semibold text-gray-800 truncate">{title}</h2>

                <p className="text-gray-700 text-sm truncate">{description}</p>
            </div>

            <div className="mt-4 flex flex-col gap-2 text-sm">
                <div>
                    <span className="font-semibold text-gray-700">Created by:</span>{" "}
                    {created_by?.username || "Unknown"}
                </div>

                <div>
                    <span className="font-semibold text-gray-700">Due Date:</span>{" "}
                    {due_date ? new Date(due_date).toLocaleDateString() : "No due date"}
                </div>

                <div>
                    <span className="font-semibold text-gray-700">Priority:</span>{" "}
                    <span className={`font-bold ${priorityColors[priority.toLowerCase()] || "text-gray-500"}`}>
                        {priority}
                    </span>
                </div>

                <div className={`px-2 py-1 text-white rounded-full text-xs w-fit inline-block ${statusColors[status.toLowerCase()] || "bg-gray-400"}`}>
                    {status}
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
