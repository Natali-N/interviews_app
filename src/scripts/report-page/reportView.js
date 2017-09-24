import { configService } from './../configService';

export default class ReportView {
    constructor(reportTemplate) {
        this.reportTemplate = reportTemplate;
        this.reportPage = document.querySelector('.main');
    }

    showInitialTemplate() {
        this.reportPage.innerHTML = this.reportTemplate.prepareInitialTemplate();
    }
}
