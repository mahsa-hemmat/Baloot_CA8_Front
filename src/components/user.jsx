import React from 'react';
import { ProductTable, ProductHistoryTable } from './products';
import { Footer, Default_Header } from './header';
import { PaymentPage, AddCreditPage } from './payment';
import './../css/user.css'

function UserInfo(props){
    return (
        <div class="user_info shadow_box">
            <ul>
                <li id="username">Marshal</li>
                <li id="email">Marshal.Mathers@gmail.com</li>
                <li id="birth_date">1972/10/17</li>
                <li id="address">20785 Schultes Avenue, Warren, MI 48091</li>
            </ul>
            <div class="user_info_right">
                <h1>$10000000</h1>
                <input type="text" placeholder="$Amount" />
                <button type="submit" name="addCredit" class="brown_button" onClick={props.showAddCreditPage}>Add Credit</button>
            </div>
        </div>
    );
}

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userEmail: "", password: "", pay:false, addCredit:false, history:[], buylist:[] }
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

    render() {
        return (
            <body>
                <PaymentPage show={this.state.pay} handleClose={this.hidePaymentPage} />
                <AddCreditPage show={this.state.addCredit} handleClose={this.hideAddCreditPage} />
                <Default_Header />
                <UserInfo showAddCreditPage={this.showAddCreditPage}/>
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