import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from "react-bootstrap/esm/Button";
import { useContext } from "react";
import { Store } from '../Store';
import { Helmet } from "react-helmet-async";
import MessageBox from "../components/MessageBox";
import { Link, useNavigate } from "react-router-dom";

function CartScreen(){

    const {state, dispatch} = useContext(Store);
    const {cart} = state;
    const navigate = useNavigate();

    const updateCartHandler = async (item, quantity)=>{
        dispatch({
            type:"CART_ADD_ITEM",
            payload: {...item, quantity}
        });
    }

    const removeItemHandler = async (item)=>{
        dispatch({ 
            type : 'CART_REMOVE_ITEM', 
            payload : item 
        });
    }
    const checkoutHandler = () => {
        navigate('/signin?redirect=/shipping');
    };

    return (
        <div>
            <Helmet>
                <title>Shopping Cart</title>
            </Helmet>
            <h1>Shopping Cart</h1>
            <Row>
                <Col md={8}>
                    <Card>                        
                        <Card.Body>
                            { cart.cartItems.length === 0 ? ( 
                                <MessageBox> 
                                    Cart is Empty <Link to='/'>Go Shopping</Link>
                                </MessageBox> ) 
                            : (<ListGroup variant="flush">
                                {cart.cartItems.map( item => {
                                    return(
                                        <ListGroup.Item  key={item._id}>
                                            <Row className="align-items-center">
                                                <Col md={4}>
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="img-fluid rounded img-thumbnail"
                                                    ></img>{' '}
                                                    <Link to={`/product/${item.slug}`} >{item.name}</Link>
                                                </Col>
                                                <Col md={3}>
                                                    <Button variant="light" disabled={item.quantity === 1}
                                                    onClick={() => updateCartHandler(item, item.quantity - 1)}>
                                                        <i className="fas fa-minus-circle"></i>
                                                    </Button>{' '}
                                                    <span>{item.quantity}</span>{' '}
                                                    <Button variant="light"
                                                    disabled={item.quantity === item.countInStock}
                                                    onClick={() => updateCartHandler(item, item.quantity + 1)}>
                                                        <i className="fas fa-plus-circle"></i>
                                                    </Button>
                                                </Col>
                                                <Col md={3}>
                                                    ${item.price}
                                                </Col>
                                                <Col md={2}>
                                                    <Button variant="light" 
                                                    onClick={() => removeItemHandler(item)}>
                                                        <i className="fas fa-trash"></i>
                                                    </Button>
                                                </Col>
                                                
                                            </Row>
                                        </ListGroup.Item>
                                    )
                                })}
                                </ListGroup>)
                            }
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card>
                        <Card.Body>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3>
                                    Subtotal({cart.cartItems.reduce((a,c)=> a + c.quantity, 0)} Items): 
                                    ${cart.cartItems.reduce((a,c)=> a + c.price * c.quantity, 0)}
                                </h3>
                            </ListGroup.Item>   
                            <ListGroup.Item>
                                <div className="d-grid">
                                <Button type="button" variant="primary"
                                onClick={checkoutHandler} disabled={cart.cartItems.length===0}>
                                    Proceed To Checkout
                                </Button>
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default CartScreen;