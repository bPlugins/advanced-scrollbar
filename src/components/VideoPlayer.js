import './VideoPlayer.scss'

const VideoPlayer = ({
  src='',
  width = '100%',
  height = '100%',
}) => {

    function getYouTubeEmbedSrc(youtubeUrl) {
    // Regular expressions to match different YouTube URL formats
    const regExpRegular = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\\&v=)([^#\\&\\?]*).*/;
    const regExpShort = /youtu.be\/([^#\\&\\?]+)/;

    let videoId = '';

    // Try to match regular YouTube URLs
    const match = youtubeUrl.match(regExpRegular);
    if (match && match[2].length === 11) {
      videoId = match[2];
    } else {
      // Try to match short YouTube URLs
      const shortMatch = youtubeUrl.match(regExpShort);
      if (shortMatch && shortMatch[1].length === 11) {
        videoId = shortMatch[1];
      } else {
        // If no match found, return null or throw an error
        return null;
      }
    }

    // Return the embed src URL
    return `https://www.youtube.com/embed/${videoId}`;
  }

  return <devicePixelRatio
    className="asb-video-player"
    style={{ width, height }}
  >
  <div className='asb-admin-video-embed-container'>
      <iframe src={getYouTubeEmbedSrc(src)}
        frameBorder="0"
        allowFullScreen
        style={{ width, height }}
        title="YouTube Video" />
    </div>
  </devicePixelRatio>
  
}

export default VideoPlayer