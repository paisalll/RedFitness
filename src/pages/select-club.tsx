import { Helmet } from 'react-helmet-async';
// sections
import SelectClubView from 'src/sections/join/select-club-view';

// ----------------------------------------------------------------------

export default function SelectClubPage() {
  return (
    <>
      <Helmet>
        <title> Join: Select Club</title>
      </Helmet>

      <SelectClubView />
    </>
  );
}
