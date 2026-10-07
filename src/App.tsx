import './App.css';
import CourseList from './components/CourseList';
import Title from './components/Title';
import { useJsonQuery } from './utilities/fetch';  

  const App = () => 
    {
      const [json, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses-firestore.php');
      
      if (error) return <h1>Error loading course data: {`${error}`}</h1>;
      if (isLoading) return <h1>Loading course data...</h1>;
      if (!json) return <h1>No course data found</h1>;

      const courseData = json as {
        schedules: {
        "CS-2018-2019": {
          title: string;
          courses: {
            [key: string]: {
              term: string;
              number: string;
              meets: string;
              title: string;
            };
          };
          };
        };
      }

      const schedules = courseData.schedules["CS-2018-2019"];
      return (
       <div>
        <Title title={schedules.title} />
        <CourseList courses={schedules.courses} />
      </div>
      )
    };

  export default App;