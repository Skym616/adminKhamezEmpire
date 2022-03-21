import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import theme from './theme/index';
import './styles/style.css';
import { ThemeProvider } from '@mui/material';
import Layout from './Components/Layout';
import GestionProduct from './Pages/GestionProduct';
import AddProduct from './Pages/AddProduct';
import GestionCommande from './Pages/GestionCommande';
import UpdateProduct from './Pages/UpdateProduct';
import Message from './Pages/Message';
import DetailProduct from './Pages/DetailProduct';
import { ConfirmProvider } from 'material-ui-confirm';
import { AuthContextProvider } from './Contexts/AuthContext';
import PrivateRoute from './PrivateRoute';
import LoginRoute from './LoginRoute';

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ConfirmProvider>
          <AuthContextProvider>
            <Routes>
              <Route exact path='/login' element={<LoginRoute><Login /></LoginRoute>} />
              <Route path='/admin/*' element={<PrivateRoute><Layout /></PrivateRoute>}>
                <Route exact path='products' element={<PrivateRoute><GestionProduct /></PrivateRoute>} />
                <Route exact path='products/add-product' element={<PrivateRoute><AddProduct /> </PrivateRoute>} />
                <Route exact path='products/update-product/:idProduct'
                       element={<PrivateRoute> <UpdateProduct /> </PrivateRoute>} />
                <Route exact path='products/detail-product/:idProduct'
                       element={<PrivateRoute> <DetailProduct /> </PrivateRoute>} />
                <Route exact path='commande' element={<PrivateRoute><GestionCommande /> </PrivateRoute>} />
                <Route exact path='message' element={<PrivateRoute><Message /></PrivateRoute>} />
              </Route>
              <Route path='*' element={<LoginRoute><Login /> </LoginRoute>} />
            </Routes>
          </AuthContextProvider>
        </ConfirmProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
;
