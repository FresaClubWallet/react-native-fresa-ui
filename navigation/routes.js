import React, { useContext } from 'react';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';
import AppContext from '../components/AppContext'

const Routes = () => {
  const { connector } = useContext(AppContext);

  return connector.connected ? <AppRoutes /> : <AuthRoutes />
}

export default Routes;