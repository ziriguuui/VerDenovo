package com.verdenovo.api.controller;

import com.verdenovo.api.entity.Ponto;
import com.verdenovo.api.entity.Categoria;
import com.verdenovo.api.entity.Usuario;
import com.verdenovo.api.repository.PontoRepository;
import com.verdenovo.api.repository.CategoriaRepository;
import com.verdenovo.api.repository.UsuarioRepository;
import com.verdenovo.api.dto.*;
import com.verdenovo.api.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/pontos")
public class PontoController {
    
    @Autowired
    private PontoRepository pontoRepository;
    
    @Autowired
    private CategoriaRepository categoriaRepository;
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping
    public List<Ponto> listarPontos() {
        return pontoRepository.findByStatusPonto("ATIVO");
    }
    
    @GetMapping("/todos")
    public List<Ponto> listarTodosPontos() {
        return pontoRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<MessageResponse> criarPonto(@RequestBody Ponto ponto,
            org.springframework.security.core.Authentication authentication) {
        if (authentication != null) {
            String email = authentication.getName();
            usuarioRepository.findByEmail(email).ifPresent(u -> {
                // Verificar se já tem ponto ativo ou pendente
                boolean jaTemPonto = pontoRepository.findByUsuarioId(u.getId()).stream()
                    .anyMatch(p -> "ATIVO".equals(p.getStatusPonto()) || "PENDENTE".equals(p.getStatusPonto()));
                if (jaTemPonto) {
                    throw new RuntimeException("Você já possui um ponto de coleta cadastrado.");
                }
                ponto.setUsuarioId(u.getId());
            });
        }
        if (ponto.getSenha() != null && !ponto.getSenha().isEmpty()) {
            ponto.setSenha(passwordEncoder.encode(ponto.getSenha()));
        } else {
            String senhaTemp = java.util.UUID.randomUUID().toString().substring(0, 12);
            ponto.setSenha(passwordEncoder.encode(senhaTemp));
        }
        ponto.setDataCadastro(LocalDateTime.now());
        ponto.setStatusPonto("PENDENTE");
        pontoRepository.save(ponto);
        return ResponseEntity.ok(new MessageResponse("Ponto cadastrado com sucesso! Aguardando aprovação do administrador."));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MessageResponse> atualizarPonto(@PathVariable Long id, @RequestBody Ponto pontoAtualizado) {
        Ponto ponto = pontoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ponto não encontrado"));
        ponto.setNome(pontoAtualizado.getNome());
        ponto.setCep(pontoAtualizado.getCep());
        ponto.setNumero(pontoAtualizado.getNumero());
        ponto.setComplemento(pontoAtualizado.getComplemento());
        ponto.setLogradouro(pontoAtualizado.getLogradouro());
        ponto.setTelefone(pontoAtualizado.getTelefone());
        ponto.setHoraFuncionamento(pontoAtualizado.getHoraFuncionamento());
        ponto.setMaterial(pontoAtualizado.getMaterial());
        ponto.setDescricao(pontoAtualizado.getDescricao());
        pontoRepository.save(ponto);
        return ResponseEntity.ok(new MessageResponse("Ponto atualizado com sucesso"));
    }

    @GetMapping("/pendentes")
    public List<Ponto> listarPontosPendentes() {
        return pontoRepository.findByStatusPonto("PENDENTE");
    }

    @GetMapping("/meus")
    public ResponseEntity<?> listarMeusPontos(org.springframework.security.core.Authentication authentication) {
        if (authentication == null) return ResponseEntity.status(401).build();
        String email = authentication.getName();
        return usuarioRepository.findByEmail(email)
            .map(u -> ResponseEntity.ok(pontoRepository.findByUsuarioId(u.getId())))
            .orElse(ResponseEntity.ok(java.util.List.of()));
    }

    @PutMapping("/{id}/aprovar")
    public ResponseEntity<MessageResponse> aprovarPonto(@PathVariable Long id) {
        Ponto ponto = pontoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ponto não encontrado"));
        ponto.setStatusPonto("ATIVO");
        pontoRepository.save(ponto);
        return ResponseEntity.ok(new MessageResponse("Ponto aprovado com sucesso"));
    }

    @PutMapping("/{id}/rejeitar")
    public ResponseEntity<MessageResponse> rejeitarPonto(@PathVariable Long id) {
        Ponto ponto = pontoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ponto não encontrado"));
        ponto.setStatusPonto("REJEITADO");
        pontoRepository.save(ponto);
        return ResponseEntity.ok(new MessageResponse("Ponto rejeitado"));
    }
    @PutMapping("/{id}/status")
    public ResponseEntity<MessageResponse> alterarStatusPonto(@PathVariable Long id) {
        Ponto ponto = pontoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ponto não encontrado"));
        String novoStatus = "ATIVO".equals(ponto.getStatusPonto()) ? "INATIVO" : "ATIVO";
        ponto.setStatusPonto(novoStatus);
        pontoRepository.save(ponto);
        return ResponseEntity.ok(new MessageResponse("Status do ponto alterado com sucesso"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deletarPonto(@PathVariable Long id) {
        pontoRepository.deleteById(id);
        return ResponseEntity.ok(new MessageResponse("Ponto excluído com sucesso"));
    }
    
    @PostMapping("/login")
    public ResponseEntity<PontoLoginResponse> loginPonto(@RequestBody PontoLoginRequest request) {
        Ponto ponto = pontoRepository.findByEmailAndStatusPonto(request.getEmail(), "ATIVO")
                .orElseThrow(() -> new RuntimeException("Credenciais inválidas"));

        if (ponto.getSenha() == null || !passwordEncoder.matches(request.getSenha(), ponto.getSenha())) {
            throw new RuntimeException("Credenciais inválidas");
        }

        String token = jwtUtil.generateToken(ponto.getEmail());
        PontoResponse pontoResponse = new PontoResponse(
                ponto.getId(), ponto.getNome(), ponto.getEmail(),
                ponto.getCep(), ponto.getNumero(), ponto.getComplemento(),
                ponto.getLogradouro(), ponto.getTelefone(),
                ponto.getHoraFuncionamento(), ponto.getMaterial()
        );
        return ResponseEntity.ok(new PontoLoginResponse(token, pontoResponse));
    }
}