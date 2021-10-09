
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import UserComponent from './components/UserComponent';
import CreateUserComponent from './components/CreateUserComponent';
import HeaderComponent from './components/HeaderComonent';
import FooterComponent from './components/FooterComponent';
import ItemComponent from './components/ItemComponent';
import CategoryComponent from './components/CategoryComponent';
import HomeComponent from './components/HomeComponent';

function App() {
  return (
    <div>
        <Router>
          <HeaderComponent />
           <div className = "container">
             <Switch> 
               <Route path="/" exact component={HomeComponent}></Route>
               <Route path="/users" component={UserComponent}></Route>
             // step 1
              <Route path="/add-user/:id" component={CreateUserComponent}></Route>
               <Route path="/items" component={ItemComponent}></Route>
               <Route path="/categories" component={CategoryComponent}></Route>
              </Switch>
             </div>
             <FooterComponent />
        </Router>
    </div>
  );
}

export default App;
