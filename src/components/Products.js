import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import ProductCard from "./ProductCard";
import Cart from "./Cart";
import { generateCartItemsFrom } from "./Cart";
import "./Products.css";

const Products = () => {
  // Original products list fetched from API
  const [productDetails, setProductDetails] = useState([]);

  //filtered list after user tried to search somthing by product category/name.
  const [filteredProduct, setFilteredProduct] = useState([]);

  //timer for debounce search
  const [debounceTime, setDebounceTime] = useState(0);

  //  Loading Animation
  const [isLoading, setIsLoading] = useState(false);

  // cart items for a user
  const [cartItem, setCartItem] = useState([]);

  //to call FetchCart fucntion in useEffect when "", henec use the below state in dependency array:
  const [cartLoad, setcartLoad] = useState(false);

  // to use snackbar
  const { enqueueSnackbar } = useSnackbar();
  let token = localStorage.getItem("token");
  let username = localStorage.getItem("username");

  // Fetch products data and store it

  const performAPICall = async () => {
    setIsLoading(true);
    try {
      let response = await axios.get(`${config.endpoint}/products`);

      // console.log(response.data);

      setProductDetails(response.data);
      setFilteredProduct(response.data);
      // console.log({productDetails});
      // Fetch cartItems
      setcartLoad(true);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
      }
    }
    //End loading
    setIsLoading(false);
    // return productDetails;
  };

  // //intial api call to populate the products on product page
  useEffect(() => {
    performAPICall();
  }, []);

  // //get req to fetch cart items for a logged in user
  useEffect(() => {
    fetchCart(token);
  }, [cartLoad]);

  //-------------------------------------
  //a better logic using useEffect to call performAPICall then fetchCart and finally generateCartItemsFrom
  // useEffect(()=>{
  //   const onLoadHandler= async()=>{
  //     const productsData=await performAPICall();
  //     const cartData=await fetchCart(token);

  //     console.log("cartData:",cartData);
  //     const finalArray=generateCartItemsFrom(cartData,productsData);
  // setCartItem(finalArray);
  //  }
  //  onLoadHandler();
  // },[]) ;
  //------------------------------

  // Implement search logic

  const performSearch = async (text) => {
    setIsLoading(true);
    try {
      // console.log(text);
      let response = await axios.get(
        `${config.endpoint}/products/search?value=${text}`
      );

      setFilteredProduct(response.data);
    } catch (error) {
      if (error.response) {
        //if product not found, show nothing
        if (error.response.status === 404) {
          setFilteredProduct([]);
          //now since (filteredProduct.length) is zero, hence only no product found will be there :(
        }

        //if server side error, then show full product list
        if (error.response.status === 500) {
          enqueueSnackbar(error.response.data.message, { variant: "error" });
          setFilteredProduct(productDetails);
        }
      } else {
        enqueueSnackbar(
          "Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
          { variant: "error" }
        );
      }
    }
    setIsLoading(false);
  };

  //  Optimise API calls with debounce search implementation

  const debounceSearch = (event, debounceTimeId) => {
    //stored the entered keyword by user

    var text = event.target.value;
    // console.log("text :");
    // console.log(text);

    //debounce logic
    if (debounceTimeId) {
      clearTimeout(debounceTimeId);
    }

    const newTimeOut = setTimeout(() => {
      performSearch(text);
    }, 500);

    setDebounceTime(newTimeOut);
  };

  // Perform the API call to fetch the user's cart and return the response

  const fetchCart = async (token) => {
    if (!token) return;
    try {
      // Pass Bearer token inside "Authorization" header to get data from "GET /cart" API and return the response data

      let response = await axios.get(`${config.endpoint}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        //Update cartItems
        // console.log("response :", response);

        // return response.data;
        // console.log('fetchCart: generateCartItemsFrom ',generateCartItemsFrom(response.data,productDetails));
        setCartItem(generateCartItemsFrom(response.data, productDetails));
        // console.log("CartItem :",cartItem);
      }
    } catch (e) {
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Could not fetch cart details. Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
          }
        );
      }
      return null;
    }
  };

  //  Return if a product already exists in the cart

  const isItemInCart = (items, productId) => {
    for (let i = 0; i < items.length; i++) {
      if (items[i].productId === productId) {
        return true;
      }
    }
    return false;
  };

  // Perform the API call to add or update items in the user's cart and update local cart data to display the latest cart

  //we will call this function (addToCart) inside another helper function ie: handleCart and pass this handleCart to ProductCard fucntion (as a prop) so that when
  // "add to cart" button gets clicked (on any product card) that passed fucntion (handleCart) will get called.
  const addToCart = async (
    token,
    items,
    products,
    productId,
    qty = 1,
    options = { preventDuplicate: false }
  ) => {
    //check if user is logged in

    if (token) {
      //now check if item is already in the cart or
      if (isItemInCart(items, productId)) {
        enqueueSnackbar(
          "Item already in cart. Use the cart sidebar to update quantity or remove item.",
          {
            variant: "warning",
          }
        );
      } else {
        //make post req with product id and qty
        addInCart(productId, qty);
      }
    } else {
      //
      enqueueSnackbar("Login to add an item to the Cart", {
        variant: "error",
      });
    }
  };

  //helper function for addToCart (addition to the cart logic here)
  const addInCart = async (productId, qty) => {
    // console.log("qty passed in addInCart:",qty);
    try {
      let response = await axios.post(
        `${config.endpoint}/cart`,
        {
          productId: productId,
          qty: qty,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //update the cart items again
      setCartItem(generateCartItemsFrom(response.data, productDetails));
    } catch (e) {
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Could not fetch cart details. Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
          }
        );
      }
      return null;
    }
  };

  //another helper function to be passed as a prop to ProductCard, and we are taking productId form travesing filteredItems array.
  let handleCart = (productId) => {
    addToCart(
      token,
      cartItem,
      productDetails,
      productId
      // 1
    );
  };

  //helper function to handle the quantity of products ie + and - buttons will use this function(to add or remove quantity) and ultimately this function will call addInCart
  const handleQuantity = (productId, qty) => {
    // console.log("productId and qty in handleQuantity: "+productId+" "+qty);
    addInCart(productId, qty);
  };
  return (
    <div>
      {/* // search bar for desktop view */}
      <Header>
        <TextField
          className="search-desktop"
          // size="small"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search color="primary" />
              </InputAdornment>
            ),
          }}
          placeholder="Search for items/categories"
          name="search"
          // value={searchValue} ,since passing event from here, hence on need to give value
          //here debounceTime is a state we have declared
          onChange={(e) => debounceSearch(e, debounceTime)}
        />
      </Header>
      {/* search bar for mobile view */}

      <TextField
        className="search-mobile"
        size="large"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
        onChange={(e) => debounceSearch(e, debounceTime)}
      />
      {/* here our main container grid starts */}
      <Grid container>
        {/* first item in main grid */}
        <Grid
          item
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          xs
          md
        >
          <Grid item className="product-grid">
            <Box className="hero">
              <p className="hero-heading">
                India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
                to your door step
              </p>
            </Box>
          </Grid>
          {/* used a loading condition here to show loading during api call else show products */}
          {isLoading ? (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              sx={{ margin: "auto" }}
              py={10}
            >
              <CircularProgress size={30} />
              <h4> Loading Products... </h4>
            </Box>
          ) : (
            // now show filtered products OR products using another grid...2nd item in main container grid
            //also check if filtered product array is not empty

            <Grid
              container
              item
              spacing={6}
              direction="row"
              justifyContent="space-around"
              alignItems="center"
              mr={1}
              marginRight="50px"
              marginLeft="5px"
              my={3}
            >
              {filteredProduct.length ? (
                filteredProduct.map((product) => (
                  <Grid item key={product["_id"]} xs={12} sm={6} md={4} lg={3}>
                    <ProductCard
                      product={product}
                      //taking _id from above
                      handleAddToCart={(event) => handleCart(product["_id"])}
                    />
                  </Grid>
                ))
              ) : (
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  py={10}
                  sx={{ margin: "auto" }}
                >
                  <SentimentDissatisfied size={40} />
                  <h4>No products found</h4>
                </Box>
              )}
            </Grid>
          )}
        </Grid>
        {/* second grid item of main conatiner grid...show only when there is a user logged in */}
        {token && (
          <Grid
            container
            item
            xs={12}
            md={3} //bcz after log out we want our main grid to take whole width
            style={{ backgroundColor: "#E9F5E1", height: "100vh" }}
            justifyContent="center"
            alignItems="stretch"
          >
            {/* cart component */}
            <Cart
              products={productDetails}
              items={cartItem}
              handleQuantity={handleQuantity}
            />
          </Grid>
        )}
      </Grid>

      <Footer />
    </div>
  );
};

export default Products;
