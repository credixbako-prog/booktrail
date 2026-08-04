### Guide d'Architecture UI/UX v4 — BOOKTRAIL (MVP)

#### 1\. Philosophie de Design et Vision de la "Trace"

##### Philosophie du Design : L'Interface Effacée

La philosophie centrale de BOOKTRAIL, "Chaque livre laisse une trace", dicte une approche radicale de l'interface utilisateur. Pour un Architecte d'Interaction, l'enjeu est de concevoir une UI qui ne s'impose jamais comme une destination, mais comme un conduit vers l'expérience de lecture. En transformant l'application en un carnet de voyage intellectuel plutôt qu'en un simple outil de catalogage, nous permettons à l'interface de s'effacer. L'esthétique vise à capturer la mémoire du livre — une phrase soulignée, une émotion, une transformation — pour cristalliser le parcours unique de chaque lecteur au sein de son "Passeport du livre".

##### Principes Directeurs du Minimalisme Textuel

L'usage d'un minimalisme textuel extrême est une stratégie délibérée visant à réduire la charge cognitive et à favoriser un état de "Deep Work" propre à la lecture. Dans un écosystème mobile saturé de notifications et de micro-textes agressifs, BOOKTRAIL privilégie le vide visuel. Ce silence graphique renforce le positionnement "calme et profondeur" défini dans notre Manifeste, permettant à l'utilisateur de se concentrer sur sa propre progression plutôt que sur la consommation effrénée de métadonnées.

##### Identité Visuelle et Palette Chromatique

La palette chromatique est extraite de la matérialité d'une bibliothèque moderne et de la chaleur d'un journal personnel. Elle assure un rendu premium et serein.| Couleur | Code Hex | Rôle Sémantique || \------ | \------ | \------ || **Bleu Nuit** | \#0F1B2D | **Autorité & Profondeur**  : Utilisé pour les textes principaux et les fonds sombres de navigation. || **Vert Sauge** | \#6D8F7A | **Progression & Croissance**  : Couleur de la progression de lecture et des indicateurs de chemin parcouru. || **Ocre** | \#D28B3D | **Interaction Humaine**  : Chaleur, transmission et appels à l'action (CTA) communautaires. || **Crème** | \#F2EDE3 | **Confort & Support**  : Fond principal de l'application, simulant le grain d'un papier haut de gamme. |  
Cette identité visuelle statique prend vie à travers un système d'iconographie propriétaire qui rejette les conventions génériques du web social.

#### 2\. Système d'Iconographie et Langage Visuel Propriétaire

##### Suppression des Glyphes Système

Pour garantir une esthétique haut de gamme et intemporelle, l'usage des émojis système est strictement proscrit. Ces derniers introduisent une hétérogénéité visuelle "social media" incompatible avec notre vision. Nous les remplaçons par des icônes filaires monochromes (stroke 1.5pt), garantissant une cohérence visuelle absolue et une distinction nette avec les outils de productivité classiques.

##### Spécifications des Icônes Propriétaires

