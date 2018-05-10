/* 
copyright 2015-2018 Santiago Caamaño <scaamanho@gmail.com>
hereby released under the GNU license.

SSH Indicator 2.0
*/

imports.gi.versions.St = "1.0";

const St = imports.gi.St;
const GLib = imports.gi.GLib;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const Util = imports.misc.util;
const Main = imports.ui.main;

class SSHIndicator extends PanelMenu.Button {

	constructor() {
		super(St.Align.START);

		let box = new St.BoxLayout();

		let icon = new St.Icon({
				icon_name: 'bash',
				style_class: 'system-status-icon'
		});
		box.add(icon);
		this.actor.add_child(box);

		let _self = this;
		getData().forEach(function (item) {
				let mitem = buildSSHMenuItem(item);
				_self.menu.addMenuItem(mitem);
		});
	}
}

let _shhIndicator;

//Called when extension is initialized
function init() {}

//Called when enable extension
function enable() {
	_shhIndicator = new SSHIndicator();
	//Main.panel.addToStatusArea('SSH Indicator', powerCommandsButton, 0, 'right');
	Main.panel.addToStatusArea('SSH Indicator', _shhIndicator, 1, 'center');
}

//Called when disable extension
function disable() {
	_shhIndicator.destroy();
}

function buildSSHMenuItem(item) {
	let mitem = new PopupMenu.PopupMenuItem(item.name);
	mitem.connect('activate', () => {
		try 
		{
			//Build command execution line from item configuration
			let command_line = new Array();
			command_line.push("gnome-terminal");
			command_line.push("--");
			command_line.push("ssh");

			if(item.options)
				item.options.forEach(function(option){
					command_line.push(option);
				});
								
			if(item.port &&  item.port != "")
			{
				command_line.push("-p");
				command_line.push(item.port+"");
			}

			if(item.user && item.user != "")
				command_line.push(item.user+"@"+item.host);
			else
				command_line.push(item.host);
			
			//debugCmdLine(command_line);
			//Execute command line builded from item
			GLib.spawn_sync(null, command_line , null, GLib.SpawnFlags.SEARCH_PATH, null);
		} catch (err) {
			log(err);
		}
	});
	return mitem;
}

function debugCmdLine(cmdLine){
	let command ="";
	command_line.forEach (function (item) {
		command = command + " " + item;
	});
	log(command);
}


function getData() {
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
	return data;
}


/*let argv = [];
argv = ["gnome-terminal", "-e", "bash -c " + GLib.shell_quote(activeLine.bash + "; exec bash")];
let [success, pid] = GLib.spawn_async(
   null, argv, null, GLib.SpawnFlags.SEARCH_PATH | GLib.SpawnFlags.DO_NOT_REAP_CHILD, null);

 if (success) {
   GLib.child_watch_add(GLib.PRIORITY_DEFAULT_IDLE, pid, function() {
     if (activeLine.refresh === "true")
       button.update();
	 });
	 
try {
		//let [success, argv] = GLib.shell_parse_argv(command_line);
		//trySpawn(argv);
		GLib.spawn_sync(null, ["gksu", "systemctl", "restart", "network-manager.service"], null, GLib.SpawnFlags.SEARCH_PATH, null);
} catch (err) {
		//_handleSpawnError(command_line, err);
		log(err)
}
*/