import { useState } from "react";

const AddTask = ({ taskList, setTaskList }) => {
  const [addModal, setAddModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "projectName") {
      setProjectName(value);
      if (value === "") {
        setErrorMessage("Enter project name to continue");
      } else {
        setErrorMessage("");
      }
    }
    if (name === "taskDescription") {
      setTaskDescription(value);
    }
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!projectName.trim()) {
      setErrorMessage("Enter project name to continue!");
      return;
    }
    setTaskList([...taskList, { projectName, taskDescription }]);
    setAddModal(false);
    setProjectName("");
    setTaskDescription("");
    setErrorMessage(""); // Clear error on successful task addition
  };

  return (
    <div>
      <button
        className="text-white border rounded-md py-2 px-4 bg-blue-500 hover:opacity-70 font-semibold"
        type="button"
        onClick={() => setAddModal(true)}
      >
        +New
      </button>

      {addModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-9/12 max-w-lg rounded-xl shadow-lg relative flex flex-col">
            <div className="flex justify-between p-5 border-b border-slate-200">
              <h3 className="font-semibold text-2xl">Add New Task</h3>
              <button
                className="text-gray-400 text-2xl hover:text-red-500"
                onClick={() => setAddModal(false)}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleAddTask} className="px-6 pt-6 pb-4">
              <div>
                <label className="text-gray-700 text-sm font-semibold block mb-2">
                  Project Name
                </label>
                <input
                  className="w-full bg-gray-200 border rounded-lg py-3 px-4 focus:outline-none"
                  type="text"
                  name="projectName"
                  value={projectName}
                  placeholder="Project name"
                  onChange={handleInput}
                  required
                />
              </div>
              <p className="text-red-500 text-sm text-center mt-2 mb-5">
                {errorMessage}
              </p>
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
                Add Task
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTask;
