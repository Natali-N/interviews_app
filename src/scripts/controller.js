import { configService } from './configService';
import DataService from './dataService';
import ViewService from './viewService';

export default class Controller {
    constructor(dataService, viewService) {
        this.dataService = dataService;
        this.viewService = viewService;

        //@todo spinner service
        document.querySelector('body').classList.add('show-spinner');
        this.dataService.getAllQuestions().then((allQuestions) => {
            this.setView(allQuestions);

            //@todo spinner service
            document.querySelector('body').classList.remove('show-spinner');
        });
    }

    setView(allQuestions) {
        this.viewService.showData(this._filter(allQuestions));
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
}
