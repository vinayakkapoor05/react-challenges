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
  <div className="mx-auto my-6 w-full max-w-xl px-4 sm:my-10">
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-divider bg-panel p-5 shadow-sm sm:p-8"
    >
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-ink">
        Edit Course
      </h2>

      <div className="mb-5">
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-semibold text-ink"
        >
          Course Title
        </label>
        <input
          id="title"
          type="text"
          {...register('title')}
          className={`w-full rounded-lg border bg-panel px-3 py-2.5 text-base text-ink shadow-sm sm:text-sm ${errors.title ? 'border-error' : 'border-control hover:border-muted'}`}
        />
        {errors.title && (
          <p className="mt-2 text-sm text-error">{errors.title.message}</p>
        )}
      </div>
      <div className="mb-5">
        <label
          htmlFor="term"
          className="mb-2 block text-sm font-semibold text-ink"
        >
          Term
        </label>
        <input
          id="term"
          type="text"
          {...register('term')}
          className={`w-full rounded-lg border bg-panel px-3 py-2.5 text-base text-ink shadow-sm sm:text-sm ${errors.term ? 'border-error' : 'border-control hover:border-muted'}`}
        />
        {errors.term && (
          <p className="mt-2 text-sm text-error">{errors.term.message}</p>
        )}
      </div>
      <div className="mb-5">
        <label
          htmlFor="number"
          className="mb-2 block text-sm font-semibold text-ink"
        >
          Course Number
        </label>
        <input
          id="number"
          type="text"
          {...register('number')}
          className={`w-full rounded-lg border bg-panel px-3 py-2.5 text-base text-ink shadow-sm sm:text-sm ${errors.number ? 'border-error' : 'border-control hover:border-muted'}`}

        />
        {errors.number && (
          <p className="mt-2 text-sm text-error">{errors.number.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="meets"
          className="mb-2 block text-sm font-semibold text-ink"
        >
          Meeting Times
        </label>
        <input
          id="meets"
          type="text"
          {...register('meets')}
          className={`w-full rounded-lg border bg-panel px-3 py-2.5 text-base text-ink shadow-sm sm:text-sm ${errors.meets ? 'border-error' : 'border-control hover:border-muted'}`}
        />
        {errors.meets && (
          <p className="mt-2 text-sm text-error">{errors.meets.message}</p>
        )}
      </div>

      <div className="flex flex-wrap justify-end gap-3 border-t border-divider pt-5">
        <Link
          to="/"
          className="rounded-lg border border-control bg-panel px-4 py-2.5 text-sm font-semibold text-ink hover:border-muted hover:bg-raised"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={!isValid || !isDirty || isSubmitting}
          className={`rounded-lg px-4 py-2.5 text-sm font-semibold
                      ${!isValid || !isDirty || isSubmitting ? 'cursor-not-allowed bg-raised text-muted' : 'bg-accent text-on-accent shadow-sm hover:bg-accent-hover'}`}
        >
          Save Changes
        </button>
      </div>
    
    </form>
  </div>
)}  

export default CourseEditor;
