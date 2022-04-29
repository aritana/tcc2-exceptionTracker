package alura.br.microservicesspringcloud.dto.responseError;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InfoFornecedorErrorDto {

    private String timestamp;
    private String status;
    private String error;
    private String message;
    private String trace_id;

}
