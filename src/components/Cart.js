import {
  AddOutlined,
  RemoveOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Button, IconButton, Stack, Divider } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

//  Returns the complete data on all products in cartData by searching in productsData

export const generateCartItemsFrom = (cartData, productsData) => {
  // console.log("cartData :",cartData);
  // console.log("productsData :",productsData);

  let AllCartItem = [];
  //  cartData[i].productId===productsData[i]._id , used double for loop(most stupid) to find items in productData array using prodcutId in cartData
  if (cartData.length && productsData.length) {
    for (let i = 0; i < cartData.length; i++) {
      for (let j = 0; j < productsData.length; j++) {
        if (cartData[i].productId === productsData[j]._id) {
          // since we need to store both objs: cartData & productData in each obj of our new array so, make a new obj which has both of prev mentioned objs(use spread operator) and store that.
          AllCartItem.push({ ...productsData[j], ...cartData[i] });
        }
      }
    }
  }
  console.log("AllCartItem :",AllCartItem);
  return AllCartItem;
};

//  Get the total value of all products added to the cart

export const getTotalCartValue = (items = []) => {
  // console.log("items :",items);

  let final = 0;
  for (let i = 0; i < items.length; i++) {
    final += items[i].cost * items[i].qty;
  }
  return final;
};

//  Component to display the current quantity for a product and + and - buttons to update product quantity on cart

const ItemQuantity = ({ value, handleAdd, handleDelete }) => {
  console.log("value ie qty recieved in cart.js(ItemQuantity) :", value);
  return (
    <Stack direction="row" alignItems="center">
      <IconButton size="small" color="primary" onClick={handleDelete}>
        <RemoveOutlined />
      </IconButton>
      <Box padding="0.5rem" data-testid="item-qty">
        {value}
      </Box>
      <IconButton size="small" color="primary" onClick={handleAdd}>
        <AddOutlined />
      </IconButton>
    </Stack>
  );
};

// component to display extra box below cart itmes for checkout page
let OrderDetailsView = ({ items = [] }) => {
  return (
    <Box className="cart">
      <Box display="flex" flexDirection="column" padding="1rem">
        <Box>
          <h2>Order Details</h2>
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          {/* since direction is row, hence only 1 row and 2 cols bcz 2 boxs below */}
          <Box>
            <p>Product</p>
            <p>Subtotal</p>
            <p>Shipping Charges</p>
            <h3>Total</h3>
          </Box>

          <Box style={{ textAlign: "right" }}>
            <p>{items.length}</p>
            <p>₹{getTotalCartValue(items)}</p>
            <p>₹0</p>
            <h3>₹{getTotalCartValue(items)}</h3>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

/*
 * Component to display the Cart view
 *    If product quantity on cart is to be displayed as read only without the + - options to change quantity
 *    ---Basically checkout page k liye use kr rhe, ie Agar checkout page pr hoge to isReadOnly=true otherwise false----
 */

const Cart = ({ products, items = [], handleQuantity, isReadOnly = false }) => {
  let history = useNavigate();
  // console.log("hello");
  //  console.log("items :", items[0].image);
    console.log("products", products);
  if (!items.length) {
    return (
      <Box className="cart empty">
        <ShoppingCartOutlined className="empty-cart-icon" />
        <Box color="#aaa" textAlign="center">
          Cart is empty. Add more items to the cart to checkout.
        </Box>
      </Box>
    );
  }

  //image,cost,name,productId,qty,category,rating
  return (
    <>
      <Box className="cart">
        {items.map((item) => (
          <Box
            display="flex"
            alignItems="flex-start"
            padding="1rem"
            key={item._id}
          >
            <Box className="image-container">
              <img
                src={item.image}
                alt={item.name}
                width="100%"
                height="100%"
              />
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              height="6rem"
              paddingX="1rem"
            >
              <div>{item.name}</div>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                {isReadOnly ? (
                  <Box style={{ fontSize: "1rem" }}>Qty: {item.qty}</Box>
                ) : (
                  <ItemQuantity
                    // Pass item quantity here
                    value={item.qty}
                    //no need to implement handleAdd/delete just use handleQuantity with -1/+1
                    handleAdd={() =>
                      handleQuantity(item.productId, item.qty + 1)
                    }
                    handleDelete={() =>
                      handleQuantity(item.productId, item.qty - 1)
                    }
                  />
                )}

                <Box padding="0.5rem" fontWeight="700">
                  ₹{item.cost}
                </Box>
              </Box>
            </Box>
          </Box>
        ))}

        {/* Display view for each cart item with non-zero quantity */}
        <Box
          padding="1rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box color="#3C3C3C" alignSelf="center">
            Order total
          </Box>
          <Box
            color="#3C3C3C"
            fontWeight="700"
            fontSize="1.5rem"
            alignSelf="center"
            data-testid="cart-total"
          >
            ₹{getTotalCartValue(items)}
          </Box>
        </Box>
        <Divider />
        {/* conditional rendering of new box with checkout page details */}
        {isReadOnly ? (
          <>
            {/* use a dedicated componet for above purpose */}
            <OrderDetailsView items={items} />
          </>
        ) : (
          <Box display="flex" justifyContent="flex-end" className="cart-footer">
            <Button
              color="primary"
              variant="contained"
              startIcon={<ShoppingCart />}
              className="checkout-btn"
              onClick={() => {
                history("/checkout");
              }}
            >
              Checkout
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Cart;
