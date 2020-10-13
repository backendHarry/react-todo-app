import React, { useState, useEffect } from "react";
import Header from "./components/header";
import Signup from "./components/accounts/signup";
import Login from "./components/accounts/login";
import Loader from "./components/loader";
import Home from './components/home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const wait = async (milliseconds = 2000) => {
    await sleep(milliseconds);
    setLoader(false);
  };

  useEffect(() => {
    wait(1000);
  }, []);

  const [loading, setLoader] = useState(true);
  if (loading) return <Loader />;

  return (
    <Router>
      <React.Fragment>
        <Header />
        <Switch>
          <Route path="/signup">
            <Signup/>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </React.Fragment>
    </Router>
  );
}

export default App;

// import React from 'react';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
//   useRouteMatch,
//   useParams
// } from 'react-router-dom';



// export default function App(){
//   return (
//     <Router>
//       <div>
//         <ul>
//           <li>
//             <Link to ='/'>Home</Link>
//           </li>
//           <li>
//             <Link to ='/about'>About</Link>
//           </li>
//           <li>
//             <Link to ='/topics'>Topics</Link>
//           </li>
//         </ul>

//         <Switch>
//           <Route path='/about'>
//             <About />
//           </Route>
//           <Route path='/topics'>
//             <Topics />
//           </Route>
//           <Route path='/'>
//             <Home />
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   )
// }


// function Home() {
//   return <h1>home</h1>
// }

// function About() {
//   return <h1>About</h1>
// }

// function Topics() {
//   let match = useRouteMatch();
//   console.log(match)
  
//   return (
//     <div>
//       <h1>topics</h1>


//       <ul>
//           <li>
//             <Link to ={`${match.url}/components`}>components</Link>
//           </li>
//           <li>
//           <Link to ={`${match.url}/props-v-state`}>props-v-state</Link>
//           </li>
//         </ul>

//         <Switch>
//           <Route path={`${match.url}/:topicId`}><Topic /></Route>
//           <Route path={match.path}> <h1>select a topic</h1></Route>
//         </Switch>
//     </div>
//   )
// }

// function Topic() {
//   let {topicId} = useParams();
//   console.log('params', topicId)
//   return <h3>Requested topic ID: {topicId} </h3>
// }