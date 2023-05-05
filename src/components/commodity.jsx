import React from 'react';
import ProductList from './products';
import { Footer, Default_Header } from './header';
import './../css/commodity.css'
import { toast } from 'react-toastify';


function Product_Info(props) {
    return (
        <div class="product_info">
            <img src={props.commodityInfo.image} />
            <div class="product_info_right">
                <h1>{props.commodityInfo.name}</h1>
                <div class="product_info_right_second_row">
                    <p class="stock">{props.commodityInfo.inStock} left in stock</p>
                    <div class="total_score">
                        <img src={require("../assets/star1.png")} />
                        <p class="total_score_value">{props.commodityInfo.rating}</p>
                        <p class="total_score_count">({props.commodityInfo.ratingsCount})</p>
                    </div>
                </div>
                <p class="producer">by <a href="providers/">{props.commodityInfo.providerName}</a></p>
                <div class="category">
                    <p>Category(s)</p>
                    <ul>
                        <li>{props.commodityInfo.categories}</li>
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
                <p class="comment_text">{props.text}</p>
                <div class="comment_info">
                    <p>{props.date}</p>
                    <p>.</p>
                    <p>{props.user}</p>
                </div>
                <div class="comment_right">
                    <p>Is this comment helpful?</p>
                    <p>{props.like}</p><img src={require("../assets/thumbs_up.png")} />
                    <p>{props.dislike}</p><img src={require("../assets/thumbs_down.png")}/>
                </div>
            </div>
    )
}

function Comments(props) {
    const comments=[]
    for(var i=0;i<props.comments.length;i++){
        comments.push(<Comment
            id = {props.comments[i].id}
            user = {props.comments[i].userEmail}
            commodityId={props.comments[i].commodityId}
            text = {props.comments[i].text}
            date={props.comments[i].date}
            like={props.comments[i].like}
            dislike={props.comments[i].dislike}
        />)
    }
    return (
        <div class="comments">
            <p class="shadow_box">Comments ({props.comments.length})</p>
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
        this.state = { commodityInfo:{} , id:"" ,comments:[] ,suggestion:[] , newComment: "",}
        this.setState({id:props.param.id})
        fetch("http://localhost:8080/commodities/"+props.param.id)
            .then(res => {
                if (!res.ok && res.status !== 405) {
                    res.text().then(errorMessage => {
                        toast.error(errorMessage);
                        // 404 page error
                    });
                if(res.status === 405)
                    window.location.href = "http://localhost:3000/login"
                }
                return res.json();
            })
            .then(data => {
                this.setState({ commodityInfo: data });
            })
            .catch(error => {
                console.error(error);
            });
        fetch("http://localhost:8080/commodities/"+props.param.id+"/comments")
            .then(res => {
                if (!res.ok && res.status !== 405) {
                    res.text().then(errorMessage => {
                        toast.error(errorMessage);
                        // show 404 page
                    });
                    if(res.status === 405)
                        window.location.href = "http://localhost:3000/login"
                }
                return res.json();
            })
            .then(data => {
                this.setState({ comments: data });
            })
            .catch(error => {
                console.error(error);
            })
        fetch("http://localhost:8080/commodities/"+props.param.id+"/recommended")
            .then(res => {
                if (!res.ok && res.status !== 405) {
                    res.text().then(errorMessage => {
                        toast.error(errorMessage);
                        // show 404 page
                    });
                    if(res.status === 405)
                        window.location.href = "http://localhost:3000/login"
                }
                return res.json();
            })
            .then(data => {
                this.setState({ suggestion: data });
            })
            .catch(error => {
                console.error(error);
            })


    }
    handleCommentSubmit = (e) => {
        e.preventDefault();
        const commentText = e.target.elements.commentText.value;
        // make a POST request to submit the comment
        fetch("http://localhost:8080/comment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                text: commentText,
                commodityId: this.state.id
            })
        })
            .then(res => res.json())
            .then(data => {
                // add the new comment to the comments array in the state
                this.setState(prevState => ({
                    comments: [...prevState.comments, data]
                }));
            })
            .catch(error => {
                console.error(error);
            });
    };
    render() {
        return (
            <body>
                <Default_Header />
                <Product_Info commodityInfo={this.state.commodityInfo}/>
                <Comments comments={this.state.comments} handleCommentSubmit={this.handleCommentSubmit}/>
                <div className="suggestion">
                    <p className="title">You might also like...</p>
                    <ProductList products={this.state.suggestion} />
                </div>
                <Footer />
            </body >
        )
    }
}

export default Commodity;
