import { age, name } from "./data.jsx";
import Hello from "./hello.jsx";
export default function Cart() {
  return (
    <div>
      <Hello />
      <h4 className="title">Cart</h4>

      <CartItem />
      <CartItem />
      <CartItem />
    </div>
  );
}

// 컴포넌트 만들기
function CartItem() {
  return (
    <div className="cart-item">
      <p>상품명{age}</p>
      <p>$40</p>
      <p>1개</p>
    </div>
  );
}
