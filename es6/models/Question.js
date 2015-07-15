export class Question {
  constructor(text, votes, opt_vote, opt_key) {
    this.text = text;
    this.votes = votes;
    this.vote = (opt_vote == undefined) ? 1 : opt_vote;
    this.key = opt_key;
  }

  upVote() {
    if (this.vote == 1) {
      return new Question(this.text, this.votes, 0, this.key);
    } else {
      return new Question(this.text, this.votes, 1, this.key);
    }
  }

  downVote() {
    if (this.vote == -1) {
      return new Question(this.text, this.votes, 0, this.key);
    } else {
      return new Question(this.text, this.votes, -1, this.key);
    }
  }

  setKey(key) {
    this.key = key;
  }

  static fromJSON(json, opt_key) {
    return new Question(json.text, json.votes, json.vote, opt_key);
  }
};