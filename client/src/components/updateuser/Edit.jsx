import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import "../adduser/add.css";
import toast from 'react-hot-toast';

const Edit = () => {
    const initialTask = {
        title: "",
        description: "",
        status: "",
        duedate: ""
    };

    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(initialTask);

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/getone/${id}`)
            .then((response) => {
                setTask(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [id])

    const submitForm = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8000/api/update/${id}`, task)
            .then((response) => {
                toast.success(response.data.msg, { position: "top-right" })
                navigate("/")
            })
            .catch(error => console.log(error))
    }

    return (
        <div className='addTask'>
            <Link to={"/"}>Back</Link>
            <h3>Update task</h3>
            <form className='addTaskForm' onSubmit={submitForm}>
                <div className="inputGroup">
                    <label htmlFor="title">Title<span className="required">*</span></label>
                    <input type="text" value={task.title} onChange={inputChangeHandler} id="title" name="title" autoComplete='off' placeholder='Title' required />
                </div>
                <div className="inputGroup">
                    <label htmlFor="description">Description</label>
                    <input type="text" value={task.description} onChange={inputChangeHandler} id="description" name="description" autoComplete='off' placeholder='Description' />
                </div>
                <div className="inputGroup">
                    <label htmlFor="status">Status<span className="required">*</span></label>
                    <select value={task.status} onChange={inputChangeHandler} id="status" name="status" autoComplete='off' required>
                        <option value="">Select status</option>
                        <option value="pending">Pending</option>
                        <option value="in progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div className="inputGroup">
                    <label htmlFor="duedate">Due Date</label>
                    <input type="date" value={task.duedate.substring(0, 10)} onChange={inputChangeHandler} id="duedate" name="duedate" autoComplete='off' placeholder='Due Date' />
                </div>
                <div className="inputGroup">
                    <button type="submit">UPDATE TASK</button>
                </div>
            </form>
        </div>
    )
}

export default Edit;
