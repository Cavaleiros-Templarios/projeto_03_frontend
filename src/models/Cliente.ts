import type Oportunidade from "./Oportunidade";

export default interface Cliente{
    id: number | undefined;
    nome: string;
    email: string;
    oportunidade?: Oportunidade[] | null;
}