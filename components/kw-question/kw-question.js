Polymer({
  is: "kw-question",

  properties: {
    question: Object,
    vote: {
      type: Number,
      readyOnly: true
    },
    computedVotes: {
      type: Number,
      computed: 'getComputedVotes_(vote)'
    }
  },

  attached: function() {
    this._setVote(this.question.vote);
  },

  upVote: function(evt) {
    this.question.upVote();
    this._setVote(this.question.vote);
  },

  downVote: function(evt) {
    this.question.downVote();
    this._setVote(this.question.vote);
  },

  getComputedVotes_: function(vote) {
    return this.question.votes + vote;
  },

  getClassNames: function(vote, thumb) {
    return ((vote == 1 && thumb == 'up')
      || (vote == -1 && thumb == 'down')) ? 'selected' : '';
  },

  _setVote: function(vote) {
    this.vote = vote;
  }
});