import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

import { useSelector } from 'react-redux';
// routes
import routes from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';

// ----------------------------------------------------------------------

export default function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const routing = useRoutes(routes(userInfo));

  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Suspense fallback={<div>Loading...</div>}>{routing}</Suspense>
    </ThemeConfig>
  );
}
