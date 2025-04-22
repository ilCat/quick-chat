import './App.css'
import ChatWindow from './pages/chat-window/ChatWindow'
import Login from './pages/login'
import { Route, Routes } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'



function App() {
 
  return (
    <>
    <AuthContextProvider>
    <Routes>
    <Route
      path="/"
      element={ <Login />}
    />
    <Route
      path="/chat"
      element={<ChatWindow />}
    />
    <Route path="*" element={<div>"Hmm...this page doesn’t exist."</div> } />
  </Routes>
  </AuthContextProvider>
  </>
  )
}

export default App








