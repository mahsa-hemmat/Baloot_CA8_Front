import React from 'react';
import { toast } from 'react-toastify';

function sendToken(token){
    fetch("http://localhost:8080/auth/callback?code="+token, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(response => {
            if (response.ok) {
                return response.json()
                window.location.href = "http://localhost:3000/"
            } else {
                response.text().then(errorMessage => {
                    toast.error(errorMessage);
                });
            }
        }).then(token=>{
            console.log("here")
            console.log(token)
            localStorage.setItem('jwt', token.jwt)
        }).catch(error => {
            console.error(error);
        });
}


class Callback extends React.Component {
    constructor(props) {
        super(props);
        var url = window.location.href;
        var splitted_url = url.split("?");
        if (splitted_url.length != 2) {
            window.location.replace("http://localhost:3000/login");
            return;
        }
        var values = splitted_url[1].split("=");
        if (values.length != 2) {
            window.location.replace("http://localhost:3000/login");
            return;
        }
        sendToken(values[1]);

    }

    render() {
        return;
    }
}

export default Callback;