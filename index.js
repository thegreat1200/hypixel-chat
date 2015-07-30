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
  useGRole: false
};

var getUser = function(id){
user.name = API.getUser(id).username,
user.role = API.getUser(id).role,
user.gRole = API.getUser(id).gRole,
user.joined = API.getUser(id).joined,
user.status = API.getUser(id).status,
user.sub = API.getUser(id).sub
};

function chatCheck(data) {
  if (data.type === "emote") {
    getUser(data.uid);
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
        API.sendChat(user.name+": "+data.message);
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
