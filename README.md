# Agency Mode - Eliza OS Installation

Un projet basé sur Eliza OS pour créer et déployer des agents IA autonomes.

## Installation et Configuration

### Prérequis

- Node.js 23+
- Bun (gestionnaire de paquets)

### Installation Rapide

Les prérequis ont déjà été installés :
- Node.js v23.11.1
- Bun v1.3.0
- Eliza OS CLI v1.6.2

### Configuration de l'Agent

1. Accédez au répertoire du projet :
```bash
cd eliza-agent
```

2. Configurez votre clé API (choisissez l'une des options) :

**Option A - OpenAI (Recommandé pour débuter)**
```bash
export PATH="/root/.bun/bin:$PATH"
export NVM_DIR="/opt/nvm"
source "$NVM_DIR/nvm.sh"
nvm use 23
elizaos env edit-local
```
Ajoutez votre clé API OpenAI :
```
OPENAI_API_KEY=sk-votre-cle-api-ici
```

**Option B - Anthropic (Claude)**
```bash
elizaos env edit-local
```
Ajoutez votre clé API Anthropic :
```
ANTHROPIC_API_KEY=sk-ant-votre-cle-api-ici
```

**Option C - Ollama (Local, gratuit)**
- Installez Ollama : https://ollama.com
- Téléchargez un modèle : `ollama pull gemma3`
- Le projet est déjà configuré pour Ollama

### Démarrage de l'Agent

```bash
export PATH="/root/.bun/bin:$PATH"
export NVM_DIR="/opt/nvm"
source "$NVM_DIR/nvm.sh"
nvm use 23
cd eliza-agent
elizaos start
```

L'agent sera accessible à :
- Interface web : http://localhost:3000
- API : http://localhost:3000/api

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

## Prochaines Étapes

1. Configurez votre clé API (voir section Configuration)
2. Démarrez l'agent avec `elizaos start`
3. Accédez à l'interface web sur http://localhost:3000
4. Personnalisez votre agent dans `src/`

## Documentation

- Documentation officielle : https://elizaos.github.io/eliza/
- Guide de démarrage rapide : https://elizaos.github.io/eliza/docs/quickstart/
- GitHub : https://github.com/elizaOS/eliza

## License

This project is released under the MIT License. See [LICENSE](LICENSE) for details.