* **Icon\_Trace (Empreintes) :**  Représentée par des empreintes de pas fines en style filaire, couleur  **Vert Sauge (\#6D8F7A)** . Elle est utilisée exclusivement pour la navigation et le balisage du "Sentier" (pathing).  
* **Le Marque-Page (Symbole de la Trace) :**  Conformément à l'identité visuelle de la marque, le marque-page stylisé symbolise la trace intellectuelle. Il est utilisé pour identifier les cartes de réflexion et le contenu du Passeport.  
* **Icon\_Encouragement (Mains) :**  Des mains stylisées au trait minimaliste, utilisant l' **Ocre (\#D28B3D)**  pour souligner l'aspect humain et chaleureux de la communauté sans tomber dans la compétition de "likes".

##### Règles d'Usage

* **Interdiction stricte :**  Aucun émoji couleur standard (Apple/Google) dans le flux d'activité ou les titres.  
* **Filarisation :**  Toutes les icônes (Accueil, Sentier, Clairière, Bibliothèque) doivent présenter une épaisseur de trait constante de 1.5pt.  
* **Hiérarchie :**  L'icône doit toujours s'effacer devant le contenu textuel (titre du livre ou réflexion).Cette pureté visuelle est le préalable nécessaire à la fluidité des mouvements au sein de l'interface, où l'interaction devient physique.

#### 3\. Principes d'Interaction Physique et Dynamique (Haptique & Fluide)

##### Engagement Sensoriel et Performance

L'interface de BOOKTRAIL simule la matérialité du livre physique dans un environnement numérique. Pour atteindre ce standard premium, toutes les animations doivent viser un rendu à  **120 FPS**  sur les terminaux compatibles, garantissant une réponse instantanée au toucher.

##### La Molette Tactile Rotative (Rotary Picker)

Utilisée pour la saisie des pages lues en fin de session, cette molette virtuelle doit simuler une résistance mécanique.

* **Comportement :**  Défilement infini avec inertie calculée.  
* **Retour Haptique :**  Utilisation de la constante selectionClick sous Flutter à chaque passage de page. Pour les dizaines de pages, une vibration plus marquée (lightImpact) doit être déclenchée pour renforcer la perception de progression.

##### Le Retournement 3D (Card Flip) du Passeport

Les cartes de réflexion et de vocabulaire utilisent une animation de transition en retournement 3D (Axis Y). Ce mouvement simule le geste de manipuler une fiche bristol ou d'ouvrir le "Passeport du livre", renforçant la mémorisation par l'engagement moteur.

##### L'Onde de Retranscription (Dictaphone IA)

Le rendu visuel de la capture vocale doit être organique.

* **Spécification Technique :**  Utilisation d'une courbe de  **Bézier (Catmull-Rom spline)**  via CustomPainter. L'onde doit onduler de manière fluide et douce, évitant les pics de fréquence agressifs, pour traduire la sérénité de la prise de note.

#### 4\. Architecture de Navigation : Les 4 Écrans Majeurs

La structure à quatre écrans optimise le parcours utilisateur en séparant le temps court (la session) du temps long (la construction du sentier de vie).

##### Écran 1 : Accueil & Clairière

L'accueil présente l'objectif quotidien (ex: "15 min restantes") et le livre en cours avec son pourcentage de progression. La "Clairière" intégrée en bas d'écran sert d'espace de respiration communautaire. C'est un flux minimaliste où l'on observe la progression silencieuse des autres, validant l'appartenance à une communauté de lecteurs sans la pression sociale habituelle.

##### Écran 2 : Session Active de Lecture

Écran de concentration absolue. Centré sur un chronomètre minimaliste, il propose un champ de réflexion facultatif et l'accès au Dictaphone IA. Les transitions d'entrée en session doivent utiliser un  *fade-in*  lent (800ms) pour signaler le passage vers un état de calme.

##### Écran 3 : Bibliothèque & Sentier (Vue Hybride)

Cet écran fusionne la liste des titres et la visualisation chronologique.

* **Exécution Visuelle :**  La vue par défaut est un défilement vertical où l'axe central représente le "Sentier" (le chemin). Les couvertures de livres (lus et en cours) sont disposées de part et d'autre de cet axe selon une timeline chronologique (2024, 2025). Un  *swipe*  horizontal sur un livre permet de basculer vers son "Passeport" (les traces laissées). Cette fusion transforme une simple liste en une narration personnelle de l'évolution de la pensée.

##### Écran 4 : Profil & ADN

Structure l'identité du lecteur (ex: "Noah \- Lecteur Explorateur"). Cet écran affiche les statistiques vitales : heures totales, pages lues et surtout les "Livres transmis", valorisant la mission de circulation des idées du Manifeste.

#### 5\. Spécifications pour l'Implémentation Google Antigravity (Flutter)

Pour que le rendu final sur l'IDE Antigravity respecte l'exigence de fluidité "native" du MVP, les directives suivantes sont impératives.

##### Framework d'Animation et Haptique

* **60/120 FPS Target :**  Utiliser les RepaintBoundary sur les éléments complexes (onde vocale) pour éviter de redessiner l'intégralité de l'écran à chaque frame.  
* **CustomPainter :**  Implémenter l'onde du Dictaphone IA via un CustomPainter procédural pour une consommation CPU minimale.  
* **HapticFeedback Logic :**  
* Saisie des pages : HapticFeedback.selectionClick().  
* Validation de fin de session : HapticFeedback.mediumImpact().

##### Optimisation du Rendu Visuel

* **Typographie Poppins :**  
* Titres de sections : Poppins SemiBold (Poids 600).  
* Corps de texte et réflexions : Poppins Regular (Poids 400).  
* Couleur : Toujours \#0F1B2D sur fond \#F2EDE3.  
* **Ombres et Profondeur :**  Proscrire les ombres portées standard. Utiliser des BoxShadow très diffuses (Blur Radius \> 20, Opacity \< 0.08) pour les cartes afin de maintenir l'aspect "calme" et organique de l'interface.

##### Conclusion

Cette version v4 de BOOKTRAIL établit un équilibre entre émotion, technologie de pointe et respect absolu de l'intimité. En transformant chaque interaction technique en un geste symbolique, nous créons un compagnon de vie intellectuelle capable de conserver la trace durable de chaque lecture.  
