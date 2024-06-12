import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AddTaskAPI, DeleteTaskAPI, GetMyTasksAPI, UpdateTaskAPI } from '../services/task.service';


const Tasks = () => {
    const data = JSON.parse(localStorage.getItem('data'))
    const navigate = useNavigate()

    const [allTasks, setAllTasks] = useState([])
    const [taskText, setTaskText] = useState("")
    const [updatingTaskId, setUpdatingTaskId] = useState("")


    useEffect(() => {
        if (!(data?.accessToken)) {
            toast.error("Login to continue")
            navigate("/")
        } else {
            getTasks()
        }
    }, [])

    const getTasks = async () => {
        try {
            const res = await GetMyTasksAPI()
            if (res.success) {
                setAllTasks(res.data)
            } else {
                toast.error(res.msg)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleAddTask = async () => {
        try {
            if (!taskText.trim()) {
                toast.error("Note is missing!")
                return;
            }

            const res = await AddTaskAPI({
                text: taskText.trim()
            })
            if (res.success) {
                getTasks()
                setTaskText("")
                toast.success(res.msg)
            } else {
                toast.error(res.msg)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleUpdateTask = async () => {
        try {
            if (!taskText.trim()) {
                toast.error("Note is missing!")
                return;
            }

            const res = await UpdateTaskAPI(updatingTaskId, {
                text: taskText.trim()
            })
            if (res.success) {
                getTasks()
                setUpdatingTaskId("")
                setTaskText("")
                toast.success(res.msg)
            } else {
                toast.error(res.msg)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleDeleteTask = async (id) => {
        try {
            const res = await DeleteTaskAPI(id)
            if (res.success) {
                getTasks()
                toast.success(res.msg)
            } else {
                toast.error(res.msg)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleEdit = (item) => {
        setTaskText(item.text)
        setUpdatingTaskId(item._id)
    }

    const handleLogout = () => {
        localStorage.clear()
        navigate("/")
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <p className="navbar-brand" >Note Management</p>
                    <div className="d-flex">
                        <button onClick={handleLogout} className="btn btn-outline-warning" type="button">Logout</button>
                    </div>
                </div>
            </nav>
            <div className="container mt-4">
                <div className="d-flex justify-content-center mt-4">
                    <div className="mb-3">
                        <label htmlFor="task" className="form-label">Add New Note</label>
                        <div className="d-flex">
                            <input
                                type="text"
                                className="form-control p-2"
                                id="task"
                                placeholder='Take a note'
                                value={taskText}
                                onChange={(e) => setTaskText(e.target.value)}
                                required
                                onKeyDown={(e) => e.key === 'Enter' ? updatingTaskId ? handleUpdateTask() : handleAddTask() : null}
                            />
                            <button
                                onClick={() => updatingTaskId ? handleUpdateTask() : handleAddTask()}
                                className="btn btn-primary col-3 ml-4"                        >
                                {updatingTaskId ? "Update" : "Add"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {allTasks.length > 0 && <div className="container mt-5">
                <h3 className='text-center mb-4'>All Tasks</h3>
                <div className="row">
                    {allTasks.map(item => (
                        <div key={item._id} className="col-md-6 col-lg-4 mb-4">
                            <div className="card h-100">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div className='flex-grow-1'>
                                            <h5 className="card-title">{item.text}</h5>
                                            <p className="card-text">{new Date(item.createdAt).toDateString()}</p>
                                        </div>
                                        <div>
                                            <button
                                                disabled={updatingTaskId}
                                                className="btn btn-primary btn-sm"
                                                type="button"
                                                onClick={() => handleEdit(item)}
                                            >
                                                Edit
                                            </button> &nbsp;
                                            <button
                                                disabled={updatingTaskId}
                                                className="btn btn-danger btn-sm"
                                                type="button"
                                                onClick={() => handleDeleteTask(item._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>}
        </>
    )
}

export default Tasks