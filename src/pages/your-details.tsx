import { Helmet } from 'react-helmet-async';
// sections
import YourDetailsView from 'src/sections/join/your-details-view';

// ----------------------------------------------------------------------

export default function YourDetailsPage() {
  return (
    <>
      <Helmet>
        <title> Join: Your Details </title>
      </Helmet>

      <YourDetailsView />
    </>
  );
}
