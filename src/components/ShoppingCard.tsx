import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { ProductType } from "../App";

type Props = {
  item: ProductType;
  addToCard: (item: ProductType) => void;
  removeFromCard: (item: ProductType) => void;
};

const ShoppingCard = ({ item, addToCard, removeFromCard }: Props) => {
  return (
    <Box sx={{ marginY: "20px" }}>
      <Paper elevation={4} sx={{ padding: "12px" }}>
        <Grid container spacing={1}>
          <Grid item xs={9}>
            <Typography
              variant="body1"
              component="p"
              sx={{ fontWeight: "bold", marginBottom: "20px" }}
            >
              {item.title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="body2" component="div">
                Price: $ {item.price}
              </Typography>
              <Typography variant="body2" component="div">
                Total: $ {item.amount * item.price}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginY: "10px",
              }}
            >
              <Button
                sx={{ color: "#e3410b" }}
                onClick={() => removeFromCard(item)}
              >
                <KeyboardArrowDown />
              </Button>
              <Typography variant="body2" component="div">
                {item.amount}
              </Typography>
              <Button onClick={() => addToCard(item)}>
                <KeyboardArrowUp />
              </Button>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <img
              src={item.image}
              alt=""
              style={{ height: "90px", objectFit: "contain" }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ShoppingCard;
