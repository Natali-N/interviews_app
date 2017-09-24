export default class QuestionsTemplate {

    prepareInitialTemplate() {
        return `
            <h2>
                Вопросы для собеседования
            </h2>
            <div class="questions-list">

            </div>
            <div class="add-form-container">
                <form class="add-form">
                    <label>
                        Вопрос
                        <input type="text" name="question">
                    </label>
                    <label>
                        Ответ
                        <textarea name="answer"></textarea>
                    </label>
                    <label>
                        Строка для отображения в отчете
                        <input type="text" name="report">
                    </label>
                    <select name="level">
                        <option>JD-</option>
                        <option>JD=</option>
                        <option>JD+</option>
                        <option>D-</option>
                        <option>D=</option>
                        <option>D+</option>
                        <option>SD-</option>
                        <option>SD=</option>
                        <option>SD+</option>
                    </select>
                    <button type="button" class="add-to-list">&plus; Добавить вопрос в список</button>
                </form>
                <button class="show-add-form">Создать вопрос</button>
            </div>`;
    }

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
