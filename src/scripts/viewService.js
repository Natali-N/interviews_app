import TemplateService from './templateService';
import { configService } from './configService';

export default class ViewService {
    constructor(templateService) {
        this.templateService = templateService;
        this.questionsList = document.querySelector('.questions-list');
        this.addFormToggle = document.querySelector('.open-add-form');
        this.addForm = document.querySelector('.add-form');
        this.rowContent = document.querySelector('.row__content');
    }

    showData(allQuestionsLeveled) {
        this.questionsList.innerHTML = this.templateService.prepareQuestionsList(allQuestionsLeveled);
    }

    bindOpenAddForm() {
        this.addFormToggle.addEventListener('click', () => {
            this.addForm.classList.add(configService.classForOpenItem);
            this.addFormToggle.disabled = true;
        });
    }

    bindShowAnswer() {
        debugger;
        this.questionsList.addEventListener('click', event => {
            if (event.target.classList.contains('question')) {
                debugger;
                event.target.closest(configService.questionContainerSelector).classList.toggle(configService.classForOpenItem);
            }
        });
    }
}
