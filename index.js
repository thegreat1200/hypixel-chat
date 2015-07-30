(function(){
function startup() {
API.on(API.CHAT, chatCheck);
}
startup();

function shutdown() {
API.off(API.CHAT, chatCheck);
}

var user = function(id){
var uObject = {
name: API.getUser(id).username,
rank: API.getUser(id).role,
gRank: API.getUser(id).gRole,
joined: API.getUser(id).joined,
status: API.getUser(id).status,
sub: API.getUser(id).sub,
}
};

function chatCheck(data) {
user(uid);
console.log(uObject.name);
}
}).call(this);
