import queryString from 'query-string';
import pickBy from 'lodash/pickBy';
export const imageBaseUrl = 'https://images.takeshape.io';
export const assetBaseUrl = 'https://assets.takeshape.io';

export type AssetPath = string | {path: string} | {s3Key: string};

export interface UrlOptions {
  baseUrl?: string;
}

export type ImgixParamValue = string | boolean | number;
export type ImgixParams = Record<string, ImgixParamValue>;

export function getPath(key: AssetPath): string {
  return typeof key === 'object' ? ('path' in key ? key.path : key.s3Key) : key;
}

function formatQuery(query?: ImgixParams): string {
  if (query) {
    const filtered = pickBy(query, (value: ImgixParamValue): boolean => value !== '');
    if (Object.keys(filtered).length) {
      return '?' + queryString.stringify(filtered);
    }
  }
  return '';
}

function escapePath(path: string): string {
  return path
    .split('/')
    .map(encodeURIComponent)
    .join('/');
}

export function getAssetUrl(s3Key: AssetPath, options: UrlOptions = {}): string {
  const path = getPath(s3Key);
  const baseUrl = options.baseUrl || assetBaseUrl;
  return path ? `${baseUrl}/${escapePath(path)}` : '';
}

export function getImageUrl(key: AssetPath, query?: ImgixParams, options: UrlOptions = {}): string {
  const path = getPath(key);
  const baseUrl = options.baseUrl || imageBaseUrl;
  return path ? `${baseUrl}/${escapePath(path)}${formatQuery(query)}` : '';
}
