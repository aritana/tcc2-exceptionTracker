import IProjeto from "./IProjeto";

export default interface ITarefa {
    duracaoEmSegudos: number,
    descrição: string,
    projeto: IProjeto
}