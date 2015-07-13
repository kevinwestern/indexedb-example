export class Question {
  constructor(text, votes, opt_vote, opt_key) {
    this.text = text;
    this.votes = votes;
    this.vote = (opt_vote == undefined) ? 1 : opt_vote;
    this.key = opt_key;
  }

  upVote() {
    if (this.vote == 1) {
      this.vote = 0;
    } else {
      this.vote = 1;
    }
  }

  downVote() {
    if (this.vote == -1) {
      this.vote = 0;
    } else {
      this.vote = -1;
    }
  }

  setKey(key) {
    this.key = key;
  }

  static fromJSON(json, opt_key) {
    return new Question(json.text, json.votes, json.vote, opt_key);
  }
};