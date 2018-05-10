# SSH Indicator 2.0
gnome shell extesion for fast open usual ssh connections.

## Edit Connections
While I get enought time to create a GUI that allow manage connections you can manage them in **old-school** way:

Edit file `~/.local/share/gnome-shell/extensions/sshindicator@scaamanho.github.com/extension.js` and
modify the variable **data** at end of file to create new connections

### Connection parameters

* **name** : connection name
* **host** : ip or host domain
* **user** : user to connect to remote host [optional]
* **options** : ssh client options [optional]
* **port**: host port [optional]

``` javascript
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