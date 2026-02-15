import { Helmet } from 'react-helmet-async';
// sections
import LoginView from 'src/sections/login/view';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> RedFitness: Login</title>
      </Helmet>

      <LoginView />
    </>
  );
}
