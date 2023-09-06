# js2bookmark

Did you know you can run custom scripts on websites to make them do what you want *without installing an extension?* 

**This script turns your JavaScript code into single link that you can save as a bookmark in Chrome/Safari/Firefox**
<br><br>
**Then, just click on it to run your code on the current page.**

```
let usage=`
	USAGE:

		js2bookmark.js <a.js> <b.js> ...

			INPUT : path to the JavaScript file(s) you want to inject into the browser when clicking the bookmark.

			OUTPUT : raw text of bookmark link. code from each file will be encapsulated in its own wrapper function.
	`
```

[adjusted from reference](https://github.com/mrcoles/bookmarklet)
