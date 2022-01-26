"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unlayer2be = void 0;
const UnlayerEmailJson_1 = require("./UnlayerEmailJson");
class Unlayer2be {
}
exports.Unlayer2be = Unlayer2be;
Unlayer2be.from = (data) => new UnlayerEmailJson_1.UnlayerEmailJson().fromString(data);
Unlayer2be.fromDesign = (data) => new UnlayerEmailJson_1.UnlayerEmailJson().fromDesign(data);
