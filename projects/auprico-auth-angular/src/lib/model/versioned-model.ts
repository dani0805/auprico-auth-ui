
import {DateUtility} from '../utility/date-utility';

export class VersionedModel {
  id: string;
  createdTs: Date;
  editedTs: Date;
}

export abstract class BaseModel {
    id: string;

    pk(): number {
        if (!this['id']) {
            return null;
        }
        return base64ToPK(this['id']);
    }

    abstract init(json: any);

    get objectDateFields(): string[] {
        let meta = this["__proto__"]['__META_PROP_DATE__'];
        if (meta) {
            return meta[this.constructor.name];
        }
        return [];
    }

    get objectFields(): string[] {
        let meta = this["__proto__"]['__META_PROP__']
        if (meta) {
            return meta[this.constructor.name] + ['suggestions'];
        }
        return [];
    }

    constructor(json: any = {}) {
        if (!json) {
            return;
        }
        let fields = this.objectFields || [];
        let dateFields = this.objectDateFields || [];
        for (let fieldName in json) {
            if (fields.indexOf(fieldName) > -1) {
                let value = json[fieldName];

                if (value == "FALSE") {
                    value = false;
                }
                if (value == "TRUE") {
                    value = true;
                }

                if (dateFields.indexOf(fieldName) > -1) {
                    // if it is a date we need to convert it to date object
                    // moreover if the configuration is consistent the field should be present
                    this[fieldName] = DateUtility.deserializeDate(value);
                } else {
                    this[fieldName] = value;
                }
            }
        }
    }

}

export function rProperty(type: any = undefined) {
    if (type == Date) {
        return storeDateProperty;
    }
    return storeProperty;
}

function storeProperty(target: any, key: string) {
    if (!(target.hasOwnProperty('__META_PROP__'))) {
        target['__META_PROP__'] = {};
    }
    let constructorName = target.constructor.name;
    if (!(target['__META_PROP__'].hasOwnProperty(constructorName))) {
        target['__META_PROP__'][constructorName] = [];
    }
    if (target['__META_PROP__'][constructorName].indexOf(key) == -1) {
        target['__META_PROP__'][constructorName].push(key);
    }
}

function storeDateProperty(target: any, key: string) {
    storeProperty(target, key);
    if (!(target.hasOwnProperty('__META_PROP_DATE__'))) {
        target['__META_PROP_DATE__'] = {};
    }
    let constructorName = target.constructor.name;
    if (!(target['__META_PROP_DATE__'].hasOwnProperty(constructorName))) {
        target['__META_PROP_DATE__'][constructorName] = [];
    }
    if (target['__META_PROP_DATE__'][constructorName].indexOf(key) == -1) {
        target['__META_PROP_DATE__'][constructorName].push(key);
    }
}

export function base64ToModel(b64: string): string {
    let parts = atob(b64).split(":");
    if (parts.length == 2) {
        return parts[0];
    }
    return undefined;
}

export function base64ToPK(b64: string): number {
    let parts = atob(b64).split(":");
    if (parts.length == 2) {
        let n = Number(parts[1])
        if (!isNaN(n)) {
            return n;
        }
    }
    return undefined;
}

export function pkToBase64(nodeClass: string, pk: number): string {
    return btoa(`${nodeClass}:${pk}`);
}

export function parseArray<T>(json: any, classProto: any, attrName: string): T[] {
    if (!(json && json[attrName] && json[attrName]["edges"]) || !classProto) {
        return [];
    }
    let edges: any[] = json[attrName]["edges"];
    let res = [];
    //console.log("edges", edges);
    for (let x of edges) {
        res.push(new classProto(x["node"]));
    }
    //console.log("res", res);
    return res;
}

export function parseAttr<T>(json: any, classProto: any, attrName: string): T {
    if (json && json[attrName]) {
        return new classProto(json[attrName]);
    }
    return undefined;
}
