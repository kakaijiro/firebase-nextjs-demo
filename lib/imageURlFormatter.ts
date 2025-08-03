export default function imageUrlFormatter(imagePath: string) {
  return `https://firebasestorage.googleapis.com/v0/b/fir-nextjs-demo-3f5a3.firebasestorage.app/o/${encodeURIComponent(
    imagePath
  )}?alt=media`;
}
