# Agendify - Project TODO

## Database & Backend
- [x] Criar tabelas de banco de dados (appointments, services, messages)
- [x] Implementar procedures de agendamento (criar, listar, cancelar)
- [x] Implementar procedures de serviços (listar, criar)
- [x] Implementar procedure de contato (enviar mensagem)
- [x] Implementar routers tRPC para todas as funcionalidades

## Frontend - Páginas
- [x] Página inicial (Home) com apresentação
- [x] Página de agendamento com calendário e formulário
- [x] Página de contato com formulário
- [x] Painel administrativo (Dashboard)
- [x] Página de login da proprietária

## Frontend - Componentes
- [x] Componente de calendário interativo
- [x] Componente de listagem de horários disponíveis
- [x] Componente de formulário de agendamento
- [x] Componente de formulário de contato
- [x] Componente de botão Instagram flutuante

## Funcionalidades - Fase 1
- [x] Sistema de agendamento online funcional
- [x] Validação de horários disponíveis
- [x] Atualização em tempo real de horários
- [x] Formulário de contato funcional
- [x] Botão Instagram com link direto
- [x] Navegação entre páginas

## Funcionalidades - Fase 2
- [x] Sistema de login da proprietária (@conceitomaribrandao / 262829ma)
- [x] Painel administrativo com calendário e lista de agendamentos
- [x] Funcionalidade de confirmar agendamento
- [x] Funcionalidade de cancelar agendamento
- [x] IA assistente com chat no painel
- [x] Análise de dados de atendimentos
- [x] Sugestões de horários movimentados
- [x] Geração de relatórios simples
- [x] Configuração PWA (manifest.json)
- [x] Meta tags para instalação em celular
- [x] Botão de login da proprietária na home

## Design & UX
- [x] Design responsivo (mobile, tablet, desktop)
- [x] Cores modernas (roxo, azul, branco)
- [x] Animações suaves
- [x] Ícones modernos
- [x] Footer com links
- [x] Navegação entre páginas
- [x] Design profissional estilo startup

## Próximas Melhorias (Opcional)
- [ ] Adicionar 7 procedimentos pré-configurados com imagens
- [ ] Funcionalidade de bloquear horários
- [ ] Adicionar cliente manualmente no painel
- [ ] Modo escuro opcional
- [ ] Animações ao rolar página
- [ ] Notificações por email
- [ ] Exportar agenda em PDF
- [ ] Integração com WhatsApp


## Bugs Encontrados
- [x] Serviços não aparecem na página de agendamento (CORRIGIDO - Adicionados 7 procedimentos ao BD)
- [x] Necessário popular banco de dados com serviços padrão (CORRIGIDO)

- [x] Remover preços e duração na exibição de serviços na página de agendamento

- [x] Remover tela de autenticação obrigatória (login)
- [x] Permitir agendamentos sem login
- [x] Garantir que agendamentos sejam salvos no banco de dados ao confirmar

- [x] Erro ao confirmar/cancelar agendamento no painel da proprietária (CORRIGIDO - Procedures mudadas para públicas)


## Nova Funcionalidade - Consulta de Agendamentos por Telefone
- [x] Criar página de consulta de agendamentos por telefone
- [x] Implementar backend para buscar agendamentos por telefone
- [x] Adicionar rota no App.tsx
- [x] Testar a funcionalidade
