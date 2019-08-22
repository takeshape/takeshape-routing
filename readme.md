# takeshape-routing
`takeshape-routing` is a module designed to be used on the frontend of a site generated with [TakeShape](https://www.takeshape.io). It is library agnostic so it can be used with React, Vue, etc.

### Installation
```
npm install --save takeshape-routing
```

### Routing
The `route` function is used to generate links on the client side. It allows you to create links to your static site with content fetched from the [TakeShape GraphQL API](https://www.takeshape.io/docs/using-the-api-endpoint/). It's especially useful when building out dynamic [search](https://www.takeshape.io/docs/search-queries/) or [taxonomy](https://www.takeshape.io/docs/search-queries/) pages. 

`route` is a curried function which consumes the following params
- `config` - Object - The `tsg.yml` config object use `yaml-loader` to import it
- `routeName` - String - The name of the desired route
- `content` - Object - An object containing the properties referenced in the route string

tsg.yml
```yaml
templatePath: src/templates
staticPath: static
buildPath: build

routes:
  post:
    path: /blog/:title/
    template: pages/posts/individual.html
```   

search-result-link.jsx
```js
import {route as createRoute} from 'takeshape-routing';
import config from '../tsg.yml';

const route = createRoute(config);

export default function SearchResultLink({content}) {
  return (
    <a href={route(content._contentTypeName, content)}>{content.title}</a>
  );
}
```

where the `content` prop would be:
```json
{
  "_contentTypeName": "post",
  "title": "How TakeShape Routing Works"
}
```

Rendered HTML:
```html
<a href="/blog/how-takeshape-routing-works">How TakeShape Routing Works</a>
```

### Image URLs
`getImageUrl` converts asset paths into URLs suitable for use in an `<img>` tag.

```js
import {getImageUrl} from 'takeshape-routing';

<img src={getImageUrl('/my/image/path')}/>

<img src={getImageUrl('/my/image/path', {w: 300, h: 250})}/> // image resized to 300x250

```
TakeShape uses [Imgix](https://www.imgix.com/) as its image CDN. 
Imgix provides rich suite of image manipulation capatbilities that are accessible using the second argument of `getImageUrl`.
See [their docs](https://docs.imgix.com/apis/url) for all the possibilites!

### Asset URLs
Not all assets in TakeShape are images and sometimes you just want a simple download link. Use `getAssetUrl` in this case.

```js
import {getAssetUrl} from 'takeshape-routing';

<a href={getAssetUrl('/my/asset/path')} download>Download Me</a>
```
