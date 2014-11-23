// if( Meteor.isServer)
// {
// 	console.log("server");
// 	Meteor.http.call("GET","https://rest.nexmo.com/sms/json?api_key={f56e6a48}&api_secret={d0aa8ba1}&from=MyCompany20&to=447525856424&text=D%c3%a9j%c3%a0+vu",{

// 	}, function(error,result){
//     	if(error){
//     		console.log(error);
//     	}
//     	else
//     	{
//     		var respJson = JSON.parse(result.content);
//     		if(respJson["message-count"] > 0) { //IF OK
//      		   console.log('returning response');
//         		return respJson;
//     		} else {
// 		        throw new Meteor.Error(respJson.message.code, respJson.message.text);
//     		}
//     		console.log(result);
//     	}
// 	});
// }