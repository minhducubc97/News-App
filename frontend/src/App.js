import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Article from "./components/Article";
import ArticleList from "./components/ArticleList";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
              <Route path="/articles" exact component={ArticleList} />
            </Switch>
          </div>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
