import React from 'react';
import { NoUserHeader } from './header';
import { Footer } from './header';
import './../css/login.css'
import { toast } from 'react-toastify';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password: ""}
        this.onInputChange = this.onInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    onInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({ [name]: value });
    }
    handleSubmit = (event) => {
        event.preventDefault();

        const requestBody = {
            username: this.state.username,
            password: this.state.password,
        };
        fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        }).then(response => {
            if (response.ok) {
                window.location.href = "http://localhost:3000/"
            } else {
                response.text().then(errorMessage => {
                    toast.error(errorMessage);
                });
            }
        }).catch(error => {
            console.error(error);
        });
    };

    render() {
        return (
            <body>
                <NoUserHeader />
                <div className="login_signup_box shadow_box">

                    <h1 className="title">Login</h1>
                    <p>Username</p>
                    <input type="text" name="username" value={this.state.username} onChange={this.onInputChange}/>
                    <p>Password</p>
                    <input type="text" name="password" value={this.state.password} onChange={this.onInputChange}/>
                    <button className="brown_button" onClick={this.handleSubmit}>Login</button>
                    <p className="note">Don't have an account? <a href="signup">sign up</a> </p>
                </div>
                <Footer />

            </body>
        )
    }
}

export default Login;
