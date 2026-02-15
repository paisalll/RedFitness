import { Helmet } from 'react-helmet-async';
// sections
import HightligthsView from 'src/sections/highlights/view/highlights-view';

// ----------------------------------------------------------------------

export default function HighligthsPage() {
  return (
    <>
      <Helmet>
        <title> Red Fitness: Highligths</title>
      </Helmet>

      <HightligthsView />
    </>
  );
}
