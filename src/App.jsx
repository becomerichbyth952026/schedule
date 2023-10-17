
import './App.css';
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { fetchSchedule,getCourseNumber,terms,hasConflict,toggle,addScheduleTimes } from './utilities/times.js';
import { useData } from './utilities/firebase';
import { CourseList } from './components/Course/CourseList';
import { BrowserRouter, Routes, Route,} from "react-router-dom";
import EditForm from './components/EditForm.jsx';
import { useNavigate } from 'react-router-dom';


const App = () => {
  




  const Banner = props => (
    <h1>{props.title}</h1>
  )
  


  const Main = () =>  {

    const [schedule, loading, error] = useData('/schedule', addScheduleTimes);
    
    if (error) return <h1>{error}</h1>;
    if (loading) return <h1>Loading the schedule...</h1>
    console.log(schedule)
    return (
      <div className="container">
        <Banner title={ schedule.title } />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<CourseList courses={ schedule.courses } />} />
            <Route path="/edit" element={ <EditForm /> } />
          </Routes>
        </BrowserRouter>
      </div>
    );
  };
  
  const queryClient = new QueryClient();
  
  <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>


    return (
     
        <QueryClientProvider client={queryClient}>
          <Main />
        </QueryClientProvider>
      );
  


};



export default App;
