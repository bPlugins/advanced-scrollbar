import { isSet } from '../../../../utils/common';
import './style.scss';
const Starburst = ({ duration = 1, size = 60, color ='#ff9a8b'}) => {


  const styles = {
    ...(isSet(size) && { "--bPl-spark-starburst-size": size+'px' }),
    ...(isSet(duration) && { "--bPl-spark-starburst-transition-duration": duration + 's' }),
    ...(isSet(color) && { "--bPl-spark-starburst-color": color })
    };
  return <div style={styles} className="spark-starburst-container">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="starburst-line"
            style={{ transform: `rotate(${i * 45}deg)` }}
          />
        ))}
      </div>
};

export default Starburst;