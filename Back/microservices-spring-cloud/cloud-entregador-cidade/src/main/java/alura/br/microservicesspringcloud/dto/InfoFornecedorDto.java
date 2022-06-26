package alura.br.microservicesspringcloud.dto;

import alura.br.microservicesspringcloud.exception.NotFoundException;
import alura.br.microservicesspringcloud.model.InfoFornecedor;
import javafx.scene.control.TableRow;
import lombok.*;
import net.bytebuddy.implementation.bytecode.Throw;
import org.apache.logging.slf4j.SLF4JLogger;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InfoFornecedorDto {

    private String nome;
    private String cidade;
    private static Logger logger = LoggerFactory.getLogger(SLF4JLogger.class);

        public static InfoFornecedorDto map(InfoFornecedor infoFornecedor) throws NotFoundException{

        InfoFornecedorDto infoFornecedorDto = null;
        try {
            String nome = infoFornecedor.getNome();
            String cidade =  infoFornecedor.getCidade();
            infoFornecedorDto = InfoFornecedorDto.builder()
                    .nome(nome)
                    .cidade(cidade)
                    .build();

        }catch (NullPointerException exception){

            logger.info("NullPointerException {}",exception);
            throw new NotFoundException("Cidade não encontrada",exception);
        }

        return infoFornecedorDto;
    }
}
