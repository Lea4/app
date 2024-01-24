import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { EstablishmentDetailsPage } from "./components/EstablishmentDetailsPage";

import HomePage from "./components/HomePage";

function App(){
  return( 
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/details' element={<EstablishmentDetailsPage/>} />
    </Routes>
  </BrowserRouter>
  )
}

export default App;
