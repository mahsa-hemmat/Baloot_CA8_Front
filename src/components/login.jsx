import React from 'react';
import { NoUserHeader } from './header';
import { Footer } from './header';
import './../css/login.css'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userEmail: "", password: "" }

    }
    render() {
        return (
            <body>
                <NoUserHeader />
                <div class="login_signup_box shadow_box">

                    <h1 class="title">Login</h1>
                    <p>Username</p>
                    <input />
                    <p>Password</p>
                    <input />
                    <button class="brown_button">Login</button>
                    <p class="note">Don't have an account? <a href="signup">sign up</a> </p>
                </div>
                <Footer />

            </body>
        )
    }
}

export default Login;
