import {DB} from './db';
import {Question} from './models/Question';

const form = document.querySelector("#questionForm");
const text = document.querySelector("#text");
const db = new DB('questioner', 1);

let questionsList = [];
const questionsEl = document.querySelector('kw-question-list');
db.getAllQuestions().then((questions) => {
  questionsList = questions;
  questionsEl.questions = questionsList;
});

const updateQuestionsList = (questionToUpdate) => {
  const index = questionsList.findIndex((question) => question.key == questionToUpdate.key);
  questionsList = questionsList.update(index, () => questionToUpdate);
  questionsEl.questions = questionsList;
}

document.addEventListener('addQuestion', evt => {
  db.saveQuestion(new Question(evt.detail, 0)).then(question => {
    questionsList = questionsList.unshift(question);
    questionsEl.questions = questionsList;
  });
})

document.addEventListener('upvoteQuestion', evt => {
  db.updateQuestion(evt.detail.upVote()).then(updateQuestionsList);
});

document.addEventListener('downvoteQuestion', evt => {
  db.updateQuestion(evt.detail.downVote()).then(updateQuestionsList);
});

document.addEventListener('submitComment', evt => {
  db.updateQuestion(evt.detail.question.addComment(evt.detail.commentText)).then(updateQuestionsList);
})
