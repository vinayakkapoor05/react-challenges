import { Link } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import {courseResolver, type Course } from '../types/courses';

interface CourseEditorProps {
    course: Course;
}

const CourseEditor = ({course}: CourseEditorProps ) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<Course>({
      resolver: courseResolver,
      defaultValues: course,
      mode: 'onChange',
    });
    const onSubmit = (_data: Course) => {
    
    }

return (
  <div className="max-w-xl mx-auto mt-10 px-4">
    <form
      onSubmit={handleSubmit(onSubmit)}
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
          {...register('title')}
          className={`w-full rounded-lg border-2 px-4 py-3
                      text-gray-800 ${errors.title ? 'border-red-500' : 'border-gray-200'}`}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>
      <div className="mb-5">
        <label
          htmlFor="term"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Term
        </label>
        <input
          id="term"
          type="text"
          {...register('term')}
          className={`w-full rounded-lg border-2 px-4 py-3
                      text-gray-800 ${errors.term ? 'border-red-500' : 'border-gray-200'}`}
        />
        {errors.term && (
          <p className="text-red-500 text-sm mt-1">{errors.term.message}</p>
        )}
      </div>
      <div className="mb-5">
        <label
          htmlFor="number"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Course Number
        </label>
        <input
          id="number"
          type="text"
          {...register('number')}
          className={`w-full rounded-lg border-2 px-4 py-3
                      text-gray-800 ${errors.number ? 'border-red-500' : 'border-gray-200'}`}

        />
        {errors.number && (
          <p className="text-red-500 text-sm mt-1">{errors.number.message}</p>
        )}
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
          {...register('meets')}
          className={`w-full rounded-lg border-2 px-4 py-3
                      text-gray-800 ${errors.meets ? 'border-red-500' : 'border-gray-200'}`}
        />
        {errors.meets && (
          <p className="text-red-500 text-sm mt-1">{errors.meets.message}</p>
        )}
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