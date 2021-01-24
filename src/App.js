import { Switch, Route } from 'react-router-dom'
import HomeScreen from '../src/Pages/HomeScreen'

const App = () => {
  return (
    <>
      <Switch>
        <Route path='/' exact component={HomeScreen}></Route>
      </Switch>
    </>
  )
}

export default App

