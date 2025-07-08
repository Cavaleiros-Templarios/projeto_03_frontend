import type Cliente from "./Cliente";
import type Usuario from "./Usuario";

export default interface Oportunidade{
    id: number;
    titulo: string;
    status: string;
    valor: number;
    data_abertura: string;
    data_fechamento: string;
    cliente: Cliente | null;
    usuario: Usuario | null;
}