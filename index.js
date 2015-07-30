(function(){
function startup() {
API.on(API.CHAT, chatCheck);
}
startup();

function shutdown() {
API.off(API.CHAT, chatCheck);
}

var user = {
  name: null,
  role: 0,
  gRole: 0,
  joined: null,
  status: null,
  sub: 0,
  useGRole: false,
  prefix: null
};

var getUser = function(id){
user.name = API.getUser(id).username;
user.role = API.getUser(id).role;
user.gRole = API.getUser(id).gRole;
user.joined = API.getUser(id).joined;
user.status = API.getUser(id).status;
user.sub = API.getUser(id).sub;
if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                user.prefix = xmlhttp.responseText;
            }
        }
        xmlhttp.open("GET","http://grantsommer.com/hypixel/getPrefix.php?id="+id,true);
        xmlhttp.send();
};

function chatCheck(data) {
  if (data.type === "emote") {
    getUser(data.uid);
    console.log(user.prefix);
    if (user.gRole > 0) {
      user.useGRole = true;
    }
    if (!user.useGRole) {
      if (user.sub === 1) { // Subscriber
        API.sendChat("[+] "+user.name+": "+data.message);
      } else if (user.role === 1) { // RDJ
        API.sendChat("[!] "+user.name+": "+data.message);
      } else if (user.role === 2) { // Bouncer
        API.sendChat("[@] "+user.name+": "+data.message);
      } else if (user.role === 3) { // Manager
        API.sendChat("[$] "+user.name+": "+data.message);
      } else if (user.role === 4 || user.role === 5) { // CoHost/Host
        API.sendChat("[##] "+user.name+": "+data.message);
      } else if (user.role === 0) {
        API.sendChat(user.prefix+user.name+": "+data.message);
      }
    } else {
      if (user.gRole > 1 && user.gRole < 5) {
        API.sendChat("[BA] "+user.name+": "+data.message);
      } else if (user.gRole === 5) {
        API.sendChat("[ADMIN] "+user.name+": "+data.message);
      }
    }
  }
}
}).call(this);
