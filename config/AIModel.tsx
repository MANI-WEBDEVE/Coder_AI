const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_CLIENT_ID;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const CodeGenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [],
});

export const GenAICode = model.startChat({
  generationConfig: CodeGenerationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: 'Generate a to do app: Create a React project with multiple components using Tailwind CSS for styling. Use icons from lucide-react and date-fns for date formatting. Return the response in JSON format with the following schema:\n{\n  "projectTitle": "",\n  "explanation": "",\n  "files": {\n    "/App.js": {\n      "code": ""\n    },\n    ...\n  },\n  "generatedFiles": []\n}\nInclude an explanation of the project\'s structure, purpose, and functionality in the explanation field.',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "projectTitle": "To-Do App",\n  "explanation": "This project implements a to-do application using React and Tailwind CSS, with date formatting using date-fns and icons from lucide-react. The application features task management with creation, editing, completion, and deletion functionalities.",\n  "files": {\n    "/App.js": {\n      "code": "import React from \'react\';\\nimport TaskList from \'./components/TaskList\';\\nimport Header from \'./components/Header\';\\nimport AddTask from \'./components/AddTask\';\\nimport { useState } from \'react\';\\n\\nfunction App() {\\n  const [tasks, setTasks] = useState([]);\\n  const addTask = (newTask) => {\\n    setTasks([...tasks, newTask]);\\n  };\\n  return (\\n    <div className=\'bg-gray-100 min-h-screen\'>\\n      <Header />\\n      <div className=\'container mx-auto p-4\'>\\n        <AddTask onAddTask={addTask} />\\n        <TaskList tasks={tasks} />\\n      </div>\\n    </div>\\n  );\\n}\\nexport default App;\\n",\n    },\n    "/components/Header.js": {\n      "code": "import React from \'react\';\\nimport { Home } from \'lucide-react\';\\n\\nfunction Header() {\\n  return (\\n    <header className=\'bg-blue-600 text-white p-4\'>\\n      <div className=\'container mx-auto flex justify-between\'>\\n        <div className=\'flex items-center\'>\\n          <Home className=\'mr-2\' />\\n          <h1>To-Do App</h1>\\n        </div>\\n      </div>\\n    </header>\\n  );\\n}\\nexport default Header;\\n",\n    },\n    "/components/TaskList.js": {\n      "code": "import React from \'react\';\\nimport { Trash, Edit } from \'lucide-react\';\\n\\nfunction TaskList({ tasks }) {\\n  return (\\n    <ul>\\n      {tasks.map((task) => (\\n        <li key={task.id} className=\'flex justify-between items-center p-2\'>\\n          <span>{task.text}</span>\\n          <div className=\'flex space-x-2\'>\\n            <button><Edit /></button>\\n            <button><Trash /></button>\\n          </div>\\n        </li>\\n      ))}\\n    </ul>\\n  );\\n}\\nexport default TaskList;\\n",\n    },\n    "/components/AddTask.js": {\n      "code": "import React, { useState } from \'react\';\\nimport { Plus } from \'lucide-react\';\\n\\nfunction AddTask({ onAddTask }) {\\n  const [taskText, setTaskText] = useState(\'\');\\n  const handleSubmit = (e) => {\\n    e.preventDefault();\\n    onAddTask({ id: Date.now(), text: taskText });\\n    setTaskText(\'\');\\n  };\\n  return (\\n    <form onSubmit={handleSubmit} className=\'flex space-x-2\'>\\n      <input\\n        type=\'text\'\\n        value={taskText}\\n        onChange={(e) => setTaskText(e.target.value)}\\n        className=\'border p-2 flex-grow\'\\n      />\\n      <button type=\'submit\' className=\'bg-blue-500 text-white p-2\'><Plus /></button>\\n    </form>\\n  );\\n}\\nexport default AddTask;\\n",\n    }\n  },\n  "generatedFiles": [\n    "/App.js",\n    "/components/Header.js",\n    "/components/TaskList.js",\n    "/components/AddTask.js"\n  ]\n}\n```',
        },
      ],
    },
  ],
});
// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
