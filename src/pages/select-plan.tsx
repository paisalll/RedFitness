import { Helmet } from 'react-helmet-async';
// sections
import SelectPlanView from 'src/sections/join/select-plan-view';

// ----------------------------------------------------------------------

export default function SelectPlanPage() {
  return (
    <>
      <Helmet>
        <title> Join: Select Plan</title>
      </Helmet>

      <SelectPlanView />
    </>
  );
}
