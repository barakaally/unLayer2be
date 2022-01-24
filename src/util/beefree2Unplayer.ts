import { BeefreeDesign, Body } from "../model/beefree.model";
import { Body as UBody } from "../model/unlayer.model";
import { UnlayerDesign } from "../model/unlayer.model";

export function Beefree2Unplayer(data: UnlayerDesign | BeefreeDesign | string): UnlayerDesign {

    if (typeof data === 'string') {
        data = JSON.parse(decodeURIComponent(data));
    }

    if (!Object.keys(data).includes("page"))
        return data as UnlayerDesign;

    return mapBee2Unlayer(data as BeefreeDesign);
}

function mapBee2Unlayer(data: BeefreeDesign) {
    let design = {} as UnlayerDesign;

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
                                        return {
                                            type: m.type.split('-')[m.type.split('-').length - 1],
                                            values: {
                                                ...m.descriptor.computedStyle,
                                                ...m.descriptor.style,
                                                text: m.descriptor?.text?.html,
                                                ...m.descriptor?.text?.style,
                                                ...m.descriptor?.text?.computedStyle
                                            }
                                        }
                                    }),
                                    values: c.style,
                                }
                            }),
                            values: r.container.style
                        } as any
                    }),
                    values: data["page"]["body"].container.style as any
                };

                break;
        }
    })
    return design;
}
