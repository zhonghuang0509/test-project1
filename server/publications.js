Meteor.publish('posts', function() {
  return Posts.find();
});

Meteor.publish('receives', function() {
  return Receives.find();
});
