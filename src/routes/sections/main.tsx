import { lazy, Suspense } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
// layouts
import MainLayout from 'src/layouts/main';
import SimpleLayout from 'src/layouts/simple';
import CompactLayout from 'src/layouts/compact';
import AdminLayout from 'src/layouts/admin';
import BookingLayout from 'src/layouts/booking';
// components
import { SplashScreen } from 'src/components/loading-screen';
// admin auth
import { AdminAuthProvider } from 'src/contexts/admin-auth-context';

// ----------------------------------------------------------------------

export const HomePage = lazy(() => import('src/pages/home'));
const Page500 = lazy(() => import('src/pages/500'));
const Page403 = lazy(() => import('src/pages/403'));
const Page404 = lazy(() => import('src/pages/404'));
const AboutPage = lazy(() => import('src/pages/about-us'));
const ContactPage = lazy(() => import('src/pages/contact-us'));
const ClasessPage = lazy(() => import('src/pages/classes'));
const CareerPage = lazy(() => import('src/pages/career'));
const TimetablePage = lazy(() => import('src/pages/timetable'));
const ClubsPage = lazy(() => import('src/pages/clubs'));
const HighligthPage = lazy(() => import('src/pages/hightligth'));
const ComingSoonPage = lazy(() => import('src/pages/coming-soon'));
const MaintenancePage = lazy(() => import('src/pages/maintenance'));
const SelectClubPage = lazy(() => import('src/pages/select-club'));
const SelectPlanPage = lazy(() => import('src/pages/select-plan'));
const YourDetailsPage = lazy(() => import('src/pages/your-details'));
const PaymentPage = lazy(() => import('src/pages/payment'));
const LoginPage = lazy(() => import('src/pages/login'));

// Admin pages
const AdminLoginPage = lazy(() => import('src/pages/admin/login'));
const AdminDashboardPage = lazy(() => import('src/pages/admin/index'));
const AdminClubsPage = lazy(() => import('src/pages/admin/clubs'));
const AdminClassesPage = lazy(() => import('src/pages/admin/classes'));
const AdminSchedulesPage = lazy(() => import('src/pages/admin/schedules'));
const AdminBannersPage = lazy(() => import('src/pages/admin/banners'));

// ----------------------------------------------------------------------

export const mainRoutes = [
  {
    element: (
      <MainLayout>
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </MainLayout>
    ),
    children: [
      { path: 'membership', element: <AboutPage /> },
      { path: 'classes', element: <ClasessPage /> },
      { path: 'personal-training', element: <ContactPage /> },
      { path: 'highligth', element: <HighligthPage /> },
      { path: 'career', element: <CareerPage /> },
      { path: 'timetable', element: <TimetablePage /> },
      { path: 'clubs', element: <ClubsPage /> },
    ],
  },
  {
    path: 'join',
    element: (
      <BookingLayout>
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </BookingLayout>
    ),
    children: [
      { path: 'select-club', element: <SelectClubPage /> },
      { path: 'select-plan', element: <SelectPlanPage /> },
      { path: 'details', element: <YourDetailsPage /> },
      { path: 'payment', element: <PaymentPage /> },
    ],
  },
  {
    path: 'login',
    element: (
      <BookingLayout>
        <Suspense fallback={<SplashScreen />}>
          <LoginPage />
        </Suspense>
      </BookingLayout>
    ),
  },
  {
    element: (
      <CompactLayout>
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </CompactLayout>
    ),
    children: [
      { path: 'coming-soon', element: <ComingSoonPage /> },
      { path: 'maintenance', element: <MaintenancePage /> },
      { path: '500', element: <Page500 /> },
      { path: '404', element: <Page404 /> },
      { path: '403', element: <Page403 /> },
    ],
  },
  // ─── Admin section ────────────────────────────────────────────────────────
  {
    path: 'rf-admin',
    element: (
      <AdminAuthProvider>
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </AdminAuthProvider>
    ),
    children: [
      { index: true, element: <Navigate to="/rf-admin/login" replace /> },
      { path: 'login', element: <AdminLoginPage /> },
      {
        element: <AdminLayout />,
        children: [
          { path: 'dashboard', element: <AdminDashboardPage /> },
          { path: 'clubs', element: <AdminClubsPage /> },
          { path: 'classes', element: <AdminClassesPage /> },
          { path: 'schedules', element: <AdminSchedulesPage /> },
          { path: 'banners', element: <AdminBannersPage /> },
        ],
      },
    ],
  },
];
