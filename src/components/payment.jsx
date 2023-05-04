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

function DiscountCode(){
    return(
        <div class="discount_code">
            <input/>
            <button class="brown_button">Submit</button>
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

function SubmitButtons(props){
    return(
        <div class="submit_buttons">
<button type="button" class="close_button" onClick={props.handleClose}>
          Close
        </button>
            <button class="brown_button">{props.submitMessage}</button>
        </div>
    )
}

export const PaymentPage = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section class="payment_window modal_window">
        {children}
        <Items/>
        <DiscountCode/>
        <TotalCost/>
        <SubmitButtons handleClose={handleClose} submitMessage="Buy!"/>
        
      </section>
    </div>
  );
};

export const AddCreditPage = ({ handleClose, show, amount, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}>
        <section class="add_credit_window modal_window">
          {children}
          <p>
            are you sure you want to add {amount} to your account?
          </p>
          <SubmitButtons handleClose={handleClose} submitMessage="Confirm!"/>
          
        </section>
      </div>
    );
  };