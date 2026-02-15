import { Helmet } from 'react-helmet-async';
// sections
import CLubsView from 'src/sections/clubs/view/clubs-view';
// ----------------------------------------------------------------------

export default function ClubsPage() {
  return (
    <>
      <Helmet>
        <title> Red Fitness: Clubs</title>
      </Helmet>

      <CLubsView />
    </>
  );
}
