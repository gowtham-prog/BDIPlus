import React, { forwardRef, useState, useEffect } from "react";

const TaskDetailModal = forwardRef(({ isOpen, task, onClose, onDelete, onEdit }, ref) => {
    const [isEditing, setIsEditing] = useState(false);

    const [title, setTitle] = useState(task?.title || "");
    const [description, setDescription] = useState(task?.description || "");
    const [dueDate, setDueDate] = useState(task?.due_date || "");
    const [status, setStatus] = useState(task?.status || "pending");
    const [priority, setPriority] = useState(task?.priority || "low");

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setDueDate(task.due_date || "");
            setStatus(task.status || "pending");
            setPriority(task.priority || "low");
        }
    }, [task]);

    const handleEditSave = () => {
        const updatedTask = {
            ...task,
            title,
            description,
            due_date: dueDate,
            status,
            priority,
        };
        onEdit(task.id,updatedTask);
        onClose();
    };

    if (!isOpen || !task) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div
                ref={ref}
                className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
                style={{
                    background: "linear-gradient(to bottom, #DBD5A4, #649173)",
                }}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {isEditing ? "Edit Task" : "Task Details"}
                    </h2>
                    <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                {!isEditing ? (
                    <div>
                        <p>
                            <strong>Title:</strong> {task.title}
                        </p>
                        <p>
                            <strong>Description:</strong> {task.description}
                        </p>
                        <p>
                            <strong>Due Date:</strong>{" "}
                            {task.due_date ? task.due_date : "No due date"}
                        </p>
                        <p>
                            <strong>Status:</strong> {task.status}
                        </p>
                        <p>
                            <strong>Priority:</strong> {task.priority}
                        </p>
                    </div>
                ) : (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleEditSave();
                        }}
                        className="flex flex-col gap-4"
                    >
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Title
                            </label>
                            <input
                                type="text"
                                className="w-full border rounded-md p-2"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Description
                            </label>
                            <textarea
                                className="w-full border rounded-md p-2"
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Due Date
                            </label>
                            <input
                                type="date"
                                className="w-full border rounded-md p-2"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Status
                            </label>
                            <select
                                className="w-full border rounded-md p-2"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                                <option value="overdue">Overdue</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">
                                Priority
                            </label>
                            <select
                                className="w-full border rounded-md p-2"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </form>
                )}

                <div className="flex justify-end gap-4 mt-4">
                    {!isEditing ? (
                        <>
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md"
                                onClick={() => {onDelete(task.id); onClose();}}
                            >
                                Delete
                            </button>
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
                                onClick={() => setIsEditing(true)}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-md"
                                onClick={onClose}
                            >
                                Close
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className="bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-md"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md"
                                onClick={handleEditSave}
                            >
                                Save
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
});

export default TaskDetailModal;
