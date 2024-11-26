import { useState, useEffect } from "react";

const EditTask = ({ task, index, taskList, setTaskList }) => {
  const [editModal, setEditModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  useEffect(() => {
    setProjectName(task.projectName);
    setTaskDescription(task.taskDescription);
  }, [task]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "projectName") setProjectName(value);
    if (name === "taskDescription") setTaskDescription(value);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedTasks = taskList.map((t, i) =>
      i === index ? { projectName, taskDescription } : t
    );
    setTaskList(updatedTasks);
    setEditModal(false);
  };

  return (
    <>
      <button
        className="bg-gray-400 text-white font-semibold py-1 px-2 rounded hover:bg-gray-300"
        onClick={() => setEditModal(true)}
      >
        Edit
      </button>
      {editModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-9/12 max-w-lg rounded-xl shadow-lg relative flex flex-col">
            <div className="flex justify-between p-5 border-b border-slate-200">
              <h3 className="font-semibold text-2xl">Edit Task</h3>
              <button
                className="text-gray-400 text-2xl hover:text-red-500"
                onClick={() => setEditModal(false)}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleUpdate} className="px-6 pt-6 pb-4">
              <div>
                <label className="text-gray-700 text-sm font-semibold block mb-2">
                  Project Name
                </label>
                <input
                  className="w-full bg-gray-200 border rounded-lg py-3 px-4 mb-5 focus:outline-none"
                  type="text"
                  name="projectName"
                  value={projectName}
                  placeholder="Project name"
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <label className="text-gray-700 text-sm font-semibold block mb-2">
                  Task Description
                </label>
                <textarea
                  className="w-full bg-gray-200 border rounded-lg py-3 px-4 mb-5 focus:outline-none"
                  name="taskDescription"
                  rows="4"
                  placeholder="Enter task description"
                  value={taskDescription}
                  onChange={handleInput}
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold uppercase text-sm hover:opacity-80"
              >
                Update Task
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditTask;
