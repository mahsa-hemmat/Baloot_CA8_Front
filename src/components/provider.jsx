import React from 'react';
import ProductList from './products';
import { Footer, Default_Header } from './header';
import './../css/provider.css'

function ProviderInfo(){
    return(
        <div class="provider_info">
        <img src={require("../assets/spa.png")}/>
        <p>since 1987</p>
        <h1>Huawei</h1>
        </div>
    )
}

class Provider extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userEmail: "", password: "", pay:false, addCredit:false }
    }

    render() {
        return (
            <body>
                <Default_Header />
                <ProviderInfo/>
                <p class="title">All provided commodities</p>
                <ProductList products={[]}/>
                <Footer />
            </body>
        )
    }
}

export default Provider