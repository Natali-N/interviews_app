import { configService } from './../configService';

export default class ReportView {
    constructor(reportTemplate) {
        this.reportTemplate = reportTemplate;
        this.reportPage = document.querySelector('.app');
    }

    showInitialTemplate() {
        this.reportPage.innerHTML = this.reportTemplate.prepareInitialTemplate();
    }
}
