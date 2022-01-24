import { BeefreeDesign, Body } from "../model/beefree.model";
import { Body as UBody } from "../model/unlayer.model";
import { UnlayerDesign } from "../model/unlayer.model";

export function Beefree2Unplayer(data: BeefreeDesign): UnlayerDesign {
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
                                    contents: c.modules,
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
