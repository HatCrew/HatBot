process.title = 'HatBot';
var userName = "BotNameHere";
var tripCode = "BotPasswordHere";
var room = "programming";
var HackChat = require("hack-chat");
var fs = require("fs");
var control = true;
var decache = require('decache');
var trips = require("./trips.json");
var afk = [];
var afkd = -1;
var chat = new HackChat.Session(room, (userName + "#" + tripCode));
var SHA1 = require('sha1');
var bcrypt = require('bcryptjs');
var lastMessage = new Date().getTime();

function getBotTime() {
hour = new Date().getHours();
mins = new Date().getMinutes();
secs = new Date().getSeconds();

if (hour < 10) {
hour = "0" + hour;
}
if (mins < 10) {
mins = "0" + mins;
}
if (secs < 10) {
secs = "0" + secs;
}
return (hour + ":" + mins + ":" + secs);
}

//saveSend function borrowed from Rhondo's bot... which no longer exists on GitHub...
function saveSend(message, latexify) {
lastMessage = new Date().getTime();
if (latexify != 0) {
message = message.replace(/~/g, "\\ ");
message = message.replace(/\^/g, "\\ ");
message = message.replace(/\\/g, "\\ ");
message = message.replace(/ /g, "\\ ");
message = message.replace(/_/g, "\\ ");
message = message.replace(/\?/g, "? ");
message = message.replace(/{/g, "");
message = message.replace(/}/g, "");
if (latexify === 1) {
	message = message.replace(/\\\\/g, "\\");
	message = message.replace(/\$/g, "\\$");
	message = message.replace(/\>/g, "\\>");
	message = message.replace(/\</g, "\\<");
	message = message.replace(/#/g, "\\#");
	message = message.replace(/%/g, "\\%");
	message = message.replace(/&/g, "\\&");
} else {
	message = message.replace(/\|/g, "\\ ");
	message = message.replace(/\$/g, "\\ ");
	message = message.replace(/\>/g, "\\ ");
	message = message.replace(/\</g, "\\ ");
	message = message.replace(/#/g, "\\ ");
	message = message.replace(/%/g, "\\ ");
	message = message.replace(/&/g, "\\ ");
	message = message.replace(/\\/g, "\\ ");
}
}

if (latexify === 1) {

message = "$" + message + " $";

d = 0;
for (i = 0; i < message.length; i++) {
	d++;
	if (d > 80 && message.substring(i, i + 1) === " ") {
		message = message.substring(0, i) + " $ \n $ ~ " + message.substring(i + 1, message.length)
		d = 0;
	}
}
} else if (latexify === 2) {
message = "$\\text\{" + message + "\}$";
} else if (latexify === 3) {
message = "$\\tiny\{\\text\{" + message + "\}\}$";
} else if (latexify === 4) {
message = "$\\small\{\\text\{" + message + "\}\}$";
} else if (latexify === 5) {
message = "$\\large\{\\text\{" + message + "\}\}$";
} else if (latexify === 6) {
message = "$\\huge\{\\text\{" + message + "\}\}$";
}
chat.sendMessage(message);
}

//This is a crappy way of doing this... but it works well enough
chat.on("nicknameTaken", function(time) {
chat.leave()
var userName = "HatBot_";
chat = new HackChat.Session(room, (userName + "#" + tripCode));
});

chat.on("chat", function(nick, text, time, isAdmin, trip) {
	if (lastMessage - new Date().getTime() < -4000 && nick != userName && control) {

	for (g = 0; g < afk.length; g++) {
		if (afk[g] === nick) {
			afkd = g;	
		}
	}

	if (afkd === -1) {
		if (text.indexOf("`afk") > -1) {
			afk.push(nick);
			afkd = -1;
			return saveSend("USER @" + nick + " IS NOW AFK.", 0);
		}
	}

	if (afkd > -1) {
		afk.splice(afkd, 1);
		afkd = -1;
		return saveSend("USER @" + nick + " IS NO LONGER AFK.", 0);
	}

	afkd = -1;
	
	if (text.toLowerCase() == "`bacon") {
		return saveSend("     __      _.._\n  .-'__`-._.'.--.'.__.,\n /--'  '-._.'    '-._./\n/__.--._.--._.'``-.__/\n'._.-'-._.-._.-''-..'    @bacon <3333333333333", 0);
	}
	
	if (text.toLowerCase() == "`xin7ax") {
		return saveSend("@XIN7AX is cool. Also, he does stuff with drums or something... and was ghostman for quite a while.", 0);
	}
	
	if (text.toLowerCase() == "`version" || text.toLowerCase() == "`about" | text.toLowerCase() == "`author") {
		return saveSend("HatBot (Small Edition)| Version 1.0.0 | Created by BlackHat", 0);
	}
	
	if (text.toLowerCase() == "`rhondonize") {
		return saveSend("  _____  _    _  ____  _   _ _____   ____  _   _ _____ ____________ \n |  __ \\| |  | |/ __ \\| \\ | |  __ \\ / __ \\| \\ | |_   _|___  /  ____|\n | |__) | |__| | |  | |  \\| | |  | | |  | |  \\| | | |    / /| |__   \n |  _  /|  __  | |  | | . ` | |  | | |  | | . ` | | |   / / |  __|  \n | | \\ \\| |  | | |__| | |\\  | |__| | |__| | |\\  |_| |_ / /__| |____ \n |_|  \\_\\_|  |_|\\____/|_| \\_|_____/ \\____/|_| \\_|_____/_____|______|", 0);
	}
	
	if (text.toLowerCase() == "`password") {
			var passlength = 10,
			passcharset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
			passRetVal = "";
			for (var i = 0, n = passcharset.length; i < passlength; ++i) {
				passRetVal += passcharset.charAt(Math.floor(Math.random() * n));
			}


		return saveSend("Here is a randomly generated password: " + passRetVal, 0);
	}

	if (text.toLowerCase() == "`nanotech") {
		return saveSend("'my server.js is smaller than yours so it's more minimalistic.' - @nanotech, 2016'", 0);
	}
	
	if (text.toLowerCase() == "`sha1") {
		return saveSend("Usage:\n`SHA1 (phrase)", 0);
	} else if (text.substring(0, 6).toLowerCase() == "`sha1 ") {
		var tosha1 = SHA1(text.substring(6, text.length).trim());
		if (text.substring(6, text.length).trim() == "") {
			return saveSend("Usage:\nSHA1 (phrase)", 0);
		} else {
			return saveSend("HASH: " + tosha1, 0);
		}
	}
	
	if (text.toLowerCase() == "`bcrypt") {
		return saveSend("Usage:\n`bcrypt (phrase)", 0);
	} else if (text.substring(0, 8) == "`bcrypt " || text.substring(0, 8) == "`BCRYPT ") {
		bcrypt.genSalt(10, function(err, salt) {
			if (text.substring(8, text.length).trim() == "") {
				return saveSend("Usage:\n`bcrypt (phrase)", 0);
			} else {
				var tobcrypt = text.substring(8, text.length).trim();
				bcrypt.genSalt(10, function(err, salt){
					bcrypt.hash(tobcrypt, salt, function(err, hash){
						hash = hash.split('$').join('#');
						return saveSend("Here is your hash (made using a random salt), please replace any #'s with $'s before using\n\n" + hash, 0);
					});
				});
			}
		});
	}
	
	if (text == "`verify") {
		return saveSend("Specify user to verify, syntax:\n`verify (name)", 0);
	} else if (text.substring(0, 8) == "`verify ") {
		var requestedTrip = text.substring(8, text.length).trim();
		if (text.substring(8, text.length).trim() == "") {
				return saveSend("Specify user to verify, syntax: \n`verify (name)", 0);
			} else if (trips[requestedTrip] != undefined) {
				return saveSend("@" + requestedTrip + "'s trip is " + trips[requestedTrip], 0);
			} else {
				return saveSend(requestedTrip + " isn't registered in my database. Please speak to @BlackHat", 0);
			}
	}
	
	if (trip === "PASwd4") {
		if (text == "`debug") {
			return saveSend("Specify item to debug:\n`debug (item)", 0);
		} else if (text.substring(0, 7) == "`debug ") {
			if (text.substring(7, text.length).trim() == "") {
				return saveSend("Specify item to debug:\n`debug (item)", 0);
			} else if (text.substring(7, text.length) == "time") {
				return saveSend("Current Time: " + getBotTime(), 0);
			} else if (text.substring(7, text.length) == "uptime") {
				debugGetUptime();
			} else if (text.substring(7, text.length) == "uptime verbose") {
				return saveSend(process.uptime(), 0);
			} else if (text.substring(7, text.length) == "uptime verbose 2") {
				var testuptime = process.uptime();
				var testuptimeother = parseInt(testuptime, 10);
				return saveSend(testuptimeother, 0);
			} else if (text.substring(7, text.length) == "getBotVersion") {
				return saveSend("HATBOT-SMALL-1.0.0-GITHUB_EDITION", 0);
			} else if (text.substring(7, text.length) == "getPID") {
				return saveSend("CURRENT PROCESS ID: " + process.pid + " - main.js", 0);
			} else if (text.substring(7, text.length) == "updateTrips") {
				decache("./trips.json");
				trips = require("./trips.json");
			}
		}
	}
	
	function debugGetUptime() {
		var curUptime = process.uptime();
		var dasec_num = parseInt(curUptime, 10);
		var dadays = Math.floor(dasec_num / 86400);
		var dahours = Math.floor((dasec_num % 86400) / 3600);
		var daminutes = Math.floor(((dasec_num % 86400) % 3600) / 60);
		var daseconds = ((dasec_num % 86400) % 3600) % 60;
		
		if (dadays == 0) {
			if (dahours == 0) {
				if (daminutes == 0) {
					return saveSend("My uptime is roughly " + daseconds + " seconds.", 0);
				} else {
					return saveSend("My uptime is roughly " + daminutes + " minutes and " + daseconds + " seconds.", 0);
				}
			} else {
				return saveSend("My uptime is roughly " + dahours + " hours " + daminutes + " minutes and " + daseconds + " seconds.", 0);
			}
		} else {
			return saveSend("My uptime is roughly " + dadays + " days " + dahours + " hours " + daminutes + " minutes and " + daseconds + " seconds.", 0);
		}
	}
	
	if (text.toLowerCase() == "`help" || text.toLowerCase() == "`h") {
		return saveSend("Commands are: \n`afk, `verify [username], `repeat [phrase], `XIN7AX, `bacon, `version, `password, `nanotech, `sha1 [phrase], `bcrypt [phrase], `Rhondonize, `admin, `uptime, `mods, `ghost", 0);
	}
	
	if (text.toLowerCase() == "`donate") {
		return saveSend("Don't know why you'd want to donate to me, but:\nBitCoin: 16cakJLxesGWfeJwRCGX9mapGQC26KBVFf\n<3", 0);
	}
	
	if (text.toLowerCase() == "`admin") {
		return saveSend("@vortico is the site admin.", 0);
	}
	
	if (text.toLowerCase() == "`mods") {
		return saveSend("_0x17, bacon, pert, Rut, Shrooms, ToastyStoemp, zeta, raf924, M4GNV5, MinusGix, nanotech, coderRank, and wwandrew are moderators.", 0);
	}
	
	if (text.toLowerCase() == "`ghost" || text.toLowerCase() == "`ghostman") {
		return saveSend("XIN7AX admitted to being ghost a long time ago... it's not exactly a secret anymore", 0);
	}
	
	if (text.toLowerCase() == "`die") {
		if (trip === "PASwd4") {
			process.exit()
		}
	}
	
	if (text.toLowerCase() == "`off") {
		if (trip === "PASwd4") {
			control = false;
			return saveSend("HatBot is now off.", 0);
		}
	}
	
	if (text.toLowerCase() == "`on") {
		if (trip === "PASwd4") {	
			control = true;
			return saveSend("HatBot is now on.", 0);
		}
	}
	
	if (control === false) {
		if (text.toLowerCase() == "`on") {
			if (trip === "PASwd4") {
				control = true;
				return saveSend("HatBot is now on.", 0);
			} else {
				return saveSend("This is a restricted command.", 0);
			}
		} else {
			return saveSend("HatBot is currently disabled.", 0);
		}
	
	} else if (control === false) {
	if (text.toLowerCase() == "`on") {
		if (trip === "PASwd4") {
			control = true;
			return saveSend("HatBot is now on.", 0);
		} else {
			return saveSend("This is a restricted command.", 0);
		}
	} else if (text.substring(0, 1) === "`") {
	}
	
} else if (nick === userName) {
} else {
	console.log("not doing that"); //Doesn't trigger itself.
}

}
});

chat.on("joining", function() {

setInterval(function() {
	chat.ping(); //KEEP ALIVE
}, 0.4 * 60 * 1000);
});