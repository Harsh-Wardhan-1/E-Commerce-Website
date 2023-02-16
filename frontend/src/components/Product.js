import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from "./Rating";
import { Store } from "../Store";
import { useContext } from "react";
import axios from "axios";

  
function Product(props){
    const {product} = props;
    
    const {state, dispatch: cxtDispatch} = useContext(Store);
    const { cart } = state;
    const addToCartHandler = async () => {
      const existItem = cart.cartItems.find((x) => x._id === product._id);
      const quantity = existItem ? existItem.quantity + 1 : 1;
      const { data } = await axios.get(`/api/products/${product._id}`);
      if (data.countInStock < quantity) {
        window.alert('Sorry. Product is out of stock');
        return;
      }
      cxtDispatch({
        type: "CART_ADD_ITEM",
        payload: { ...product, quantity },
      });
    };

    return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        { product.countInStock === product.quantity? <Button variant='light' disabled>Out of stock</Button>
        : <Button onClick={addToCartHandler}>Add to cart</Button> }
      </Card.Body>
    </Card>
    );
}

export default Product;