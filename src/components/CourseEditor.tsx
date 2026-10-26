import { Link } from '@tanstack/react-router';
import { useState } from 'react';
interface CourseEditorProps {
    course: {
        title: string;
        meets: string;
    };
}

const CourseEditor = ({course}: CourseEditorProps ) => {
    const [title, setTitle] = useState(course.title);
    const [meets, setMeets] = useState(course.meets);
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }


return (
  <div className="max-w-xl mx-auto mt-10 px-4">
    <form
      onSubmit={onSubmit}
      className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-sm"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Edit Course
      </h2>

      <div className="mb-5">
        <label
          htmlFor="title"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Course Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border-2 border-gray-200 px-4 py-3
                     text-gray-800 outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="meets"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Meeting Times
        </label>
        <input
          id="meets"
          type="text"
          value={meets}
          onChange={(e) => setMeets(e.target.value)}
          className="w-full rounded-lg border-2 border-gray-200 px-4 py-3
                     text-gray-800 outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex justify-end border-t border-gray-200 pt-4">
        <Link
          to="/"
          className="rounded-lg border-2 border-gray-300 px-5 py-2
                     font-semibold text-gray-700 hover:bg-gray-100
                     transition-colors"
        >
          Cancel
        </Link>
      </div>
    </form>
  </div>
)}  

export default CourseEditor;