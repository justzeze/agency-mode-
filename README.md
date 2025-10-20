# ShopModerne - Site E-Commerce

Un site e-commerce moderne et responsive développé avec HTML, CSS et JavaScript vanilla.

## Fonctionnalités

### Pages principales
- **Page d'accueil** (`index.html`) - Présentation des catégories et produits en vedette
- **Page produits** (`products.html`) - Catalogue complet avec filtres et recherche
- **Page de commande** (`checkout.html`) - Formulaire de paiement sécurisé

### Fonctionnalités du site
- **Panier d'achat** - Ajout/suppression de produits, modification des quantités
- **Filtres avancés** - Par catégorie, prix, et recherche textuelle
- **Tri des produits** - Par prix, nom ou pertinence
- **Design responsive** - Adapté aux mobiles, tablettes et ordinateurs
- **Persistance des données** - Le panier est sauvegardé dans le localStorage
- **Interface moderne** - Design épuré avec animations fluides

### Catalogue de produits
Le site propose 15 produits répartis en 4 catégories :
- **Électronique** - Ordinateurs, casques, montres connectées, tablettes
- **Mode** - Vêtements, chaussures, accessoires
- **Maison** - Décoration, lampes, cafetières
- **Sport** - Équipements sportifs et fitness

## Installation

1. Clonez le repository :
```bash
git clone <url-du-repo>
cd agency-mode-
```

2. Ouvrez le fichier `index.html` dans votre navigateur

**Aucune installation de dépendances n'est nécessaire** - le site fonctionne avec du JavaScript vanilla.

## Structure du projet

```
agency-mode-/
├── index.html          # Page d'accueil
├── products.html       # Page catalogue
├── checkout.html       # Page de commande
├── css/
│   └── style.css      # Styles CSS complets
├── js/
│   └── app.js         # Logique JavaScript
├── images/            # Dossier pour les images (optionnel)
├── LICENSE            # Licence MIT
└── README.md          # Ce fichier
```

## Technologies utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Design moderne avec variables CSS, Grid et Flexbox
- **JavaScript ES6+** - Fonctionnalités interactives
- **Font Awesome** - Icônes
- **LocalStorage API** - Persistance du panier

## Utilisation

### Navigation
- Cliquez sur "Produits" dans le menu pour voir le catalogue complet
- Utilisez les filtres pour affiner votre recherche
- Cliquez sur l'icône panier pour voir votre sélection

### Ajouter au panier
1. Parcourez les produits
2. Cliquez sur "Ajouter" sous un produit
3. Le panier se met à jour automatiquement
4. Gérez les quantités dans le panier latéral

### Commander
1. Cliquez sur l'icône panier
2. Vérifiez votre sélection
3. Cliquez sur "Commander"
4. Remplissez le formulaire de livraison et paiement
5. Validez votre commande

## Personnalisation

### Modifier les produits
Éditez le tableau `products` dans `js/app.js` :

```javascript
const products = [
    {
        id: 1,
        name: "Nom du produit",
        category: "categorie",
        price: 99.99,
        description: "Description",
        rating: 4.5,
        reviews: 100,
        badge: "Nouveau",
        image: "url-de-l-image"
    },
    // ...
];
```

### Modifier les couleurs
Modifiez les variables CSS dans `css/style.css` :

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #ec4899;
    --dark-color: #1f2937;
    /* ... */
}
```

### Ajouter des catégories
1. Ajoutez une carte de catégorie dans `index.html`
2. Ajoutez l'option dans le filtre de `products.html`
3. Ajoutez des produits avec cette catégorie dans `js/app.js`

## Compatibilité navigateurs

- Chrome/Edge (dernières versions)
- Firefox (dernières versions)
- Safari (dernières versions)
- Navigateurs mobiles modernes

## Développement futur

Fonctionnalités possibles à ajouter :
- Intégration d'une API de paiement réelle (Stripe, PayPal)
- Gestion des comptes utilisateurs
- Historique des commandes
- Système d'avis et commentaires
- Mode sombre
- Wishlist/favoris
- Comparateur de produits
- Backend avec base de données

## License

This project is released under the MIT License. See [LICENSE](LICENSE) for details.

## Support

Pour toute question ou problème, ouvrez une issue sur GitHub.

---

Développé avec ❤️ par ShopModerne
