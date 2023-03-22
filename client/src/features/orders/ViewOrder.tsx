import { Grid } from "@mui/material";
import { BasketItem } from "../../app/models/basket";
import { BasketTable } from "../basket/BasketTable";
import BasketSummary from "./../basket/BasketSummary";

interface Props {
  items: BasketItem[];
}

const ViewOrder = ({ items }: Props) => {
  const subtotal =
    items.reduce((sum, item) => sum + item.quantity * item.price, 0) ?? 0;

  return (
    <>
      <BasketTable items={items as BasketItem[]} isBasket={false} />

      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary subtotal={subtotal} />
        </Grid>
      </Grid>
    </>
  );
};

export default ViewOrder;
