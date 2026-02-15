import { Helmet } from 'react-helmet-async';
// sections
import TimetableView from 'src/sections/timetable/view/timetable-view';
// ----------------------------------------------------------------------

export default function TimetablePage() {
  return (
    <>
      <Helmet>
        <title> Red Fitness: Time Table</title>
      </Helmet>

      <TimetableView />
    </>
  );
}
