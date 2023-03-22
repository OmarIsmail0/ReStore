import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import agent from "../../app/api/agent";
import { Order } from "../../app/models/order";
import { currencyFormat } from "../../app/util/util";
import ViewOrder from "./ViewOrder";
import { BasketItem } from "./../../app/models/basket";

const Orders = () => {
  const [orders, setOrders] = useState<Order[] | null>();
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState(false);
  const [order, setOrder] = useState<Order | null>();

  function handleView(order: Order) {
    setView(true);
    setOrder(order);
  }

  useEffect(() => {
    setLoading(true);
    agent.Orders.list()
      .then((orders) => setOrders(orders))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent message="Loading orders..." />;

  return (
    <>
      {!view ? (
        <>
          <Typography variant="h4" gutterBottom sx={{ p: 2 }}>
            Orders
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Order Number</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell align="right">Order Date</TableCell>
                  <TableCell align="right">Order Status </TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders?.map((order) => (
                  <TableRow
                    key={order.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {order.id}
                    </TableCell>
                    <TableCell align="right">
                      {currencyFormat(order.total)}
                    </TableCell>
                    <TableCell align="right">
                      {order.orderDate.split("T")[0]}
                    </TableCell>
                    <TableCell align="right">{order.orderStatus}</TableCell>
                    <TableCell align="right">
                      <Button onClick={() => handleView(order)}>View</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h4" gutterBottom sx={{ p: 2 }}>
              Order# {order?.id} - {order?.orderStatus}
            </Typography>
            <Button
              size="large"
              sx={{ m: 2 }}
              variant="contained"
              onClick={() => setView(false)}
            >
              GO BACK
            </Button>
          </Box>

          <ViewOrder items={order?.orderItems as BasketItem[]} />
        </>
      )}
    </>
  );
};

export default Orders;
