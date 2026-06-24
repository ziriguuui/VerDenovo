package com.verdenovo.api.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.Optional;

/**
 * Converte um endereço (CEP + logradouro + número) em coordenadas de latitude/longitude.
 *
 * Usa a API pública do Nominatim (OpenStreetMap), que é gratuita e não exige chave de API.
 * Política de uso do Nominatim: no máximo 1 requisição por segundo e é obrigatório enviar
 * um User-Agent identificando a aplicação. Como esse serviço só é chamado quando um Ponto
 * é criado/atualizado (operação pouco frequente), o limite de uso não é um problema aqui.
 *
 * Se a geocodificação falhar (endereço não encontrado, sem internet, API fora do ar, etc.),
 * o método retorna Optional.empty() e o cadastro do Ponto continua normalmente sem coordenadas
 * — o ponto simplesmente não terá pin no mapa do app mobile até ser corrigido/re-geocodificado.
 */
@Service
public class GeocodingService {

    private static final Logger log = LoggerFactory.getLogger(GeocodingService.class);
    private static final String NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(5))
            .build();

    private final ObjectMapper objectMapper = new ObjectMapper();

    public record Coordenadas(double latitude, double longitude) {}

    /**
     * Tenta geocodificar um endereço brasileiro.
     * @param logradouro rua/avenida (pode incluir bairro/cidade, como o ViaCEP retorna)
     * @param numero número do imóvel
     * @param cep CEP (somente dígitos)
     */
    public Optional<Coordenadas> geocodificar(String logradouro, String numero, String cep) {
        String endereco = montarEndereco(logradouro, numero, cep);
        if (endereco.isBlank()) {
            return Optional.empty();
        }
        try {
            String query = URLEncoder.encode(endereco + ", Brasil", StandardCharsets.UTF_8);
            URI uri = URI.create(NOMINATIM_URL + "?format=json&limit=1&q=" + query);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(uri)
                    .timeout(Duration.ofSeconds(5))
                    .header("User-Agent", "VerDenovo-TCC-App/1.0")
                    .GET()
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() != 200) {
                log.warn("Geocoding retornou status {} para endereço '{}'", response.statusCode(), endereco);
                return Optional.empty();
            }

            JsonNode resultados = objectMapper.readTree(response.body());
            if (!resultados.isArray() || resultados.isEmpty()) {
                log.info("Nenhum resultado de geocoding para endereço '{}'", endereco);
                return Optional.empty();
            }

            JsonNode primeiro = resultados.get(0);
            double lat = Double.parseDouble(primeiro.get("lat").asText());
            double lon = Double.parseDouble(primeiro.get("lon").asText());
            return Optional.of(new Coordenadas(lat, lon));

        } catch (Exception e) {
            log.warn("Falha ao geocodificar endereço '{}': {}", endereco, e.getMessage());
            return Optional.empty();
        }
    }

    private String montarEndereco(String logradouro, String numero, String cep) {
        StringBuilder sb = new StringBuilder();
        if (logradouro != null && !logradouro.isBlank()) {
            sb.append(logradouro.trim());
        }
        if (numero != null && !numero.isBlank() && !"S/N".equalsIgnoreCase(numero.trim())) {
            sb.append(", ").append(numero.trim());
        }
        if (cep != null && !cep.isBlank()) {
            sb.append(" - CEP ").append(cep.trim());
        }
        return sb.toString();
    }
}
