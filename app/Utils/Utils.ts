export function extractS3KeyFromUrl(s3Url: string): string {
  // Remove any query parameters
  const noQuery = s3Url.split("?")[0];

  // Parse as a standard URL
  const urlObj = new URL(noQuery);

  // urlObj.pathname might look like "/uploads/images/abc.jpg"
  // Remove the leading slash if present
  const key = urlObj.pathname.replace(/^\/+/, "");
  return key;
}

export function generateId() {
  return Math.random().toString(36).substring(2, 9);
}
