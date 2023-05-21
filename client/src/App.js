import { useLocation } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import { Landing, Detail, Form, Home } from './views'
import { Route } from "react-router-dom"
import style from './App.module.css'

function App() {
  const location = useLocation()
 

  return (

    

    <div className={style.app}>
      
     
      {/* <h1>Henry Countries</h1> */}
      {location.pathname !== '/' && <NavBar />}
      <Route exact path= '/' render ={() => <Landing />} />
      <Route path='/home' render = {() => <Home />} />
      <Route path= '/detail/:id' render ={() => <Detail />} />
      <Route path= '/create' render ={() => <Form />} />
    </div>
  );
}

export default App;
