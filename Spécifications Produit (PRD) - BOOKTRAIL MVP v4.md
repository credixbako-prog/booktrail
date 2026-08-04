### Cahier des Charges Fonctionnel et Technique (PRD) : BOOKTRAIL MVP v4

#### 1\. Vision Stratégique et ADN du Produit

BOOKTRAIL ne se positionne pas comme un énième outil de catalogage numérique, mais comme un « compagnon de lecture » émotionnel. Inspiré par la philosophie de Strava, qui a su transformer l'effort physique en une narration personnelle, BOOKTRAIL transpose cette dynamique à la vie de l’esprit. L’enjeu stratégique dépasse le simple inventaire : il s’agit de transformer la lecture en une habitude durable en capturant la « Trace » — cette empreinte indélébile qu’un livre laisse sur son lecteur. Cette v4 simplifiée se concentre sur l'essentiel pour permettre à l'utilisateur de construire son histoire de lecteur sans distraction.

##### Piliers du Manifeste

* **Vision :**  Faire de chaque lecture une expérience qui laisse une empreinte. Les livres sont des vecteurs de transformation, non des objets de consommation.  
* **Mission :**  Instaurer une relation durable avec la lecture via un suivi de progression, une communauté bienveillante et la transmission mémorielle des ouvrages.  
* **Conviction :**  Chaque livre laisse une trace ; chaque lecteur laisse une trace dans le livre. BOOKTRAIL est le gardien de cette mémoire.

##### Positionnement Concurrentiel : Le Choix de la Profondeur

Dimension,BOOKTRAIL,Plateformes Sociales (Goodreads/IG)  
Indicateur de succès,"La ""Trace"" (émotion, réflexion capturée)","Le ""Like"" ou la note quantitative"  
Expérience Utilisateur,Journal personnel et immersif,Vitrine sociale et catalogue massif  
Philosophie,"Calme, profondeur, introspection","Popularité, stimuli, consommation infinie"  
Finalité,Construire son identité de lecteur,Accumuler des titres et des vues

#### 2\. Architecture Technique et Stack de Développement

En tant qu'Architecte Solutions, le choix de la stack répond à une double exigence : une fluidité d'interface premium et une gestion complexe des données relationnelles.

* **IDE :**  Google Antigravity.  
* **Framework :**  Flutter. Ce choix est critique pour garantir la qualité des animations (notamment la fluidité visuelle du "Sentier") et une UI "Pixel Perfect" sur iOS et Android.  
* **Backend :**  Firebase, avec l'implémentation de  **Firebase Data Connect (PostgreSQL)** . Ce choix est structurant pour le  **"Passeport du livre"**  : contrairement à une base NoSQL simple, PostgreSQL permet de modéliser avec précision les relations entre un ISBN unique et la multitude de lecteurs qui se transmettent l'objet physique au fil des années, créant une véritable généalogie du livre.  
* **Scanner ISBN :**  Intégration native obligatoire. C'est le réducteur de friction principal pour l'entrée dans l'écosystème BOOKTRAIL, transformant instantanément l'objet physique en une entité numérique augmentée.

#### 3\. Charte Graphique et Design Émotionnel (UX/UI)

L'interface doit favoriser un état de "Flow" et d'introspection. Le design est volontairement épuré, fuyant les codes du "gaming" pour adopter ceux d'une bibliothèque moderne ou d'un carnet de voyage haut de gamme.

##### Palette Chromatique Officielle

Élément,Couleur,Code HEX,Usage  
Fond,Crème,\#F2EDE3,"Confort visuel, rappel du papier"  
Primaire,Bleu Nuit,\#0F1B2D,Typographie et hiérarchie  
Trace,Vert Sauge,\#6D8F7A,"Progression, empreintes, chemins"  
Action,Ocre,\#D28B3D,"Boutons, encouragements, marque-page"

* **Typographie :**  "Poppins" pour sa clarté et sa chaleur moderne.  
* **Système Iconographique :**  Filaire monochrome uniquement.  **L'usage d'emojis système en couleur est interdit.**  
* **Marque-page ocre :**  Symbole central de la "Trace".  
* **Mains ocre :**  Symbole de l'Encouragement (système de Kudos).  
* **Empreintes vert sauge :**  Symbole du chemin parcouru sur le Sentier.

