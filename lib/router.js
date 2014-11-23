Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading'
	// waitOn: function(){return Meteor.subscribe('receives');}
});

Router.map(function(){
	// this.route('messageList', {path: '/'});

	this.route('postPage', {
		path: 'posts/:_id',
		data: function() {
			return Posts.findOne(this.params._id);
		}
	});

	this.route('/inbound', {
		where: 'server',
	    path: '/api/sms',
		action: function() {
			var query = JSON.stringify(this.params.query);
			var parameters = JSON.parse(query);
			console.log( query );

			var post = {
				msisdn: parameters.msisdn,
				to: parameters.to,
				massageId: parameters.messageId,
				text: parameters.text,
				"message-timestamp": parameters['message-timestamp']
        	};

        	Meteor.call('receivedInsert', post, function(error, result) {
      		// display the error to the user and abort
			if (error)
				console.log(error);
			});

		    this.response.writeHead(200, {'Content-Type': 'text/html'});
			this.response.end('success');
		}

	});
});

Router.route('/', {
	name: 'messageList',
	waitOn: function(){return Meteor.subscribe('posts');}
});

if (Meteor.isClient) {
	Router.onBeforeAction('loading');
}

Router.route('/send', {name: 'sendMessage'});
Router.route('/received', {
	name: 'receivedList',
	waitOn: function(){return Meteor.subscribe('receives');}
});