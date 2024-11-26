import React, { useState, useEffect } from "react";
import EditTask from "../EditTask";

const ToDo = ({ task, index, taskList, setTaskList }) => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  // Handle the timer logic
  useEffect(() => {
    let timer;
    if (running) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // Increment time by 10ms
      }, 10);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer); // Cleanup on unmount or stop
  }, [running]);

  const handleDelete = (itemID) => {
    let removeIndex = taskList.indexOf(task);
    taskList.splice(removeIndex, 1);
    setTaskList((currentTask) =>
      currentTask.filter((todo) => todo.id !== itemID)
    );
  };

  const formatTime = (time) => {
    const hours = Math.floor((time / 3600000) % 24);
    const minutes = Math.floor((time / 60000) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    const milliseconds = Math.floor((time / 10) % 100);

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}.${String(milliseconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div
      className="bg-white rounded-lg flex flex-col items-start
    shadow-lg p-4 my-4 py-4 px-6 ml-6 w-3/4 max-w-lg
    mx-6 transition-transform transform"
    >
      <div className="w-full flex justify-between">
        <p className="font-semibold text-xl text-gray-800">
          {task.projectName}
        </p>
        <EditTask
          task={task}
          index={index}
          setTaskList={setTaskList}
          taskList={taskList}
        />
      </div>
      <p className="text-gray-600 mt-2 text-lg">{task.taskDescription}</p>
      <div className="mt-4">
        <div className="text-center text-lg font-mono">{formatTime(time)}</div>
        <div className="flex justify-center mt-2">
          {running ? (
            <button
              className="bg-red-500 text-white py-1 px-4 rounded font-semibold text-sm uppercase hover:bg-red-400 mx-2"
              onClick={() => setRunning(false)}
            >
              Stop
            </button>
          ) : (
            <button
              className="bg-green-500 text-white py-1 px-4 rounded font-semibold text-sm uppercase hover:bg-green-400 mx-2"
              onClick={() => setRunning(true)}
            >
              Start
            </button>
          )}
          <button
            className="bg-gray-500 text-white py-1 px-4 rounded font-semibold text-sm uppercase hover:bg-gray-400 mx-2"
            onClick={() => {
              setRunning(false);
              setTime(0);
            }}
          >
            Reset
          </button>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <button
          className="bg-red-500 text-white py-1 px-2 rounded font-semibold
          text-sm uppercase hover:bg-red-400 mt-4"
          onClick={() => handleDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ToDo;
