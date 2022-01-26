import { BeefreeDesign, Body, Column, ComputedStyle, Descriptor, Module, Row, Style } from "../model/beefree.model";
import { Body as UBody } from "../model/unlayer.model";
import { UnlayerDesign } from "../model/unlayer.model";

export class UnlayerEmailJson {

    fromDesign = (data: BeefreeDesign): UnlayerDesign => this.getDesign(data as BeefreeDesign);

    fromString(data: string): UnlayerDesign {

        let design = {} as UnlayerDesign | BeefreeDesign;

        if (typeof data === 'string') {
            design = JSON.parse(decodeURIComponent(data));
        }

        if (!Object.keys(data).includes("page"))
            return design as UnlayerDesign;
        else
            return this.getDesign(design as BeefreeDesign);
    }

    getDesign(data: BeefreeDesign) {
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
            values: this.mapBeStyle2Unlayer(r.container.style)
        } as any
    })

    mapBeColumn2Unlayer = (columns: Column[]) => columns.map(c => {
        return {
            contents: this.mapBeModule2Unlayer(c.modules),
            values: this.mapBeStyle2Unlayer(c.style),
        }
    });

    mapBeModule2Unlayer = (modules: Module[]) => modules.map(m => {
        return {
            type: m.type.split('-')[m.type.split('-').length - 1],
            values: this.mapBeDescriptor2Unlayer(m.descriptor)
        }
    })

    mapBeDescriptor2Unlayer = (descriptor: Descriptor) => Object.assign({}, {
        ...descriptor.computedStyle,
        ...descriptor.style,
        ...this.mapBeStyle2Unlayer(descriptor?.text?.style, descriptor?.text?.html),
        ...descriptor?.text?.computedStyle

    });

    mapBeStyle2Unlayer = (style: Style, text?: string) => {
        return {
            containerPadding: style.padding,
            headingType: "h1",
            fontFamily: {
                label: "Bee free font",
                value: style["font-family"]
            },
            fontSize: style["font-size"],
            textAlign: style["text-align"],
            lineHeight: style["line-height"],
            linkStyle: style["link-style"],
            displayCondition: null,
            _meta: {
                htmlID: "",
                htmlClassNames: ""
            },
            selectable: false,
            draggable: false,
            duplicatable: false,
            deletable: false,
            hideable: false,
            text: text,
            href: {
                name: "web",
                values: {
                    href: "",
                    target: "_blank"
                }
            },
            buttonColors: {
                color: style.color,
                backgroundColor: style["background-color"],
                hoverColor: style.linkColor,
                hoverBackgroundColor: style["background-color"]
            },
            size: {
                autoWidth: true,
                width: style.width
            },
            padding: style["padding"],
            border: {},
            borderRadius: style["border-radius"],
            calculatedWidth: null,
            calculatedHeight: null,
            textColor: style["color"],
            backgroundColor: style["background-color"],
            backgroundImage: {
                url: style["background-image"],
                fullWidth: false,
                repeat: false,
                center: false,
                cover: false
            },
            contentWidth: style.width,
            contentAlign: style.align,
            preheaderText: "",
            columns: false,
            columnsBackgroundColor: '',
            hideDesktop: false
        }
    }
}





