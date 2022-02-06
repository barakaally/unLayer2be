"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unlayer2be = void 0;
const bee2Unlayer_1 = require("../design/bee2Unlayer");
const html2Unlayer_1 = require("../design/html2Unlayer");
class Unlayer2be {
}
exports.Unlayer2be = Unlayer2be;
/**
 * @description get unlayer design from bee url encoded design json
 * @param data string @description Bee url encoded design Json
 * @returns UnlayerDesin @description Unlayer design Json
 */
Unlayer2be.from = (data) => new bee2Unlayer_1.Bee2Unlayer().fromString(data);
/**
 * @description get unlayer design from bee design json
 * @param data BeeDesign  @description Bee design Json
 * @returns UnlayerDesign @description Unlayer design Json
 */
Unlayer2be.design = (data) => new bee2Unlayer_1.Bee2Unlayer().fromDesign(data);
/**
 * @description get unlayer design from html
 * @param data HTML  @description Bee design Json
 * @returns UnlayerDesign @description Unlayer design Json
 */
Unlayer2be.fromHtml = (data) => new html2Unlayer_1.Html2Unlayer().from(data);
