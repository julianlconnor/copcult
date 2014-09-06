define([
  'expect',
  'shared/js/helpers/dev_api_url',
  'shared/js/models/api/comment'
], function(expect, devApiUrl, CommentModel) {

  describe('Comment Model', function() {

    it('should be valid if it contains a message and story id', function() {
      var comment = new CommentModel({}, { validate: true });
      expect(comment.isValid()).to.be(false);
      comment.set({ storyId: '123' }, { valiate: true });
      expect(comment.isValid()).to.be(false);
      comment.set({ message: 'hello world' }, { validate: true });
      expect(comment.isValid()).to.be(true);
    });

    it('should return the correct url for storyId and commentId', function() {
      var storyId = 'a';
      var id = 'b';

      var comment = new CommentModel();

      // neither
      expect(comment.url()).to.not.ok();

      // with story id and id
      comment.set({ storyId: storyId, id: id });
      expect(comment.url()).to.be(devApiUrl() + '/v1/stories/' + storyId + '/comments/' + id);

      // just story id
      comment.set({ storyId: storyId, id: undefined });
      expect(comment.url()).to.be(devApiUrl() + '/v1/stories/' + storyId + '/comments');

      // just id
      comment.set({ storyId: undefined, id: id });
      expect(comment.url()).to.be(devApiUrl() + '/v1/comments/' + id);
    });

  });

});

