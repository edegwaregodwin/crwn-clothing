import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInandSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { authOnSnapshot, authOnAuthStateChanged, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = () => {
      authOnAuthStateChanged(async (userAuth) => {
        if (userAuth) {
          const userRef = await createUserProfileDocument(userAuth);

          authOnSnapshot(userRef, (snapShot) => {
            setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            });
          });
        }

        setCurrentUser(userAuth);
      })
    }
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route path='/shop' element={<ShopPage />} />
          <Route path='/signin' element={<SignInandSignUpPage />} />
        </Routes>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App);
