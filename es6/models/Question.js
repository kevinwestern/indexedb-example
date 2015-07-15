export class Question {
  constructor(text, votes, opt_vote, opt_key, opt_comments) {
    this.text = text;
    this.votes = votes;
    this.vote = (opt_vote == undefined) ? 1 : opt_vote;
    this.key = opt_key;
    this.comments = opt_comments || [];
  }

  upVote() {
    if (this.vote == 1) {
      return new Question(this.text, this.votes, 0, this.key, this.comments);
    } else {
      return new Question(this.text, this.votes, 1, this.key, this.comments);
    }
  }

  downVote() {
    if (this.vote == -1) {
      return new Question(this.text, this.votes, 0, this.key, this.comments);
    } else {
      return new Question(this.text, this.votes, -1, this.key, this.comments);
    }
  }

  addComment(text) {
    this.comments.push(text);
    return new Question(this.text, this.votes, this.vote, this.key, this.comments);
  }

  setKey(key) {
    this.key = key;
  }

  static fromJSON(json, opt_key) {
    return new Question(json.text, json.votes, json.vote, opt_key, json.comments);
  }
};