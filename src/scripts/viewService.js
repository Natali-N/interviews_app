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
        this.noteSelector = '.note';
        this.labelSelector = '.note-text';

    }

    showData(allQuestionsLeveled) {
        this.questionsList.innerHTML = this.templateService.prepareQuestionsList(allQuestionsLeveled);
    }

    bindShowAddForm() {
        this.addFormToggle.addEventListener('click', this.toggleForm.bind(this));
    }

    toggleForm() {
        this.addFormContainer.classList.toggle(configService.classForOpenItem);
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

    bindRowActions(addNoteHandler) {
        //@todo remove className
        this.questionsList.addEventListener('click', event => {
            if (event.target.classList.contains('has-answer')) {
                this._bindShowAnswer(event.target);
            } else if (event.target.classList.contains('add-note')) {
                this._bindAddNote(event.target, addNoteHandler);
            }
        });

        this.questionsList.addEventListener('dblclick', event => {
            if (event.target.classList.contains('note-text')) {
                this._bindEditNote(event.target);
            }
        });
    }

    _bindShowAnswer(clickedElement) {
        clickedElement.closest(this.questionContainerSelector).classList.toggle(configService.classForOpenItem);
    }

    _bindAddNote(clickedElement, handler) {
        const noteContainer = clickedElement.closest(this.noteContainerSelector);
        const noteElement = noteContainer.querySelector(this.noteSelector);
        const label = noteContainer.querySelector(this.labelSelector);
        const note = noteElement.value.trim();
        const questionId = noteElement.id;

        if (note) {
            label.textContent = note;
            handler(questionId, note);
            noteContainer.classList.toggle(configService.classForOpenItem);
        } else {
            //@todo show error
        }
    }

    _bindEditNote(clickedElement) {
        clickedElement.closest(this.noteContainerSelector).classList.toggle(configService.classForOpenItem);
    }
}
