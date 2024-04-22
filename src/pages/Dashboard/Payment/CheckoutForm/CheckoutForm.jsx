import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useBookings from "../../../../hooks/useBookings";
import Swal from "sweetalert2";
import useAuthContext from "../../../../hooks/useAuthContext";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [bookings, refetch] = useBookings();
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const { user } = useAuthContext();

  // total Price
  const totalPrice = bookings?.reduce(
    (prev, current) => prev + current.price,
    0
  );

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => setClientSecret(res.data.clientSecret));
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    // confirm  payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.name || "anonymous",
          },
        },
      });

    if (confirmError) {
      setError(confirmError);
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent?.id);

        // now save payment in database
        const payment = {
          email: user?.email,
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: new Date(),
          bookingIds: bookings.map((item) => item._id),
          status: "pending",
        };

        const res = await axiosSecure.post("/payment", payment);
        console.log(res.data);

        if (
          res.data.deletedResult.deletedCount > 0 ||
          res.data.paymentResult.insertedId
        ) {
          // alert
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Thank you for tk poisa",
            showConfirmButton: false,
            timer: 1500,
          });
          // refetch
          refetch();
        }
      }
    }
  };

  return (
    <div className="p-5">
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button className="btn-sm btn" disabled={!stripe || !clientSecret}>
          Pay
        </button>
        {error && <p className="text-red-400 font-bold">{error}</p>}
        {transactionId && <p>transactionId is : {transactionId}</p>}
      </form>
    </div>
  );
};

export default CheckoutForm;
