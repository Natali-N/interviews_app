import { configService } from './../configService';

export default class QuestionsView {
    constructor(questionsTemplate) {
        this.questionsTemplate = questionsTemplate;
        this.questionsPage = document.querySelector('.app');

        this.rowSelector = '.row';
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

    bindRowActions(addNoteHandler, addScoreHandler) {
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

        this.questionsList.addEventListener('blur', event => {
            if (event.target.classList.contains('score')) {
                this._bindAddScore(event.target, addScoreHandler);
            }
        }, true);
    }

    _bindShowAnswer(clickedElement) {
        clickedElement.closest(this.questionContainerSelector).classList.toggle(configService.classForOpenItem);
    }

    _bindAddNote(clickedElement, handler) {
        const row = clickedElement.closest(this.rowSelector);
        const noteContainer = row.querySelector(this.noteContainerSelector);
        const noteElement = noteContainer.querySelector(this.noteSelector);
        const label = noteContainer.querySelector(this.labelSelector);
        const note = noteElement.value.trim();
        const questionId = row.id;

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

    _bindAddScore(clickedElement, handler) {
        const score = clickedElement.value.trim();
        const row = clickedElement.closest(this.rowSelector);
        const questionId = row.id;

//@todo scores to variables
        if (!isNaN(score) && score <= 3 && score >= 0) {
            handler(questionId, score)
        } else {
            clickedElement.classList.add('error');
        }
    }

    bindAddToList(handler) {
        //@todo form fields validation
        this.addToList.addEventListener('click', () => {
            const formElements = this.addForm.elements;
            const question = formElements.question.value.trim();
            const answer = formElements.answer.value.trim();
            const report = formElements.report.value.trim();
            const level = formElements.level.value;

            if (question && report && level) {

                formElements.question.value = '';
                formElements.answer.value = '';
                formElements.report.value = '';

                handler({
                    question: question,
                    answer: answer,
                    report: report,
                    level: level
                });
            } else {
                //@todo show some error
            }
        });
    }
}
