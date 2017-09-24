export default class TemplateServise {

    prepareQuestionsList(allQuestionsLeveled) {
        let preparedQuestionsList = '';

        // @todo has own property
        for (let key in allQuestionsLeveled) {
            if (allQuestionsLeveled[key].length) {
                preparedQuestionsList += `<h3>${key}</h3>`
                    + this._prepareQuestionsLevelList(allQuestionsLeveled[key]);
            }
        }
        return preparedQuestionsList;
    }

   _prepareQuestionsLevelList(questions) {
        return questions.reduce((previousQuestionsPrepared, currentQuestion, index) => {
            return previousQuestionsPrepared + `
            <div class="row">
                <div class="row__number">${index + 1}</div>` + this._prepareQuestionContent(currentQuestion) +
                `<div class="row__note show">
                    <div class="edit-note">
                        <textarea id="${currentQuestion.id}" class="note"></textarea>
                        <button type="button" class="add-note">&plus;</button>
                    </div>
                    <label class="note-text"></label>
                    ${currentQuestion.note}
                </div>
                <div class="row__score">
                    <input type="number" min="0" max="3">
                </div>
            </div>`;
        }, '');
   }

    _prepareQuestionContent(currentQuestion) {
        if (currentQuestion.answer) {
            return `
                <div class="row__content">
                    <div class="question has-answer">
                        ${currentQuestion.question}
                    </div>
                    <div class="answer">
                        ${currentQuestion.answer}
                    </div>
                </div>`;
        } else {
            return `
                <div class="row__content">
                    <div class="question">
                        ${currentQuestion.question}
                    </div>
                </div>`;
        }
    }
}
