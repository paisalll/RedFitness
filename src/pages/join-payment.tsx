import { Helmet } from 'react-helmet-async';
// sections
import PaymentView from 'src/sections/join/payment';
// ----------------------------------------------------------------------

export default function YourDetailsPage() {
  return (
    <>
      <Helmet>
        <title> Join: Payment </title>
      </Helmet>

      <PaymentView/>
    </>
  );
}
