import React from 'react';
import { ProductTable, ProductHistoryTable } from './products';
import { Footer, Default_Header } from './header';
import { PaymentPage, AddCreditPage } from './payment';
import './../css/user.css'
import {toast} from "react-toastify";

function UserInfo(props) {
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
        this.state = { userInfo: {}, pay: false, addCredit: false, history: [], buylist: [], amount: 0, discode: "", totalCost: 0, buylistCount: [] }
        fetch("http://localhost:8080/user").then(res => {
            if (res.status === 401) {
                window.location.href = "http://localhost:3000/login";
            }
            return res.json();
        })
            .then(data => {
                this.setState({ userInfo: data })
            })
        fetch("http://localhost:8080/user/buylist").then(res => res.json())
            .then(data => {
                this.setState({ buylist: data }, () => {
                    var temp = []
                    for (var i = 0; i < this.state.buylist.length; i += 1) {
                        temp.push({ commodityId: this.state.buylist[i].id, quantity: "1" })
                    }
                    this.setState({ buylistCount: temp })
                })
            })
        fetch("http://localhost:8080/user/history").then(res => res.json())
            .then(data => {
                this.setState({ history: data })
            })
        this.showPaymentPage = this.showPaymentPage.bind(this);
        this.hidePaymentPage = this.hidePaymentPage.bind(this);
    }

    showPaymentPage = () => {
        fetch("http://localhost:8080/user/payment").then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({ totalCost: data })
            })
            this.setState({ pay: true })
        }

        hidePaymentPage = () => {
            this.setState({ pay: false });
        }

        showAddCreditPage = () => {
            this.setState({ addCredit: true });
        }

        hideAddCreditPage = () => {
            this.setState({ addCredit: false });
        }

        handleCreditIncrease = () => {
            fetch("http://localhost:8080/user/credit?credit=" + this.state.amount, {
                method: "POST",
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
            })
            this.hideAddCreditPage();
        }

        handleDiscount = () => {
            fetch("http://localhost:8080/user/discount?discountcode=" + this.state.discode, {
                method: "POST",
            }).then(response => {
                if (!response.ok) {
                    response.text().then(errorMessage => {
                        toast.error(errorMessage);
                    });
                }
                return response.json();
            }).then(data => {
                    this.setState({ totalCost: data })
                })
        }

        handleDiscountCode = (e) => {
            this.setState({ discode: e.target.value });
        }

        handlePayment = () => {
            fetch("http://localhost:8080/user/payment", {
                method: "POST",
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
            })
            this.hidePaymentPage();
        }

        handleCreditAmount = (e) => {
            this.setState({ amount: e.target.value })
        }


        render() {
            return (
                <body>
                    <PaymentPage show={this.state.pay} handleClose={this.hidePaymentPage} handlePayment={this.handlePayment} handleDiscount={this.handleDiscount} handleDiscountCode={this.handleDiscountCode} totalCost={this.state.totalCost} />
                    <AddCreditPage show={this.state.addCredit} handleClose={this.hideAddCreditPage} handleCreditIncrease={this.handleCreditIncrease} />
                    <Default_Header />
                    <UserInfo showAddCreditPage={this.showAddCreditPage} userInfo={this.state.userInfo} handleCreditAmount={this.handleCreditAmount} />
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