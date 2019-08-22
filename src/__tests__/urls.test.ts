import {getImageUrl, getAssetUrl, imageBaseUrl, assetBaseUrl} from '../urls';

test('getAssetUrl', (): void => {
  expect(getAssetUrl('path/to/asset')).toBe(`${assetBaseUrl}/path/to/asset`);
});

test('getAssetUrl - finds path if object is passed in', (): void => {
  expect(getAssetUrl({path: 'path/to/asset'})).toBe(`${assetBaseUrl}/path/to/asset`);
  expect(getAssetUrl({s3Key: 'path/to/asset'})).toBe(`${assetBaseUrl}/path/to/asset`);
});

test('getAssetUrl - with path undefined', (): void => {
  expect(getAssetUrl('')).toBe('');
});

test('getImageUrl', (): void => {
  expect(getImageUrl('path/to/image')).toBe(`${imageBaseUrl}/path/to/image`);
});

test('getImageUrl - finds path if object is passed in', (): void => {
  expect(getImageUrl({path: 'path/to/image'})).toBe(`${imageBaseUrl}/path/to/image`);
  expect(getImageUrl({s3Key: 'path/to/image'})).toBe(`${imageBaseUrl}/path/to/image`);
});

test('getImageUrl - with path undefined', (): void => {
  expect(getImageUrl('')).toBe('');
});

test('getImageUrl - with params', (): void => {
  const params = {
    w: 100,
    'min-h': 200,
    crop: 'faces'
  };
  expect(getImageUrl('path/to/image', params)).toBe(`${imageBaseUrl}/path/to/image?crop=faces&min-h=200&w=100`);
});

test('getImageUrl - with params - remove empty params', (): void => {
  const params1 = {
    foo: '',
    bar: ''
  };
  expect(getImageUrl('path/to/image', params1)).toBe(`${imageBaseUrl}/path/to/image`);

  const params2 = {
    foo: '',
    bar: '',
    baz: true,
    qux: 0
  };
  expect(getImageUrl('path/to/image', params2)).toBe(`${imageBaseUrl}/path/to/image?baz=true&qux=0`);
});

test('getImageUrl - object with params', (): void => {
  const params = {
    w: 100,
    'min-h': 200,
    crop: 'faces'
  };
  expect(getImageUrl({s3Key: 'path/to/image'}, params)).toBe(
    `${imageBaseUrl}/path/to/image?crop=faces&min-h=200&w=100`
  );
});

test('getImageUrl - path undefined', (): void => {
  const params = {
    w: 100,
    'min-h': 200,
    crop: 'faces'
  };
  expect(getImageUrl('', params)).toBe('');
});

test('getImageUrl - path with spaces', (): void => {
  expect(getImageUrl('path with/ spaces/woo')).toBe(`${imageBaseUrl}/path%20with/%20spaces/woo`);
});
