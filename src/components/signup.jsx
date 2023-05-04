import React from 'react';
import { NoUserHeader } from './header';
import { Footer } from './header';
import './../css/login.css'

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userEmail: "", password: "" }

    }
    render() {
        return (
            <body>
                <NoUserHeader />
                <div class="login_signup_box shadow_box">
                    <h1 class="title">Sign Up</h1>
                    <p>Username</p>
                    <input />
                    <p>Email Address</p>
                    <input />
                    <p>Brith Date</p>
                    <input />
                    <p>Address</p>
                    <input />
                    <p>Password</p>
                    <input />
                    <button class="brown_button">Sign Up</button>
                    <p class="note">Already have an account? <a href="login">login</a> </p>
                </div>

                <Footer />

            </body>
        )
    }
}

export default Signup;
