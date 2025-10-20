# Agency Mode - Eliza OS

Un projet basé sur Eliza OS pour créer et déployer des agents IA autonomes avec une architecture cloud complète.

## 🏗️ Architecture

Ce projet utilise une architecture distribuée moderne :

- **Backend** : Dokploy (API + Base de données PostgreSQL)
- **Frontend** : Netlify (Interface web React)
- **IA/ML** : Ollama (Modèles de langage locaux)

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   NETLIFY   │────►│   DOKPLOY    │────►│   OLLAMA    │
│  (Frontend) │     │   (Backend)  │     │  (ML Local) │
└─────────────┘     └──────────────┘     └─────────────┘
```

Voir [ARCHITECTURE.md](ARCHITECTURE.md) pour plus de détails.

## 🚀 Déploiement Rapide

### Option 1 : Déploiement Cloud Complet (Recommandé)

**Ce qu'il vous faut** :
- Un compte GitHub
- Un compte Dokploy (ou auto-hébergé)
- Un compte Netlify (gratuit)
- Ollama installé localement

**Temps estimé** : 30 minutes

#### Étape 1 : Installer Ollama Localement

```bash
# Installation
curl -fsSL https://ollama.com/install.sh | sh

# Télécharger les modèles
ollama pull llama3.2
ollama pull nomic-embed-text
```

Voir [OLLAMA_SETUP.md](OLLAMA_SETUP.md) pour plus de détails.

#### Étape 2 : Déployer le Backend sur Dokploy

1. Connectez votre repo GitHub à Dokploy
2. Configurez les variables d'environnement (voir [ARCHITECTURE.md](ARCHITECTURE.md))
3. Déployez !

#### Étape 3 : Déployer le Frontend sur Netlify

1. Connectez votre repo GitHub à Netlify
2. Build command : `bun run build:frontend`
3. Publish directory : `dist/client`
4. Déployez !

### Option 2 : Installation Locale (Développement)

**Prérequis** :
- Node.js 23+
- Bun 1.3.0+
- Ollama

**Installation** :
```bash
cd eliza-agent
bun install
```

### Configuration Locale avec Ollama

1. Installez Ollama et les modèles (voir [OLLAMA_SETUP.md](OLLAMA_SETUP.md))

2. Configurez les variables d'environnement :
```bash
cd eliza-agent
nano .env
```

Ajoutez :
```bash
OLLAMA_API_ENDPOINT=http://localhost:11434/api
OLLAMA_SMALL_MODEL=llama3.2
OLLAMA_MEDIUM_MODEL=llama3.2
OLLAMA_LARGE_MODEL=llama3.2
OLLAMA_EMBEDDING_MODEL=nomic-embed-text
```

3. Démarrez Ollama :
```bash
ollama serve
```

4. Démarrez l'agent (dans un autre terminal) :
```bash
export PATH="/root/.bun/bin:$PATH"
export NVM_DIR="/opt/nvm"
source "$NVM_DIR/nvm.sh"
nvm use 23
cd eliza-agent
elizaos start
```

L'agent sera accessible à :
- **Interface web** : http://localhost:3000
- **API** : http://localhost:3000/api

### Commandes Utiles

```bash
# Mode développement avec rechargement automatique
elizaos dev

# Démarrer en production
elizaos start

# Lancer les tests
elizaos test

# Mode debug
LOG_LEVEL=debug elizaos start
```

## Structure du Projet

```
eliza-agent/
├── src/          # Code source de l'agent
├── .env          # Variables d'environnement (clés API)
├── README.md     # Documentation du projet
└── package.json  # Dépendances et scripts
```

## 📚 Documentation

- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Architecture complète et guide de déploiement
- **[OLLAMA_SETUP.md](OLLAMA_SETUP.md)** - Installation et configuration d'Ollama
- **[DEPLOY.md](DEPLOY.md)** - Options de déploiement avancées
- **[dokploy.json](dokploy.json)** - Configuration Dokploy
- **[netlify.toml](netlify.toml)** - Configuration Netlify

### Ressources Externes

- Documentation Eliza OS : https://elizaos.github.io/eliza/
- GitHub Eliza OS : https://github.com/elizaOS/eliza
- Dokploy : https://dokploy.com
- Netlify : https://netlify.com
- Ollama : https://ollama.com

## 🎯 Prochaines Étapes

### Pour le Développement Local
1. Installez Ollama et les modèles requis
2. Configurez le fichier `.env`
3. Lancez `elizaos start`
4. Développez dans `eliza-agent/src/`

### Pour le Déploiement Production
1. Suivez le guide dans [ARCHITECTURE.md](ARCHITECTURE.md)
2. Déployez sur Dokploy (backend)
3. Déployez sur Netlify (frontend)
4. Configurez Ollama avec un tunnel (ngrok/Tailscale)

## 🔧 Technologies Utilisées

- **Framework IA** : Eliza OS
- **Runtime** : Node.js 23 + Bun
- **Frontend** : React + Vite + TailwindCSS
- **Backend** : API REST + WebSocket
- **Base de données** : PostgreSQL (pglite local / PostgreSQL cloud)
- **ML** : Ollama (llama3.2 + nomic-embed-text)
- **Déploiement** :
  - Backend : Dokploy
  - Frontend : Netlify
  - CI/CD : GitHub Actions (intégré)

## License

This project is released under the MIT License. See [LICENSE](LICENSE) for details.
