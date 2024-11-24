import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import axios from "axios"
import { SERVER_URL } from "../config"
import TaskCard from "../components/TaskCard"
import TaskModal from "../components/createTask"
import { useRef } from "react"
import TaskDetailModal from "../components/taskDetailModal"
import { FaExclamationCircle } from 'react-icons/fa';
import { useNavigate } from "react-router-dom"

export default function Tasks() {

    const [authenticated, setAuthenticated] = useState(!!localStorage.getItem("accessToken") || false);
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || null);
    const [detailTask, setDetailTask] = useState(null);
    const [fetchedTasks, setFetchedTasks] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [uploadModal, setUploadModal] = useState(false);
    const [detailModal, setDetailModal] = useState(false);
    const addTaskRef = useRef(null);
    const detailModalRef = useRef(null);
    const navigate = useNavigate();

    // triggers fetchTasks as soon as the user authorized
    useEffect(() => {
        if(authenticated){
            setFetchedTasks(false);
            fetchTasks();
        }else{
            navigate("/login");
        }
    }, []);

    // fetchTasks and stores it in the tasks list
    const fetchTasks = async () => {
        setFetchedTasks(false);
        
        try {
            if (!accessToken) {
                throw new Error('Access token is missing.');
            }
            const response = await axios.get(`${SERVER_URL}/apis/tasks/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log(response.data);
            setTasks(response.data);
            setFetchedTasks(true);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };


    /**
     * Fetches a task with the given ID.
     * @param {number} taskId The ID of the task to fetch.
     * @returns {Promise<object>} The fetched task.
     */
    const fetchTaskById = async (taskId) => {
        try {
            const response = await axios.get(`${SERVER_URL}/apis/tasks/${taskId}/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log("Single Task:", response.data);
            return response.data;
        } catch (error) {
            console.error(`Error fetching task with ID ${taskId}:`, error);
        }
    };


    /**
     * Updates a task with the given ID.
     * @param {number} taskId - The ID of the task to update.
     * @param {object} updatedData - The updated data for the task.
     */
    const updateTask = async (taskId, updatedData) => {
        try {
            const response = await axios.put(`${SERVER_URL}/apis/task/${taskId}/`, updatedData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log("Task updated:", response.data);
            // Refresh the task list
            fetchTasks();
        } catch (error) {
            console.error(`Error updating task with ID ${taskId}:`, error);
        }
    };

    /**
     * Deletes a task with the given ID.
     * @param {number} taskId - The ID of the task to delete.
     */
    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`${SERVER_URL}/apis/task/${taskId}/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log(`Task with ID ${taskId} deleted successfully.`);
            fetchTasks();
        } catch (error) {
            console.error(`Error deleting task with ID ${taskId}:`, error);
        }
    };

    /**
     * Adds a new task.
     * @param {object} formData - The data for the new task.
     */
    const addTask = async (formData) => {
        try {
            const response = await axios.post(`${SERVER_URL}/apis/tasks/`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log("Task added:", response.data);
            fetchTasks();
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    /**
     * Opens the detail view for a task.
     * @param {object} task - The task to view in detail.
     */
    const openDetail = (task) => {
        setDetailTask(task);
        setDetailModal(true);
    };

    /**
     * Closes the detail view for a task.
     */
    const closeDetail = () => {
        setDetailTask(null);
        setDetailModal(false);
    };

    // closes the upload Modal when clicked outside modal
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (uploadModal && addTaskRef.current && !addTaskRef.current.contains(event.target)) {
                setUploadModal(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [uploadModal]);

    // closes the detail Modal when clicked outside modal
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (detailModal && detailModalRef.current && !detailModalRef.current.contains(event.target)) {
                setDetailModal(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [detailModal]);

    return (
        <Layout>
            <div className="flex flex-col w-full h-[93vh] items-center bg-gradient-to-b from-[#DBD5A4] to-[#649173] justify-center max-w-7xl">
                <div className="relative flex flex-col w-full h-full items-center justify-center bg-white bg-opacity-15 shadow-lg backdrop-blur-lg rounded-xl">
                    {!fetchedTasks && (
                        <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
                            <svg aria-hidden="true" clasName="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    )}
                    {fetchedTasks && tasks.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-2 w-full top-8 m-4 overflow-y-auto">
                            {tasks.map((task) => (
                                <div
                                    key={task.id}
                                    className="flex w-full items-center justify-center"
                                    onClick={(e) => { e.preventDefault(); console.log("clicked"); openDetail(task); }}
                                >
                                    <TaskCard key={task.id} task={task} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full">
                            <FaExclamationCircle className="text-6xl text-gray-400 mb-4" />
                            <span className="text-2xl font-semibold text-gray-600">No Tasks Available</span>
                            <span className="text-gray-500 mt-2">It looks like there are no tasks in here. Add a new task to get started!</span>
                        </div>
                    )}

                    {uploadModal && (
                        <TaskModal ref={addTaskRef} isOpen={uploadModal} onClose={() => setUploadModal(false)} onSave={addTask} />
                    )}
                    {detailModal && (
                        <TaskDetailModal ref={detailModalRef} isOpen={detailModal} task={detailTask} onClose={closeDetail} onDelete={deleteTask} onEdit={updateTask} />
                    )}

                    <button className="absolute hidden md:flex top-4 right-4 px-4 py-2 m-2 rounded-md w-fit shadow-md bg-green-400 hover:bg-green-600" onClick={() => setUploadModal(true)}>Add Task</button>
                    <button className="absolute visible md:hidden bottom-2 right-2 px-4 py-2 m-2 rounded w-fit shadow-md bg-green-400 hover:bg-green-600" onClick={() => setUploadModal(true)}>+</button>

                </div>
            </div>
        </Layout>
    )
}