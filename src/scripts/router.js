//@todo check if required import here as have dependency
//@todo check if routing working with #
import QuestionsController from './questions-page/questionsController';
import ReportController from './report-page/reportController.js';

export default class Router {

    constructor(dataService, questionsController, reportController) {
        this.dataService = dataService;
        this.questionsController = questionsController;
        this.reportController = reportController;

        this.activeRoute = '';

        this.routes = {
            '#questions': this.questionsController.initView,
            '#report': this.reportController.initView
        };

        this.defaultRoute = '#questions';

        //@todo spinner service
        document.querySelector('body').classList.add('show-spinner');

        this.dataService.getAllQuestions().then(() => {
            this._setView();
            this._initRouter();

            //@todo spinner service
            document.querySelector('body').classList.remove('show-spinner');
        });
    }

    _initRouter() {
        window.addEventListener('hashchange', this._setView);
    }

    _setView(allQuestions) {
        this.activeRoute = window.location.hash || this.defaultRoute;
        this.routes[this.activeRoute]();
    }
}
