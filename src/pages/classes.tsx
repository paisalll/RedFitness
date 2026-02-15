import { Helmet } from 'react-helmet-async';
// sections
import ClassesView from 'src/sections/classes/view/classes-view';

// ----------------------------------------------------------------------

export default function ClassesPage() {
  return (
    <>
      <Helmet>
        <title> Red Fitness: Classes</title>
      </Helmet>

      <ClassesView />
    </>
  );
}
