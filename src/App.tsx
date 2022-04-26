import { AddShoppingCart, ShoppingBasketSharp } from "@mui/icons-material";
import {
  AppBar,
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
  const [shopingCardItems, setShoppingCardItmes] = useState([]);

  const handleCard = (item: ProductType) => {};
  if (isLoading) return <LinearProgress />;

  return (
    <div>
      <Drawer
        anchor="right"
        open={sidebarOpend}
        onClose={() => setSidebarOpend(false)}
      >
        <Box sx={{ width: "300px" }}></Box>
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
          <IconButton>
            <AddShoppingCart
              sx={{ color: "red" }}
              onClick={() => setSidebarOpend(true)}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ padding: "20px" }}>
        <Grid container spacing={2}>
          {data?.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <ProductCard item={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
