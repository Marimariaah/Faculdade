# 🍰 Meu Docinho - Sistema Web de Vendas de Doces

Um sistema web completo e moderno de vendas de doces (e-commerce/delivery) desenvolvido com **HTML5**, **CSS3** e **JavaScript puro**, sem dependências externas.

## ✨ Características Principais

### 🎨 Design Premium
- **Dark Mode** elegante e moderno
- **Glassmorphism** leve e sofisticado
- **Paleta de cores** profissional e harmoniosa
- **Responsivo** (desktop, tablet, mobile)
- **Animações suaves** e transições elegantes

### 🔐 Autenticação
- Tela de **login** com validação
- Persisência de sessão com `localStorage`
- Proteção de rotas

### 🛍️ Dashboard Moderno
- **Sidebar** fixa com menu de navegação
- **Header** superior com barra de pesquisa
- **Grid** responsivo de produtos
- **Carrinho lateral** com totalizações em tempo real
- **Favoritos** funcional

### 🎯 Funcionalidades
- ✅ Adicionar/remover produtos do carrinho
- ✅ Atualizar quantidades
- ✅ Busca em tempo real
- ✅ Filtros por categoria (Pills)
- ✅ Ordenação (Popular, Preço, Mais recente)
- ✅ Sistema de favoritos
- ✅ Cálculo automático de totais
- ✅ Frete grátis acima de R$ 80
- ✅ Notificações e badges
- ✅ Menu mobile recolhível
- ✅ Carrinho mobile adaptável

## 📁 Estrutura do Projeto

```
meu-docinho/
├── assets/
│   ├── images/
│   │   ├── brigadeiro.svg
│   │   ├── cupcake.svg
│   │   ├── donut.svg
│   │   ├── bolo.svg
│   │   ├── macaron.svg
│   │   └── trufa.svg
│   └── icons/
├── css/
│   ├── login.css
│   └── home.css
├── js/
│   ├── login.js
│   └── home.js
├── pages/
│   ├── login.html
│   └── home.html
└── README.md
```

## 🎨 Paleta de Cores

```
Fundo Principal:      #000000 (Preto)
Azul Claro Principal: #A9CEF4 (Azul Claro)
Azul Médio:           #7EA0B7 (Azul Médio)
Cinza Escuro Azulado: #36494E (Cinza Escuro)
Azul Acinzentado:     #597081 (Cinza Azulado)
```

## 🚀 Como Usar

### 1. Abrir o Projeto
- Abra `pages/login.html` em seu navegador

### 2. Fazer Login
```
Email: usuario@email.com
Senha: 123456
```

### 3. Navegar no Dashboard
- Explore os produtos
- Use os filtros para categorias
- Busque por nome de produto
- Adicione itens ao carrinho
- Marque favoritos

## 📱 Responsividade

### Desktop (> 64rem)
- Layout completo com 3 colunas
- Sidebar e carrinho sempre visíveis
- Grid de produtos com 4+ colunas

### Tablet (39.99rem - 64rem)
- Sidebar recolhível (apenas ícones)
- Carrinho em overlay
- Grid responsivo com 3-4 colunas

### Mobile (< 40rem)
- Sidebar overlay com toggle
- Carrinho deslizável
- Botão flutuante de carrinho
- Grid em 2 colunas

## 🔧 Especificações Técnicas

### Unidades CSS
- ✅ `rem` - Para tipografia e espaçamentos
- ✅ `%` - Para larguras responsivas
- ✅ `vh/vw` - Para altura e viewport
- ✅ `em` - Para tamanhos relativos
- ❌ NÃO usa `px`

### JavaScript
- ✅ JavaScript puro (Vanilla JS)
- ✅ Sem frameworks (React, Vue, Angular)
- ✅ Sem bibliotecas externas (jQuery, Bootstrap)
- ✅ Componentes modularizados
- ✅ Código limpo e comentado

### HTML5
- ✅ Semântica correta
- ✅ Acessibilidade base
- ✅ Meta tags responsivas
- ✅ Validação HTML

### CSS3
- ✅ Grid CSS moderno
- ✅ Flexbox para layouts
- ✅ Transições e animações
- ✅ Gradientes
- ✅ Backdrop filters (glassmorphism)
- ✅ Media queries

## 🎯 Produtos Disponíveis

1. **Brigadeiro Premium** - R$ 8,90
2. **Cupcake de Morango** - R$ 12,50
3. **Donut Colorido** - R$ 9,90
4. **Bolo de Chocolate** - R$ 28,50
5. **Macaron Elegante** - R$ 15,00
6. **Trufa Gourmet** - R$ 6,50

## 💾 Persistência de Dados

O sistema usa `localStorage` para armazenar:
- ✅ Dados do usuário logado
- ✅ Status de autenticação
- ✅ Itens no carrinho
- ✅ Produtos favoritos

Todos os dados são salvos automaticamente e persistem entre sessões.

