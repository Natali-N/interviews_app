import { configService } from './configService';

export default class DataService {

    constructor(name) {
        this.name = name;
        this.storage = window.localStorage;
    }

    _requestDataFromServer(url) {
        return new Promise((resolve, reject) => {

            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);

            xhr.onload = function() {
                if (this.status === 200) {
                    resolve(this.response);
                } else {
                    const error = new Error(this.statusText);
                    error.code = this.status;
                    reject(error);
                }
            };

            xhr.onerror = function() {
                reject(new Error("Network Error"));
            };

            xhr.send();
        });
    }

    getAllQuestions() {
        return this._requestDataFromServer(configService.dataUrl).then(
            response => {
                let dataFromServer = JSON.parse(response).questions;

                if (Array.isArray(dataFromServer)) {
                    return this.writeToStorage(dataFromServer, true);
                } else {
                    //@todo show error
                    console.log('data from server isn\'t valid');
                }
            },
            error => alert(`Rejected: ${error}`)
        );
    }

    writeToStorage(data, requireMerge) {
        if (requireMerge) {
            const dataInStorage = this.getDataFromStorage();

            let idStorage = {};

            dataInStorage.forEach(item => {
                idStorage[item.id] = true;
            });

            data.forEach(item => {
                if (!idStorage[item.id]) {
                    dataInStorage.push(item)
                }
            });

            data = dataInStorage;
        }

        this.storage.setItem(this.name, JSON.stringify(data));

        return data;
    }

    getDataFromStorage() {
        let storageData = this.storage.getItem(this.name);

        if (!storageData) {
            storageData = '[]';
        }

        return JSON.parse(storageData);
    }
}
