import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom';
import HeaderComponent from './component/HeaderComponent';
import FooterComponent from './component/FooterComponent';
import CreateStudentComponent from './component/CreateStudentComponent';
import ListStudentComponent from './component/ListStudentComponent';
import ListDriverComponent from'./component/ListDriverComponents';
import CreateDriverComponent from'./component/CreateDrivercomponent';
import ListParentComponent from './component/ListParentComponent';
import CreateParentComponent from './component/CreateParentComponent';

function App() {
  return (

    <div>
      <Router>
        <div className=''>
            <HeaderComponent/>
               <div className="container">
                 <Switch>
                    <Route path='/' exact component = {ListStudentComponent}></Route>
                    <Route path='/students' component = {ListStudentComponent}></Route>
                    <Route path='/add-student' component = {CreateStudentComponent}></Route>
                    <Route path='/driver' component = {ListDriverComponent}></Route>
                    <Route path='/add-driver' component = {CreateDriverComponent}></Route>
                    <Route path='/parent' component = {ListParentComponent}></Route>
                    <Route path='/add-parent' component = {CreateParentComponent}></Route>
                 </Switch>
                </div>
            <FooterComponent/>

        </div>
      </Router>
    </div>

  );
}

export default App;
