# Sistema de Currículos

Projeto em Next.js para gerenciar currículos com páginas de:
- listagem
- detalhes
- novo currículo

## Tech Stack
- Next.js 16.2.6
- Tailwind CSS v4
- React Hook Form + Yup
- Sonner (toasts)
- React Icons
- React Input Mask

## Como rodar
```bash
npm install
npm run dev
```

## Funcionalidades
- ✅ Formulário dinâmico com Field Arrays (useFieldArray)
- ✅ Validação Yup em campos dinâmicos
- ✅ Persistência simulada com localStorage
- ✅ Tema azul/branco/preto
- ✅ Responsivo
- ✅ Ícones funcionais
- ✅ Filtro e busca em tempo real (Nome/Cargo com debounce)
- ✅ Estados de botão (hover, focus-visible, disabled)
- ✅ Navegação com link ativo (active state)
- ✅ Feedback específico de erros Yup no toast
- ✅ Navegação funcional (botões levam para currículos e início)

## Estrutura
- `/` - Landing page
- `/sistema/paginas/curriculos` - Lista de currículos
- `/sistema/paginas/curriculos/[id]` - Detalhes do currículo
- `/sistema/paginas/curriculos/novo` - Formulário de cadastro

## Navegação
- **Início**: Página principal com apresentação do sistema
- **Currículos**: Lista completa de currículos com busca em tempo real
- **Contato**: Retorna à página inicial (mesmo que Início)

## Desafios Técnicos Implementados
- Gerenciamento de Formulário Dinâmico (Experiência Profissional e Formação Acadêmica)
- Campos dinâmicos com validação individual
- Adicionar/remover itens dinamicamente
- Persistência de arrays no localStorage
- Filtro e busca em tempo real com debounce (300ms)
- Estados avançados de botão (hover, focus, disabled, loading)
- Navegação com active state usando usePathname
- Feedback de erro específico do Yup nos toasts

## Status
Projeto completo e funcional, pronto para entrega.
