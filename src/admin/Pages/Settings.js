import { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';

import useWPAjax from '../../../../bpl-tools/hooks/useWPAjax';

const Settings = ({ deleteDataOnUninstall, uninstallNonce }) => {
  const [enabled, setEnabled] = useState(deleteDataOnUninstall);
  const [notice, setNotice] = useState('');

  const { data, saveData, isLoading, error } = useWPAjax('casbSaveUninstallOption', { nonce: uninstallNonce }, false);

  useEffect(() => {
    if (data) {
      setEnabled(data.enabled);
      setNotice(data.message);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setNotice(__('Failed to save setting.', 'advanced-scrollbar'));
    }
  }, [error]);

  const handleToggle = () => {
    const newValue = !enabled;

    // Show confirm dialog when enabling (destructive action)
    if (newValue) {
      const confirmed = window.confirm(
        __('Are you sure? This will permanently delete all Advanced Scrollbar settings, cursor effect data, and post meta when the plugin is uninstalled.', 'advanced-scrollbar')
      );

      if (!confirmed) return;
    }

    setNotice('');
    saveData({ enabled: String(newValue) });
  };

  return <div className='bPlDashboardSettings bPlDashboardCard'>
    <h2>{__('Delete Data on Uninstall', 'advanced-scrollbar')}</h2>

    <p>{__('When enabled, all plugin data will be permanently deleted when you uninstall (delete) the plugin. This includes:', 'advanced-scrollbar')}</p>

    <ul>
      <li>{__('Scrollbar appearance settings', 'advanced-scrollbar')}</li>
      <li>{__('Custom cursor and click effect settings', 'advanced-scrollbar')}</li>
      <li>{__('Per-page/post cursor effect meta data', 'advanced-scrollbar')}</li>
    </ul>

    <p className='settingsWarning'>
      {__('⚠️ This action cannot be undone. Your data will be safe if you only deactivate the plugin.', 'advanced-scrollbar')}
    </p>

    <div className='settingsControl'>
      <label className='toggleControl'>
        <input type='checkbox' checked={enabled} onChange={handleToggle} disabled={isLoading} />

        <span className='toggleSlider' />
      </label>

      <span className='toggleLabel'>
        {enabled
          ? __('Data will be deleted on uninstall', 'advanced-scrollbar')
          : __('Data will be preserved on uninstall', 'advanced-scrollbar')
        }
      </span>
    </div>

    {notice && <div className={`settingsNotice ${enabled ? 'warning' : 'success'}`}>{notice}</div>}
  </div>;
};
export default Settings;