import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  Login,
  Search,
  Album,
  Favorites,
  Profile,
  ProfileEdit,
  NotFound,
} from '../pages';

export default function Routes() {
  return (
    <Switch>
      <Route path="/album/:id" render={ (props) => <Album { ...props } /> } />
      <Route path="/profile/edit" component={ ProfileEdit } />
      <Route path="/profile" component={ Profile } />
      <Route path="/favorites" component={ Favorites } />
      <Route path="/search" component={ Search } />
      <Route exact path="/" component={ Login } />
      <Route path="*" component={ NotFound } />
    </Switch>
  );
}
