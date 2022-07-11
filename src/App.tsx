import { Fragment } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Login from './auth/Login';
import SignUp from './auth/SignUp';
import ExpensesPage from './pages/ExpensesPage';

export default function App() {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route path="/" element={<Navigate to="/auth/login" />} />
          <Route path="auth/login" element={<Login />}></Route>
          <Route path="auth/signUp" element={<SignUp />}></Route>
          <Route path="expenses/:yearMonth" element={<ExpensesPage />}></Route>
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
}
