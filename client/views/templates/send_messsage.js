Template.sendMessage.created = function() {
  Session.set('sendMessageErrors', {});
}

Template.sendMessage.helpers({
  errorMessage: function(field) {
    return Session.get('sendMessageErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('sendMessageErrors')[field] ? 'has-error' : '';
  }
});

Template.sendMessage.events({
  'submit form': function(e) {
    e.preventDefault();

    var atophone = $(e.target).find('[name=tophone]').val();
    var acont = $(e.target).find('[name=cont]').val();
    
    var post = {
    	// api_key: 'f56e6a48',
		  // api_secret : 'd0aa8ba1',
		  from: '12243109101', 
		  tophone: atophone,
		  cont: acont
    };

    // alert("send");
    var errors = validatePost(post);
// alert("send1");
    if (errors.tophone|| errors.cont)
    {
      return Session.set('sendMessageErrors', errors);
    }

    Meteor.http.call(
        "GET", // type
        "https://rest.nexmo.com/sms/json", // url
        {
            header: {},// header 
            params: { // params
                'api_key': 'f56e6a48',
                'api_secret': 'd0aa8ba1',
                'from': '12243109101',
                'to': atophone,
                'text': acont
            }
        },
        function(error,result){
        if(error){
            console.log(error);
        }
        else
        {
            var respJson = JSON.parse(result.content);
            if(respJson["message-count"] > 0) { //IF OK

               console.log(result.content);
                return respJson;
            } else {
                throw new Meteor.Error(respJson.message.code, respJson.message.text);
            }
            console.log(result);
        }
    });

    Meteor.call('postInsert', post, function(error, result) {
      // display the error to the user and abort
      if (error)
        return Errors.throw(error.reason);
      
      // show this result but route anyway
      // if (result.postExists)
        // Errors.throw('This link has already been posted');
      
      Router.go('postPage', {_id: result._id});  
    });
  }
});
