import TemplateService from './templateService';

export default class ViewService {
    constructor(templateService) {
        this.templateService = templateService;
        this.questionsList = document.querySelector('.questions-list');
    }

    showData(allQuestionsLeveled) {
        this.questionsList.innerHTML = this.templateService.prepareQuestionsList(allQuestionsLeveled);
    }
}
