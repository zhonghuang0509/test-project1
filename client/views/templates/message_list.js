Template.messageList.helpers({
  posts: function() {
    return Posts.find({}, {sort: {submitted: -1}});
  }
});

Template.messageList.events({
  'click button#delButton': function(e) {
    e.preventDefault();
    	Meteor.call('deleteMessages', function(error, result){
    		console.log(error);
    	});
   }
});
