import { configService } from './../configService';

export default class QuestionsView {
    constructor(questionsTemplate) {
        this.questionsTemplate = questionsTemplate;
        this.questionsPage = document.querySelector('.app');

        this.questionContainerSelector = '.row__content';
        this.noteContainerSelector = '.row__note';
        this.noteSelector = '.note';
        this.labelSelector = '.note-text';
    }

    findElements() {
        this.questionsList = this.questionsPage.querySelector('.questions-list');
        this.addFormToggle = this.questionsPage.querySelector('.show-add-form');
        this.addFormContainer = this.questionsPage.querySelector('.add-form-container');
        this.addForm = this.addFormContainer.querySelector('.add-form');
        this.addToList = this.questionsPage.querySelector('.add-to-list');
    }

    showInitialTemplate() {
        this.questionsPage.innerHTML = this.questionsTemplate.prepareInitialTemplate();
    }

    showQuestions(allQuestionsLeveled) {
        this.questionsList.innerHTML = this.questionsTemplate.prepareQuestionsList(allQuestionsLeveled);
    }

    bindShowAddForm() {
        this.addFormToggle.addEventListener('click', this.toggleAddForm.bind(this));
    }

    toggleAddForm() {
        this.addFormContainer.classList.toggle(configService.classForOpenItem);
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
}
