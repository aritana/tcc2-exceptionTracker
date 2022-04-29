package alura.br.microservicesspringcloud.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "feign.client.config.default")
@Getter
@Setter
public class FeignProperties {
    private int connectTimeout;
    private int readTimeout;
    private String loggerLevel;
}
