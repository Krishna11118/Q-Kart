import { CreditCard, Delete } from "@mui/icons-material";
import {
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../App";
import Cart, { getTotalCartValue, generateCartItemsFrom } from "./Cart";
import "./Checkout.css";
import Footer from "./Footer";
import Header from "./Header";

// Should allow to type a new address in the text field and add the new address or cancel adding new address

const AddNewAddressView = ({
  token,
  newAddress,
  handleNewAddress,
  addAddress,
}) => {
  return (
    <Box display="flex" flexDirection="column">
      <TextField
        multiline
        minRows={4}
        placeholder="Enter your complete address"
        onChange={(e) => {
          handleNewAddress({
            ...newAddress,
            value: e.target.value,
          });
        }}
      />
      {/* handle new address is nothing but setNewAddess itself*/}
      <Stack direction="row" my="1rem">
        <Button
          variant="contained"
          onClick={async () => {
            await addAddress(token, newAddress);
          }}
        >
          Add
        </Button>
        <Button
          variant="text"
          onClick={() => {
            handleNewAddress({
              ...newAddress,
              isAddingNewAddress: false,
            });
          }}
        >
          Cancel
        </Button>
      </Stack>
    </Box>
  );
};

const Checkout = () => {
  const token = localStorage.getItem("token");
  const history = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  //items is basically our cartItems in product.js
  const [items, setItems] = useState([]);

  // products is basically our productDetails in product.js
  const [products, setProducts] = useState([]);
  const [addresses, setAddresses] = useState({ all: [], selected: "" });
  const [newAddress, setNewAddress] = useState({
    isAddingNewAddress: false,
    value: "",
  });
  const [link, setLink] = useState("");

  // Fetch the entire products list
  const getProducts = async () => {
    try {
      const response = await axios.get(`${config.endpoint}/products`);

      setProducts(response.data);
      return response.data;
    } catch (e) {
      if (e.response && e.response.status === 500) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
        return null;
      } else {
        enqueueSnackbar(
          "Could not fetch products. Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
          }
        );
      }
    }
  };

  // Fetch cart data
  const fetchCart = async (token) => {
    if (!token) return;
    try {
      const response = await axios.get(`${config.endpoint}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch {
      enqueueSnackbar(
        "Could not fetch cart details. Check that the backend is running, reachable and returns valid JSON.",
        {
          variant: "error",
        }
      );
      return null;
    }
  };

  //  * Fetch list of addresses for a user
  const getAddresses = async (token) => {
    if (!token) return;

    try {
      const response = await axios.get(`${config.endpoint}/user/addresses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAddresses({ ...addresses, all: response.data });
      console.log("response from getAddress :", response);
      // console.log(addresses.all[0]);
      return response.data;
    } catch {
      enqueueSnackbar(
        "Could not fetch addresses. Check that the backend is running, reachable and returns valid JSON.",
        {
          variant: "error",
        }
      );
      return null;
    }
  };

  // Handler function to add a new address and display the latest list of addresses

  const addAddress = async (token, newAddress) => {
    try {
      // TODO: CRIO_TASK_MODULE_CHECKOUT - Add new address to the backend and display the latest list of addresses
      let response = await axios.post(
        `${config.endpoint}/user/addresses`,
        {
          address: newAddress.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("response of post after adding new address: ", response);

      //the meaning of below command is: Copy all the prev data of addresses state + in that added data override the value of "all" key with the response.data, recieved from post req
      setAddresses({ ...addresses, all: response.data });
      //reset the newAddress state back to its initial values, so that <AddNewAddressView> isn’t displayed if the address was added successfully
      setNewAddress({ value: "", isAddingNewAddress: false });
    } catch (e) {
      if (e.response) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Could not add this address. Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
          }
        );
      }
    }
  };

  // Handler function to delete an address from the backend and display the latest list of addresses

  const deleteAddress = async (token, addressId) => {
    try {
      // TODO: CRIO_TASK_MODULE_CHECKOUT - Delete selected address from the backend and display the latest list of addresses
      let response = await axios.delete(
        `${config.endpoint}/user/addresses/${addressId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //updated the address list
      setAddresses({ ...addresses, all: response.data });
    } catch (e) {
      if (e.response) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Could not delete this address. Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
          }
        );
      }
    }
  };

  // Validate request for checkout

  const validateRequest = (items, addresses) => {
    // that balance thing is attached to every user and we were storing that in local storage in login page, when any user do login
    let userBalance = localStorage.getItem("balance");

    if (userBalance < getTotalCartValue(items)) {
      enqueueSnackbar(
        "You do not have enough balance in your wallet for this purchase",
        { variant: "warning" }
      );
      return false;
    }

    if (addresses.all.length <= 0) {
      enqueueSnackbar("Please add a new address before proceeding.", {
        variant: "warning",
      });
      return false;
    }

    if (!addresses.selected) {
      enqueueSnackbar("Please select one shipping address to proceed.", {
        variant: "warning",
      });
      return false;
    }
    return true;
  };

  // Handler function to perform checkout operation for items added to the cart for the selected address

  const performCheckout = async (token, items, addresses) => {

    if (!validateRequest(items, addresses)) {
      return;
    }
    try {
      let res = await axios.post(
        `${config.endpoint}/cart/checkout`,
        {
          addressId: addresses.selected,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      enqueueSnackbar("Checkout please", { variant: "success" });
      setLink("https://pmny.in/MIeR42jvCGTT");
      
      window.location.reload();
      //updating the wallet balance of the logged in user
      let newBalance = parseInt(
        localStorage.getItem("balance") - getTotalCartValue(items)
      );
      localStorage.setItem("balance", newBalance);

      //finally redirecting to the thanks page
      history("/thanks");
    } catch (e) {
      if (e.response) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Could not place order. Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
          }
        );
      }
    }
  };

  // Fetch addressses if logged in, otherwise show info message and redirect to Products page

  useEffect(() => {
    // console.log("first useEffect got triggered");
    const onLoadHandler = async () => {
      const productsData = await getProducts();

      const cartData = await fetchCart(token);

      if (productsData && cartData) {
        console.log("productsData :", productsData);
        const cartDetails = await generateCartItemsFrom(cartData, productsData);
         console.log("cartDetails :",cartDetails);
        setItems(cartDetails);

      }
    };
    onLoadHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //my own useEffect for envoking other functions
  useEffect(() => {
    // console.log("my useEffect got triggered");
    if (token) {
      const AllAdddressData = getAddresses(token);
    } else {
      enqueueSnackbar("You must logged in to access checkout page", {
        variant: "info",
      });
      history("/login");
    }
  }, [token]);

  useEffect(() => {
    if (link) {
      window.open(link, "_blank"); // Opens the link in a new tab
    }
  }, [link]);
  return (
    <>
      <Header />
      <Grid container>
        <Grid item xs md>
          <Box className="shipping-container" minHeight="100vh">
            <Typography color="#3C3C3C" variant="h4" my="1rem">
              Shipping
            </Typography>
            <Typography color="#3C3C3C" my="1rem">
              Manage all the shipping addresses you want. This way you won't
              have to enter the shipping address manually with every order.
              Select the address you want to get your order delivered.
            </Typography>
            <Divider />
            <Box>
              {/* TODO: CRIO_TASK_MODULE_CHECKOUT - Display list of addresses and corresponding "Delete" buttons, if present, of which 1 can be selected */}
              {/* showing the already added addresses  */}
              {addresses.all.length ? (
                addresses.all.map((item) => (
                  <Box
                    key={item._id}
                    className={
                      addresses.selected === item._id
                        ? "address-item selected"
                        : "address-item not-selected"
                    }
                    onClick={async () => {
                      // in order to make a box selected, hence captured the item id here
                      setAddresses({ ...addresses, selected: item._id });
                    }}
                  >
                    <Typography>{item.address}</Typography>

                    <Button
                      startIcon={<Delete />}
                      onClick={async () => {
                        await deleteAddress(token, item._id);
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                ))
              ) : (
                <Typography my="1rem">
                  No addresses found for this account. Please add one to proceed
                </Typography>
              )}
            </Box>

            {/* Dislay either "Add new address" button or the <AddNewAddressView> component to add a new address in the currently added address */}

            {!newAddress.isAddingNewAddress && (
              <Button
                color="primary"
                variant="contained"
                id="add-new-btn"
                size="large"
                onClick={() => {
                  setNewAddress((currNewAddress) => ({
                    ...currNewAddress,
                    isAddingNewAddress: true,
                    // is button pr click krte hi AddNewAddressView component show hone lgega, bcz it is setting isAddingNewAddress as true
                  }));
                }}
              >
                Add new address
              </Button>
            )}
            {newAddress.isAddingNewAddress && (
              <AddNewAddressView
                token={token}
                newAddress={newAddress}
                handleNewAddress={setNewAddress}
                addAddress={addAddress}
              />
            )}

            <Typography color="#3C3C3C" variant="h4" my="1rem">
              Payment
            </Typography>
            <Typography color="#3C3C3C" my="1rem">
              {/* Payment Method   */}
            </Typography>
            <Divider />

            <Box my="1rem">
              <Typography></Typography>
              <Typography>
                Pay ₹{getTotalCartValue(items)}
                {/* of available ₹ */}
                {/* {localStorage.getItem("balance")} */}
              </Typography>
            </Box>

            {/* <button
              startIcon={<CreditCard />}
              variant="contained"
              className="bn632-hover bn22"
              onClick={async () => {
                await performCheckout(token, items, addresses);
              }}
            >
              PLACE ORDER
            </button> */}
            <button
              className="button-82-pushable"
              role="button"
              // className="bn632-hover bn22"
              onClick={async () => {
                await performCheckout(token, items, addresses);
              }}
            >
              <span className="button-82-shadow"></span>
              <span className="button-82-edge"></span>
              <span className="button-82-front text">Place Order</span>
            </button>
          </Box>
        </Grid>
        <Grid item xs={12} md={3} bgcolor="#E9F5E1">
          <Cart isReadOnly products={products} items={items} />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default Checkout;
