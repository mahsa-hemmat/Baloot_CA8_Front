import React from 'react';
import ProductList from './products';
import { Footer, Default_Header } from './header';
import './../css/commodity.css'

function Product_Info() {
    return (
        <div class="product_info">
            <img src="../../assets/phone.jpg" />
            <div class="product_info_right">
                <h1>Huawei Nova 9</h1>
                <div class="product_info_right_second_row">
                    <p class="stock">5 left in stock</p>
                    <div class="total_score">
                        <img src={require("../assets/star1.png")} />
                        <p class="total_score_value">4.1</p>
                        <p class="total_score_count">(12)</p>
                    </div>
                </div>
                <p class="producer">by <a href="#Huawei">Huawei</a></p>
                <div class="category">
                    <p>Category(s)</p>
                    <ul>
                        <li>Technology</li>
                        <li>IT</li>
                    </ul>
                </div>
                <div class="add_to_cart shadow_box">
                    <p>300$</p>
                    <button class="white_button">Add to Cart</button>
                </div>
                <div class="rate">
                    <div class="rate_stars">
                        <p>rate now</p>
                        <div class="stars">
                            <img src={require("../assets/star.png")} />
                            <img src={require("../assets/star.png")} />
                        </div>
                    </div>
                    <button class="brown_button">Submit</button>
                </div>
            </div>
        </div>
    )
}

function Comment(props){
    return(
        <div class="comment shadow_box">
                <p class="comment_text">This was awsome!!!!</p>
                <div class="comment_info">
                    <p>2023-03-20</p>
                    <p>.</p>
                    <p>#username</p>
                </div>
                <div class="comment_right">
                    <p>Is this comment helpful?</p>
                    <p>1</p><img src={require("../assets/thumbs_up.png")} />
                    <p>1</p><img src={require("../assets/thumbs_down.png")}/>
                </div>
            </div>
    )
}

function Comments() {
    const comments=[]
    for(var i=0;i<3;i++){
        comments.push(<Comment/>)
    }
    return (
        <div class="comments">
            <p class="shadow_box">Comments (2)</p>
            {comments}
            <div class="your_comment shadow_box">
                <p>Submit your opinion</p>
                <form>
                    <input />
                    <button class="brown_button">Post</button>
                </form>
            </div>
        </div>
    );
}

class Commodity extends React.Component {
    constructor(props) {
        super(props);
        this.state = { suggestion:[] }
        

    }
    render() {
        return (
            <body>
                <Default_Header />
                <Product_Info />
                <Comments />
                <div class="suggestion">
                    <p class="title">You might also like...</p>
                    <ProductList products={this.state.suggestion} />
                </div>
                <Footer />
            </body >
        )
    }
}

export default Commodity;
