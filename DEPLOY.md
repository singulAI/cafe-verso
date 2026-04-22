# 🚀 Deploy Café & Verso - cafeeverso.fun

Build gerado ✅ | Sem backend ✅ | Pronto para aprovação ✅

## Informações Rápidas
- **Domínio**: cafeeverso.fun
- **Tipo**: Frontend estático (React/Vite)  
- **Build**: `/dist` (395KB gzipped)
- **Servidor**: Nginx (recomendado)
- **SSL**: Let's Encrypt (gratuito)

---

## ⚡ Opção 1: Deploy via SSH (Recomendado)

### Pré-requisitos
- Acesso SSH à VPS
- Nginx instalado
- Node.js 18+ (apenas para build)

### Passo 1: Preparar as credenciais
```bash
export VPS_IP="seu.ip.aqui"
export VPS_USER="root"  # ou seu usuário
export VPS_PORT="22"
```

### Passo 2: Executar deploy
```bash
chmod +x deploy.sh
./deploy.sh
```

### Passo 3: Configurar SSL
```bash
ssh root@seu.ip.aqui

sudo apt update
sudo apt install certbot python3-certbot-nginx -y

sudo certbot --nginx -d cafeeverso.fun -d www.cafeeverso.fun

sudo systemctl restart nginx
```

---

## 📤 Opção 2: Deploy via FTP/SFTP

### Pré-requisitos
- Credenciais FTP/SFTP
- lftp ou ncftp instalado

### Passo 1: Configurar credenciais
```bash
export FTP_USER="seu-usuario"
export FTP_PASS="sua-senha"
export FTP_HOST="cafeeverso.fun"
```

### Passo 2: Executar upload
```bash
chmod +x deploy-ftp.sh
./deploy-ftp.sh
```

---

## 🛠️ Opção 3: Deploy Manual (Sem Script)

### 1. Fazer build local
```bash
npm install
npm run build
```

### 2. Criar arquivo comprimido
```bash
tar -czf cafe-verso-dist.tar.gz dist/
```

### 3. Transferir arquivo
```bash
scp cafe-verso-dist.tar.gz root@seu.ip.aqui:/tmp/
```

### 4. Na VPS, extrair e configurar
```bash
ssh root@seu.ip.aqui

# Criar diretório
sudo mkdir -p /var/www/cafeeverso.fun/html

# Extrair e mover
sudo tar -xzf /tmp/cafe-verso-dist.tar.gz -C /var/www/cafeeverso.fun/
sudo mv /var/www/cafeeverso.fun/dist/* /var/www/cafeeverso.fun/html/

# Permissões
sudo chown -R www-data:www-data /var/www/cafeeverso.fun
sudo chmod -R 755 /var/www/cafeeverso.fun
```

### 5. Configurar Nginx
```bash
# Copiar configuração
sudo cp nginx.conf.cafeeverso.fun /etc/nginx/sites-available/cafeeverso.fun

# Ativar
sudo ln -s /etc/nginx/sites-available/cafeeverso.fun /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/cafeeverso.fun /etc/nginx/sites-enabled/www.cafeeverso.fun || true

# Testar
sudo nginx -t

# Reiniciar
sudo systemctl restart nginx
```

### 6. SSL com Let's Encrypt
```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d cafeeverso.fun -d www.cafeeverso.fun
sudo systemctl restart nginx
```

---

## ✅ Verificação Pós-Deploy

### 1. Testar HTTPS
```bash
curl -I https://cafeeverso.fun
```

Esperado: `HTTP/2 200`

### 2. Testar rotas
```bash
curl -s https://cafeeverso.fun/usuarios | grep -q "CaféVerso" && echo "✓ OK" || echo "✗ Erro"
```

### 3. Monitorar logs
```bash
ssh root@seu.ip.aqui
tail -f /var/log/nginx/cafeeverso.fun.access.log
tail -f /var/log/nginx/cafeeverso.fun.error.log
```

---

## 📊 Performance

Build gerado:
```
dist/index.html              0.39 KB
dist/assets/styles.css      27.73 KB (gzip: 7.57 KB)
dist/assets/index.js       395.94 KB (gzip: 114.37 KB)
```

---

## 🔒 Segurança

O arquivo Nginx incluído já possui:
- ✅ Redirecionamento HTTP → HTTPS
- ✅ Headers de segurança (CSP, X-Frame-Options, etc)
- ✅ Bloqueio de arquivos sensíveis
- ✅ Compressão Gzip
- ✅ Cache versioning para assets
- ✅ SPA fallback (todas rotas → index.html)

---

## 🚨 Troubleshooting

### "Conexão recusada"
- Verificar firewall: `sudo ufw allow 22,80,443/tcp`
- Verificar SSH: `ssh -vvv root@seu.ip.aqui`

### "Página em branco"
- Verificar permissões: `ls -la /var/www/cafeeverso.fun/html/`
- Verificar logs: `sudo tail -50 /var/log/nginx/cafeeverso.fun.error.log`

### "Erro 404 ao acessar subrotas"
- Nginx está configurado com `try_files $uri $uri/ /index.html`
- Se ainda der erro, verificar se `index.html` existe em `/var/www/cafeeverso.fun/html/`

### SSL não funciona
```bash
sudo certbot renew --dry-run
sudo systemctl restart nginx
```

---

## 📱 Resultado Final

```
✅ https://cafeeverso.fun
✅ https://www.cafeeverso.fun  
✅ Todas as rotas funcionais (/usuarios, /estabelecimentos, /gestao, etc)
✅ Dark Mode / Light Mode
✅ Sem backend (frontend estático)
✅ Pronto para aprovação
```

---

## 💡 Suporte Rápido

Após deploy bem-sucedido:

1. **Teste no navegador**: https://cafeeverso.fun
2. **Compartilhe com cliente**: Link direto
3. **Esteja pronto para feedback** sobre a proposição
4. **Backend/Integração** pode vir depois

---

**Deploy iniciado em**: 22 Abr 2026  
**Versão**: MVP sem backend  
**Marca**: Café & Verso  
**Domínio**: cafeeverso.fun
