import './App.css'
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom'
import Register from './register_login'
import Home from './Home'


function App() {


  return (
    <>
     <Router>
      <Routes>
        <Route path='/' element={<Register/>} />
        <Route path='/Home' element={<Home/>}/>
      </Routes>
     </Router>
    </>
  )
}

export default App
