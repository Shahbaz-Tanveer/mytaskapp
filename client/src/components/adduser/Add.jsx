import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import "./add.css";
import toast from 'react-hot-toast';

const AddTask = () => {
  const initialTask = {
    title: "",
    description: "",
    status: "",
    duedate: ""
  };

  const [task, setTask] = useState(initialTask);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    // Ensure description and duedate fields have a default value if not provided
    const taskData = {
      ...task,
      description: task.description || "N/A",
      duedate: task.duedate || "N/A"
    };

    try {
      const response = await axios.post("http://localhost:8000/api/create", taskData);
      toast.success(response.data.msg, { position: "top-right" });
      navigate("/");
    } catch (error) {
      console.error("There was an error creating the task!", error);
    }
  };

  return (
    <div className='addTask'>
      <Link to={"/"}>Back</Link>
      <h3>Add new task</h3>
      <form className='addTaskForm' onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="title">Title <span className="required">*</span></label>
          <input
            type="text"
            onChange={inputHandler}
            id="title"
            name="title"
            autoComplete='off'
            placeholder='Title'
            value={task.title}
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            onChange={inputHandler}
            id="description"
            name="description"
            autoComplete='off'
            placeholder='Description'
            value={task.description}
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="status">Status <span className="required">*</span></label>
          <select
            onChange={inputHandler}
            id="status"
            name="status"
            value={task.status}
            required
          >
            <option value="" disabled>Select status</option>
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="inputGroup">
          <label htmlFor="duedate">Due Date</label>
          <input
            type="date"
            onChange={inputHandler}
            id="duedate"
            name="duedate"
            autoComplete='off'
            value={task.duedate}
          />
        </div>
        <div className="inputGroup">
          <button type="submit">ADD TASK</button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
