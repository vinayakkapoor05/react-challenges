import { Link, useNavigate} from '@tanstack/react-router';
import { useForm, type SubmitHandler } from 'react-hook-form';
import {courseResolver, type Course } from '../types/courses';
import { updateDoc, doc } from 'firebase/firestore';
import { firestore } from '../utilities/firebase';


interface CourseEditorProps {
    course: Course;
    courseId: string;
}


const CourseEditor = ({course, courseId}: CourseEditorProps ) => {
  const navigate = useNavigate();

    const {
      register,
      handleSubmit,
      formState: { errors, isValid, isDirty, isSubmitting },
    } = useForm<Course>({
      resolver: courseResolver,
      defaultValues: course,
      mode: 'onChange',
    });
      const onSubmit : SubmitHandler<Course> = async (data) => {
        if (!isValid || !isDirty || isSubmitting) { 
          return;
        }
        await updateDoc(doc(firestore, 'courses', 'CS-2018-2019'), {
          [`courses.${courseId}`]: data,
        });
        await navigate({ to: '/' });
      };

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
        <button
          type="submit"
          disabled={!isValid || !isDirty || isSubmitting}
          className={`ml-4 rounded-lg px-5 py-2 font-semibold text-white
                      ${!isValid || !isDirty || isSubmitting ? 'bg-gray-400' : 'bg-blue-500'}
                      transition-colors`}
        >
          Save Changes
        </button>
      </div>
    
    </form>
  </div>
)}  

export default CourseEditor;