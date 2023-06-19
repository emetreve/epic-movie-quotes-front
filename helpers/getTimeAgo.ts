const getTimeAgo = (timestamp: string) => {
  const currentTime = Math.floor(Date.now() / 1000);
  const parsedTimestamp = Math.floor(Date.parse(timestamp) / 1000);

  const diffInSeconds = currentTime - parsedTimestamp;

  if (diffInSeconds < 60) {
    return `${diffInSeconds} sec ago`;
  } else if (diffInSeconds < 3600) {
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    return `${diffInMinutes} min ago`;
  } else if (diffInSeconds < 86400) {
    const diffInHours = Math.floor(diffInSeconds / 3600);
    const remainingMinutes = Math.floor((diffInSeconds % 3600) / 60);
    return `${diffInHours} hr ${remainingMinutes} min ago`;
  } else {
    const diffInDays = Math.floor(diffInSeconds / 86400);
    return `${diffInDays} days ago`;
  }
};
export { getTimeAgo };
