import { useState } from "react";
import AddTask from "./Components/AddTask";
import ToDo from "./Components/ToDo";

function App() {
  const [taskList, setTaskList] = useState([]);
  return (
    <>
      <h1 className="text-2xl font-bold py-4 pl-6">03 - Task tracker</h1>
      <p className="text-xl pl-6">Hi There!</p>
      <div className="flex flex-row items-center">
        <p className="text-xl pl-6">Click</p>
        <AddTask taskList={taskList} setTaskList={setTaskList} />
        <p className="text-xl my-2">to add new task</p>
      </div>
      <div>
        <h2 className="ml-6 my-4 text-xl w-3/4 max-w-lg bg-gray-300 py-2 px-4 font-semibold">
          To Do:
        </h2>
        {taskList.map((task, i) => (
          <>
            <ToDo
              key={i}
              task={task}
              index={i}
              taskList={taskList}
              setTaskList={setTaskList}
            />
          </>
        ))}
      </div>
    </>
  );
}

export default App;
