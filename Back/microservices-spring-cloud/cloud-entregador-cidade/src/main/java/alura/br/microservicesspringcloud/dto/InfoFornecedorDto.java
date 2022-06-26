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

    private String nome;
    private String cidade;

    public static InfoFornecedorDto map(InfoFornecedor infoFornecedor) throws NotFoundException {

        InfoFornecedorDto infoFornecedorDto = null;
        try {
            String nome = infoFornecedor.getNome();
            String cidade = infoFornecedor.getCidade();
            infoFornecedorDto = InfoFornecedorDto.builder()
                    .nome(nome)
                    .cidade(cidade)
                    .build();
        } catch (NullPointerException exception) {
            throw new NotFoundException("Cidade não encontrada", exception);
        }
        return infoFornecedorDto;
    }
}
