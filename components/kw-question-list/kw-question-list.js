Polymer({
  is: "kw-question-list",

  properties: {
    questions: {
      /** Immutable.List */
      type: Object,
      observer: 'questionsChanged_'
    },
    /** Polymer needs an array for dom-repeat */
    questionsJsArr: {
      type: Array,
      computed: 'createQuestionsJsArr_(questions)',
      readOnly: true
    }
  },

  submit: function() {
    this.fire('addQuestion', this.$.text.value);
  },

  questionsChanged_: function() {
    this.$.text.value = '';
  },

  createQuestionsJsArr_: function(immutableList) {
    this._setQuestionsJsArr(immutableList.toArray());
  },

  _setQuestionsJsArr: function(arr) { 
    this.questionsJsArr = arr;
  }
});