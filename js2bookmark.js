#!/usr/bin/env node

function scriptLoader(code, path, isJQuery) {
  return (
    "" +
    "function callback(){" +
    (isJQuery ? "(function($){var jQuery=$;" : "") +
    code +
    (isJQuery ? "})(jQuery.noConflict(true))" : "") +
    "}" +
    'var s=document.createElement("script");' +
    's.src="' +
    path +
    '";' +
    "if(s.addEventListener){" +
    's.addEventListener("load",callback,false)' +
    "}else if(s.readyState){" +
    "s.onreadystatechange=callback" +
    "}" +
    "document.body.appendChild(s);"
  );
}

function asBookmarklet(code, jQueryPath, customPath) {
  if (customPath) {
    code = scriptLoader(code, customPath, false);
  }

  if (jQueryPath) {
    code = scriptLoader(code, jQueryPath, true);
  }

  code = "(function(){" + code + "})()";
  return "javascript:" + encodeURIComponent(code);
}

let jqpath='https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js'

let args=JSON.parse(JSON.stringify(process.argv))
args=args.slice(2)

let usage=`
USAGE:

        js2bookmark.js <input.js>

		<input.js> : path to the JavaScript file you want to inject into the browser when clicking the bookmark.

	output: raw text of bookmark link
`

if (args.includes('-h') || args.includes('--help') || args.length < 1) {
	console.log(usage);
	process.exit(1);
}

let fs=require('fs')
let script_text=fs.readFileSync(args[0]).toString()
console.log(asBookmarklet(script_text))
