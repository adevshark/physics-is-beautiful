import React from 'react'
import { Route, Switch } from 'react-router'
import { IndexView, AddResourceView, ResourceView } from './containers'
import { BASE_URL } from './utils/config'

export default(
  <Switch>
    <Route exact path={BASE_URL} component={IndexView} />
    <Route exact path={BASE_URL + 'add/'} component={AddResourceView} />
    <Route exact path={BASE_URL + '/resource/:resourceUuid/'} component={ResourceView} />
    {/* <Route path='*' component={NotFoundView} /> */}
  </Switch>
)
