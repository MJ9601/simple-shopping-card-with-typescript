import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import { ProductType } from "../App";

type Props = {
  item: ProductType;
  addToCard: (item: ProductType) => void;
};

const ProductCard = ({ item, addToCard }: Props) => {
  return (
    <Card sx={{ position: "relative" }}>
      <CardMedia
        component={"img"}
        height="200"
        image={item.image}
        alt={item.title}
        sx={{ objectFit: "contain" }}
      />
      <Typography
        variant="h6"
        component="div"
        sx={{
          position: "absolute",
          color: "#e33e0b",
          fontWeight: "bold",
          top: "10px",
          left: "10px",
        }}
      >
        ${item.price}
      </Typography>
      <CardContent>
        <Typography variant="h5" component="h4" sx={{ marginY: "10px" }}>
          {item.title}
        </Typography>
        <Typography variant="body2" component="p">
          {item.description}
        </Typography>
        <Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-start",
              paddingY: "20px",
            }}
          >
            <Rating
              name="read-only"
              value={item.rating.rate}
              readOnly
              precision={0.5}
            />
            <Typography variant="body1" component="p">
              {item.rating.rate}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-start",
            }}
          >
            <Typography variant="body2" component="p">
              Remainning:{" "}
            </Typography>
            <Typography variant="body1" component="p">
              {item.rating.count}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          sx={{ width: "100%", color: "#ef6c00", fontWeight: "bold" }}
          onClick={() => addToCard(item)}
        >
          Add To Card
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
