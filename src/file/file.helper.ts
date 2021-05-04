import { File } from './file.schema';

export function rewritePath(file: File): string {
  return `${process.env.API_BASE_URL}/file/${file.path}`;
}
