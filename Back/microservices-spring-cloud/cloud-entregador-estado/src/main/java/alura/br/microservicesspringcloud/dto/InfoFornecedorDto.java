package alura.br.microservicesspringcloud.dto;

import alura.br.microservicesspringcloud.exception.NotFoundException;
import alura.br.microservicesspringcloud.model.InfoFornecedor;
import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class InfoFornecedorDto {
    private String nomeFornecedorEstado;
    private String estado;
    private String nomeFornecedorCidade;
    private String cidade;

    public static InfoFornecedorDto map(InfoFornecedor infoFornecedor, InfoFornecedorCidadeDto infoFornecedorCidadeDto) throws NotFoundException {
        InfoFornecedorDto infoFornecedorDto = null;
        try {
            String nomeFornecedorEstado = infoFornecedor.getNome();
            String estado = infoFornecedor.getEstado();
            String nomeFornecedorCidade = infoFornecedorCidadeDto.getNome();
            String cidade = infoFornecedorCidadeDto.getCidade();

            infoFornecedorDto = InfoFornecedorDto.builder()
                    .nomeFornecedorEstado(nomeFornecedorEstado)
                    .estado(estado)
                    .nomeFornecedorCidade(nomeFornecedorCidade)
                    .cidade(cidade)
                    .build();

        } catch (NullPointerException exception) {
            throw new NotFoundException("Estado não encontrado", exception);
        }
        return infoFornecedorDto;
    }
}
