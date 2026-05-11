import BlobCursor from './BlobCursor/BlobCursor';
import CursorDot from './CursorDot/CursorDot';
import CursorElastic from './CursorElastic/CursorElastic';
import CursorFollow from './CursorFollow/CursorFollow';

const Cursor = ({ shape={}, domEl = null, eventEl = window, rect = {},isDashboard=false }) => {

  switch (shape?.type) {
    case 'follow':
      return <CursorFollow shape={shape.type} {...shape?.follow} domEl={domEl}/>;
    case 'blob':
      return <BlobCursor {...shape.blob} domEl={domEl} eventEl={eventEl} rect={rect} isDashboard={isDashboard} />;
    case 'dot':
      return <CursorDot {...shape.dot} domEl={domEl} />;
    case 'elastic':
      return <CursorElastic {...shape.elastic} domEl={domEl} />;
    default:
      return null;
  }
};

export default Cursor;