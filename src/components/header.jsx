function Logo() {
    return (
        <div class="logo">
            <img src={require("../assets/logo.png")} />
            <p href="#default" class="logo_name">Baloot</p>
        </div>
    )
}

function Home_Header() {
    return (
        <div class="header container-fluid">
            <Logo />
            <div class="header_search_bar">
                <div class="dropdown">
                    <button class="dropbtn dropdown-toggle" data-toggle="dropdown" type="button">name</button>
                    <div class="dropdown-menu">
                        <a href="#" class="dropdown-item">name</a>
                        <a href="#" class="dropdown-item">category</a>
                    </div>
                </div>
                <input type="text" placeholder="search your product ..." />
                <div class="img_wrap"><img src="../../assets/search.png" /></div>
            </div>
            <div class="header_right">
            <p>#username</p>
                <a class="brown_button" href="#contact">Cart 5</a>
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