"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Beefree2Unplayer = void 0;
function Beefree2Unplayer(data) {
    if (typeof data === 'string') {
        data = JSON.parse(decodeURIComponent(data));
    }
    if (!Object.keys(data).includes("page"))
        return data;
    return mapBee2Unlayer(data);
}
exports.Beefree2Unplayer = Beefree2Unplayer;
function mapBee2Unlayer(data) {
    let design = {};
    Object.entries(data["page"]).forEach(([key, value]) => {
        switch (key) {
            case "body":
                design.body = {
                    rows: data["page"]["rows"].map(r => {
                        return {
                            cells: [1],
                            columns: r.columns.map(c => {
                                return {
                                    contents: c.modules.map(m => {
                                        var _a, _b, _c, _d, _e, _f;
                                        return {
                                            type: m.type.split('-')[m.type.split('-').length - 1],
                                            values: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, m.descriptor.computedStyle), m.descriptor.style), { text: (_b = (_a = m.descriptor) === null || _a === void 0 ? void 0 : _a.text) === null || _b === void 0 ? void 0 : _b.html }), (_d = (_c = m.descriptor) === null || _c === void 0 ? void 0 : _c.text) === null || _d === void 0 ? void 0 : _d.style), (_f = (_e = m.descriptor) === null || _e === void 0 ? void 0 : _e.text) === null || _f === void 0 ? void 0 : _f.computedStyle)
                                        };
                                    }),
                                    values: c.style,
                                };
                            }),
                            values: r.container.style
                        };
                    }),
                    values: data["page"]["body"].container.style
                };
                break;
        }
    });
    return design;
}
