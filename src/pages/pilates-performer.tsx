import { Helmet } from 'react-helmet-async';
// sections
import PilatesPerformerView from 'src/sections/pilates-performer/view/pilates-performer-view';

// ----------------------------------------------------------------------

export default function PilatesPerformerPage() {
  return (
    <>
      <Helmet>
        <title>Red Fitness: Pilates Performer</title>
      </Helmet>

      <PilatesPerformerView />
    </>
  );
}
