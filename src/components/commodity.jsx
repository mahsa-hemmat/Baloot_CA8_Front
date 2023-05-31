import React from 'react';
import ProductList from './products';
import { Footer, Default_Header } from './header';
import '../css/commodity.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CategoryItem(props){
    return(<li>{props.cat}</li>)
}

function Product_Info(props) {
    const categories=[]
    const stars=[]
    for(let i=0; i<props.categories.length; i++){
        categories.push(<CategoryItem cat={props.categories[i]}/>)
    }
    for(let i=0; i<10; i++){
        if(i<props.rate)
            stars.push( <img src={require("../assets/star2.png")} onClick={()=>props.setRating(i+1)} />)
        else
            stars.push( <img src={require("../assets/star1.png")} onClick={()=>props.setRating(i+1)} />)
    }
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
                <p class="producer">by <a href={"http://localhost:3000/providers/"+props.commodityInfo.providerId}>{props.commodityInfo.providerName}</a></p>
                <div class="category">
                    <p>Category(s)</p>
                    <ul>
                        {categories}
                    </ul>
                </div>
                <div class="add_to_cart shadow_box">
                    <p>{props.commodityInfo.price}$</p>
                    <button class="white_button" onClick={() => {
                    fetch("http://localhost:8080/user/buylist?commodityId=" + props.commodityInfo.id, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        }}).then(res => {
                        if (!res.ok) {
                            res.text().then(errorMessage => {
                                toast.error(errorMessage);
                                // 404 page error
                            });
                            if (res.status === 401)
                                window.location.href = "http://localhost:3000/login"
                        }
                    }).catch(error => {
                        console.error(error);
                    });
                    }}>Add to Cart</button>
                </div>
                <div class="rate">
                    <div class="rate_stars">
                        <p>rate now</p>
                        <div class="stars">
                           {stars}
                        </div>
                    </div>
                    <button class="brown_button" onClick={props.handleSubmitRating}>Submit</button>
                </div>
            </div>
        </div>
    )
}

function Comment(props) {
    return (
        <div class="comment shadow_box">
            <p class="comment_text">{props.text}</p>
            <div class="comment_info">
                <p>{props.date}</p>
                <p>.</p>
                <p>{props.user}</p>
            </div>
            <div class="comment_right">
                <p>Is this comment helpful?</p>
                <p>{props.like}</p><img onClick={()=>{fetch("http://localhost:8080/comment/" + props.id + "?vote=1", {method: "POST",
                headers: {
                "Content-Type": "application/json",
            }}).then(response => {
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
            });}} src={require("../assets/thumbs_up.png")} />
                <p>{props.dislike}</p><img onClick={()=>{fetch("http://localhost:8080/comment/" + props.id + "?vote=-1", {method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }}).then(response => {
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
                }} src={require("../assets/thumbs_down.png")} />
            </div>
        </div>
    )
}

function Comments(props) {
    const comments = []
    for (var i = 0; i < props.comments.length; i++) {
        comments.push(<Comment
            id={props.comments[i].id}
            user={props.comments[i].userEmail}
            commodityId={props.comments[i].commodityId}
            text={props.comments[i].text}
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
                <div class="comment_form">
                    <input onChange={props.handleCommentChange} />
                    <button class="brown_button" onClick={props.handleCommentSubmit}>Post</button>
                </div>
            </div>
        </div>
    );
}

class Commodity extends React.Component {
    constructor(props) {
        super(props);
        this.state = { commodityInfo: {}, id2: "", id: "1", comments: [], suggestion: [], commentText: "",categories:[], rate: 0 }
        this.setState({ id: props.param.id })
        fetch("http://localhost:8080/commodities/" + props.param.id)
            .then(res => {
                if (!res.ok) {
                    res.text().then(errorMessage => {
                        toast.error(errorMessage);
                        // 404 page error
                    });
                    if (res.status === 401)
                        window.location.href = "http://localhost:3000/login"
                }
                return res.json();
            })
            .then(data => {
                this.setState({ commodityInfo: data });
                this.setState({categories:data.categories})
            })
            .catch(error => {
                console.error(error);
            });
        fetch("http://localhost:8080/commodities/" + props.param.id + "/comments")
            .then(res => {
                if (!res.ok) {
                    res.text().then(errorMessage => {
                        toast.error(errorMessage);
                    });
                }
                return res.json();
            })
            .then(data => {
                this.setState({ comments: data });
            })
            .catch(error => {
                console.error(error);
            })
        fetch("http://localhost:8080/commodities/" + props.param.id + "/recommended")
            .then(res => {
                if (!res.ok) {
                    res.text().then(errorMessage => {
                        toast.error(errorMessage);
                    });
                }
                return res.json();
            }).then(data => {
                this.setState({ suggestion: data });
            })
            .catch(error => {
                console.error(error);
            })


    }
    handleCommentChange = (e) => {
        this.setState({ commentText: e.target.value })
    }

    handleCommentSubmit = () => {
        console.log(this.state.commentText)
        fetch("http://localhost:8080/comment", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                text: this.state.commentText,
                commodityId: this.state.id
            })
        }).then(res => {
            if (res.ok) {
                res.text().then(successMessage => {
                    toast.success(successMessage);
                });
            } else {
                res.text().then(errorMessage => {
                    toast.error(errorMessage);
                });
            }
        }).catch(error => {
            console.error(error);
        });
    };

    handleUpvote = () => {

    }

    handleDownvote = () => {

    }

    setRating = (rate)=>{
        this.setState({rate:rate});
    }

    handleSubmitRating=()=>{
        if(this.state.rate!=0)
        fetch("http://localhost:8080/commodities/"+this.state.id+"?score="+this.state.rate.toString(), {
            method: "POST", 
        }).then(res => {
            if (res.ok) {
                res.text().then(successMessage => {
                    toast.success(successMessage);
                });
            } else {
                res.text().then(errorMessage => {
                    toast.error(errorMessage);
                });
            }
        }).catch(error => {
            console.error(error);
        });
    }

    render() {
        return (
            <body>
                <Default_Header />
                <Product_Info commodityInfo={this.state.commodityInfo} categories={this.state.categories} setRating={this.setRating} rate={this.state.rate} handleSubmitRating={this.handleSubmitRating} />
                <Comments comments={this.state.comments} handleCommentSubmit={this.handleCommentSubmit} handleCommentChange={this.handleCommentChange} />
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