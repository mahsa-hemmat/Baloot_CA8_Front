import React from 'react';
import { ProductTable, ProductHistoryTable } from './products';
import { Footer, Default_Header } from './header';
import { PaymentPage, AddCreditPage } from './payment';
import './../css/user.css'

function UserInfo(props){
    return (
        <div class="user_info shadow_box">
            <ul>
                <li id="username">{props.userInfo.username}</li>
                <li id="email">{props.userInfo.email}</li>
                <li id="birth_date">{props.userInfo.birthDate}</li>
                <li id="address">{props.userInfo.address}</li>
            </ul>
            <div class="user_info_right">
                <h1>${props.userInfo.credit}</h1>
                <input type="text" placeholder="$Amount" onChange={props.handleCreditAmount} />
                <button type="submit" name="addCredit" class="brown_button" onClick={props.showAddCreditPage}>Add Credit</button>
            </div>
        </div>
    );
}

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userInfo:{}, pay:false, addCredit:false, history:[], buylist:[],amount:0,discode:"",totalCost:0 }
        fetch("http://localhost:8080/user").then(res => res.json())
        .then(data => {
            this.setState({userInfo:data})
         })
         fetch("http://localhost:8080/user/buylist").then(res => res.json())
        .then(data => {
            this.setState({buylist:data})
         })
         fetch("http://localhost:8080/user/history").then(res => res.json())
        .then(data => {
            this.setState({history:data})
         })
        this.showPaymentPage=this.showPaymentPage.bind(this);
        this.hidePaymentPage=this.hidePaymentPage.bind(this);
    }

    showPaymentPage=()=>{
        this.setState({pay:true});
    }

    hidePaymentPage=()=>{
        this.setState({pay:false});
    }

    showAddCreditPage=()=>{
        this.setState({addCredit:true});
    }

    hideAddCreditPage=()=>{
        this.setState({addCredit:false});
    }

    handleCreditIncrease=()=>{
        fetch("http://localhost:8080/user/credit?credit="+this.state.amount, {
            method: "POST",
        })
    }

    handleDiscount=()=>{
        fetch("http://localhost:8080/user/discount?discountcode="+this.state.discode, {
            method: "POST",
        }).then(res => res.json())
        .then(data => {
            this.setState({totalCost:data})
         })
    }

    handleDiscountCode=(e)=>{
        this.setState({discode:e.target.value});
    }

    handlePayment=()=>{
        fetch("http://localhost:8080/user/payment", {
            method: "POST",
        })
    }

    handleCreditAmount=(e)=>{
        this.setState({amount:e.target.value})
    }


    render() {
        return (
            <body>
                <PaymentPage show={this.state.pay} handleClose={this.hidePaymentPage} handlePayment={this.handlePayment} handleDiscount={this.handleDiscount} handleDiscountCode={this.handleDiscountCode} />
                <AddCreditPage show={this.state.addCredit} handleClose={this.hideAddCreditPage} handleCreditIncrease={this.handleCreditIncrease} />
                <Default_Header />
                <UserInfo showAddCreditPage={this.showAddCreditPage} userInfo={this.state.userInfo} handleCreditAmount={this.handleCreditAmount}/>
                <div class="product_table">
                    <ul>
                        <li class="cart_table">
                            <h2>Cart</h2>
                        </li>
                    </ul>
                    <ProductTable products={this.state.buylist} />
                    <p><button class="brown_button" onClick={this.showPaymentPage}>Pay now!</button></p>
                </div>
                <br />
                <div class="product_table">
                    <ul>
                        <li class="history_table">
                            <h2>History</h2>
                        </li>
                    </ul>
                    <ProductHistoryTable products={this.state.history} />
                </div>
                <Footer />

            </body>
        )
    }
}

export default User