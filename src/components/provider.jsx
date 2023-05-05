import React from 'react';
import ProductList from './products';
import { Footer, Default_Header } from './header';
import './../css/provider.css'

function ProviderInfo(props){
    return(
        <div class="provider_info">
        <img src={props.providerInfo.image}/>
        <p>since {props.providerInfo.registryDate}</p>
        <h1>{props.providerInfo.name}</h1>
        </div>
    )
}

class Provider extends React.Component {
    constructor(props) {
        super(props);
        this.state = { providerInfo:{} , id:"" ,products:[]}
        console.log(fetch("http://localhost:8080/providers/"+props.param.id+"/commodities"))
        this.setState({id:props.param.id})
        fetch("http://localhost:8080/providers/"+props.param.id).then(res => res.json())
        .then(data => {
          this.setState({providerInfo:data})
         })
        fetch("http://localhost:8080/providers/"+props.param.id+"/commodities").then(res => res.json())
        .then(data => {
          this.setState({products:data})
         })
    }

    render() {
        return (
            <body>
                <Default_Header />
                <ProviderInfo providerInfo={this.state.providerInfo}/>
                <p class="title">All provided commodities</p>
                <ProductList products={this.state.products}/>
                <Footer />
            </body>
        )
    }
}

export default Provider