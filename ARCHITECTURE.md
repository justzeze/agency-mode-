# Architecture de Déploiement Eliza OS

Ce document décrit l'architecture complète de déploiement avec Dokploy, Netlify et Ollama.

## 🏗️ Vue d'Ensemble

```
┌─────────────────────────────────────────────────────────────┐
│                         UTILISATEURS                         │
└────────────────────┬────────────────────────────────────────┘
                     │
        ┌────────────┴──────────────┐
        │                           │
        ▼                           ▼
┌───────────────┐          ┌────────────────┐
│   NETLIFY     │          │    DOKPLOY     │
│  (Frontend)   │◄────────►│   (Backend)    │
│               │   API    │                │
│  React/Vite   │          │  Eliza OS API  │
│  CDN Global   │          │  PostgreSQL    │
└───────────────┘          └────────┬───────┘
                                    │
                                    ▼
                           ┌─────────────────┐
                           │  OLLAMA LOCAL   │
                           │                 │
                           │  llama3.2       │
                           │  nomic-embed    │
                           └─────────────────┘
```

## 📦 Composants

### 1. Backend : Dokploy

**Hébergement** : Dokploy (auto-hébergé ou cloud)
**Technologie** : Node.js 23 + Bun + Eliza OS
**Port** : 3000
**Domaine** : `eliza-api.votre-domaine.com`

**Responsabilités** :
- API REST pour les requêtes
- WebSocket pour le chat en temps réel
- Gestion des agents IA
- Connexion à la base de données PostgreSQL
- Communication avec Ollama pour le ML

**Variables d'environnement** :
```bash
NODE_ENV=production
PORT=3000
OLLAMA_API_ENDPOINT=http://votre-ip:11434/api
OLLAMA_SMALL_MODEL=llama3.2
OLLAMA_MEDIUM_MODEL=llama3.2
OLLAMA_LARGE_MODEL=llama3.2
OLLAMA_EMBEDDING_MODEL=nomic-embed-text
POSTGRES_URL=postgresql://...
ELIZA_SERVER_AUTH_TOKEN=votre-token-secret
SECRET_SALT=votre-salt-secret
LOG_LEVEL=info
```

### 2. Frontend : Netlify

**Hébergement** : Netlify
**Technologie** : React + Vite
**Domaine** : `eliza.votre-domaine.com`

**Responsabilités** :
- Interface utilisateur web
- Communication avec l'API backend
- Connexion WebSocket pour le chat
- Déploiement automatique depuis GitHub

**Configuration** :
- Build command: `bun run build:frontend`
- Publish directory: `dist/client`
- Node version: 23

**Variables d'environnement** :
```bash
VITE_API_URL=https://eliza-api.votre-domaine.com
VITE_WS_URL=wss://eliza-api.votre-domaine.com
```

### 3. IA/ML : Ollama (Local)

**Hébergement** : Votre machine locale
**Port** : 11434
**Modèles requis** :
- `llama3.2` : Modèle de génération de texte
- `nomic-embed-text` : Modèle d'embeddings

**Responsabilités** :
- Génération de réponses IA
- Création d'embeddings pour la recherche
- Traitement du langage naturel

**Pourquoi local ?**
- Gratuit (pas de coûts API)
- Données privées (ne sortent pas de votre machine)
- Rapide (pas de latence réseau)
- Customisable (choix des modèles)

**Alternatives cloud** :
- Modal.com (serverless)
- Replicate (API)
- RunPod (GPU dédié)

## 🚀 Étapes de Déploiement

### Étape 1 : Installer Ollama Localement

Sur votre machine locale :

```bash
# MacOS / Linux
curl -fsSL https://ollama.com/install.sh | sh

# Windows
# Téléchargez depuis https://ollama.com/download

# Télécharger les modèles
ollama pull llama3.2
ollama pull nomic-embed-text

# Vérifier que ça fonctionne
ollama list

# Démarrer le serveur (reste en avant-plan)
ollama serve
```

**Exposer Ollama au backend Dokploy** :

Si votre backend Dokploy est sur le cloud et Ollama est local, vous devez :

**Option A** : Utiliser un tunnel (Ngrok, Cloudflare Tunnel)
```bash
# Avec ngrok
ngrok http 11434
# Vous obtenez une URL : https://abc123.ngrok.io
```

**Option B** : Héberger Ollama sur un VPS avec IP publique
```bash
# Sur un VPS avec GPU
sudo ufw allow 11434
# Utilisez l'IP publique du VPS
```

**Option C** : Utiliser Tailscale (VPN privé)
```bash
# Connexion sécurisée entre Dokploy et votre machine locale
```

### Étape 2 : Déployer le Backend sur Dokploy

1. **Connectez votre dépôt GitHub à Dokploy** :
   - Allez sur votre instance Dokploy
   - Créez une nouvelle application
   - Connectez le repo : `justzeze/agency-mode-`
   - Branche : `main` ou `claude/code-fix-011CUJvDEX8DWDE4gqKRTLP7`

