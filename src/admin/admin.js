import { createRoot } from 'react-dom/client';
// import AppContainer from './Index';
import { options } from './options';

import '../../../bpl-tools/Admin/style.scss';

import './admin.scss';
import App from './App';
import { dashboardInfo } from './utils/data';

document.addEventListener('DOMContentLoaded', () => {
  const adminEl = document.getElementById('csbScrollbarDashboard');
  const dataInfo = JSON.parse(adminEl.dataset.info);

  createRoot(adminEl).render(<App settingOptions={options} {...dashboardInfo(dataInfo)} />);
});