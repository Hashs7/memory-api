import { File } from './file.schema';

export function rewritePath(file: File): string {
  if (file.path.startsWith(process.env.API_BASE_URL)) return file.path;
  return `${process.env.API_BASE_URL}/file/${file.path}`;
}
