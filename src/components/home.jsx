import React from 'react';
import Home_Header from './header';
import ProductList from './products';
import { Footer } from './header';
import '../css/home.css'
import {toast} from "react-toastify";

function Search_Bar(props) {
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
                <button href="#name" onClick={props.handleSortByName}>name</button>
                <button href="#price" onClick={props.handleSortByPrice}>price</button>
            </div>
        </div>
    );
}

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { products: [], sortBy: "name", searchBy:"1", searchText:"", search:false , availableOnly:false, page:1 }
        this.getdata();
    }

    getdata=()=>{
        var searchType=(this.state.search==false)?"":"&searchType="+this.state.searchBy;
        var keyword=(this.state.search==false)?"":"&keyword="+this.state.searchText;
        var sortType=(this.state.sortBy=="")?"":"sortType="+this.state.sortBy;
        var obj;
        fetch("http://localhost:8080/commodities?"+sortType+keyword+searchType).then(res => {
            if (!res.ok) {
                res.text().then(errorMessage => {
                    toast.error(errorMessage);
                });
            }
            return res.json();
        })
            .then(data => {
                this.setState({ products: data });
            });
    }

    handleSearch=(e)=>{
        if(e.key=='Enter'){
        this.setState({search:true},()=>{this.getdata();});
        }
    }

    handleSearchByName=(e)=>{
        this.setState({searchBy:"1"})
    }
    handleSearchByCategory=(e)=>{
        this.setState({searchBy:"2"})
    }

    handleSearchByProvider=(e)=>{
        this.setState({searchBy:"3"})
    }

    handleSortByName=()=>{
        this.setState({sortBy:"name"},()=>{this.getdata();})
    }

    handleSortByPrice=()=>{
        this.setState({sortBy:"price"},()=>{this.getdata();})
    }

    handleNextPage=()=>{
        if((this.state.page)<this.state.products.length/12)
        this.setState({page:this.state.page+1})
    }

    handlePrevPage=()=>{
        if(this.state.page!=1)
            this.setState({page:this.state.page-1})
    }

    handleSearchQuery=(e)=>{
        if(e.target.value!="")
            this.setState({searchText:e.target.value},()=>{this.setState({search:true},()=>{this.getdata();});})
        else
            this.setState({search:false},()=>{this.getdata();});
    }

    render() {
        console.log(this.state.products)
        return (
            <body>
                <Home_Header handleSearch={this.handleSearch} handleSearchQuery={this.handleSearchQuery} searchBy={this.state.searchBy} handleSearchByName={this.handleSearchByName} handleSearchByCategory={this.handleSearchByCategory} handleSearchByProvider={this.handleSearchByProvider}/>
                <div class="home">
                    <Search_Bar handleSortByName={this.handleSortByName} handleSortByPrice={this.handleSortByPrice} />
                    <ProductList products={this.state.products} page={this.state.page} handleNextPage={this.handleNextPage} handlePrevPage={this.handlePrevPage}/>
                </div>
                <Footer/>
                
            </body>
        )
    }
}

export default Home;
