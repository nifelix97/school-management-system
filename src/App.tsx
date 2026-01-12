import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TranslationProvider } from './components/TranslationProvider';
import AppRoutes from './routes/AppRoutes';


function App() {

  return (
    <>
      <TranslationProvider originalLang="en">
      <AppRoutes/>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      </TranslationProvider>
    </>
  )
}

export default App

