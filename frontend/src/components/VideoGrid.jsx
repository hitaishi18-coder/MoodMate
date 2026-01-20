export default function VideoGrid({ videos, onVideoSelect }) {

  // If no videos yet
  if (!videos || videos.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500">
        No videos found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

      {videos.map((video) => {
        const videoId = video.id.videoId;
        const snippet = video.snippet;

        return (
          <div
            key={videoId}
            onClick={() => onVideoSelect(videoId)}
            className="
              cursor-pointer
              bg-white dark:bg-zinc-900
              border border-gray-200 dark:border-zinc-800
              rounded-lg overflow-hidden
              shadow-sm
              transition-all duration-200
              hover:shadow-lg hover:-translate-y-1
            "
          >
            {/* Thumbnail */}
            <img
              src={snippet.thumbnails.medium.url}
              alt={snippet.title}
              className="w-full h-48 object-cover"
            />

            {/* Title */}
            <div className="p-4">
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 line-clamp-2">
                {snippet.title}
              </p>

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {snippet.channelTitle}
              </p>
            </div>
          </div>
        );
      })}

    </div>
  );
}
