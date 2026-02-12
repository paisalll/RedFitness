import { Helmet } from 'react-helmet-async';
// sections
import { ContactView } from 'src/sections/contact/view';

// ----------------------------------------------------------------------

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title> Red Fitness: Personal Training</title>
      </Helmet>

      <ContactView />
    </>
  );
}
