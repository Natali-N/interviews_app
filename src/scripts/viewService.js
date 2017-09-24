import TemplateService from './templateService';
import { configService } from './configService';

export default class ViewService {
    constructor(templateService) {
        this.templateService = templateService;
        this.questionPage = document.querySelector('.main');
        this.questionsList = this.questionPage.querySelector('.questions-list');
        this.addFormToggle = this.questionPage.querySelector('.show-add-form');
        this.addFormContainer = this.questionPage.querySelector('.add-form-container');
        this.addForm = this.addFormContainer.querySelector('.add-form');
        this.questionContainerSelector = '.row__content';
        this.addToList = this.questionPage.querySelector('.add-to-list');
        this.noteContainerSelector = '.row__note';
    }

    showData(allQuestionsLeveled) {
        this.questionsList.innerHTML = this.templateService.prepareQuestionsList(allQuestionsLeveled);
    }

    bindOpenAddForm() {
        this.addFormToggle.addEventListener('click', this.toggleForm.bind(this));
    }

    toggleForm() {
        this.addFormContainer.classList.toggle(configService.classForOpenItem);
    }

    bindShowAnswer() {
        //@todo remove className
        this.questionsList.addEventListener('click', event => {
            if (event.target.classList.contains('has-answer')) {
                event.target.closest(this.questionContainerSelector).classList.toggle(configService.classForOpenItem);
            }
        });
    }

    bindAddToList(handler) {
        //@todo form fields validation
        this.addToList.addEventListener('click', () => {
            handler({
                question: this.addForm.elements.question.value,
                answer: this.addForm.elements.answer.value,
                report: this.addForm.elements.report.value,
                level: this.addForm.elements.level.value
            });
        });
    }

    bindAddNote(handler) {
        this.addFormContainer.classList.toggle(configService.classForOpenItem);
    }
}
