import { AddShoppingCart, ShoppingBasketSharp } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  Container,
  Drawer,
  Grid,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import ProductCard from "./components/ProductCard";
import ShoppingCard from "./components/ShoppingCard";

export interface ProductType {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
  rating: {
    rate: number;
    count: number;
  };
}

const getProducts = async (): Promise<ProductType[]> =>
  await await (await fetch("https://fakestoreapi.com/products")).json();

function App() {
  const { data, isLoading, error } = useQuery<ProductType[]>(
    "products",
    getProducts
  );

  const [sidebarOpend, setSidebarOpend] = useState(false);
  const [shoppingCard, setShoppingCard] = useState([] as ProductType[]);
  const [totalCardAmount, setTotalCardAmount] = useState(0 as number);

  if (isLoading) return <LinearProgress />;

  const handleAccount = (shoppingCard: ProductType[]) =>
    setTotalCardAmount(
      shoppingCard.reduce((ack, item) => ack + item.amount * item.price, 0)
    );

  const addToCard = (item: ProductType) => {
    setSidebarOpend(true);
    const isInCard = shoppingCard
      .map((prev) => prev.id)
      .find((_id) => item.id == _id);
    if (!isInCard) {
      item.amount = 1;
      setShoppingCard([...shoppingCard, item]);
    } else {
      const currentItem = shoppingCard.filter(
        (product) => product.id == item.id
      )[0];
      currentItem.amount++;
      setShoppingCard([
        ...shoppingCard.filter((product) => product.id != item.id),
        currentItem,
      ]);
    }
    console.log(item.amount, item.price);
    handleAccount(shoppingCard);
  };

  console.log(totalCardAmount);
  const removeFromCard = (item: ProductType) => {
    const currentItem = shoppingCard.filter(
      (product) => product.id == item.id
    )[0];
    if (currentItem.amount == 1) {
      item.amount--;
      setShoppingCard(shoppingCard.filter((product) => product.id != item.id));
    } else {
      item.amount--;
      setShoppingCard([
        ...shoppingCard.filter((product) => product.id != item.id),
        item,
      ]);
    }
    handleAccount(shoppingCard);
  };

  return (
    <div>
      <Drawer
        anchor="right"
        open={sidebarOpend}
        onClose={() => setSidebarOpend(false)}
      >
        <Box
          sx={{
            width: "350px",
            paddingX: "20px",
            paddingY: "50px",
            position: "relative",
            height: "100vh",
          }}
        >
          <Typography variant="h5" component="h2">
            Your Card:
          </Typography>
          <Box sx={{ marginTop: "20px" }}>
            {shoppingCard.length == 0 ? (
              <Typography variant="h5" component="h4">
                Your card is empaty!!
              </Typography>
            ) : (
              <>
                {shoppingCard.map((product) => (
                  <ShoppingCard
                    key={product.id}
                    item={product}
                    addToCard={addToCard}
                    removeFromCard={removeFromCard}
                  />
                ))}
              </>
            )}
          </Box>
          <Box sx={{ position: "absolute", bottom: "10px", width: "90%" }}>
            <hr />
            <Typography
              variant="h5"
              component="h2"
              textAlign="center"
              marginTop="20px"
            >
              Total: $ {totalCardAmount}
            </Typography>
          </Box>
        </Box>
      </Drawer>
      <AppBar position="sticky">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "#111314",
          }}
        >
          <Typography variant="h5" component="h2">
            <span style={{ color: "red" }}>S</span>hop
          </Typography>
          <Badge color="secondary" badgeContent={shoppingCard.length} max={99}>
            <IconButton onClick={() => setSidebarOpend(true)}>
              <AddShoppingCart sx={{ color: "red" }} />
            </IconButton>
          </Badge>
        </Toolbar>
      </AppBar>
      <Container sx={{ padding: "20px" }}>
        <Grid container spacing={2}>
          {data?.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <ProductCard item={product} addToCard={addToCard} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
