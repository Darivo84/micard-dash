import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './layouts/Navbar';
import Login from './authentication/Login';
import SignUp from './authentication/SignUp';
import Dashboard from './data/Dashboard';

function App() {
  const [user, setUser] = useState('');
  const [toggleForm, setToggleForm] = useState(true);
  const formMode = () => {
    setToggleForm(!toggleForm);
  };
  const userState = () => {
    const data = localStorage.getItem('user');
    const us = data !== null ? JSON.parse(data) : null;
    setUser(us);
  };

  useEffect(() => {
    userState();
  }, []);

  return (
    <div
    // style={{
    //   background: 'linear-gradient(45deg, #733BC3 30%, #C64156 90%)',
    //   minHeight: '100vh',
    //   display: 'flex',
    //   flexDirection: 'column',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    // }}
    >
      {user !== null ? (
        <>
          {/* <Navbar /> */}
          <Dashboard setUserState={() => setUser(null)} />
        </>
      ) : (
        <>
          {toggleForm ? (
            <Login
              loggedIn={(user) => setUser(user)}
              toggle={() => formMode()}
            />
          ) : (
            <SignUp toggle={() => formMode()} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
