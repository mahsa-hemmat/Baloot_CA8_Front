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
            <div className="header_right">
                <a href="/user">
                    <p>#username</p>
                </a>
                <a className="brown_button" href="/user">Cart 5</a>
            </div>
        </div>
    );
}

export function Default_Header() {
    return (
        <div class="header container-fluid">
            <Logo /> 
            <div class="header_right">
                <p>#username</p>
                <a class="brown_button" href="user">Cart 5</a>
            </div>
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