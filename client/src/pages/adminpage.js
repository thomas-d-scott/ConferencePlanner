import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter} from 'react-router-dom';
import AddTag from '../components/admin/addtag';

/**
 * Used as a fake authenticator which if in production would make calls to db.
 * Gets the username and password provided and checks if they are valid. If they are is authenticated = true if not stays false.
 */
const auth = {

    isAuthenticated: false,
    authenticate(username, password, cb) {
        if (username === 'admin' && password === 'admin') {
            this.isAuthenticated = true
            setTimeout(cb, 100)
        }
    },
    signout(cb) {
      this.isAuthenticated = false
      setTimeout(cb, 100)
    }
  
  }
  
  // Button which will display as top of admin page upon login
  const AuthButton = withRouter(( {history} ) => (auth.isAuthenticated === true ? <button className="btn btn-lg btn-warning" onClick={() => {auth.signout(() => history.push('/'))}}>Logout</button> : ''))
  
  // Component to deal with loggin in
  class Login extends React.Component {
  
    // Sets up state for this component and default values.
    state = {
      redirectToReferrer: false,
      username: '',
      password: '',
      error: ''
    }
  
    // Checks if login details are empty, if they are an error will display, if not the data is authenticated
    login = (username, password) => {
        if (username === '' || password === '') {
            this.setState({error: 'Please enter username and password'})
        } else {
            auth.authenticate(username, password, () => {
                this.setState(() => ({
                redirectToReferrer: true
                }))
            })
        }
    }

    // Sets username state to the value in the text input box
    changeUsername = (e) => {
        this.setState({username:  e.target.value})
    }

    // Sets password state to data in password text box
    changePassword = (e) => {
        this.setState({password:  e.target.value})
    }
  
    render(){
  
      const { redirectToReferrer } = this.state
      const { from } = this.props.location.state || { from: { pathname: '/adminpage'}} // Sets up where to redirect
  
      // Checks if authenticated 
      if (redirectToReferrer === true) {
        return (
          <Redirect to={from} />
        )
      }
      
      /**
       * Returns the login page
       */
      return(
        <div className="container mt-3">
            <h2>Please Login Below to View this Content</h2>
            <p className="lead">Username: admin / Password: admin</p>
            {this.state.error !== '' ? <p className="bg-danger">{this.state.error}</p> : ''}
            <div className="input-group mb-2">
                <input type="text" name="username" id="username" className="form-control" placeholder='Enter Username Here...' onChange={this.changeUsername}/>
            </div>

            <div className="input-group mb-2">
                <input type="password" name="password" id="password" className="form-control" placeholder='Enter Password Here...' onChange={this.changePassword}/>
            </div>

            <div className="input-group mb-2">
                <button className="btn btn-info btn-block" type="submit" onClick={() => this.login(this.state.username, this.state.password)}>Login</button>
            </div>

        </div>

      )
    }
  }
  
  // Sets up a private route which checks if authenticated
  // If it is, then the Component passed into the PrivateRoute component is rendered, otherwise the user is redirected back
  const PrivateRoute = ({ component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
      auth.isAuthenticated === true ? <Component {...props} /> : <Redirect to={{pathname: '/login', state: { from: props.location }}} />
    )} />
  )

/**
 * Admin Page component which contains the login and add tag pages.
 */
export default class AdminPage extends Component {
    render() {
        return (
            <Router>
                <div className="container text-center mb-3">
                    <h1 className="mt-3">Admin Page    <AuthButton /></h1>
                    <hr className="my-4" />

                    <div className="row text-center">

                        <div className="col-12">

                            <Link to="/adminpage/addtag"><button className="btn btn-lg btn-danger mr-3 btn-block">Add Tag</button></Link>

                        </div>

                    </div>

                    <Route path='/login' component={Login} />
                    <PrivateRoute path='/adminpage/addtag' component={AddTag} />

                </div>
            </Router>
        )
    }
}
