/* eslint-disable no-template-curly-in-string */
import {formatPath, route} from '../paths';

test('formatPath - no variables', (): void => {
  expect(formatPath('a/b/c', {foo: 'bar'}).path).toBe('a/b/c');
});

test('formatPath - a single variable is replaced', (): void => {
  const data = {
    title: 'Foo Bar'
  };
  expect(formatPath('pages/:title', data).path).toBe('pages/foo-bar');
});

test('formatPath - a multiple variables is replaced', (): void => {
  const data = {
    title: 'Foo Bar',
    category: 'Programming'
  };
  expect(formatPath('pages/:category/:title', data).path).toBe('pages/programming/foo-bar');
});

test('formatPath - variables can be paths', (): void => {
  const data = {
    title: 'Foo Bar',
    category: {
      title: 'Programming'
    }
  };
  expect(formatPath('pages/:category.title/:title', data).path).toBe('pages/programming/foo-bar');
});

test('formatPath - variables do not need to be whole path components', (): void => {
  const data = {
    num: 10
  };
  expect(formatPath('posts/page-:num', data).path).toBe('posts/page-10');
});

test('formatPath - variables template curly', (): void => {
  const data = {
    num: 10
  };
  expect(formatPath('sitemap-{num}.xml', data).path).toBe('sitemap-10.xml');
});

test('formatPath - variables template curly path', (): void => {
  const data = {
    title: 'Foo Bar',
    category: {
      title: 'Programming'
    }
  };
  expect(formatPath('pages/{category.title}/:title', data).path).toBe('pages/programming/foo-bar');
});

test('formatPath - num can accept a number as data', (): void => {
  expect(formatPath('posts/page-:num', 10).path).toBe('posts/page-10');
});

test('formatPath - value can accept a string as data', (): void => {
  expect(formatPath('posts/page-:value', 'ten').path).toBe('posts/page-ten');
});

test('formatPath - escapes punctuation', (): void => {
  expect(formatPath('posts/:value', 'foo:Bar.baz').path).toBe('posts/foo-bar-baz');
});

test('formatPath - warnings', (): void => {
  const {path, warnings} = formatPath('posts/:bogus', {a: 'foo'});
  expect(path).toBe('posts/');
  expect(warnings).toEqual(['bogus']);
});

test('formatPath - warnings string as data', (): void => {
  const {path, warnings} = formatPath('posts/:bogus', 'foo');
  expect(path).toBe('posts/');
  expect(warnings).toEqual(['bogus']);
});

test('route', (): void => {
  const config = {
    routes: {
      post: {
        path: 'posts/:title'
      }
    }
  };
  expect(route(config, 'post', {title: 'a'})).toBe('posts/a');
});

test('route - nested', (): void => {
  const config = {
    routes: {
      post: {
        path: 'posts/:title',
        paginate: {
          path: 'posts/page-:num'
        }
      }
    }
  };
  expect(route(config, 'post.paginate', 10)).toBe('posts/page-10');
});
