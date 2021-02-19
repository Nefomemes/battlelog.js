## How the API works
Alright, so basically it works like this. You open Battlelog, go to a page you wish. And that's it. Thhat's the endpoint. Easy peasy.

### But how I will be able to get the JSON output? It will just return barebones HTML.

Add these headers.
```
X-Requested-With: XMLHttpRequest
X-AjaxNavigation: 1
```

