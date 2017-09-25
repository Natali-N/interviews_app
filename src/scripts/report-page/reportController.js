import { configService } from './../configService';

export default class ReportController {

    constructor(dataService, reportView) {
        this.dataService = dataService;
        this.reportView = reportView;
    }

    initView() {
        this.reportView.showInitialTemplate();
        this.reportView.findElements();
        this.reportView.bindCreateReport(this._createReport.bind(this));
    }

    _createReport(reportData) {
        const allQuestions = this.dataService.getDataFromStorage();

        let allCheckedQuestions = allQuestions.filter(question => {
            return question.score;
        });

        if (allCheckedQuestions.length) {
            const allCheckedLeveledQuestions = this._filter(allCheckedQuestions);

            this.reportView.showReport(reportData, allCheckedLeveledQuestions);
        } else {
            //@todo show error
            alert('Отчет не может быть сформирован. Вы не выставили балл ни по одному вопросу.')
        }
    }

    //@todo move to helpers
    _filter(allQuestions) {
        const allQuestionsLeveled = {};

        configService.levels.forEach(level => {
             let levelQuestionsList = allQuestions.filter(question => {
                return level === question.level;
            });

            if (levelQuestionsList.length) {
                allQuestionsLeveled[level] = levelQuestionsList;
            }
        });

        return allQuestionsLeveled;
    }
}
