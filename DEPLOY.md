# Guide de Déploiement Eliza OS

Ce guide vous explique comment déployer votre agent Eliza OS en production.

## Déploiement Local (Développement)

### Démarrage rapide
```bash
./start.sh
```

Ou manuellement :
```bash
export PATH="/root/.bun/bin:$PATH"
export NVM_DIR="/opt/nvm"
source "$NVM_DIR/nvm.sh"
nvm use 23
cd eliza-agent
elizaos start
```

## Déploiement en Production

### Option 1 : Déploiement avec Docker

Le projet inclut déjà un `Dockerfile` et un `docker-compose.yaml`.

```bash
cd eliza-agent

# Construire l'image
docker build -t eliza-agent .

# Lancer le conteneur
docker run -d \
  -p 3000:3000 \
  -e OPENAI_API_KEY=votre-cle \
  --name eliza-agent \
  eliza-agent

# Ou avec docker-compose
docker-compose up -d
```

### Option 2 : Déploiement avec systemd (Linux)

Créez un service systemd pour démarrer automatiquement l'agent au boot.

1. Créez le fichier de service :
```bash
sudo nano /etc/systemd/system/eliza-agent.service
```

2. Ajoutez cette configuration :
```ini
[Unit]
Description=Eliza OS Agent
After=network.target

[Service]
Type=simple
User=votre-utilisateur
WorkingDirectory=/chemin/vers/agency-mode-/eliza-agent
Environment="PATH=/root/.bun/bin:/usr/bin:/bin"
Environment="NVM_DIR=/opt/nvm"
ExecStart=/root/.bun/bin/elizaos start
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

3. Activez et démarrez le service :
```bash
sudo systemctl daemon-reload
sudo systemctl enable eliza-agent
sudo systemctl start eliza-agent
sudo systemctl status eliza-agent
```

4. Commandes utiles :
```bash
# Voir les logs
sudo journalctl -u eliza-agent -f

# Redémarrer
sudo systemctl restart eliza-agent

# Arrêter
sudo systemctl stop eliza-agent
```

### Option 3 : Déploiement Cloud (Fleek, Railway, etc.)

#### Fleek (No-Code)
- Visitez https://fleek.xyz
- Connectez votre dépôt GitHub
- Fleek détectera automatiquement Eliza OS
- Ajoutez vos clés API dans les variables d'environnement
- Déployez en un clic

#### Railway
```bash
# Installer la CLI Railway
npm i -g @railway/cli

# Se connecter
railway login

# Déployer
cd eliza-agent
railway up
```

#### Heroku
```bash
# Installer la CLI Heroku
# Puis :
cd eliza-agent
heroku create mon-agent-eliza
heroku config:set OPENAI_API_KEY=votre-cle
git push heroku main
```

## Configuration de la Production

### Variables d'environnement essentielles

```bash
# Modèle IA (requis)
OPENAI_API_KEY=sk-...
# OU
ANTHROPIC_API_KEY=sk-ant-...
# OU
OLLAMA_API_ENDPOINT=http://localhost:11434/api

# Base de données (optionnel, par défaut utilise pglite)
POSTGRES_URL=postgresql://user:pass@host:5432/db

# Logging
LOG_LEVEL=info

# Sentry (monitoring d'erreurs)
SENTRY_DSN=votre-dsn
SENTRY_ENVIRONMENT=production
```

### Sécurité

1. **Ne commitez JAMAIS vos clés API** dans Git
2. Utilisez des variables d'environnement ou des secrets
3. Activez HTTPS en production
4. Configurez un reverse proxy (nginx, Caddy)
5. Limitez l'accès API avec un token

### Reverse Proxy avec Nginx

```nginx
server {
    listen 80;
    server_name votre-domaine.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Monitoring et Logs

### Logs en temps réel
```bash
# Mode debug
LOG_LEVEL=debug elizaos start

# Avec systemd
sudo journalctl -u eliza-agent -f
```

### Monitoring avec Sentry
Configurez Sentry dans `.env` pour tracker les erreurs en production :
```bash
SENTRY_LOGGING=true
SENTRY_DSN=votre-dsn
SENTRY_ENVIRONMENT=production
```

## Sauvegarde

### Base de données
Si vous utilisez pglite (par défaut), sauvegardez le répertoire :
```bash
tar -czf backup-$(date +%Y%m%d).tar.gz eliza-agent/.eliza/
```

Si vous utilisez PostgreSQL, utilisez pg_dump :
```bash
pg_dump $POSTGRES_URL > backup-$(date +%Y%m%d).sql
```

## Mise à jour

```bash
cd eliza-agent

# Sauvegarder d'abord
cp -r .eliza .eliza.backup

# Mettre à jour les dépendances
bun update @elizaos/cli

# Rebuilder
elizaos build

# Redémarrer
sudo systemctl restart eliza-agent
```

## Dépannage

### L'agent ne démarre pas
1. Vérifiez les logs : `sudo journalctl -u eliza-agent -n 50`
2. Vérifiez la configuration : `cat eliza-agent/.env`
3. Testez manuellement : `cd eliza-agent && elizaos start`

### Erreur de clé API
Vérifiez que votre clé est valide et a les permissions nécessaires.

### Port déjà utilisé
Changez le port dans la configuration ou arrêtez le service qui utilise le port 3000.

## Support

- Documentation : https://elizaos.github.io/eliza/
- GitHub Issues : https://github.com/elizaOS/eliza/issues
- Discord : Rejoignez la communauté Eliza OS
