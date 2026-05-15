import { Helmet } from 'react-helmet-async';
// sections
import RedSeitaiView from 'src/sections/red-seitai/view/red-seitai-view';

// ----------------------------------------------------------------------

export default function RedSeitaiPage() {
  return (
    <>
      <Helmet>
        <title>Red Fitness: Red Seitai Therapy</title>
      </Helmet>

      <RedSeitaiView />
    </>
  );
}
