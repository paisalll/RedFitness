import { Helmet } from 'react-helmet-async';
// sections
import { AboutView } from 'src/sections/about/view';

// ----------------------------------------------------------------------

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title> Red Fitness: Membership</title>
      </Helmet>

      <AboutView />
    </>
  );
}
