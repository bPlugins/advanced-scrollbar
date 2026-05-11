import Playground from './Playground/Playground';
import Settings from './Settings/Settings';
import './style.scss';
const CursorEffect = (props) => {


  return (
      <div className='custom-cursor-container'>
        <div className='custom-cursor-content-wrapper'>
          <Settings {...props} />
          <Playground {...props} />
        </div>
      </div>
  );
};

export default CursorEffect;