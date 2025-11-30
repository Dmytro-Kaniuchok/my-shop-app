import { Suspense } from "react";
import OrderForm from "@/src/components/OrderForm/OrderForm";
import Loader from "@/src/components/Loader/Loader";

export default function OrderPage() {
  return (
    <Suspense fallback={<Loader />}>
      <OrderForm />
    </Suspense>
  );
}
