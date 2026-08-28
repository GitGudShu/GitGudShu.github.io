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

  'emotion-recognition': {
    en: {
      'meta.title': 'Multimodal Emotion Recognition — Thomas Chu',
      'meta.description': 'A research internship at the University of Portsmouth: recognising emotion across video, text, audio and images by fine-tuning transformer models.',

      'p.eyebrow': 'Research internship · 2023',
      'p.title': 'Multimodal Emotion Recognition',
      'p.lead': 'A research internship at the University of Portsmouth, working on models that infer emotional state from whichever signals are available — what someone wrote, how they said it, and how they looked while saying it.',

      'p.facts.role.label': 'Role',
      'p.facts.role.value': 'Research assistant intern',
      'p.facts.stack.label': 'Stack',
      'p.facts.stack.value': 'Python · PyTorch · Transformers · DeBERTa · OpenAI fine-tuning · Weights & Biases',
      'p.facts.scope.label': 'Scope',
      'p.facts.scope.value': 'Model fine-tuning, experiment tracking, a real-time transcription tool',
      'p.facts.status.label': 'Status',
      'p.facts.status.value': 'Completed — internship, 2023',

      'p.context.title': 'Context',
      'p.context.body': '<p>The research group was studying how emotional state could be inferred from recordings of students, with the eventual aim of spotting disengagement early enough to do something about it. Emotion is a genuinely multimodal signal: text carries the content, audio carries the delivery, and video carries the expression, and each of the three is unreliable on its own.</p><p>The practical problem was less about model architecture than about iteration. Runs were being launched, tuned and compared informally, which made it hard to say whether a change had helped or whether the difference was noise.</p>',

      'p.built.title': 'What I built',
      'p.built.body': '<p>I worked on the text branch, fine-tuning a DeBERTa model on the group\'s labelled data, and separately fine-tuned an OpenAI model as a comparison point so the team had a reference for what a general-purpose model achieved on the same task without domain training.</p><p>To fix the iteration problem I introduced Weights &amp; Biases across the group\'s experiments — every run logging its hyperparameters, metrics and artefacts automatically. Comparing two runs became reading a chart instead of reconstructing what had been changed from memory.</p><p>I also built a live transcription tool that captured audio, transcribed it as it arrived, and pushed each segment through the emotion model, so the pipeline could be demonstrated end to end on a live speaker rather than only on a prepared dataset.</p>',

      'p.decisions.title': 'Engineering decisions',
      'p.decisions.body': '<p><strong>Track experiments before tuning them.</strong> Adding experiment tracking was not the assignment, but without it no result was reproducible and no comparison was trustworthy. Fixing that first made every subsequent measurement meaningful — an early lesson that infrastructure debt shows up as unreliable conclusions, not just as slow work.</p><p><strong>Fine-tune a general model as a baseline, not as a competitor.</strong> The OpenAI fine-tune existed to answer "how much does domain-specific training actually buy us here?". A specialised model that cannot beat a general one is worth knowing about early.</p><p><strong>Demonstrate on live input.</strong> A model that only ever runs on a clean, pre-segmented dataset hides its practical failure modes. Wiring the pipeline to live audio surfaced latency and segmentation problems that offline evaluation never would have shown.</p>',

      'p.outcome.title': 'Outcome',
      'p.outcome.body': '<p>The group came away with a tracked, reproducible experiment setup, a fine-tuned text model with a documented baseline to compare against, and a demonstrable live pipeline.</p><p>For me it was the project that shifted my interest from models toward the systems around them — a pattern that has held in everything I have worked on since.</p>',

      'p.nav.prev': 'Previous: KPI Engine',
      'p.nav.next': 'Next: Predictops',
    },
    fr: {
      'meta.title': 'Reconnaissance multimodale des émotions — Thomas Chu',
      'meta.description': "Un stage de recherche à l'université de Portsmouth : reconnaître l'émotion sur vidéo, texte, audio et images par ajustement fin de modèles transformeurs.",

      'p.eyebrow': 'Stage de recherche · 2023',
      'p.title': 'Reconnaissance multimodale des émotions',
      'p.lead': "Un stage de recherche à l'université de Portsmouth, sur des modèles qui infèrent un état émotionnel à partir des signaux disponibles — ce qu'une personne a écrit, la façon dont elle l'a dit, et son expression au moment de le dire.",

      'p.facts.role.label': 'Rôle',
      'p.facts.role.value': 'Stagiaire assistant de recherche',
      'p.facts.stack.label': 'Technologies',
      'p.facts.stack.value': 'Python · PyTorch · Transformers · DeBERTa · ajustement fin OpenAI · Weights & Biases',
      'p.facts.scope.label': 'Périmètre',
      'p.facts.scope.value': "Ajustement fin de modèles, suivi d'expériences, outil de transcription temps réel",
      'p.facts.status.label': 'Statut',
      'p.facts.status.value': 'Terminé — stage, 2023',

      'p.context.title': 'Contexte',
      'p.context.body': "<p>L'équipe de recherche étudiait comment inférer un état émotionnel à partir d'enregistrements d'étudiants, avec pour objectif de repérer un décrochage assez tôt pour y répondre. L'émotion est un signal réellement multimodal : le texte porte le contenu, l'audio la manière, la vidéo l'expression — et aucun des trois n'est fiable isolément.</p><p>Le problème pratique tenait moins à l'architecture des modèles qu'à l'itération. Les entraînements étaient lancés, réglés et comparés de façon informelle, ce qui rendait difficile de dire si un changement avait aidé ou si l'écart relevait du bruit.</p>",

      'p.built.title': "Ce que j'ai construit",
      'p.built.body': "<p>J'ai travaillé sur la branche texte, en ajustant finement un modèle DeBERTa sur les données annotées de l'équipe, et j'ai par ailleurs ajusté un modèle OpenAI comme point de comparaison, afin que l'équipe dispose d'une référence sur ce qu'obtient un modèle généraliste sur la même tâche sans entraînement métier.</p><p>Pour régler le problème d'itération, j'ai introduit Weights &amp; Biases sur l'ensemble des expériences : chaque entraînement journalise automatiquement ses hyperparamètres, ses métriques et ses artefacts. Comparer deux entraînements est devenu lire un graphique au lieu de reconstituer de mémoire ce qui avait changé.</p><p>J'ai également développé un outil de transcription en direct qui capte l'audio, le transcrit au fil de l'eau et fait passer chaque segment dans le modèle d'émotion, afin de démontrer la chaîne de bout en bout sur un locuteur réel et non seulement sur un jeu de données préparé.</p>",

      'p.decisions.title': 'Décisions techniques',
      'p.decisions.body': "<p><strong>Tracer les expériences avant de les régler.</strong> Mettre en place le suivi d'expériences n'était pas la mission, mais sans lui aucun résultat n'était reproductible et aucune comparaison fiable. Corriger cela d'abord a donné du sens à toutes les mesures suivantes — une leçon précoce : la dette d'outillage se manifeste par des conclusions peu fiables, pas seulement par de la lenteur.</p><p><strong>Ajuster un modèle généraliste comme référence, pas comme concurrent.</strong> L'ajustement OpenAI existait pour répondre à « qu'apporte réellement un entraînement spécifique au domaine ? ». Un modèle spécialisé incapable de battre un généraliste, il vaut mieux le savoir tôt.</p><p><strong>Démontrer sur des entrées réelles.</strong> Un modèle qui ne tourne que sur un jeu de données propre et pré-segmenté masque ses vrais modes de défaillance. Brancher la chaîne sur de l'audio en direct a révélé des problèmes de latence et de segmentation qu'une évaluation hors ligne n'aurait jamais montrés.</p>",

      'p.outcome.title': 'Résultat',
      'p.outcome.body': "<p>L'équipe est repartie avec un dispositif d'expérimentation tracé et reproductible, un modèle texte ajusté accompagné d'une référence documentée, et une chaîne démontrable en direct.</p><p>Pour moi, c'est le projet qui a déplacé mon intérêt des modèles vers les systèmes qui les entourent — une constante dans tout ce sur quoi j'ai travaillé depuis.</p>",

      'p.nav.prev': "Précédent : Moteur d'indicateurs",
      'p.nav.next': 'Suivant : Predictops',
    },
  },

  predictops: {
    en: {
      'meta.title': 'Predictops — Thomas Chu',
      'meta.description': 'Geolocated forecasting of emergency interventions, combining historical operational data with weather signals in an operational dashboard.',

      'p.eyebrow': 'Forecasting · dataviz · 2023 — 2024',
      'p.title': 'Predictops',
      'p.lead': 'Forecasting where and when emergency interventions are likely to occur, so that a service can position resources ahead of demand rather than reacting to it.',

      'p.facts.role.label': 'Role',
      'p.facts.role.value': 'Development support and integration with OptimOps',
      'p.facts.stack.label': 'Stack',
      'p.facts.stack.value': 'Python · scikit-learn · Pandas · Vue 3 · Quasar · ECharts',
      'p.facts.scope.label': 'Scope',
      'p.facts.scope.value': 'Feature engineering, forecast surfacing, dashboard integration',
      'p.facts.status.label': 'Status',
      'p.facts.status.value': 'Delivered — superseded by the OptimOps platform',

      'p.context.title': 'Context',
      'p.context.body': '<p>Emergency demand is not uniform. It clusters in space, in time, and around conditions — weather in particular moves several categories of intervention in ways that are visible in the historical record. A service that can anticipate that shift, even roughly, can pre-position crews instead of dispatching from wherever they happen to be.</p><p>The forecast on its own is not the deliverable. A prediction that lives in a notebook changes nothing; it has to arrive where the decision is actually made.</p>',

      'p.built.title': 'What I built',
      'p.built.body': '<p>I contributed to the forecasting side — assembling features from historical intervention records and joining them against weather data so the model could learn the relationship between conditions and demand, geographically resolved rather than aggregated over a whole territory.</p><p>The larger part of my contribution was surfacing: building the views that put forecasts in front of operators, and connecting Predictops to OptimOps so that a projection could feed the same interface where coverage and resource decisions were already being made.</p>',

      'p.decisions.title': 'Engineering decisions',
      'p.decisions.body': '<p><strong>Forecast at a geographic grain, not a territorial average.</strong> A single number for a whole territory is accurate and useless — demand concentrates, and the value of the forecast is entirely in knowing where. Keeping the geographic resolution cost accuracy per cell but made the output actionable.</p><p><strong>Treat weather as an input signal, not a special case.</strong> Weather was joined into the same feature pipeline as everything else rather than bolted on as a separate correction. It made the model easier to reason about and made it straightforward to add further external signals later.</p><p><strong>Integrate rather than stand alone.</strong> Connecting Predictops to OptimOps mattered more than any accuracy gain: operators already had a tool they opened daily, and a forecast that appears there gets used, while one behind a separate login does not.</p>',

      'p.outcome.title': 'Outcome',
      'p.outcome.body': '<p>Predictops demonstrated that geolocated demand forecasting was viable on the available operational history, and the integration work established the pattern that OptimOps later generalised — predictions and indicators sharing one interface rather than living in separate tools.</p><p>The platform itself has since been superseded by OptimOps, which absorbed its role.</p>',

      'p.nav.prev': 'Previous: Multimodal Emotion Recognition',
      'p.nav.next': 'Next: ARS Health Dashboard',
    },
    fr: {
      'meta.title': 'Predictops — Thomas Chu',
      'meta.description': "Prévision géolocalisée des interventions de secours, combinant données opérationnelles historiques et signaux météo dans un tableau de bord opérationnel.",

      'p.eyebrow': 'Prévision · dataviz · 2023 — 2024',
      'p.title': 'Predictops',
      'p.lead': "Prévoir où et quand les interventions de secours sont susceptibles de survenir, pour qu'un service puisse positionner ses moyens en amont de la demande plutôt que d'y réagir.",

      'p.facts.role.label': 'Rôle',
      'p.facts.role.value': "Appui au développement et intégration avec OptimOps",
      'p.facts.stack.label': 'Technologies',
      'p.facts.stack.value': 'Python · scikit-learn · Pandas · Vue 3 · Quasar · ECharts',
      'p.facts.scope.label': 'Périmètre',
      'p.facts.scope.value': "Ingénierie des variables, restitution des prévisions, intégration au tableau de bord",
      'p.facts.status.label': 'Statut',
      'p.facts.status.value': 'Livré — remplacé par la plateforme OptimOps',

      'p.context.title': 'Contexte',
      'p.context.body': "<p>La demande de secours n'est pas uniforme. Elle se concentre dans l'espace, dans le temps, et autour de certaines conditions — la météo en particulier déplace plusieurs catégories d'intervention de façon visible dans l'historique. Un service capable d'anticiper ce déplacement, même grossièrement, peut prépositionner ses équipes au lieu de les engager depuis là où elles se trouvent.</p><p>La prévision seule n'est pas le livrable. Une prédiction qui reste dans un carnet de calcul ne change rien : elle doit arriver là où la décision se prend.</p>",

      'p.built.title': "Ce que j'ai construit",
      'p.built.body': "<p>J'ai contribué au volet prévision — construction de variables à partir des historiques d'intervention et jointure avec les données météo, afin que le modèle apprenne la relation entre conditions et demande, à une résolution géographique plutôt qu'agrégée sur tout un territoire.</p><p>L'essentiel de ma contribution portait sur la restitution : construire les vues qui mettent les prévisions devant les opérateurs, et relier Predictops à OptimOps pour qu'une projection alimente l'interface où les décisions de couverture et de moyens se prenaient déjà.</p>",

      'p.decisions.title': 'Décisions techniques',
      'p.decisions.body': "<p><strong>Prévoir à une maille géographique, pas en moyenne territoriale.</strong> Un chiffre unique pour tout un territoire est exact et inutile : la demande se concentre, et toute la valeur de la prévision tient à savoir où. Conserver la résolution géographique a coûté en précision par maille mais a rendu le résultat exploitable.</p><p><strong>Traiter la météo comme un signal d'entrée, pas comme un cas particulier.</strong> La météo a été jointe dans la même chaîne de variables que le reste plutôt qu'ajoutée en correction séparée. Le modèle en est plus lisible, et l'ajout ultérieur d'autres signaux externes en devient direct.</p><p><strong>Intégrer plutôt qu'exister à côté.</strong> Relier Predictops à OptimOps comptait davantage que n'importe quel gain de précision : les opérateurs disposaient déjà d'un outil ouvert quotidiennement, et une prévision qui y apparaît est utilisée, contrairement à une prévision derrière une autre authentification.</p>",

      'p.outcome.title': 'Résultat',
      'p.outcome.body': "<p>Predictops a démontré que la prévision géolocalisée de la demande était viable sur l'historique opérationnel disponible, et le travail d'intégration a établi le motif qu'OptimOps a ensuite généralisé : prévisions et indicateurs partageant une même interface plutôt que vivant dans des outils séparés.</p><p>La plateforme a depuis été remplacée par OptimOps, qui en a absorbé le rôle.</p>",

      'p.nav.prev': 'Précédent : Reconnaissance multimodale des émotions',
      'p.nav.next': 'Suivant : Tableau de bord santé ARS',
    },
  },

  ars: {
    en: {
      'meta.title': 'ARS Health Dashboard — Thomas Chu',
      'meta.description': 'A proof-of-concept regional health-surveillance dashboard: emergency and hospitalisation indicators on an interactive map, built on a configurable widget architecture.',

      'p.eyebrow': 'Proof of concept · 2024',
      'p.title': 'ARS Health Dashboard',
      'p.lead': 'A proof of concept for regional health surveillance — and a deliberate test of whether the dashboard architecture built for emergency services would transfer to an entirely different domain.',

      'p.facts.role.label': 'Role',
      'p.facts.role.value': 'Full-stack — API, authentication, dashboard system',
      'p.facts.stack.label': 'Stack',
      'p.facts.stack.value': 'Python · Flask · MongoDB · JWT · Vue 3 · Quasar · Leaflet',
      'p.facts.scope.label': 'Scope',
      'p.facts.scope.value': 'Backend API, access control, map and indicator widgets, layout builder',
      'p.facts.status.label': 'Status',
      'p.facts.status.value': 'Proof of concept — not deployed to production',

      'p.context.title': 'Context',
      'p.context.body': '<p>Regional health authorities monitor indicators that behave much like operational emergency data: counts that vary by geography, by time and by population band, watched for the moment they depart from normal. The surface is different — emergency-room attendance and hospital admissions rather than vehicle dispatches — but the shape of the question is the same.</p><p>That similarity was the actual point of the project. The widget architecture built for OptimOps was a substantial investment, and an architecture is only worth what it is worth on the second problem.</p>',

      'p.built.title': 'What I built',
      'p.built.body': '<p>A Flask API backed by MongoDB, with token-based authentication, an administration layer for managing users, and transactional email for account flows. Indicator endpoints serve emergency attendance, hospital admissions and age-band breakdowns, with an external weather API joined in as a correlating signal.</p><p>On the frontend, a Vue 3 / Quasar application with Leaflet maps showing regional contours and per-area indicators, and the same three-part widget system as OptimOps: a registry of widget types and presets, per-widget data sources declaring how to fetch and transform their own payload, and a layout builder letting a user assemble a dashboard from the catalogue.</p>',

      'p.decisions.title': 'Engineering decisions',
      'p.decisions.body': '<p><strong>Port the architecture, not the code.</strong> Copying OptimOps\' implementation would have proved nothing except that copying works. Rebuilding on the same three-part pattern — registry, data sources, layout builder — against a different backend and a different domain vocabulary tested whether the <em>pattern</em> was sound, which is the only thing worth knowing.</p><p><strong>A different backend on purpose.</strong> OptimOps serves precomputed columnar files; this needed document storage and per-user state, so it uses Flask and MongoDB. Keeping the frontend architecture constant while changing the backend isolated the thing under test.</p><p><strong>Real authentication from the start.</strong> Unlike the interim role layer in OptimOps, health data justified token-based authentication and an admin layer up front, even in a proof of concept — the cost of adding it later is always higher than it looks.</p><p><strong>Stop at proof of concept.</strong> The project answered its question. Carrying it further would have meant committing to a product nobody had asked for, so it is presented as what it is.</p>',

      'p.outcome.title': 'Outcome',
      'p.outcome.body': '<p>The widget architecture transferred cleanly. Building a second dashboard on it took a fraction of the time the first had, and the friction that did appear was in domain vocabulary rather than in the pattern itself — which is the result I was hoping for.</p><p>It remains a proof of concept and was never deployed to production. Its value was the confirmation that the architecture generalises, which directly informed how the OptimOps widget system was structured afterwards.</p>',

      'p.nav.prev': 'Previous: Predictops',
      'p.nav.next': 'Back to work',
    },
    fr: {
      'meta.title': 'Tableau de bord santé ARS — Thomas Chu',
      'meta.description': "Une preuve de concept de veille sanitaire régionale : indicateurs d'urgences et d'hospitalisations sur une carte interactive, sur une architecture de composants configurables.",

      'p.eyebrow': 'Preuve de concept · 2024',
      'p.title': 'Tableau de bord santé ARS',
      'p.lead': "Une preuve de concept pour la veille sanitaire régionale — et un test délibéré : l'architecture de tableau de bord conçue pour les services de secours se transpose-t-elle à un domaine entièrement différent ?",

      'p.facts.role.label': 'Rôle',
      'p.facts.role.value': 'Full-stack — API, authentification, système de tableau de bord',
      'p.facts.stack.label': 'Technologies',
      'p.facts.stack.value': 'Python · Flask · MongoDB · JWT · Vue 3 · Quasar · Leaflet',
      'p.facts.scope.label': 'Périmètre',
      'p.facts.scope.value': "API backend, contrôle d'accès, composants carte et indicateurs, éditeur de disposition",
      'p.facts.status.label': 'Statut',
      'p.facts.status.value': 'Preuve de concept — non déployé en production',

      'p.context.title': 'Contexte',
      'p.context.body': "<p>Les agences régionales de santé suivent des indicateurs qui se comportent comme des données opérationnelles de secours : des effectifs qui varient selon la géographie, le temps et la tranche d'âge, surveillés pour le moment où ils s'écartent de la normale. La surface diffère — passages aux urgences et hospitalisations plutôt qu'engagements d'engins — mais la forme de la question est la même.</p><p>Cette similarité était le véritable objet du projet. Le registre de composants bâti pour OptimOps représentait un investissement conséquent, et une architecture ne vaut que ce qu'elle vaut sur le deuxième problème.</p>",

      'p.built.title': "Ce que j'ai construit",
      'p.built.body': "<p>Une API Flask adossée à MongoDB, avec authentification par jeton, une couche d'administration pour la gestion des comptes et l'envoi d'e-mails transactionnels. Les points d'entrée servent les passages aux urgences, les hospitalisations et les répartitions par tranche d'âge, avec une API météo externe jointe comme signal de corrélation.</p><p>Côté frontend, une application Vue 3 / Quasar avec des cartes Leaflet affichant les contours régionaux et les indicateurs par zone, et le même système de composants en trois parties qu'OptimOps : un registre des types et préréglages, des sources de données déclarant chacune comment récupérer et transformer sa charge utile, et un éditeur de disposition permettant à l'utilisateur de composer son tableau de bord à partir du catalogue.</p>",

      'p.decisions.title': 'Décisions techniques',
      'p.decisions.body': "<p><strong>Transposer l'architecture, pas le code.</strong> Copier l'implémentation d'OptimOps n'aurait prouvé que l'efficacité du copier-coller. Reconstruire sur le même motif en trois parties — registre, sources de données, éditeur de disposition — face à un autre backend et à un autre vocabulaire métier testait la solidité du <em>motif</em>, seule chose qu'il valait la peine de savoir.</p><p><strong>Un backend différent, volontairement.</strong> OptimOps sert des fichiers colonnaires précalculés ; ce projet demandait un stockage documentaire et un état par utilisateur, d'où Flask et MongoDB. Garder l'architecture frontend constante en changeant le backend isolait l'objet du test.</p><p><strong>Une vraie authentification dès le départ.</strong> Contrairement à la couche de rôles provisoire d'OptimOps, des données de santé justifiaient une authentification par jeton et une couche d'administration d'emblée, même en preuve de concept — le coût de l'ajouter plus tard est toujours plus élevé qu'il n'y paraît.</p><p><strong>S'arrêter à la preuve de concept.</strong> Le projet a répondu à sa question. Aller plus loin aurait signifié s'engager sur un produit que personne n'avait demandé : il est donc présenté pour ce qu'il est.</p>",

      'p.outcome.title': 'Résultat',
      'p.outcome.body': "<p>L'architecture de composants s'est transposée sans heurt. Construire un second tableau de bord dessus a demandé une fraction du temps du premier, et les frictions rencontrées venaient du vocabulaire métier et non du motif lui-même — c'est le résultat que j'espérais.</p><p>Le projet reste une preuve de concept et n'a jamais été déployé en production. Sa valeur tient à la confirmation que l'architecture se généralise, ce qui a directement orienté la structuration ultérieure du système de composants d'OptimOps.</p>",

      'p.nav.prev': 'Précédent : Predictops',
      'p.nav.next': 'Retour aux projets',
    },
  },
};
