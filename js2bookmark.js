#!/usr/bin/env node

function asBookmarklet(code_array) {
	code = ""
	for (let text of code_array) {
		code = code + "(function(){" + text + "})();";
	}

		code = "(function(){" + code + "})();";
	return "javascript:" + encodeURIComponent(code);
}


function main() {
	let args=JSON.parse(JSON.stringify(process.argv))
	args=args.slice(2)

	let usage=`
	USAGE:

		js2bookmark.js <a.js> <b.js> ...

			INPUT : path to the JavaScript file(s) you want to inject into the browser when clicking the bookmark.

			OUTPUT : raw text of bookmark link. code from each file will be encapsulated in its own wrapper function.
	`

	if (args.includes('-h') || args.includes('--help') || args.length < 1) {
		console.log(usage);
		process.exit(1);
	}

	let fs=require('fs')
	let code_array = []
	for (let a of args) {
		let script_text=fs.readFileSync(a).toString()
		code_array.push(script_text)
	}
	console.log(asBookmarklet(code_array))
}

main()
