import React from 'react';


function Logo() {
    return (
        <div className="logo">
            <a href="/">
                <img src={require("../assets/logo.png")} />
            </a>
            <p className="logo_name">Baloot</p>
        </div>
    )
}

function Home_Header(props) {
    return (
        <div className="header container-fluid">
            <Logo />
            <form className="header_search_bar">
                <div className="dropdown">
                    <button className="dropbtn dropdown-toggle" data-toggle="dropdown" type="button" /*onClick={props.handleDropdown}*/>{props.searchBy=="1"?"name":props.searchBy=="2"?"category":"provider"}</button>
                    <div className="dropdown_content">
                        <a href="#" className="dropdown-item" onClick={props.handleSearchByName}>name</a>
                        <a href="#" className="dropdown-item" onClick={props.handleSearchByCategory}>category</a>
                        <a href="#" className="dropdown-item" onClick={props.handleSearchByProvider}>provider</a>
                    </div>
                </div>
                <input type="text" onChange={props.handleSearchQuery} placeholder="search your product ..." />
                <div className="img_wrap"><img src="../../assets/search.png"/></div>
            </form>
            <UIn/>
        </div>
    );
}

class UIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username:"" ,data:[]}
        fetch("http://localhost:8080/user").then(res => res.json())
        .then(data => {
            this.setState({username:data.username})
         })
         fetch("http://localhost:8080/user/buylist").then(res => res.json())
        .then(data => {
            this.setState({data:data})
         })
    }

    render(){
        const cartClass=this.state.data.length>0?"brown_button":"cream_button";
        return(
            <div class="header_right">
                <a href="/user">
                <p>{this.state.username}</p>
                </a>
                <a class={cartClass} href="user">Cart {this.state.data.length}</a>
            </div>
        )
    }
}



export function Default_Header() {
    return (
        <div class="header container-fluid">
            <Logo /> 
            
                <UIn/>
        </div>
    )
}

export function NoUserHeader(){
    return(
        <div class="header container-fluid">
        <Logo/>
        <div class="header_right">
            <a class="cream_button" href="signup">Register</a>
            <a class="cream_button" href="login">Login</a>
        </div>
    </div>
    );
}

export function Footer() {
    return (
        <div class="footer container-fluid">
            <p>2023 @UT</p>
        </div>
    );
}

export default Home_Header;