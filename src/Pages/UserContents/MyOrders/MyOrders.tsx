import { useEffect, useState } from "react";
import { CheckCircle, Cancel } from "@mui/icons-material";
import { Card, CardContent, Chip, Divider, Grid, Typography, Button } from "@mui/material";
import { getCustomersOrder } from "../../../ApiGateways/orders";

const ITEMS_PER_PAGE = 5;

const OrderCard = ({ order }: any) => {
  const { order_ID, items, total, status, payment_complete, shipping_address } = order;

  return (
    <Card className="mb-6 shadow-lg">
      <CardContent>
        {/* Order Details */}
        <div className="mb-4">
          <Typography variant="h6" className="font-bold mb-2">
            Order ID: <span className="text-blue-600">{order_ID}</span>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Shipping Address: {shipping_address}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total: <span className="font-bold text-green-600">${total}</span>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Payment:{" "}
            {payment_complete ? (
              <Chip
                icon={<CheckCircle />}
                label="Complete"
                color="success"
                size="small"
                className="ml-2"
              />
            ) : (
              <Chip
                icon={<Cancel />}
                label="Pending"
                color="error"
                size="small"
                className="ml-2"
              />
            )}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Status: <span className={`font-semibold ${status === "pending" ? "text-orange-500" : "text-green-600"}`}>{status}</span>
          </Typography>
        </div>
        <Divider />

        {/* Items */}
        <div className="my-4">
          <Typography variant="h6" className="font-semibold mb-3">
            Items
          </Typography>
          <Grid container spacing={2}>
            {items.map((item: any, index: number) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <div className="p-3 flex gap-4 border rounded-lg shadow-sm hover:shadow-md">
                  <img
                    src={item.product.image_urls[0]}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <Typography variant="subtitle1" className="font-medium">
                      {item.product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantity: {item.quantity}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Subtotal: <span className="font-bold">${item.sub_total}</span>
                    </Typography>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </CardContent>
    </Card>
  );
};

const PaginatedOrders = ({ orders }: any) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);
  const currentOrders = orders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );


  return (
    <div>
      {currentOrders.map((order: any, index: number) => (
        <OrderCard key={index} order={order} />
      ))}
      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-6">
          <Button
            variant="outlined"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Typography variant="body1" className="self-center">
            Page {currentPage} of {totalPages}
          </Typography>
          <Button
            variant="outlined"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getCustomersOrder(
      (data) => setOrders(data),
      (error) => console.error(error)
    );
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Typography variant="h4" className="font-bold text-center mb-6">
        Your Orders
      </Typography>
      {orders.length > 0 ? (
        <PaginatedOrders orders={orders} />
      ) : (
        <Typography variant="body1" className="text-center text-gray-500">
          No orders to display.
        </Typography>
      )}
    </div>
  );
};

export default MyOrders;
