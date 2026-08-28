/**
 * One dictionary per project page, keyed by slug. Every entry must define the
 * key contract asserted in tests/project-pages.test.mjs.
 *
 * Confidentiality: architecture, patterns and round-number scale are fine.
 * No client identity, no real operational figures, no production screenshots.
 */
export const projects = {
  optimops: {
    en: {
      'meta.title': 'OptimOps Neo — Thomas Chu',
      'meta.description': 'A full-stack decision-support platform for a French fire & rescue service: coverage analysis, scenario simulation and resource optimization.',

      'p.eyebrow': 'Full-stack · decision support · 2023 — present',
      'p.title': 'OptimOps Neo',
      'p.lead': 'A decision-support platform that lets a fire & rescue service ask what would happen if it moved a vehicle, changed a shift pattern, or lost a station for a day — and get an answer grounded in its own operational history rather than in intuition.',

      'p.facts.role.label': 'Role',
      'p.facts.role.value': 'Data scientist — data contract, API, dashboard architecture',
      'p.facts.stack.label': 'Stack',
      'p.facts.stack.value': 'Python · FastAPI · Pandas · Parquet · Vue 3 · Quasar · ECharts · Leaflet',
      'p.facts.scope.label': 'Scope',
      'p.facts.scope.value': 'Backend, frontend and the data layer between them',
      'p.facts.status.label': 'Status',
      'p.facts.status.value': 'In production, actively developed',

      'p.context.title': 'Context',
      'p.context.body': '<p>A fire &amp; rescue service makes resource decisions constantly: where to station a vehicle, how many crews to roster for a given night, whether a coverage gap is acceptable. Those decisions have historically been made on experience and on aggregate reports that take days to produce and answer only the question they were built for.</p><p>The service already held years of operational history — every intervention, every vehicle dispatch, every availability window. What it did not have was a way to interrogate that history quickly enough for it to inform a decision, or to ask a hypothetical question of it at all.</p>',

      'p.built.title': 'What I built',
      'p.built.body': '<p>A platform in three layers. A computation layer turns raw operational tables into roughly three dozen indicator tables covering response delays, vehicle unavailability, operational load, coverage gaps and regulatory compliance. A FastAPI backend serves those tables from an in-process cache, loaded once at startup, with one router per domain. A Vue 3 / Quasar frontend puts them in front of users.</p><p>The frontend is not a fixed set of pages. It is a widget system: a registry describes every available widget type and the data source it binds to, a rules layer adjusts which properties are available depending on the navigation context, and each widget declares how to fetch and transform its own data. Users compose their own dashboards from that catalogue rather than waiting on a developer to build a new view.</p><p>On top of the reporting sit two heavier features: a scenario simulator that replays historical interventions against a modified configuration, and an optimizer that searches for better vehicle and staffing allocations.</p>',

      'p.decisions.title': 'Engineering decisions',
      'p.decisions.body': '<p><strong>Columnar files instead of a database for reads.</strong> The indicator tables are written once by a batch pipeline and read constantly, never updated in place. Serving them as Parquet, loaded into an in-process cache at startup, removed an entire service from the deployment: no database to provision, tune, back up or keep in sync. Deployment became copying a directory.</p><p><strong>Long jobs never block a request.</strong> Optimization runs take between thirty seconds and two minutes. They execute on background threads, with task state persisted to a small on-disk store so that every worker process sees the same task registry; the frontend submits a run and polls for status. Without shared persistence, a poll landing on a different worker than the one holding the job would have reported it missing.</p><p><strong>Saved scenarios live on the server, not in the browser.</strong> Storing them in local storage would have made every user\'s scenario library invisible to their colleagues. A shared server-side store made the library collaborative, and a one-time migration lifted anything already saved locally into it.</p><p><strong>Access control has one honest seam.</strong> There is no identity provider yet, so the current permission layer is explicitly interim and documented as insecure by design: role checks funnel through a single resolver so that when a real identity provider arrives, one function changes and every route inherits it. The alternative — scattering ad-hoc checks and calling it security — would have been harder to remove than to write.</p>',

      'p.outcome.title': 'Outcome',
      'p.outcome.body': '<p>Questions that used to require a bespoke report now take a few clicks, and users build their own views instead of queuing for one. More importantly, the platform changed the kind of question that gets asked: from "what happened last year" to "what would happen if we changed this".</p><p>The work also exposed how much of the difficulty sat upstream, in the data path rather than the application — which is what led directly to the engine rebuild described in the next project.</p>',

      'p.nav.prev': 'Back to work',
      'p.nav.next': 'Next: KPI Engine',
    },
    fr: {
      'meta.title': 'OptimOps Neo — Thomas Chu',
      'meta.description': "Une plateforme full-stack d'aide à la décision pour un service d'incendie et de secours français : analyse de couverture, simulation de scénarios et optimisation des ressources.",

      'p.eyebrow': "Full-stack · aide à la décision · 2023 — aujourd’hui",
      'p.title': 'OptimOps Neo',
      'p.lead': "Une plateforme d'aide à la décision qui permet à un service d'incendie et de secours de savoir ce qui se passerait s'il déplaçait un engin, modifiait un régime de garde ou perdait un centre pendant une journée — avec une réponse fondée sur son propre historique opérationnel plutôt que sur l'intuition.",

      'p.facts.role.label': 'Rôle',
      'p.facts.role.value': "Data scientist — contrat de données, API, architecture du tableau de bord",
      'p.facts.stack.label': 'Technologies',
      'p.facts.stack.value': 'Python · FastAPI · Pandas · Parquet · Vue 3 · Quasar · ECharts · Leaflet',
      'p.facts.scope.label': 'Périmètre',
      'p.facts.scope.value': "Backend, frontend et la couche de données entre les deux",
      'p.facts.status.label': 'Statut',
      'p.facts.status.value': 'En production, développement actif',

      'p.context.title': 'Contexte',
      'p.context.body': "<p>Un service d'incendie et de secours arbitre en permanence : où stationner un engin, combien d'équipes armer pour une nuit donnée, si un défaut de couverture est acceptable. Ces décisions se prenaient historiquement sur l'expérience et sur des rapports agrégés qui demandent plusieurs jours de production et ne répondent qu'à la question pour laquelle ils ont été conçus.</p><p>Le service disposait déjà de plusieurs années d'historique opérationnel — chaque intervention, chaque engagement d'engin, chaque fenêtre de disponibilité. Ce qui manquait, c'était un moyen d'interroger cet historique assez vite pour éclairer une décision, et surtout de lui poser une question hypothétique.</p>",

      'p.built.title': "Ce que j'ai construit",
      'p.built.body': "<p>Une plateforme en trois couches. Une couche de calcul transforme les tables opérationnelles brutes en une trentaine de tables d'indicateurs : délais d'intervention, indisponibilité des engins, charge opérationnelle, défauts de couverture et conformité réglementaire. Un backend FastAPI sert ces tables depuis un cache en mémoire chargé une fois au démarrage, avec un routeur par domaine. Un frontend Vue 3 / Quasar les met devant les utilisateurs.</p><p>Le frontend n'est pas un ensemble figé de pages, mais un système de composants : un registre décrit chaque type de composant et la source de données à laquelle il se rattache, une couche de règles ajuste les propriétés disponibles selon le contexte de navigation, et chaque composant déclare comment récupérer et transformer ses propres données. Les utilisateurs composent eux-mêmes leurs tableaux de bord au lieu d'attendre qu'un développeur crée une nouvelle vue.</p><p>Au-dessus du reporting, deux fonctionnalités plus lourdes : un simulateur qui rejoue les interventions historiques sur une configuration modifiée, et un optimiseur qui recherche de meilleures affectations d'engins et d'effectifs.</p>",

      'p.decisions.title': 'Décisions techniques',
      'p.decisions.body': "<p><strong>Des fichiers colonnaires plutôt qu'une base de données en lecture.</strong> Les tables d'indicateurs sont écrites une fois par une chaîne de traitement par lots puis lues en permanence, jamais modifiées sur place. Les servir en Parquet, chargées dans un cache en mémoire au démarrage, a supprimé un service entier du déploiement : plus de base à provisionner, régler, sauvegarder ou synchroniser. Déployer revient à copier un répertoire.</p><p><strong>Les traitements longs ne bloquent jamais une requête.</strong> Une optimisation prend de trente secondes à deux minutes. Elle s'exécute sur un fil d'exécution en arrière-plan, l'état de la tâche étant persisté dans un petit magasin sur disque pour que tous les processus de travail voient le même registre ; le frontend soumet un calcul puis interroge son statut. Sans cette persistance partagée, une requête de statut arrivant sur un autre processus que celui qui porte la tâche l'aurait déclarée introuvable.</p><p><strong>Les scénarios enregistrés vivent sur le serveur, pas dans le navigateur.</strong> Les stocker côté navigateur aurait rendu la bibliothèque de scénarios de chacun invisible à ses collègues. Un magasin partagé côté serveur l'a rendue collaborative, et une migration unique a remonté ce qui était déjà enregistré localement.</p><p><strong>Le contrôle d'accès a une seule couture assumée.</strong> Il n'existe pas encore de fournisseur d'identité : la couche de permissions actuelle est explicitement provisoire et documentée comme non sécurisée par construction. Les vérifications de rôle passent toutes par un unique résolveur, de sorte que le jour où un vrai fournisseur d'identité arrivera, une seule fonction changera et toutes les routes en hériteront. L'alternative — disséminer des vérifications ad hoc et appeler cela de la sécurité — aurait été plus difficile à retirer qu'à écrire.</p>",

      'p.outcome.title': 'Résultat',
      'p.outcome.body': "<p>Des questions qui exigeaient auparavant un rapport sur mesure se règlent en quelques clics, et les utilisateurs construisent leurs propres vues au lieu d'en faire la demande. Plus important : la plateforme a changé la nature des questions posées, passant de « qu'est-il arrivé l'an dernier » à « que se passerait-il si nous changions ceci ».</p><p>Ce travail a aussi révélé à quel point la difficulté se situait en amont, dans le chemin de données plutôt que dans l'application — ce qui a directement conduit à la reconstruction du moteur décrite dans le projet suivant.</p>",

      'p.nav.prev': 'Retour aux projets',
      'p.nav.next': "Suivant : Moteur d'indicateurs",
    },
  },

  'kpi-engine': {
    en: {
      'meta.title': 'KPI Engine — Thomas Chu',
      'meta.description': 'A ground-up rebuild of an operational indicator engine: a validated input contract, a star-schema core, and a regression harness checking every value against the engine it replaces.',

      'p.eyebrow': 'Data architecture · 2025 — present',
      'p.title': 'KPI Engine',
      'p.lead': 'The indicator engine underneath OptimOps, rebuilt from first principles — because the fastest way to lose trust in a dashboard is to be unable to explain where one of its numbers came from.',

      'p.facts.role.label': 'Role',
      'p.facts.role.value': 'Architecture, audit and implementation',
      'p.facts.stack.label': 'Stack',
      'p.facts.stack.value': 'Python · Pandas · Parquet · pytest',
      'p.facts.scope.label': 'Scope',
      'p.facts.scope.value': 'Input contract, computation core, publication step, regression harness',
      'p.facts.status.label': 'Status',
      'p.facts.status.value': 'In development, running alongside the engine it replaces',

      'p.context.title': 'Context',
      'p.context.body': '<p>The engine computing OptimOps\' indicators had grown organically over several years. Before proposing to replace it I audited it in four parts, and wrote up what I found rather than trusting my impression of it.</p><p>The data path crossed four formats between the source system and a computed value, with no stage that clearly owned validation. I catalogued around a hundred and fifty distinct data transformations, among which one sweep-line pattern — walking a timeline of start and end events to compute overlap — had been independently reimplemented close to a dozen times, with at least two of those copies carrying documented numerical bugs. Vocabulary diverged: one vehicle category resolved to three different classifications depending on which module you asked. Several reference tables had no traceable provenance. And no test anywhere in the chain asserted the value of a single indicator.</p><p>Individually these are ordinary symptoms of a system that grew faster than its scaffolding. Together they meant a wrong number could not be traced to a cause — which is what makes a decision-support tool stop being used.</p>',

      'p.built.title': 'What I built',
      'p.built.body': '<p>A new engine with a deliberately shorter data path. Inputs arrive as a typed, denormalised Parquet contract rather than being read from a shared operational database, and are validated at load time: a missing or malformed column fails the run immediately instead of being quietly dropped and surfacing later as an unexplained blank in a chart.</p><p>The core is a star schema — one fact table per grain, shared dimension tables — so the roughly three dozen indicators are expressed as queries over a common model instead of as three dozen bespoke pipelines. The sweep-line logic that had been reimplemented repeatedly exists once, tested directly against hand-computed expected values.</p><p>Publication is a single formal step. The engine writes its results atomically, file by file, and aborts on the first error, so a run either publishes a complete, consistent set of outputs or publishes nothing. There is no state in which half the indicators are new and half are stale.</p><p>Finally, a regression harness runs the previous engine as an external black-box process and compares its outputs against the new one, indicator by indicator. Any divergence is either a bug I introduced or a bug I fixed — and the harness forces me to decide which, in writing, before moving on.</p>',

      'p.decisions.title': 'Engineering decisions',
      'p.decisions.body': '<p><strong>Audit before rewrite.</strong> A rewrite justified by "the old one is messy" is a rewrite that reproduces the same mistakes in new syntax. Writing the audit down first meant each design choice in the new engine answers a specific, documented finding — and it made the case for the rebuild something a stakeholder could evaluate rather than take on faith.</p><p><strong>Fail loudly at the boundary.</strong> The original engine tolerated missing columns and unknown categories, which pushed the discovery of a data problem downstream to whoever noticed a strange chart weeks later. The new one validates at load and refuses to run. Failing at ingestion is inconvenient; failing silently is expensive.</p><p><strong>Separate computation from plumbing.</strong> The previous engine both fetched data and computed on it, so a change to storage risked changing a result. Splitting the input contract from the computation core means the two can be reasoned about — and tested — independently.</p><p><strong>Keep the old engine as the reference, not as the target.</strong> The harness exists to explain differences, not to reproduce them. Where the old engine was wrong, the new one is allowed to disagree — but only deliberately, with the reason recorded.</p>',

      'p.outcome.title': 'Outcome',
      'p.outcome.body': '<p>The engine is not yet the one in production; it runs beside the existing one while the regression harness works through the indicator set. That is the intended sequence — a replacement that cannot demonstrate where it differs is not ready to replace anything.</p><p>What has already changed is the ability to answer "why is this number what it is". Every indicator now has a traceable path from a validated input to a tested transformation, which is the property the original system was missing.</p>',

      'p.nav.prev': 'Previous: OptimOps Neo',
      'p.nav.next': 'Next: Multimodal Emotion Recognition',
    },
    fr: {
      'meta.title': "Moteur d'indicateurs — Thomas Chu",
      'meta.description': "Reconstruction complète d'un moteur d'indicateurs opérationnels : contrat d'entrée validé, cœur en modèle en étoile, et harnais de non-régression vérifiant chaque valeur face au moteur remplacé.",

      'p.eyebrow': "Architecture de données · 2025 — aujourd’hui",
      'p.title': "Moteur d'indicateurs",
      'p.lead': "Le moteur d'indicateurs sous OptimOps, reconstruit depuis les fondations — parce que le moyen le plus rapide de perdre confiance dans un tableau de bord est de ne pas pouvoir expliquer d'où vient l'un de ses chiffres.",

      'p.facts.role.label': 'Rôle',
      'p.facts.role.value': 'Architecture, audit et implémentation',
      'p.facts.stack.label': 'Technologies',
      'p.facts.stack.value': 'Python · Pandas · Parquet · pytest',
      'p.facts.scope.label': 'Périmètre',
      'p.facts.scope.value': "Contrat d'entrée, cœur de calcul, étape de publication, harnais de non-régression",
      'p.facts.status.label': 'Statut',
      'p.facts.status.value': "En développement, exécuté en parallèle du moteur qu'il remplace",

      'p.context.title': 'Contexte',
      'p.context.body': "<p>Le moteur qui calculait les indicateurs d'OptimOps avait grandi de façon organique sur plusieurs années. Avant de proposer de le remplacer, je l'ai audité en quatre volets et j'ai consigné mes constats plutôt que de me fier à mon impression.</p><p>Le chemin de données traversait quatre formats entre le système source et une valeur calculée, sans étape qui porte clairement la validation. J'ai recensé environ cent cinquante transformations distinctes, parmi lesquelles un même motif de balayage temporel — parcourir une chronologie d'événements de début et de fin pour calculer un recouvrement — avait été réimplémenté indépendamment près d'une dizaine de fois, dont au moins deux copies portaient des erreurs numériques documentées. Le vocabulaire divergeait : une même catégorie d'engin se résolvait en trois classifications différentes selon le module interrogé. Plusieurs référentiels n'avaient pas de provenance traçable. Et aucun test, nulle part dans la chaîne, ne vérifiait la valeur d'un seul indicateur.</p><p>Pris isolément, ce sont des symptômes ordinaires d'un système qui a grandi plus vite que ses garde-fous. Ensemble, ils signifiaient qu'un chiffre erroné ne pouvait pas être rattaché à une cause — ce qui est précisément ce qui fait cesser d'utiliser un outil d'aide à la décision.</p>",

      'p.built.title': "Ce que j'ai construit",
      'p.built.body': "<p>Un nouveau moteur au chemin de données volontairement plus court. Les entrées arrivent sous forme d'un contrat Parquet typé et dénormalisé plutôt que d'être lues dans une base opérationnelle partagée, et sont validées au chargement : une colonne absente ou mal formée fait échouer le traitement immédiatement, au lieu d'être silencieusement ignorée puis de ressortir plus tard en case vide inexpliquée dans un graphique.</p><p>Le cœur est un modèle en étoile — une table de faits par grain, des tables de dimensions partagées — de sorte que la trentaine d'indicateurs s'exprime comme des requêtes sur un modèle commun plutôt que comme une trentaine de chaînes sur mesure. La logique de balayage temporel, jusque-là dupliquée, n'existe plus qu'une fois, testée directement contre des valeurs attendues calculées à la main.</p><p>La publication est une étape unique et formalisée. Le moteur écrit ses résultats de façon atomique, fichier par fichier, et s'interrompt à la première erreur : un traitement publie soit un ensemble complet et cohérent, soit rien. Il n'existe pas d'état où la moitié des indicateurs seraient à jour et l'autre périmée.</p><p>Enfin, un harnais de non-régression exécute l'ancien moteur comme un processus externe en boîte noire et compare ses sorties à celles du nouveau, indicateur par indicateur. Tout écart est soit une erreur que j'ai introduite, soit une erreur que j'ai corrigée — et le harnais m'oblige à trancher, par écrit, avant de poursuivre.</p>",

      'p.decisions.title': 'Décisions techniques',
      'p.decisions.body': "<p><strong>Auditer avant de réécrire.</strong> Une réécriture justifiée par « l'ancien est en désordre » est une réécriture qui reproduit les mêmes erreurs dans une autre syntaxe. Consigner l'audit d'abord a fait que chaque choix de conception répond à un constat précis et documenté — et a rendu la décision de reconstruire évaluable par un décideur, au lieu d'être prise sur parole.</p><p><strong>Échouer bruyamment à la frontière.</strong> Le moteur d'origine tolérait les colonnes manquantes et les catégories inconnues, ce qui reportait la découverte d'un défaut de données sur la personne qui remarquerait un graphique étrange des semaines plus tard. Le nouveau valide au chargement et refuse de s'exécuter. Échouer à l'ingestion est gênant ; échouer en silence coûte cher.</p><p><strong>Séparer le calcul de la plomberie.</strong> Le moteur précédent allait chercher les données et calculait dessus, si bien qu'un changement de stockage risquait de changer un résultat. Séparer le contrat d'entrée du cœur de calcul permet de raisonner — et de tester — les deux indépendamment.</p><p><strong>Garder l'ancien moteur comme référence, pas comme cible.</strong> Le harnais existe pour expliquer les écarts, pas pour les reproduire. Là où l'ancien moteur se trompait, le nouveau a le droit de diverger — mais délibérément, et avec la raison consignée.</p>",

      'p.outcome.title': 'Résultat',
      'p.outcome.body': "<p>Le moteur n'est pas encore celui en production : il tourne à côté de l'existant pendant que le harnais parcourt l'ensemble des indicateurs. C'est la séquence voulue — un remplaçant incapable de démontrer en quoi il diffère n'est pas prêt à remplacer quoi que ce soit.</p><p>Ce qui a déjà changé, c'est la capacité à répondre à « pourquoi ce chiffre vaut-il cela ». Chaque indicateur dispose désormais d'un chemin traçable, d'une entrée validée jusqu'à une transformation testée — la propriété qui manquait au système d'origine.</p>",

      'p.nav.prev': 'Précédent : OptimOps Neo',
      'p.nav.next': 'Suivant : Reconnaissance multimodale des émotions',
    },
  },
};
