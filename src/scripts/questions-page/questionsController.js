import { configService } from './../configService';

export default class QuestionsController {

    constructor(dataService, questionsView) {
        this.dataService = dataService;
        this.questionsView = questionsView;
    }

    initView() {
        const allQuestions = this.dataService.getDataFromStorage();
        this.questionsView.showInitialTemplate();
        this.questionsView.findElements();
        this.questionsView.showQuestions(this._filter(allQuestions));

        this.questionsView.bindShowAddForm();
        this.questionsView.bindRowActions(this._addNote.bind(this), this._addScore.bind(this));
        this.questionsView.bindAddToList(this._addToList.bind(this));
    }

    _filter(allQuestions) {
        const allQuestionsLeveled = {};

        configService.levels.forEach(level => {
            allQuestionsLeveled[level] = allQuestions.filter(question => {
                return level === question.level;
            });
        });

        return allQuestionsLeveled;
    }

    _addToList(questionData) {
        questionData.id = Date.now();

        const allQuestions = this.dataService.getDataFromStorage();
        allQuestions.push(questionData);

        this.dataService.writeToStorage(allQuestions);
        this.questionsView.showQuestions(this._filter(allQuestions));
        this.questionsView.toggleAddForm();
    }

    _addNote(questionId, note) {
        const allQuestions = this.dataService.getDataFromStorage();

        allQuestions.some(question => {
            if (question.id === questionId) {
                question.note = note;
            }

            return question.id === questionId;
        });

        //@todo error
        //@todo create method in dataService

        this.dataService.writeToStorage(allQuestions);
    }

    _addScore(questionId, score) {
        const allQuestions = this.dataService.getDataFromStorage();

        allQuestions.some(question => {
            if (question.id === questionId) {
                question.score = score;
            }

            return question.id === questionId;
        });

        //@todo error
        //@todo create method in dataService

        this.dataService.writeToStorage(allQuestions);
    }
}
