export default class ReportTemplate {
    prepareInitialTemplate() {
        return `
            <h2>Отзыв</h2>
            <div class="report-form-container">
                <form class="report-form">
                    <label>
                        Имя кандидата
                        <input type="text" name="name">
                    </label>
                    <label>
                        Должность
                        <select name="position">
                            <option>Front-end</option>
                            <option>Верстальщик</option>
                        </select>
                    </label>
                    <label>
                        Уровень английского
                        <select name="english">
                            <option>Beginner</option>
                            <option>Elementary</option>
                            <option>Pre-Intermediate</option>
                            <option>Upper-Intermediate</option>
                            <option>Advanced</option>
                        </select>
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
                    <label>
                        Общее впечатление
                        <textarea name="general"></textarea>
                    </label>
                    <button type="button" class="create-report">Сформировать отзыв</button>
                </form>
                <div class="report"></div>
            </div>`;
    }

    prepareReportTemplate(reportData, allCheckedLeveledQuestions) {
        let finalReport = `
            Отзыв на ${reportData.position} ${reportData.name}<br><br>
            Текущий уровень: ${reportData.level}<br>
        `;

        if (reportData.english) {
            finalReport += `Английский: ${reportData.english}<br>`;
        }

        if (reportData.general) {
            finalReport += `Общее впечатление: ${reportData.general}<br>`;
        }

        finalReport += '<br>';

        for (let key in allCheckedLeveledQuestions) {
            if (allCheckedLeveledQuestions.hasOwnProperty(key)) {
                finalReport += `${key}<br>` + this._prepareQuestionsLevelList(allCheckedLeveledQuestions[key]) + '<br>';
            }
        }

        return finalReport;
    }

    _prepareQuestionsLevelList(questions) {
        return questions.reduce((previousQuestionsPrepared, currentQuestion) => {
            let note = '';

            if (currentQuestion.note) {
                note = '(' + currentQuestion.note + ')';
            }

            return previousQuestionsPrepared + `${currentQuestion.report}: ${currentQuestion.score} ${note}<br>`;
        }, '');
    }
}
