import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductCard(props) {
    return (
        <div class="product shadow_box">
            <h1><a href={'http://localhost:3000/commodity/'+props.id}>{props.name}</a> </h1>
            <p class="stock">{props.inStock} left in stock</p>
            <img src={props.image} alt="product" />
            <div class="product_inner">
                <p class="price">${props.price}</p>
                <button class="white_button" onClick={() => {
                    fetch("http://localhost:8080/user/buylist?commodityId=" + props.id, {
                        method: "POST",
                        headers:{
                            "Authorization": localStorage.getItem("jwt")
                        }
                    }).then(response => {
                        if (response.ok) {
                            response.text().then(successMessage => {
                                toast.success(successMessage);
                            });
                        } else {
                            response.text().then(errorMessage => {
                                toast.error(errorMessage);
                            });
                        }
                    }).catch(error => {
                        console.error(error);
                    });
                }}>Add to Cart</button>
            </div>
        </div>
    );
}

function ProductHistoryRow(props) {
    return (
        <tr>
            <td><img src={props.image} /></td>
            <td>{props.name}</td>
            <td>{props.category}</td>
            <td>${props.price}</td>
            <td>{props.providerId}</td>
            <td class="table_product_rating">{props.rate}</td>
            <td class="table_product_stock">{props.inStock}</td>
            <td>1</td>
        </tr>
    )
}

function ProductRow(props) {
    return (
        <tr>
            <td><img src={props.image} /></td>
            <td><a href={'http://localhost:3000/commodity/'+props.id}>{props.name}</a></td>
            <td>{props.category}</td>
            <td>${props.price}</td>
            <td>{props.providerId}</td>
            <td class="table_product_rating">{props.rate}</td>
            <td class="table_product_stock">{props.inStock}</td>
            <td>
                <div class="counter"><button class="counter_button">+</button><input type="number"
                    class="counter_value" /><button class="counter_button">-</button></div>
            </td>
        </tr>
    )
}

function ProductList(props) {
    const products = [];
    const pages=[];
    var start=0;
    var end=props.products.length;
    if(props.page){
        start=(props.page-1)*12;
    }
    if(props.page){
        end=Math.min(props.page*12,props.products.length);
    }

    for (var i = start; i < end; i += 1) {
        products.push(<ProductCard
            name={props.products[i].name}
            inStock={props.products[i].inStock}
            image={props.products[i].image}
            price={props.products[i].price}
            id={props.products[i].id}
        />)
    }

    if(props.page){
        var j=1;
        var selected_class=""
        for(var i=0;i<props.products.length;i+=12){
            if(j==props.page){
                selected_class="selected_page"
            }
            else{
                selected_class=""
            }
            pages.push(<p class={selected_class}>{j}</p>)
            j+=1;
        }
    }

    if(!props.page)
    return (
        <div class="products">
            {products}
        </div>
    );
    else
    return (
        <div class="multipage_product">
            <div class="products">
                {products}
            </div>
            <div class="pages_number">
                <button onClick={props.handlePrevPage}>{"<"}</button>
                    {pages}
                <button onClick={props.handleNextPage}>{">"}</button>

            </div>
        </div>
    );

}

export function ProductTable(props) {
    const products = [];
    for (var i = 0; i < props.products.length; i += 1) {
        products.push(<ProductRow
            name={props.products[i].name}
            inStock={props.products[i].inStock}
            image={props.products[i].image}
            price={props.products[i].price}
            providerId={props.products[i].providerId}
            rate={props.products[i].rating}
            category={props.products[i].categories}
            id={props.products[i].id}
        />)
    }
    return (
        <table>
            <tbody>
                <tr class="product_table_head">
                    <th>Image</th>
                    <th>Name</th>
                    <th>Categories</th>
                    <th>Price</th>
                    <th>Provider ID</th>
                    <th>Rating</th>
                    <th>In Stock</th>
                    <th>In Cart</th>
                </tr>
                {products}
            </tbody>
        </table>
    );
}

export function ProductHistoryTable(props) {
    const products = [];
    for (var i = 0; i < props.products.length; i += 1) {
        products.push(<ProductHistoryRow
            name={props.products[i].name}
            inStock={props.products[i].inStock}
            image={props.products[i].image}
            price={props.products[i].price}
            providerId={props.products[i].providerId}
            rate={props.products[i].rating}
            category={props.products[i].categories}
        />)
    }
    return (
        <table>
            <tbody>
                <tr class="product_table_head">
                    <th>Image</th>
                    <th>Name</th>
                    <th>Categories</th>
                    <th>Price</th>
                    <th>Provider ID</th>
                    <th>Rating</th>
                    <th>In Stock</th>
                    <th>Quantity</th>
                </tr>
                {products}
            </tbody>
        </table>
    )
}

export default ProductList;