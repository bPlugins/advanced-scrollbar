import { Toaster } from 'react-hot-toast';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import Welcome from '../../../bpl-tools/Admin/Overview/Overview';
import BPLSettings from '../settings/BPLSettings';
import Layout from './Layout/Layout';
import CursorEffect from './Pages/CursorEffect/CursorEffect';
import Pricing from '../../../bpl-tools/Admin/Pricing/Pricing';
// import Welcome from './Pages/Welcome';
import PopularPlugin from './Pages/PopularPlugin/PopularPlugin';
import { Button } from '../../../bpl-tools/Components';
import { pricingInfo, pricingPage } from './utils/data';

const App = ({ settingOptions, ...props }) => {
  const { version = "", isPremium = false } = props;

  return (
    <HashRouter>
      <Toaster position="bottom-center" />
      <Routes>
        <Route path='/' element={<Layout {...props} />}>
          <Route index element={<Navigate to="/welcome" replace />} />
          <Route path="/welcome" element={<Welcome {...props} >
            <Button href={pricingPage} target='' rel='noopener noreferrer' variant='secondary'>Buy Now</Button>
          </Welcome>} />

          <Route path="/settings" element={<BPLSettings isPremium={isPremium} options={settingOptions} />} />

          <Route path="/custom-cursor" element={<CursorEffect {...props} version={version} />} />

          <Route path="/pricing" element={<Pricing {...props} pricingInfo={pricingInfo} >
            <h1 className='csb-pricing-title'>One-time payment, lifetime access</h1>
          </Pricing>} />
          
          <Route path="/popularPlugin" element={<PopularPlugin {...props} version={version} />} />
          {/* When no routes match, it will redirect to this route path. Note that it should be registered above. */}
          <Route path="*" element={<Navigate to="/welcome" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App;