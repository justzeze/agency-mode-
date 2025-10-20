# Guide d'Installation Ollama

Ce guide vous aide à installer et configurer Ollama sur votre machine locale pour alimenter Eliza OS.

## 🤖 Qu'est-ce qu'Ollama ?

Ollama est une plateforme qui vous permet d'exécuter des modèles de langage (LLM) localement sur votre machine. C'est **gratuit** et **privé** (vos données ne quittent pas votre ordinateur).

## 💻 Installation

### macOS / Linux

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

### Windows

1. Téléchargez l'installateur : https://ollama.com/download
2. Exécutez le fichier `.exe`
3. Suivez l'assistant d'installation

### Vérification de l'installation

```bash
ollama --version
```

Vous devriez voir : `ollama version x.x.x`

## 📦 Téléchargement des Modèles

Eliza OS nécessite deux modèles :

### 1. Modèle de Génération de Texte (llama3.2)

```bash
ollama pull llama3.2
```

Taille : ~2GB
Temps : 5-10 minutes (selon votre connexion)

**Alternative** (plus petit, plus rapide) :
```bash
ollama pull llama3.2:1b  # Version 1B (plus petit)
```

### 2. Modèle d'Embeddings (nomic-embed-text)

```bash
ollama pull nomic-embed-text
```

Taille : ~274MB
Temps : 1-2 minutes

### Vérifier les modèles installés

```bash
ollama list
```

Vous devriez voir :
```
NAME                    ID              SIZE      MODIFIED
llama3.2:latest         abc123...       2.0 GB    2 minutes ago
nomic-embed-text:latest def456...       274 MB    1 minute ago
```

## 🚀 Démarrer Ollama

### En Avant-Plan (pour tester)

```bash
ollama serve
```

Le serveur démarre sur `http://localhost:11434`

### En Arrière-Plan (daemon)

**macOS / Linux** :
```bash
# Ollama démarre automatiquement après installation
# Pour le redémarrer :
brew services restart ollama  # macOS avec Homebrew
# ou
systemctl restart ollama      # Linux avec systemd
```

**Windows** :
```
Ollama démarre automatiquement comme service Windows
```

### Vérifier que ça fonctionne

```bash
curl http://localhost:11434/api/tags
```

Vous devriez voir la liste de vos modèles en JSON.

## 🔌 Exposer Ollama au Backend Dokploy

Si votre backend est déployé sur Dokploy (cloud) et Ollama est sur votre machine locale, vous devez créer un tunnel.

### Option 1 : Ngrok (Facile, temporaire)

```bash
# Installer ngrok
brew install ngrok  # macOS
# ou téléchargez depuis https://ngrok.com/download

# Créer un tunnel
ngrok http 11434

# Vous obtenez une URL comme :
# https://abc123.ngrok.io
```

**Important** : Cette URL change à chaque redémarrage de ngrok.

Dans Dokploy, configurez :
```bash
OLLAMA_API_ENDPOINT=https://abc123.ngrok.io/api
```

### Option 2 : Cloudflare Tunnel (Gratuit, permanent)

```bash
# Installer cloudflared
brew install cloudflare/cloudflare/cloudflared  # macOS
# ou téléchargez depuis https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation

# Créer un tunnel
cloudflared tunnel --url http://localhost:11434

# Vous obtenez une URL permanente
```

### Option 3 : Tailscale (VPN privé, recommandé)

```bash
# Installer Tailscale
# macOS : brew install tailscale
# Windows : https://tailscale.com/download
# Linux : https://tailscale.com/download/linux

# Démarrer Tailscale
tailscale up

# Obtenir votre IP Tailscale
tailscale ip -4
# Exemple : 100.x.y.z
```

Dans Dokploy, configurez :
```bash
OLLAMA_API_ENDPOINT=http://100.x.y.z:11434/api
```

**Avantage** : Connexion privée et sécurisée, pas exposée à Internet.

### Option 4 : VPS avec GPU (Production)

Si vous voulez une solution production, hébergez Ollama sur un VPS avec GPU :

**Providers recommandés** :
- RunPod : https://runpod.io (0.20$/h pour GPU)
- Vast.ai : https://vast.ai (0.10$/h pour GPU)
- Modal.com : https://modal.com (serverless)

```bash
# Sur le VPS
curl -fsSL https://ollama.com/install.sh | sh
ollama pull llama3.2
ollama pull nomic-embed-text
ollama serve

# Exposer le port
sudo ufw allow 11434
```

Dans Dokploy, configurez :
```bash
OLLAMA_API_ENDPOINT=http://ip-du-vps:11434/api
```

## ⚙️ Configuration Avancée

### Changer le Port

Par défaut, Ollama utilise le port `11434`. Pour le changer :

```bash
# Linux/macOS
export OLLAMA_HOST=0.0.0.0:8080
ollama serve

# Windows (PowerShell)
$env:OLLAMA_HOST="0.0.0.0:8080"
ollama serve
```

### Limiter l'Utilisation GPU/CPU