2. **Configurez les variables d'environnement** :
   - Dans Dokploy, allez dans Settings > Environment
   - Ajoutez toutes les variables (voir section Backend ci-dessus)
   - **Important** : `OLLAMA_API_ENDPOINT` doit pointer vers votre Ollama

3. **Configurez la base de données** :
   - Dans Dokploy, créez une base PostgreSQL
   - Copiez l'URL de connexion
   - Ajoutez-la à `POSTGRES_URL`

4. **Déployez** :
   - Cliquez sur "Deploy"
   - Dokploy va builder et démarrer votre backend
   - Vérifiez les logs

5. **Configurez le domaine** :
   - Ajoutez votre domaine : `eliza-api.votre-domaine.com`
   - Dokploy configure automatiquement HTTPS

### Étape 3 : Déployer le Frontend sur Netlify

1. **Connectez votre dépôt GitHub à Netlify** :
   - Allez sur https://app.netlify.com
   - Cliquez sur "Add new site" > "Import an existing project"
   - Sélectionnez GitHub et votre repo

2. **Configurez le build** :
   - Build command : `bun run build:frontend`
   - Publish directory : `dist/client`
   - Base directory : `eliza-agent`

3. **Ajoutez les variables d'environnement** :
   - `VITE_API_URL` : `https://eliza-api.votre-domaine.com`
   - `VITE_WS_URL` : `wss://eliza-api.votre-domaine.com`

4. **Déployez** :
   - Netlify déploie automatiquement
   - Vous obtenez une URL : `https://votre-site.netlify.app`

5. **Domaine personnalisé (optionnel)** :
   - Dans Netlify : Domain settings
   - Ajoutez : `eliza.votre-domaine.com`

### Étape 4 : Tester l'Architecture Complète

1. **Test Ollama** :
```bash
curl http://localhost:11434/api/tags
```

2. **Test Backend** :
```bash
curl https://eliza-api.votre-domaine.com/api/health
```

3. **Test Frontend** :
- Ouvrez : `https://eliza.votre-domaine.com`
- Testez le chat
- Vérifiez la connexion WebSocket

## 🔧 Configuration des Scripts

Ajoutez ces scripts dans `eliza-agent/package.json` :

```json
{
  "scripts": {
    "start": "elizaos start",
    "build": "elizaos build",
    "build:frontend": "cd src/frontend && vite build",
    "dev": "elizaos dev",
    "test": "elizaos test"
  }
}
```

## 🔒 Sécurité

### Variables Secrètes

**Ne JAMAIS commiter** :
- `ELIZA_SERVER_AUTH_TOKEN`
- `SECRET_SALT`
- `POSTGRES_URL`
- Toute clé API

**Utilisez** :
- Dokploy : Variables d'environnement sécurisées
- Netlify : Environment variables

### Accès Ollama

Si Ollama est exposé publiquement :
- Utilisez un VPN (Tailscale)
- Ou un reverse proxy avec authentification
- Ou limitez par IP

## 📊 Monitoring

### Logs Backend (Dokploy)
```bash
# Dans l'interface Dokploy
Logs > Real-time logs
```

### Logs Frontend (Netlify)
```bash
# Dans l'interface Netlify
Deploys > [votre deploy] > Deploy log
```

### Métriques Ollama
```bash
# Sur votre machine locale
ollama ps  # Voir les processus en cours
```

## 🐛 Dépannage

### Backend ne se connecte pas à Ollama

**Erreur** : `ECONNREFUSED` ou timeout

**Solutions** :
1. Vérifiez qu'Ollama tourne : `curl http://localhost:11434/api/tags`
2. Vérifiez le firewall : `sudo ufw status`
3. Vérifiez l'URL dans `OLLAMA_API_ENDPOINT`
4. Utilisez un tunnel (ngrok) si Dokploy est cloud

### Frontend ne se connecte pas au Backend

**Erreur** : CORS ou 404

**Solutions** :
1. Vérifiez `VITE_API_URL` dans Netlify
2. Vérifiez les redirects dans `netlify.toml`
3. Testez l'API directement : `curl https://eliza-api.votre-domaine.com/api/health`

### Modèles Ollama manquants

**Erreur** : `Model not found`

**Solutions** :
```bash
ollama pull llama3.2
ollama pull nomic-embed-text
ollama list  # Vérifier
```

## 💰 Coûts

### Gratuit
- Ollama (local)
- Netlify (100GB/mois gratuit)
- GitHub (repos publics)

### Payant
- Dokploy : Selon hébergement (5-20€/mois pour un VPS)
- Domaine : ~10€/an
- GPU dédié pour Ollama (optionnel) : 20-100€/mois

## 🔄 Mises à Jour

### Backend
```bash
# Dokploy redéploie automatiquement sur push GitHub
git push origin main
```

### Frontend
```bash
# Netlify redéploie automatiquement sur push GitHub
git push origin main
```

### Ollama
```bash
ollama pull llama3.2  # Met à jour le modèle
```

## 📚 Ressources

- Dokploy : https://dokploy.com
- Netlify : https://netlify.com
- Ollama : https://ollama.com
- Eliza OS : https://github.com/elizaOS/eliza
