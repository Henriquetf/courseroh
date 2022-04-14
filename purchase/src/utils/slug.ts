export function generateSlug(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\w- ]/g, '')
    .replace(/[- ]+/g, '-');
}
