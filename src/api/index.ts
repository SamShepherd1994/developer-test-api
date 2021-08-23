import fetch, { BodyInit } from "node-fetch";

interface IAddress {
    id: string;
    address1: string;
    address2: string;
    postcode: string;
}

interface ICreditor {
    id: string;
    surname: string;
    addressID: string;
    name: string;
    value: number;
    secured: boolean;
}

export default class {
    private baseUrl = `https://developer-test-service-2vfxwolfiq-nw.a.run.app`;

    public async getAddresses(): Promise<IAddress[]> {
        const res = await fetch(this.baseUrl+"/addresses");
        return await res.json();
    }

    public async getCreditors(): Promise<ICreditor[]> {
        const res = await fetch(this.baseUrl+"/addresses");
        return await res.json();
    }

    public async filterAddresses(body: BodyInit): Promise<IAddress[]> {
        const res = await fetch(this.baseUrl+"/addresses", { method: "post", body, headers: { 'Content-Type': 'application/json' }, });
        return await res.json();
    }

    public async filterCreditors(body: BodyInit): Promise<ICreditor[]> {
        const res = await fetch(this.baseUrl+"/creditors", { method: "post", body, headers: { 'Content-Type': 'application/json' }, });
        return await res.json();
    }
}