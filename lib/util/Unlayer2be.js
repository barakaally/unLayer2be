"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unlayer2be = void 0;
const UnlayerEmailJson_1 = require("./UnlayerEmailJson");
class Unlayer2be {
}
exports.Unlayer2be = Unlayer2be;
/**
 * @description get unlayer design from beefree url encoded design json
 * @param data string @description Beefree url encoded design Json
 * @returns UnlayerDesin @description Unlayer design Json
 */
Unlayer2be.from = (data) => new UnlayerEmailJson_1.UnlayerEmailJson().fromString(data);
/**
 * @description get unlayer design from beefree design json
 * @param data BeefreeDesign  @description Beefree design Json
 * @returns UnlayerDesign @description Unlayer design Json
 */
Unlayer2be.design = (data) => new UnlayerEmailJson_1.UnlayerEmailJson().fromDesign(data);
