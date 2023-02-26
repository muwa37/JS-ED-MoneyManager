/* Основная функция для совершения запросов на сервер. */
"use strict";

const createRequest = (options = {}, callback) => {
    let url = options.url;

    if (!options.body && !(url === '/user/logout' )) return;
    
    if (options.method === 'GET' && (options.body)) {
        const dataArr = Object.entries(options.body);
        dataArr.map(([key, value]) => `${key}=${value}`);
        const encodedData = '?' + dataArr.join('&');
        url += encodedData;
        delete options.body;
        delete options.url;
    }

    fetch(url, options)
        .then(response => response.json)
        .then(data => callback(data))
        .catch(error => console.log(error));

};
