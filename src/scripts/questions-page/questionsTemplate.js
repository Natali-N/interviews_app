import { configService } from './../configService';

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
                    <label>
                        Квалификация
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
                    </label>
                    <button type="button" class="add-to-list">&plus; Добавить вопрос в список</button>
                </form>
                <button class="show-add-form">Создать вопрос</button>
            </div>`;
    }

    prepareQuestionsList(allQuestionsLeveled) {
        let preparedQuestionsList = '';

        for (let key in allQuestionsLeveled) {
            if (allQuestionsLeveled.hasOwnProperty(key) && allQuestionsLeveled[key].length) {
                preparedQuestionsList += `<h3>${key}</h3>`
                    + this._prepareQuestionsLevelList(allQuestionsLeveled[key]);
            }
        }
        return preparedQuestionsList;
    }

   _prepareQuestionsLevelList(questions) {
        return questions.reduce((previousQuestionsPrepared, currentQuestion, index) => {
            return previousQuestionsPrepared + `
            <div id="${currentQuestion.id}" class="row">
                <div class="row__number">${index + 1}</div>` + this._prepareQuestionContent(currentQuestion) +
                `<div class="row__note ${currentQuestion.note ? '' : configService.classForOpenItem}">
                    <div class="edit-note">
                        <textarea class="note"></textarea>
                        <button type="button" class="add-note">&plus;</button>
                    </div>
                    <label class="note-text">${currentQuestion.note ? currentQuestion.note : ''}</label>
                </div>
                <div class="row__score">
                    <input class="score" type="number" min="0" max="3" value="${currentQuestion.score}">
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

    _prepareNoteContent(currentQuestion) {
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
