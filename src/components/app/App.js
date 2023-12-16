import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../widgets/spiner/Spiner";

const Page404 = lazy(() => import('../Pages/404'))
const Main = lazy(() => import('../Pages/Main'))
const Comics = lazy(() => import('../Pages/Comics'))
const SingleCharacterLayout = lazy(() => import('../Pages/SingleCharacterLayout/SingleCharacterLayout'))
const SingleComicLayout = lazy(() => import('../Pages/SingleComicLayout/SingleComicLayout'))
const SinglePage = lazy(() => import('../Pages/SinglePage'))


const App = () => {

  return (
      <Router>
        <div className="app">
          <AppHeader/>
          <main>
            <Suspense fallback={<Spinner/>}>
              <Switch>
                <Route exact path="/">
                  <Main/>
                </Route>
                <Route exact path ="/comics">
                  <Comics/>  
                </Route>
                <Route exact path="/comics/:id">
                  <SinglePage Component={SingleComicLayout} dataType='comic'/>
                </Route>
                <Route exact path="/characters/:id">
                  <SinglePage Component={SingleCharacterLayout} dataType='character'/>
                </Route>
                <Route path='*'>
                  <Page404/>
                </Route>
              </Switch>
            </Suspense>
          </main>
        </div>
      </Router>
  )

}

export default App;