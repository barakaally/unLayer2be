import { BeefreeDesign, Body, Column, ComputedStyle, Descriptor, Module, Row, Style } from "../model/beefree.model";
import { Body as UBody } from "../model/unlayer.model";
import { UnlayerDesign } from "../model/unlayer.model";

export class UnlayerEmailJson {

    fromObject = (data: BeefreeDesign): UnlayerDesign => this.mapBe2Unlayer(data as BeefreeDesign);

    fromString(data: string): UnlayerDesign {

        let design = {} as UnlayerDesign | BeefreeDesign;

        if (typeof data === 'string') {
            design = JSON.parse(decodeURIComponent(data));
        }

        if (!Object.keys(data).includes("page"))
            return design as UnlayerDesign;
        else
            return this.mapBe2Unlayer(design as BeefreeDesign);
    }

    mapBe2Unlayer(data: BeefreeDesign) {
        let design = {} as UnlayerDesign;

        Object.entries(data["page"]).forEach(([key, value]) => {

            switch (key) {
                case "body":

                    design.body = {
                        rows: this.mapBeRow2Unlayer(data["page"]["rows"]),
                        values: data["page"]["body"].container.style as any
                    };

                    break;
            }
        })
        return design;
    }

    mapBeRow2Unlayer = (rows: Row[]) => rows.map(r => {
        return {
            cells: [1],
            columns: this.mapBeColumn2Unlayer(r.columns),
            values: r.container.style
        } as any
    })

    mapBeColumn2Unlayer = (columns: Column[]) => columns.map(c => {
        return {
            contents: this.mapBeModule2Unlayer(c.modules),
            values: c.style,
        }
    });

    mapBeModule2Unlayer = (modules: Module[]) => modules.map(m => {
        return {
            type: m.type.split('-')[m.type.split('-').length - 1],
            values: this.mapBeValues2Unlayer(m.descriptor)
        }
    })

    mapBeValues2Unlayer = (descriptor: Descriptor) => Object.assign({}, {
        ...descriptor.computedStyle,
        ...descriptor.style,
        text: descriptor?.text?.html,
        ...descriptor?.text?.style,
        ...descriptor?.text?.computedStyle
    });
}





