import React from 'react';
import Home_Header from './header';
import ProductList from './products';
import { Footer } from './header';
import './../css/home.css'

function Search_Bar() {
    return (
        <div class="search_bar shadow_box">
            <div class="search_bar_left">
                <p>Available commodities</p>
                <label class="switch">
                    <input type="checkbox" a />
                    <span class="slider round"></span>
                </label>
            </div>
            <div class="search_bar_right">
                <button href="#name">name</button>
                <button href="#price">price</button>
            </div>
        </div>
    );
}

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { products: [], sortBy: "", searchBy:"", searchText:"", availableOnly:false }

    }
    render() {
        return (
            <body>
                <Home_Header />
                <div class="home">
                    <Search_Bar/>
                    <ProductList products={this.state.products}/>
                </div>
                <Footer/>
                
            </body>
        )
    }
}

export default Home;
