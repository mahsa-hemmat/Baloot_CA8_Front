import React from 'react';


function ProductCard(props) {
    return (
        <div class="product shadow_box">
            <h1>{props.name} </h1>
            <p class="stock">{props.inStock} left in stock</p>
            <img src={props.image} alt="product" />
            <div class="product_inner">
                <p class="price">${props.price}</p>
                <button class="white_button" onClick={() => {
                    fetch("http://localhost:8080/user/buylist?commodityId=" + props.id, {
                        method: "POST",
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
            <td>{props.name}</td>
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
    for (var i = 0; i < props.products.length; i += 1) {
        products.push(<ProductCard
            name={props.products[i].name}
            inStock={props.products[i].inStock}
            image={props.products[i].image}
            price={props.products[i].price}
            id={props.products[i].id}
        />)
    }
    return (
        <div class="products">
            {products}
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
            rate={props.products[i].rate}
            category={props.products[i].category}
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
            rate={props.products[i].rate}
            category={props.products[i].category}
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