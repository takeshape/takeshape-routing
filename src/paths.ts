import slug from 'slugg';
import get from 'lodash/get';
import toPath from 'lodash/toPath';
import curry from 'lodash/curry';

const nameGroup = '([a-zA-Z][a-zA-Z0-9.]*)';
const variableRegex = new RegExp(':' + nameGroup + '|{' + nameGroup + '}', 'g');

export interface PathResult {
  warnings: string[];
  path: string;
}

export type PathContext = Record<string, any> | string | number; // eslint-disable-line @typescript-eslint/no-explicit-any

export function formatPath(pathStr: string, data: PathContext): PathResult {
  const result: PathResult = {
    warnings: [],
    path: ''
  };
  result.path = pathStr.replace(
    variableRegex,
    (_, colon, curly): string => {
      const type = typeof data;

      const propPath: string = colon || curly;
      if (type === 'object') {
        const value = String(get(data, propPath) || '');
        if (value === '') {
          result.warnings.push(propPath);
        }
        return slug(value);
      }

      if (propPath === 'num' || propPath === 'value') {
        return slug(String(data));
      }

      result.warnings.push(propPath);
      return '';
    }
  );
  return result;
}

export interface TSGRoutesConfig {
  routes: {[key: string]: {path: string}};
}

export const route = curry(
  (config: TSGRoutesConfig, routeName: string, data: PathContext): string => {
    const path = get(config, ['routes'].concat(toPath(routeName), 'path'));
    return formatPath(path, data).path;
  }
);
