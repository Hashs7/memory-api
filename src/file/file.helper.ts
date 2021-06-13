import { File } from './file.schema';

export function rewritePath(file: File): string {
  if (process.env.NODE_ENV === 'production') {
    if (file.path.endsWith(process.env.AZURE_STORAGE_SAS_KEY)) return file.path;
    return `${file.path}${process.env.AZURE_STORAGE_SAS_KEY}`;
  }
  if (file.path.startsWith(process.env.API_BASE_URL)) return file.path;
  return `${process.env.API_BASE_URL}/file/${file.path}`;
}

export function unwritePath(file: File): string {
  if (process.env.NODE_ENV === 'production') {
    return file.path;
  }
  return file.path.split(`${process.env.API_BASE_URL}/file/`)[1];
}