## 🎬 Animações

### Página de Login
- ✨ Entrada suave dos elementos
- 🎪 Flutuação da ilustração
- 🔄 Transições no hover dos botões
- ✓ Indicador de carregamento

### Página Home
- ✨ Fade in dos produtos
- 🎪 Elevação no hover dos cards
- 🎨 Transições de filtros
- 📊 Animação de adição ao carrinho
- 🛒 Slide in dos itens do carrinho

## 🔒 Recursos de Segurança

- ✅ Proteção de rotas autenticadas
- ✅ Validação de email e senha
- ✅ Mensagens de erro seguras
- ✅ Logout com limpeza de dados
- ✅ Selo de "Compra Segura" exibido

## 📝 Recursos de UX

- ✅ Feedback visual em todas as ações
- ✅ Carregamento simulado no login
- ✅ Mensagens de sucesso/erro elegantes
- ✅ Notificações interativas
- ✅ Badges atualizadas em tempo real
- ✅ Busca instantânea
- ✅ Filtros visuais

## 🌐 Navegadores Suportados

- ✅ Chrome (v90+)
- ✅ Firefox (v88+)
- ✅ Safari (v14+)
- ✅ Edge (v90+)
- ✅ Mobile Chrome
- ✅ Mobile Safari

## 📚 Estrutura de Código

### login.html / login.css / login.js
Implementa a autenticação com:
- Formulário validado
- Efeito glassmorphism
- Ilustração SVG animada
- Responsividade total

### home.html / home.css / home.js
Implementa o dashboard com:
- Sistema de carrinho completo
- Filtros e busca
- Favoritos
- Sidebar e menu mobile
- Persisência de dados

## 🎓 Código Limpo

O código segue:
- ✅ Nomenclatura consistente
- ✅ Comentários explicativos
- ✅ Separação de responsabilidades
- ✅ Padrão de modularização
- ✅ Boas práticas de JavaScript

## 📸 Preview

```
┌─────────────────────────────────────────────────────┐
│            PÁGINA DE LOGIN                          │
├─────────────────┬───────────────────────────────────┤
│   Ilustração    │   Formulário de Login             │
│   Doces SVG     │   - Email                         │
│   Flutuantes    │   - Senha                         │
│                 │   - Botão Entrar                  │
│                 │   - Link Esqueci Senha            │
└─────────────────┴───────────────────────────────────┘

┌──────────────────────────────────────────────────────┐
│ SIDEBAR    │ HEADER: BUSCA │ NOTIF │ CART │ AVATAR   │
├────────────┼──────────────────────────────────────────┤
│            │  Doces em Destaque                       │
│  🏠 Home   │  [Filtros Categoria]                     │
│  📦 Pedidos│  [Ordenação]                             │
│  🛒 Carrinho│                                          │
│  ❤️ Favorit│  ┌─────────────┬────────────┬─────────┐ │
│  🏷️ Categor│  │ Brigadeiro  │ Cupcake   │ Donut   │ │
│  🎁 Promoc│  │ R$ 8,90     │ R$ 12,50  │ R$ 9,90 │ │
│  ⏰ Históri│  │ [Adicionar] │[Adicionar]│[Adic]   │ │
│  🚪 Sair   │  └─────────────┴────────────┴─────────┘ │
│            │  ... mais produtos                       │
│ [Frete     │                                          │
│  Grátis    │                                          │
│  R$80]     │                                          │
└────────────┴──────────────────────────────────────────┴──────────────┐
│ CARRINHO LATERAL                                                     │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ Seu Carrinho                                                  × │ │
│ ├─────────────────────────────────────────────────────────────────┤ │
│ │ [Item 1] R$ X,XX   [−] 1 [+] [🗑]                             │ │
│ │ [Item 2] R$ X,XX   [−] 2 [+] [🗑]                             │ │
│ ├─────────────────────────────────────────────────────────────────┤ │
│ │ Subtotal:    R$ XX,XX                                          │ │
│ │ Entrega:     R$ 10,00                                          │ │
│ │ ────────────────────                                           │ │
│ │ Total:       R$ XX,XX                                          │ │
│ ├─────────────────────────────────────────────────────────────────┤ │
│ │ [🚀 Finalizar Pedido]                                          │ │
│ │ [Ver Meu Carrinho]                                             │ │
│ │ 🔒 Compra 100% Segura                                          │ │
│ └─────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

## 🚀 Dicas de Uso

1. **Usar no VSCode**: Abra com Live Server para melhor experiência
2. **DevTools**: Use F12 para visualizar localStorage
3. **Testar Mobile**: Use Device Emulation do navegador
4. **Debugging**: Console.log já disponível no código

## 📄 Licença

Projeto educacional - Livre para uso e modificação

## 👨‍💻 Desenvolvedor

Criado como projeto de Programação para Sistemas Web - Período 3

---

**Aproveite! 🍰🎉**
