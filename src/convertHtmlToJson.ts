import * as htmlToJson from "html-to-json";

export const convertHtmlToJson = (data: string) => {
    return new Promise(resolve => {
        htmlToJson.parse(data, {
            text: resolve
        });
    })
};
