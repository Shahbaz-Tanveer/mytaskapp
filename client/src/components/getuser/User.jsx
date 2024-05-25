import React, { useEffect, useState } from 'react';
import axios from "axios";
import toast from "react-hot-toast";
import "./task.css";  // Ensure this path is correct
import { Link } from 'react-router-dom';

const Task = () => {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      const response = await axios.get("http://localhost:8000/api/getall");
      setTasks(response.data);
    };

    fetchData();

  }, []);

  const deleteTask = async (taskId) => {
    await axios.delete(`http://localhost:8000/api/delete/${taskId}`)
      .then((response) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
        toast.success(response.data.msg, { position: 'top-right' });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return { backgroundColor: "red" };
      case "completed":
        return { backgroundColor: "green" };
      case "in progress":
        return { backgroundColor: "blue" };
      default:
        return {};
    }
  };

  return (
    <div className='taskTable'>
      <Link to={"/add"} className='addButton'>Add Task</Link>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>ID.No.</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            tasks.map((task, index) => {
              return (
                <tr key={task._id}>
                  <td>{index + 1}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td style={getStatusColor(task.status)}>{task.status}</td>
                  <td>{new Date(task.duedate).toLocaleDateString()}</td>
                  <td className='actionButtons'>
                    <button onClick={() => deleteTask(task._id)}><i className="fa-solid fa-trash"></i></button>
                    <Link to={`/edit/` + task._id}><i className="fa-solid fa-pen-to-square"></i></Link>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default Task;
