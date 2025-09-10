import { useState } from 'react';
import Playground from './Playground/Playground';
import Settings from './Settings/Settings';
import './style.scss';
import ProModal from '../../../components/ProModal';
const CursorEffect = (props) => {
  const { isPremium = false } = props;
  const [isProModalOpen, setIsProModalOpen] = useState(false)


  return (
      <div className='custom-cursor-container'>
        <ProModal isProModalOpen={isProModalOpen} setIsProModalOpen={setIsProModalOpen} />
        <div className='custom-cursor-content-wrapper'>
          <Settings {...{ ...props, isProModalOpen, setIsProModalOpen,isPremium }} />
          <Playground {...props} />
        </div>
      </div>
  );
};

export default CursorEffect;