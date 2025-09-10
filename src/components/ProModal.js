import { __ } from '@wordpress/i18n';
import React from 'react';
import { AboutProModal } from '../../../bpl-tools/ProControls';
import { pricingPage } from '../admin/utils/data';

const ProModal = ({ isProModalOpen, setIsProModalOpen }) => {
  return (
    <AboutProModal isProModalOpen={isProModalOpen} setIsProModalOpen={setIsProModalOpen} link={pricingPage}>
      <li>&emsp;<strong>{__('Select Cursor Source: ', 'advanced-scrollbar')}</strong>{__('Choose a predefined or custom cursor style from available options.', 'advanced-scrollbar')}</li>

      <li>&emsp;<strong>{__('Cursor Shape: ', 'advanced-scrollbar')}</strong>{__('Select from various styles to customize the cursor\'s appearance and movement behavior.', 'advanced-scrollbar')}</li>

      <li>&emsp;<strong>{__('Select Cursor Image: ', 'advanced-scrollbar')}</strong>{__('Select an image to customize the cursor appearance.', 'advanced-scrollbar')}</li>

      {/* <li>&emsp;<strong>{__('Show Cursor Options: ', 'advanced-scrollbar')}</strong>{__('Enable or disable different cursor styles to enhance user interaction.', 'advanced-scrollbar')}</li> */}

      <li>&emsp;<strong>{__('Custom URL: ', 'advanced-scrollbar')}</strong>{__('Specify a custom URL or upload an image to personalize the cursor.', 'advanced-scrollbar')}</li>

      <li>&emsp;<strong>{__('Click Effect: ', 'advanced-scrollbar')}</strong>{__('Choose from various dynamic effects like sparkle, starburst, radial, explosion, ripple, and wave to enhance click interactions.', 'advanced-scrollbar')}</li>

    </AboutProModal>
  );
};

export default ProModal;