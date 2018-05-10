# sshindicator
gnome shell extension for fast open usual ssh connections.


# Edit Connections


Edit file `~/.local/share/gnome-shell/extensions/sshindicator@scaamanho.github.com/extension.js` and
modify the var **data** at end of file


```
let data = [{
		name: "SSH 127.0.0.1",
		host: "127.0.0.1",
		user: "scaamanho",
		options: ["-X"]
	},
	{
		name: "SSH[22] 127.0.0.1",
		host: "127.0.0.1",
		user: "scaamanho",
		options: ["-X"],
		port: 22
	},
	{
		name: "SSH[USR] 127.0.0.1",
		host: "127.0.0.1"
	}];
	```