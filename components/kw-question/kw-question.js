Polymer({
  is: "kw-question",

  properties: {
    question: {
      type: Object,
      observer: 'questionChanged_'
    },
    computedVotes: {
      type: Number,
      computed: 'getComputedVotes_(question)'
    },
    comments: {
      type: Array,
      computed: 'getComments_(question.comments)'
    }
  },

  upVote: function(evt) {
    this.fire('upvoteQuestion', this.question);
  },

  downVote: function(evt) {
    this.fire('downvoteQuestion', this.question);
  },

  getComputedVotes_: function(question) {
    return this.question.votes + question.vote;
  },

  getComments_: function(comments) {
    console.log(comments)
    return comments;
  },

  getClassNames: function(question, thumb) {
    return ((question.vote == 1 && thumb == 'up')
      || (question.vote == -1 && thumb == 'down')) ? 'selected' : '';
  },

  showCommentBox: function() {
    Polymer.dom(this.$.commentBox).classList.toggle('hidden');
  },

  submitComment: function() {
    this.fire('submitComment', {
      commentText: this.$.comment.value,
      question: this.question
    });
  },

  questionChanged_: function() {
    this.$.comment.value = '';
    Polymer.dom(this.$.commentBox).classList.toggle('hidden', true);
  }
});