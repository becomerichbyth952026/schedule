import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { fetchSchedule,getCourseNumber,terms,hasConflict,toggle } from './utilities/times.js';

import { CourseList } from './components/Course/CourseList';

const App = () => {
  
  



  const Banner = props => (
    <h1>{props.title}</h1>
  )
  
 


  

 
  
  
  
  
  

  

  


 



  const Main = () =>  {
    const { data: schedule, isLoading, error } = useQuery('schedule', fetchSchedule);
    
    if (error) return <h1>{error}</h1>;
    if (isLoading) return <h1>Loading the schedule...</h1>
  
    return (
      <div className="container">
        <Banner title={ schedule.title } />
        <CourseList courses={ schedule.courses } />
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
