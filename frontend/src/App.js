import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Article from "./components/Article";
import ArticleList from "./components/ArticleList";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./components/UserList";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col col-lg-12 mt-5">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/add-article" exact component={Article} />
              <Route path="/edit/:id" exact component={Article} />
              <Route path="/articles" exact component={ArticleList} />
              <Route path="/users" exact component={UserList} />
              <Route path="/login" exact component={() => <Login />} />
              <Route path="/register" exact component={Register} />
            </Switch>
          </div>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
