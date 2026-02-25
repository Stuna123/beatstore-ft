import { Header } from "./components/layout"
import { Footer } from "./components/layout";
import ScrollTopButton from "./components/layout/ScrollTopButton.jsx";


import AppRoutes from './routes/AppRoutes';

// import './App.css'; No need

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 text-black dark:text-white">
      <Header />      
      <ScrollTopButton />
      <main className="flex-1">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  )
}

export default App
