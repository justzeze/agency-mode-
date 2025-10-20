#!/bin/bash

# Script de démarrage rapide pour Eliza OS
# Ce script configure l'environnement et démarre l'agent

echo "=================================="
echo "  Démarrage de l'Agent Eliza OS  "
echo "=================================="
echo ""

# Configuration de l'environnement
echo "Configuration de l'environnement..."
export PATH="/root/.bun/bin:$PATH"
export NVM_DIR="/opt/nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Activation de Node.js 23
echo "Activation de Node.js 23..."
nvm use 23

# Vérification des clés API
echo ""
echo "Vérification de la configuration..."
cd eliza-agent

if ! grep -q "OPENAI_API_KEY=sk-" .env && ! grep -q "ANTHROPIC_API_KEY=sk-ant-" .env; then
    echo ""
    echo "⚠️  ATTENTION : Aucune clé API configurée !"
    echo ""
    echo "Pour utiliser l'agent, vous devez configurer une clé API :"
    echo ""
    echo "Option 1 - OpenAI :"
    echo "  elizaos env edit-local"
    echo "  Puis ajoutez : OPENAI_API_KEY=sk-votre-cle"
    echo ""
    echo "Option 2 - Anthropic (Claude) :"
    echo "  elizaos env edit-local"
    echo "  Puis ajoutez : ANTHROPIC_API_KEY=sk-ant-votre-cle"
    echo ""
    echo "Option 3 - Ollama (Local) :"
    echo "  Installez Ollama et téléchargez un modèle"
    echo "  Le projet est déjà configuré pour Ollama"
    echo ""
    read -p "Voulez-vous continuer quand même ? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo ""
echo "Démarrage de l'agent Eliza..."
echo "Interface web : http://localhost:3000"
echo "API : http://localhost:3000/api"
echo ""
echo "Appuyez sur Ctrl+C pour arrêter l'agent"
echo ""

# Démarrage de l'agent
elizaos start
