Posts = new Mongo.Collection('posts');

Posts.allow({
  update: function(userId, content) { return ownsDocument(userId, post); },
  remove: function(userId, content) { return ownsDocument(userId, post); },
});

Posts.deny({
  update: function(userId, post, fieldNames) {
    // may only edit the following two fields:
    return (_.without(fieldNames, 'url', 'title').length > 0);
  }
});

Posts.deny({
  update: function(userId, post, fieldNames, modifier) {
    var errors = validatePost(modifier.$set);
    return errors.title || errors.url;
  }
});

validatePost = function (post) {
  var errors = {};

  if (!post.tophone)
    errors.tophone = "Please insert the phone number";
  
  if (!post.cont)
    errors.cont =  "Please fill message content";

  return errors;
}

Meteor.methods({
  postInsert: function(postAttributes) {
    check(this.userId, String);
    check(postAttributes, {
      from: String,
      tophone: String,
      cont: String
    });
    
    var errors = validatePost(postAttributes);
    if (errors.tophone || errors.cont)
      throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");
  
    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id, 
      author: user.username,
      submitted: new Date()
    });
    
    var postId = Posts.insert(post);
    
    return {
      _id: postId
    };
  }
});

Meteor.methods({
  deleteMessages: function(){
    Posts.remove({});
  }
})
