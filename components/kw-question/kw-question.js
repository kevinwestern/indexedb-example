Polymer({
  is: "kw-question",

  properties: {
    question: Object,
    computedVotes: {
      type: Number,
      computed: 'getComputedVotes_(question)'
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

  getClassNames: function(question, thumb) {
    return ((question.vote == 1 && thumb == 'up')
      || (question.vote == -1 && thumb == 'down')) ? 'selected' : '';
  }
});