#### 4\. Spécifications des 4 Écrans du MVP (Navigation Unifiée)

Pour optimiser la rétention, l'architecture v4 s'appuie sur une barre de navigation à quatre onglets, complétée par un accès au profil identitaire.

##### 4.1 L'Accueil (Le Tableau de Bord)

Point d'ancrage quotidien affichant le statut "En cours".

* **Widget "Objectif du jour" :**  Un anneau de progression circulaire affichant dynamiquement le temps restant (ex: "15 min restantes").  
* **CTA Session :**  Bouton "Démarrer une session" directement lié au livre actuel pour minimiser le nombre de clics avant la lecture.

##### 4.2 La Clairière (Le Fil Social Minimaliste)

Espace de motivation mutuelle, loin de la course à la popularité.

* **Contenu :**  Activités récentes des amis et réflexions partagées.  
* **Interactions :**  Système de "Kudos" (mains ocre) pour encourager la régularité, et non la quantité.

##### 4.3 Le Sentier & La Bibliothèque (Vue Fusionnée par Toggle)

Cet écran gère l'historique et la collection.

* **Le Sentier :**  Une frise chronologique verticale (timeline) qui visualise le parcours unique du lecteur. Chaque livre est une étape ornée de sa couverture et de ses traces.  
* **La Bibliothèque :**  Vue catalogue organisée (À lire, Lus, Transmis).  
* **Scanner ISBN :**  Bouton d'action flottant permettant l'ajout rapide d'un ouvrage au "Passeport du livre".

##### 4.4 La Session Active (Interface d'Immersion)

Déclenchée depuis l'Accueil, cette interface est centrée sur la capture de la pensée.

* **Outils :**  Chronomètre discret et compteur de pages.  
* **Dictaphone IA :**  Fonctionnalité phare permettant de dicter une réflexion à la volée. L'IA transcrit le texte, l'associe automatiquement au numéro de page actuel et génère une "Trace" enrichie (metadata : lieu, humeur).

##### 4.5 Profil & ADN de Lecteur (Identité)

Accessible via l'avatar, cet écran définit l'identité profonde.

* **Statistiques :**  Temps total, série actuelle (jours consécutifs), livres transmis.  
* **Livres Marquants (Les Racines) :**  Section obligatoire exposant les ouvrages fondateurs.  **La Bible doit figurer en première position** , symbolisant le texte socle de l'identité du lecteur, avant les genres favoris (Philosophie, Littérature, etc.).

#### 5\. Parcours Utilisateur : Onboarding Émotionnel

L'onboarding doit transformer la configuration technique en une expérience de réflexion personnelle immédiate.

1. **Éveil des Souvenirs :**  L'utilisateur sélectionne 3 livres ayant laissé une trace majeure dans sa vie.  
2. **Projection :**  Définition de l'objectif quotidien (temps de lecture) et des thèmes d'intérêt.  
3. **Activation Immédiate :**  L'application génère instantanément le premier "Sentier" visuel basé sur les 3 livres choisis, matérialisant ainsi l'histoire passée de l'utilisateur avant même sa première lecture via l'app.

#### 6\. Périmètre de Livraison (Scope)

##### Must-Have (Le Cœur du MVP)

* **Le Cœur :**  Onboarding émotionnel, tracking de session avec Dictaphone IA, et frise chronologique "Sentier".  
* **La Connexion :**  Identification ISBN et création du "Passeport du livre" (notes persistantes rattachées à l'ouvrage).  
* **La Motivation :**  Système de Kudos (mains ocre) et fil d'actualité minimaliste.

##### Non-MVP (Hors-Périmètre v4)

* **Marketplace :**  Pas de transaction commerciale ni logistique intégrée.  
* **Book Tokens :**  Le système de jetons pour la circulation physique est reporté en v5.  
* **Clubs de lecture complexes :**  Pas de salons de discussion synchrones.  
* **Analytics avancés :**  Seuls les indicateurs de temps et de régularité sont maintenus.**Conclusion :**  Cette version v4 a pour objectif unique de valider la proposition de valeur de la "Trace". En réduisant la friction entre la lecture et la réflexion, BOOKTRAIL s'établit non comme une base de données, mais comme le dépositaire de la mémoire intellectuelle de sa communauté.

