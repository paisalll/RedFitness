import { Helmet } from 'react-helmet-async';
// sections
import CareerView from 'src/sections/career/view/career-view';
// ----------------------------------------------------------------------

export default function CareerPage() {
  return (
    <>
      <Helmet>
        <title> Red Fitness: Classes</title>
      </Helmet>

      <CareerView />
    </>
  );
}
