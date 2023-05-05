import '../css/payment.css';

function Item(props){
    return(
        <li>
            <p class="cart_item_name">
            {props.name} X{props.count}
            </p>
            <p class="cart_item_price">
                ${props.price}
            </p>
        </li>
    )
}

function Items(){
    const items=[];
    for(var i=0;i<3;i++){
        items.push(<Item name="Galexy" count="4" price="2100000000"/>)
    }
    return(
        <div class="buylist_items">
            <h1>
            Your Cart
            </h1>
            <ul>
                {items}
            </ul>
        </div>
    )
}

function DiscountCode(props){
    return(
        <div class="discount_code">
            <input onChange={props.handleDiscountCode}/>
            <button class="brown_button" onClick={props.handleDiscount}>Submit</button>
        </div>
    )
}

function TotalCost(){
    return(
        <div class="total_cost">
            <p>total</p>
            <p>$1090000000</p>
        </div>
    )
}

function SubmitButtonsCredit(props){
    return(
        <div class="submit_buttons">
<button type="button" class="close_button" onClick={props.handleClose}>
          Close
        </button>
            <button class="brown_button" onClick={props.handleCreditIncrease}>{props.submitMessage}</button>
        </div>
    )
}

function SubmitButtonsPayment(props){
    return(
        <div class="submit_buttons">
<button type="button" class="close_button" onClick={props.handleClose}>
          Close
        </button>
            <button class="brown_button" onClick={props.handlePayment}>{props.submitMessage}</button>
        </div>
    )
}

export const PaymentPage = ({ handleClose, show, children, handlePayment, handleDiscount, handleDiscountCode }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section class="payment_window modal_window">
        {children}
        <Items/>
        <DiscountCode handleDiscount={handleDiscount} handleDiscountCode={handleDiscountCode}/>
        <TotalCost/>
        <SubmitButtonsPayment handleClose={handleClose} handlePayment={handlePayment} submitMessage="Buy!"/>
        
      </section>
    </div>
  );
};

export const AddCreditPage = ({ handleClose, show, amount, children, handleCreditIncrease }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section class="add_credit_window modal_window">
          {children}
          <p>
            are you sure you want to add {amount} to your account?
          </p>
          <SubmitButtonsCredit handleClose={handleClose} submitMessage="Confirm!" handleCreditIncrease={handleCreditIncrease}/>
          
        </section>
      </div>
    );
  };