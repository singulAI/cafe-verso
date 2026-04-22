# 🚀 Deploy Manual via cPanel - Café & Verso

**Status Build**: ✅ Gerado (`/dist`)  
**Arquivo ZIP**: ✅ `cafe-verso-dist.zip` (138 KB)  
**Domínio**: cafeeverso.fun  

---

## 📋 Passo-a-Passo Via cPanel (5 minutos)

### 1️⃣ Fazer download do ZIP
- Arquivo: `cafe-verso-dist.zip` 
- Tamanho: 138 KB
- Salve em sua máquina

### 2️⃣ Acessar cPanel
```
URL: https://srv993737.hstgr.cloud:2083/
OU
URL: https://seu-dominio.com/cpanel

Login: (suas credenciais cPanel)
```

> Se não tiver acesso ao cPanel, pergunte ao suporte HosterGator

### 3️⃣ File Manager

**Na página inicial do cPanel:**
- Procure por "File Manager" (ícone de pasta)
- Clique em "File Manager"

### 4️⃣ Navegar para a pasta certa

Você verá uma árvore de pastas no lado esquerdo. Procure por:

```
public_html/
  └── (seu domínio cafeeverso.fun)
```

**OU** navegue direto para:
```
/home/SEU_USUARIO/public_html/
```

> Se encontrar uma pasta `cafeeverso.fun`, entre nela

### 5️⃣ Upload do ZIP

**Na pasta `/public_html` (ou `/public_html/cafeeverso.fun`):**

- Clique em "Upload" (botão no topo)
- Arraste e solte `cafe-verso-dist.zip`
- Aguarde conclusão

### 6️⃣ Extrair o ZIP

Após upload:
- Clique direito em `cafe-verso-dist.zip`
- Selecione "Extract" (ou "Extrair")
- Confirme para extrair na mesma pasta

Resultado esperado:
```
public_html/
  ├── cafe-verso-dist.zip (arquivo original)
  ├── index.html          ✅
  ├── favicon.ico         ✅
  └── assets/             ✅
      ├── styles-DlXpKkpY.css
      └── index-MQ7zoQZQ.js
```

### 7️⃣ Limpar (opcional)

- Delete o arquivo `cafe-verso-dist.zip`
- Deixe apenas `index.html`, `favicon.ico` e pasta `assets/`

### 8️⃣ Testar

Acesse no navegador:
```
https://cafeeverso.fun/
```

Deve carregar com:
- ✅ Logo "Café & Verso"
- ✅ Navbar com navegação
- ✅ Tema claro/escuro funcionando
- ✅ Todas as rotas acessíveis

---

## ✅ Verificação Rápida

| Item | Status |
|------|--------|
| `index.html` presente? | ✅ |
| Pasta `assets/` presente? | ✅ |
| Site carrega em HTTPS? | ✅ |
| Tema togglável? | ✅ |
| Rotas funcionam? | ✅ |

---

## 🆘 Se algo deu errado

### "Página em branco"
- Verifique se `index.html` está em `/public_html` (não em subpasta)
- Verifique se pasta `assets/` está no mesmo nível
- Limpe cache do navegador (Ctrl+Shift+Del)

### "Erro 404"
- SSH direto não funcionou (esperado)
- Use cPanel File Manager em vez disso

### "Arquivo não encontrado"
- Certifique-se que extraiu o ZIP corretamente
- Não deixe os arquivos dentro de uma pasta `dist/` ou `cafe-verso-dist/`
- Eles devem estar direto em `/public_html`

---

## 📁 Estrutura Correta

```
/public_html/              ← Raiz do domínio
  ├── index.html          ✅ Aqui
  ├── favicon.ico         ✅ Aqui
  └── assets/             ✅ Aqui
      ├── styles-DlXpKkpY.css
      ├── index-MQ7zoQZQ.js
```

---

## 🎉 Após deploy bem-sucedido

Compartilhe com cliente Rafaela:

```
Link: https://cafeeverso.fun
Instruções: Ver arquivo APRESENTACAO.md no repo
```

---

## 🔄 Se precisar fazer mudanças

1. Faça as mudanças no código
2. Execute: `npm run build`
3. Delete o arquivo `index.html`, `favicon.ico` e pasta `assets/` do cPanel
4. Upload novo `cafe-verso-dist.zip`
5. Extraia novamente

---

**Tempo estimado**: 5-10 minutos  
**Dificuldade**: ⭐ Muito fácil  
**Pronto para**: Aprovação visual

---

*Café & Verso — Leitura, café e comunidade global*  
*Deploy: 22 de Abril de 2026*
