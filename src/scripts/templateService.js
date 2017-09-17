export default class TemplateServise {

    prepareQuestionsList(allQuestionsLeveled) {
        let preparedQuestionsList = '';

        // @todo has own property
        for (let key in allQuestionsLeveled) {
            preparedQuestionsList += `<h2>${key}</h2>`
                + this._prepareQuestionsLevelList(allQuestionsLeveled[key]);
        }

        console.log(preparedQuestionsList);

        return preparedQuestionsList;
    }

   _prepareQuestionsLevelList(questions) {
        return questions.reduce((previousQuestionsPrepared, currentQuestion, index) => {
            return previousQuestionsPrepared + `
            <div class="row">
                <div class="row__number">${index + 1}</div>
                <div class="row__content">
                    <div class="question">
                        ${currentQuestion.question}
                    </div>
                    <div class="answer">
                        ${currentQuestion.answer}
                    </div>
                </div>
                <div class="row__score">
                    <input type="number" min="0" max="3">
                </div>
                <div class="row__notes">
                    <textarea></textarea>
                    <button type="button">save</button>
                </div>
            </div>`}, '');
    }
}
