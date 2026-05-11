import { Toaster } from 'react-hot-toast';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import BPLSettings from '../settings/BPLSettings';
import Layout from './Layout/Layout';
import CursorEffect from './Pages/CursorEffect/CursorEffect';
import Pricing from '../../../bpl-tools/Admin/Pricing';
import OurPlugins from './../../../bpl-tools/Admin/OurPlugins';
import Activation from '../../../bpl-tools/Admin/Activation';
import FeatureCompare from '../../../bpl-tools/Admin/FeatureCompare';
// import Welcome from './Pages/Welcome';
import { pricingInfo } from './utils/data';
import Welcome from './Pages/Welcome';

const App = ({ settingOptions, ...props }) => {
  const { version = "", isPremium = false, nonce, hasPro = false } = props;
  return (
    <HashRouter>
      <Toaster position="bottom-center" />
      <Routes>
        <Route path='/' element={<Layout {...props} />}>
          <Route index element={<Navigate to="welcome" replace />} />
          <Route path="welcome" element={<Welcome {...props} >
          </Welcome>} />

          <Route path="settings" element={<BPLSettings isPremium={isPremium} options={settingOptions} nonce={nonce} hasPro={hasPro} />} />

          <Route path="custom-cursor" element={<CursorEffect {...props} version={version} />} />

          {!isPremium && <Route path="pricing" element={<Pricing {...props} pricingInfo={pricingInfo} />} />}

          {!isPremium && <Route path="feature-comparison" element={<FeatureCompare plans={["free", "pro"]} {...props} />} />}

          {hasPro && <Route path='activation' element={<Activation {...props} />} />}

          <Route path='our-plugins' element={<OurPlugins {...props} />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App;