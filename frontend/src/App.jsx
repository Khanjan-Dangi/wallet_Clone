import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './components/Signup'
import Signin from './components/Signin'
import './index.css'
import Dashboard from './components/Dashboard'

function App() {

  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/signin' element={<Signin />}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
