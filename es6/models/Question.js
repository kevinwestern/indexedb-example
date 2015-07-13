export class Question {
  constructor(text, votes) {
    this.text = text;
    this.votes = votes;
    this.vote = 0;
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

  static fromJSON(json) {
    return new Question(json.text, json.votes);
  }
};