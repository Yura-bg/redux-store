import React, { useState } from "react";
import "./style.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteUser } from "../../features/User Register/UserSlice";
import { addTask, deleteTask } from "../../features/User Register/TaskSlice";
import { Task } from "../../features/User Register/type";
import { Link } from "react-router-dom";

const User: React.FC = () => {
  const [dataBase, setDataBase] = useState({
    name: "",
    description: "",
  });
  const tasks = useAppSelector((state) => state.task.tasks);
  const users = useAppSelector((state) => state.user.users);
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsOpenModal] = useState(false);
  const [nameError, setNameError] = useState("");
  const [descError, setDescError] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(0);

  const openModal = (userId: number) => {
    setIsOpenModal(true);
    setSelectedUserId(userId);
  };

  const closemodal = () => {
    setIsOpenModal(false);
    setDataBase({
      name: "",
      description: "",
    });
  };

  const handleChangeTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataBase({
      ...dataBase,
      [name]: value,
    });
  };

  const handleClickAddTask = () => {
    const { name, description } = dataBase;
    if (!name) {
      setNameError("Name is Required");
      return;
    } else {
      setNameError("");
    }
    if (!description) {
      setDescError("Description is required");
      return;
    } else {
      setDescError("");
    }

    dispatch(
      addTask({
        id: tasks.length,
        userId: selectedUserId,
        name,
        description,
      })
    );

    closemodal();
  };

  return (
    <div className="tablediv">
      <h1 className="h1">All Users and UserTasks</h1>
      <table className="table table-dark table-hover table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Nickname</th>
            <th>User Task</th>
            <th>Delete</th>
            <th>AddTask</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.nickname}</td>
              <td>
                <Link to={`/tasks/${user.id}`}>Show Tasks</Link>
              </td>
              <td>
                <button onClick={() => dispatch(deleteUser(user.id))}>
                  &times;
                </button>
              </td>
              <td>
                <button onClick={() => openModal(user.id)}>Add Task</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <div className="modal">
          <button className="BtnClose" onClick={closemodal}>
            &times;
          </button>
          <div className="modalDiv">
            <h2>Add Task</h2>
            <div className="inpModalDiv">
              {nameError && <div className="error">{nameError}</div>}
              <input
                name="name"
                placeholder="Name"
                type="text"
                value={dataBase.name}
                className="name"
                onChange={handleChangeTask}
              />
              {descError && <div className="error">{descError}</div>}
              <input
                name="description"
                placeholder="Description"
                type="text"
                className="desc"
                value={dataBase.description}
                onChange={handleChangeTask}
              />
              <button onClick={handleClickAddTask}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
