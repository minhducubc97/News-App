import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import SaveArticle from "./components/SaveArticle";
import ArticleList from "./components/ArticleList";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./components/UserList";
import Login from "./components/Login";
import Register from "./components/Register";
import ViewArticle from "./components/ViewArticle";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col col-lg-12 mt-5">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/add-article" exact component={SaveArticle} />
              <Route path="/edit-article/:id" exact component={SaveArticle} />
              <Route path="/view-article/:id" exact component={ViewArticle} />
              <Route path="/articles" exact component={ArticleList} />
              <Route path="/users" exact component={UserList} />
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <Route path="/logout" exact component={Login} />
            </Switch>
          </div>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
