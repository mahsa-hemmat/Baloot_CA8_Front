import React from 'react';
import { NoUserHeader } from './header';
import { Footer } from './header';
import './../css/login.css'
import { toast } from 'react-toastify';


class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password: "" , email: "", birthDate: "", address: ""}
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
        if(!this.state.username){
            console.log('empty username')
            toast.error('username cannot be empty')
            return
        }
        if(!this.state.email){
            console.log('empty email')
            toast.error('email cannot be empty')
            return
        }
        if(!this.state.birthDate){
            console.log('empty birth date')
            toast.error('birth date cannot be empty')
            return
        }
        if(!this.state.address){
            console.log('empty address')
            toast.error('address cannot be empty')
            return
        }
        if(!this.state.password){
            console.log('empty password')
            toast.error('password cannot be empty')
            return
        }
        const requestBody = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            birthDate: this.birthDate,
            address: this.address,
        };
        fetch("http://localhost:8080/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        }).then(response => {
            if (response.ok) {
                window.location.href = "http://localhost:3000/login"
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
                    <h1 className="title">Sign Up</h1>
                    <p>Username</p>
                    <input type="text" name="username" value={this.state.username} onChange={this.onInputChange} required=""/>
                    <p>Email Address</p>
                    <input type="text" name="email" value={this.state.email} onChange={this.onInputChange}/>
                    <p>Brith Date</p>
                    <input type="text" name="birthDate" value={this.state.birthDate} onChange={this.onInputChange}/>
                    <p>Address</p>
                    <input type="text" name="address" value={this.state.address} onChange={this.onInputChange}/>
                    <p>Password</p>
                    <input type="text" name="password" value={this.state.password} onChange={this.onInputChange} required=""/>
                    <button className="brown_button" onClick={this.handleSubmit}>Sign Up</button>
                    <p className="note">Already have an account? <a href="login">login</a> </p>
                </div>

                <Footer />

            </body>
        )
    }
}

export default Signup;
