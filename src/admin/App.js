import { Toaster } from 'react-hot-toast';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import BPLSettings from '../settings/BPLSettings';
import Layout from './Layout/Layout';
import CursorEffect from './Pages/CursorEffect/CursorEffect';
import Pricing from '../../../bpl-tools/Admin/Pricing';
import OurPlugins from './../../../bpl-tools/Admin/OurPlugins';
import FeatureCompare from '../../../bpl-tools/Admin/FeatureCompare';
import { pricingInfo } from './utils/data';
import Welcome from './Pages/Welcome';
import Settings from './Pages/Settings';

const App = ({ settingOptions, ...props }) => {
  const { version = "", nonce } = props;
  return (
    <HashRouter>
      <Toaster position="bottom-center" />
      <Routes>
        <Route path='/' element={<Layout {...props} />}>
          <Route index element={<Navigate to="welcome" replace />} />
          <Route path="welcome" element={<Welcome {...props} >
          </Welcome>} />

          <Route path="scrollbar-settings" element={<BPLSettings options={settingOptions} nonce={nonce} />} />

          <Route path="custom-cursor" element={<CursorEffect {...props} version={version} />} />

          <Route path="pricing" element={<Pricing {...props} pricingInfo={pricingInfo} />} />

          <Route path="feature-comparison" element={<FeatureCompare plans={["free", "pro"]} {...props} />} />

          <Route path="settings" element={<Settings {...props} />} />

          <Route path='our-plugins' element={<OurPlugins {...props} />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App;