import React, { forwardRef, useState } from "react";

const TaskModal = forwardRef(({ isOpen, onClose, onSave },ref) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [status, setStatus] = useState("pending");
    const [priority, setPriority] = useState("low");

    const handleSave = () => {
        const task = {
            title,
            description,
            due_date: dueDate,
            status,
            priority,
        };
        onSave(task);
        onClose(); 
    };

    if (!isOpen) return null;

    return (
        <div  className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div ref={ref}
                className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
                style={{
                    background: "linear-gradient(to bottom, #DBD5A4, #649173)",
                }}
            >
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Create New Task</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSave();
                    }}
                >
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Title</label>
                            <input
                                type="text"
                                className="w-full border rounded-md p-2"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Description</label>
                            <textarea
                                className="w-full border rounded-md p-2"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Due Date</label>
                            <input
                                type="date"
                                className="w-full border rounded-md p-2"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Status</label>
                            <select
                                className="w-full border rounded-md p-2"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="pending">Pending</option>
                                <option value="running">Running</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Priority</label>
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

                        <div className="flex justify-end gap-4 mt-4">
                            <button
                                type="button"
                                className="bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-md"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
});

export default TaskModal;
