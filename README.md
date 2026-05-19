# Sistema de Currículos

Aplicação de currículos desenvolvida em Next.js com interface moderna, navegação clara e recursos de cadastro dinâmico.

## Tecnologias
- Next.js 16.2.6
- React 19
- Tailwind CSS v4
- React Hook Form
- Yup
- React Input Mask Next
- Sonner
- React Icons
- LocalStorage para persistência local

## Como executar
```bash
npm install
npm run dev
```

## Páginas principais
- `/` - Landing page com apresentação do sistema
- `/sistema/paginas/curriculos` - Lista de currículos com busca em tempo real
- `/sistema/paginas/curriculos/novo` - Formulário para adicionar novo currículo
- `/sistema/paginas/curriculos/[id]` - Detalhes do currículo

## Funcionalidades
- ✅ Formulários com React Hook Form e validação de esquema via Yup
- ✅ Máscaras com React Input Mask Next para CPF, telefone e data
- ✅ Feedback visual com Sonner (toasts)
- ✅ Cadastro de novos currículos e persistência em localStorage
- ✅ Busca em tempo real na lista por nome e cargo
- ✅ Campos de experiência e formação com adição/remoção dinâmica
- ✅ Botões com estados de hover, focus-visible e disabled
- ✅ Navegação com link ativo no menu
- ✅ Tema escuro com paleta azul/preto/branco

## Detalhes de implementação
- O formulário valida todas as entradas obrigatórias antes de salvar
- Mensagens de erro específicas do Yup são exibidas no toast e abaixo do botão de envio
- A lista de currículos carrega os dados padrão e os cadastros salvos no navegador
- A página de detalhes usa o ID da rota para recuperar o currículo salvo

## Observações
- O upload de imagem é simulado: apenas o nome do arquivo selecionado é exibido
- Currículos salvos permanecem disponíveis enquanto o localStorage estiver acessível

## Status
Projeto funcional e pronto para uso/entrega.