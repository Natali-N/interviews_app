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
        debugger;
        let finalReport = `
            <h2>Отзыв на ${reportData.position} ${reportData.name}</h2>
            <p>Текущий уровень: ${reportData.level}</p>
        `;

        if (reportData.english) {
            finalReport += `
                <p>Английский: ${reportData.english}</p>
            `;
        }

        if (reportData.general) {
            finalReport += `
                <p>Общее впечатление: ${reportData.general}</p>
            `;
        }

        for (let key in allCheckedLeveledQuestions) {
            finalReport += `<h3>${key}</h3>` + this._prepareQuestionsLevelList(allCheckedLeveledQuestions[key]);
        }

        return finalReport;
    }

    _prepareQuestionsLevelList(questions) {
        return questions.reduce((previousQuestionsPrepared, currentQuestion, index) => {
            let note = '';

            if (currentQuestion.note) {
                note = currentQuestion.note;
            }

            return previousQuestionsPrepared + `<p>${currentQuestion.report}: ${currentQuestion.score} ( ${note} )</p>`;
        }, '');
    }
}
