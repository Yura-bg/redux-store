import React, { useEffect, useState } from "react";
import "./style.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Task } from "../../features/User Register/type";
import { addTask, deleteTask } from "../../features/User Register/TaskSlice";
import { useParams } from "react-router-dom";
import { updateTask } from "../../features/User Register/TaskSlice";

const Tasks: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const tasks = useAppSelector((state) => state.task.tasks);
  const user = useAppSelector((state) => {
    if (userId) return state.user.users.find((user) => user.id === +userId);
  });
  const [openModal, setOpenModal] = useState(false);
  const [editedTask, setEditedTask] = useState<Task | null>(null);
  const [isModalSubtaskOpen, setModalSubtask] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  const dispatch = useAppDispatch();

  const openModalSubtask = () => {
    setModalSubtask(true);
  };

  const closeModalSubtask = () => {
    setModalSubtask(false);
  };

  const isOpenMod = (task: Task) => {
    setEditedTask(task);
    setOpenModal(true);
  };

  const IsCloseMod = () => {
    setEditedTask(null);
    setOpenModal(false);
  };

  const handleEdit = () => {
    if (editedTask) {
      dispatch(updateTask(editedTask));
      IsCloseMod();
    }
  };
  const dipsatch = useAppDispatch();

  const handleAddTAsk = () => {
    const newTask: Task = {
      id: tasks.length + 1,
      userId: +userId!,
      name: newTaskName,
      description: newTaskDescription,
    };
    dispatch(addTask(newTask));
    setNewTaskName("");
    setNewTaskDescription("");
    closeModalSubtask();
  };

  return (
    <div className="div1">
      <h1>Tasks</h1>
      <table className="">
        <thead>
          <tr>
            <th>UserName</th>
            <th>UserSurName</th>
            <th>TaskName</th>
            <th>TaskDescirption</th>
            <th>Delete</th>
            <th>Edit</th>
            <th>See Subtask</th>
          </tr>
        </thead>
        <tbody>
          {userId &&
            tasks
              .filter((user) => user.userId === +userId)
              .map((task: Task) => (
                <tr key={task.id}>
                  <td>{user?.name}</td>
                  <td>{user?.surname}</td>
                  <td>{task.name}</td>
                  <td>{task.description}</td>

                  <td>
                    <button onClick={() => dispatch(deleteTask(task.id))}>
                      &times;
                    </button>
                  </td>
                  <td>
                    <button onClick={() => isOpenMod(task)}>Edit</button>
                  </td>
                  <td>
                    <button onClick={openModalSubtask}>Modal Subtask</button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
      {openModal && editedTask && (
        <div className="modalEdit">
          <div className="modalEditDiv">
            <h2>Edit Modal</h2>
            <div className="btnCloseedit">
              <button onClick={IsCloseMod}>&times;</button>
            </div>
            <div className="inpModalEdit">
              <input
                type="text"
                name="name"
                placeholder="name"
                value={editedTask.name}
                onChange={(e) =>
                  setEditedTask({
                    ...editedTask,
                    name: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="description"
                name="description"
                value={editedTask.description}
                onChange={(e) =>
                  setEditedTask({
                    ...editedTask,
                    description: e.target.value,
                  })
                }
              />
              <button onClick={handleEdit}>Edit</button>
            </div>
          </div>
        </div>
      )}
      {isModalSubtaskOpen && (
        <div className="modalSubtask">
          <h1>Add SubTask</h1>
          <div className="btnSubtaskClose">
            <button onClick={closeModalSubtask}>X</button>
          </div>
          <div className="inputsDivSubtask">
            <input
              type="text"
              name="newTaskName"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
            />
            <input
              type="text"
              name="newDescriptionName"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
            />
          </div>
          <div className="buttonsSubTask">
            <button onClick={handleAddTAsk}>Add Current Task</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
