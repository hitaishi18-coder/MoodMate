export default function VideoPlayerModal({ videoId, onClose }) {

  // If no video selected, don't render modal
  if (!videoId) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-black rounded-xl overflow-hidden w-full max-w-3xl relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-white text-xl"
        >
          ✕
        </button>

        {/* YouTube Iframe */}
        <iframe
          width="100%"
          height="450"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
