import { configService } from './../configService';

export default class ReportView {
    constructor(reportTemplate) {
        this.reportTemplate = reportTemplate;
        this.reportPage = document.querySelector('.app');
    }

    showInitialTemplate() {
        this.reportPage.innerHTML = this.reportTemplate.prepareInitialTemplate();
    }

    findElements() {
        this.reportFormContainer = this.reportPage.querySelector('.report-form-container');
        this.reportForm = this.reportFormContainer.querySelector('.report-form');
        this.report = this.reportFormContainer.querySelector('.report');
        this.createReportButton = this.reportForm.querySelector('.create-report');
    }

    bindCreateReport(handler) {
        this.createReportButton.addEventListener('click', () => {
            const formElements = this.reportForm.elements;
            const name = formElements.name.value.trim();
            const position = formElements.position.value;
            const english = formElements.english.value;
            const level = formElements.level.value;
            const general = formElements.general.value.trim();

            if (name && position && level) {
                handler({
                    name: name,
                    position: position,
                    english: english,
                    level: level,
                    general: general
                });
            } else {
                //@todo show error
            }
        });
    }

    showReport(reportData, allCheckedLeveledQuestions) {
        debugger;
        this.report.innerHTML = this.reportTemplate.prepareReportTemplate(reportData, allCheckedLeveledQuestions);
        this.reportFormContainer.classList.toggle(configService.classForOpenItem)
    }
}