```bash
# Limiter à 50% du GPU
export OLLAMA_GPU_LAYERS=0.5

# Utiliser uniquement le CPU (pas de GPU)
export OLLAMA_GPU_LAYERS=0
```

### Voir les Modèles en Cours

```bash
ollama ps
```

### Supprimer un Modèle

```bash
ollama rm llama3.2
```

## 🧪 Tester Ollama

### Test Simple

```bash
ollama run llama3.2 "Hello, who are you?"
```

### Test Embeddings

```bash
curl http://localhost:11434/api/embeddings -d '{
  "model": "nomic-embed-text",
  "prompt": "Hello world"
}'
```

### Test avec Eliza OS Local

```bash
cd eliza-agent

# Modifier .env
echo "OLLAMA_API_ENDPOINT=http://localhost:11434/api" >> .env
echo "OLLAMA_SMALL_MODEL=llama3.2" >> .env
echo "OLLAMA_EMBEDDING_MODEL=nomic-embed-text" >> .env

# Démarrer Eliza
elizaos start
```

Allez sur `http://localhost:3000` et testez le chat.

## 📊 Monitoring

### Voir les Logs

```bash
# macOS
tail -f ~/Library/Logs/Ollama/server.log

# Linux
journalctl -u ollama -f

# Windows
# Ouvrir Event Viewer > Applications
```

### Voir l'Utilisation des Ressources

```bash
# Pendant qu'un modèle tourne
ollama ps

# Exemple de sortie :
NAME            ID          SIZE    PROCESSOR    UNTIL
llama3.2:latest abc123...   2.0 GB  100% GPU     4 minutes from now
```

## 🐛 Dépannage

### Erreur : "connection refused"

**Solution** :
```bash
# Vérifier qu'Ollama tourne
ps aux | grep ollama

# Si non, le démarrer
ollama serve
```

### Erreur : "model not found"

**Solution** :
```bash
# Télécharger le modèle
ollama pull llama3.2
ollama pull nomic-embed-text
```

### Ollama est lent

**Solutions** :
1. **Utilisez un modèle plus petit** :
   ```bash
   ollama pull llama3.2:1b  # Version 1B (plus rapide)
   ```

2. **Vérifiez votre GPU** :
   ```bash
   ollama run llama3.2 --verbose
   # Doit dire "Using GPU"
   ```

3. **Augmentez la RAM allouée** :
   ```bash
   export OLLAMA_MAX_LOADED_MODELS=1  # Ne garder qu'un modèle en mémoire
   ```

### Erreur : "out of memory"

**Solutions** :
1. Fermez les autres applications
2. Utilisez un modèle plus petit (llama3.2:1b)
3. Utilisez le CPU au lieu du GPU :
   ```bash
   export OLLAMA_GPU_LAYERS=0
   ```

## 🔄 Mises à Jour

### Mettre à jour Ollama

```bash
# macOS
brew upgrade ollama

# Linux
curl -fsSL https://ollama.com/install.sh | sh

# Windows
# Téléchargez la dernière version depuis https://ollama.com/download
```

### Mettre à jour un Modèle

```bash
ollama pull llama3.2
# Si une nouvelle version existe, elle sera téléchargée
```

## 💡 Modèles Alternatifs

Si `llama3.2` est trop lourd ou lent, essayez :

### Modèles Plus Légers

```bash
# Gemma 2B (Google)
ollama pull gemma:2b

# Phi-3 (Microsoft)
ollama pull phi3

# TinyLlama (très petit)
ollama pull tinyllama
```

Modifiez ensuite dans Eliza :
```bash
OLLAMA_SMALL_MODEL=gemma:2b
OLLAMA_MEDIUM_MODEL=phi3
OLLAMA_LARGE_MODEL=llama3.2
```

### Modèles Plus Puissants

Si vous avez une machine puissante :

```bash
# Llama 3.1 70B (très puissant, nécessite beaucoup de RAM/GPU)
ollama pull llama3.1:70b

# Mixtral 8x7B
ollama pull mixtral
```

## 📚 Ressources

- Documentation officielle : https://github.com/ollama/ollama
- Liste des modèles : https://ollama.com/library
- Discord Ollama : https://discord.gg/ollama
- Eliza OS + Ollama : https://elizaos.github.io/eliza/docs/guides/ollama/

## ❓ FAQ

**Q : Ollama est-il gratuit ?**
R : Oui, totalement gratuit et open-source.

**Q : Mes données sont-elles privées ?**
R : Oui, tout reste sur votre machine. Rien n'est envoyé à des serveurs externes.

**Q : Puis-je utiliser Ollama en production ?**
R : Oui, mais hébergez-le sur un VPS dédié avec GPU pour de meilleures performances.

**Q : Quelle configuration matérielle recommandée ?**
R :
- **Minimum** : 8GB RAM, CPU moderne
- **Recommandé** : 16GB RAM, GPU NVIDIA (8GB+ VRAM)
- **Optimal** : 32GB RAM, GPU NVIDIA RTX (16GB+ VRAM)

**Q : Ollama fonctionne sur Mac M1/M2/M3 ?**
R : Oui, excellentes performances grâce à l'accélération Apple Silicon.
