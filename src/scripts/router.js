//@todo check if routing working with #

export default class Router {

    constructor(dataService, questionsController, reportController) {
        this.dataService = dataService;
        this.questionsController = questionsController;
        this.reportController = reportController;

        this.activeRoute = '';
        this.routes = {
            '#questions': this.questionsController.initView.bind(this.questionsController),
            '#report': this.reportController.initView.bind(this.reportController)
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

        this.navigation = document.querySelector('.navigation');
    }

    _initRouter() {
        window.addEventListener('hashchange', this._setView.bind(this));

        //@todo move somewhwere
        this.navigation.addEventListener('click', event => {
            if (event.target.classList.contains('navigation-item')) {
                this.navigation.querySelector('.selected').classList.remove('selected');
                event.target.classList.add('selected');
            }
        });
    }

    _setView() {
        this.activeRoute = window.location.hash || this.defaultRoute;
        this.routes[this.activeRoute]();
    }
}
