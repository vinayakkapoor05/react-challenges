import './App.css';
import TermPage from './components/TermPage';
import Title from './components/Title';
import { useDataQuery } from './utilities/firebase';
import { useParams } from '@tanstack/react-router';
import CourseEditor from './components/CourseEditor';


interface Course {
  term: string;
  number: string;
  meets: string;
  title: string;
}

interface Schedule {
  title: string;
  courses: {
    [key: string]: Course;
  };
}

  const App = () => 
    {
      const [data, isLoading, error] = useDataQuery('courses/CS-2018-2019');
      const { id } = useParams({ strict: false });

      if (error) return <h1>Error loading course data: {`${error}`}</h1>;
      if (isLoading) return <h1>Loading course data...</h1>;
      if (!data) return <h1>No course data found</h1>;

      const schedules = data as Schedule;

      if (id) {
        const course = schedules.courses[id];
        if (!course) return <p>oops no course found</p>;
        return <CourseEditor course={course} />;
      }
      return (
       <div>
        <Title title={schedules.title} />
        <TermPage courses={schedules.courses} />
      </div>
      )
    };

  export default App;