var url ='http://localhost'
function getvar (messege){
 console.log(messege+' from logger');
}
module.exports.getmyvar = getvar;
module.exports.url = url;
