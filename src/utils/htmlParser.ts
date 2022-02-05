import { JSDOM } from "jsdom";

export class HtmlParser{

    static parse=(html:string)=>new JSDOM(html).window.document;

}