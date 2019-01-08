import React, { Component } from 'react';
import  Login from './components/login';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from "react-router-dom";
import Review from './components/review';
import EditReview from './components/editReview';


const AppRouter = () => (
  <Router>
    <Switch>
      <Route path="/" component={Login} exact/>
      <Route path="/users/:id" component={Review}/>
      <Route path="/edit" component={EditReview} />
    </Switch>
  </Router>
)
  


export default AppRouter;
