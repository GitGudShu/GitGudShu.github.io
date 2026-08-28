/**
 * One dictionary per project page, keyed by slug.
 *
 * Confidentiality: architecture, patterns and round-number scale are fine.
 * No client identity, no real operational figures. Screenshots are redacted by
 * tools/build-screens.py before they are published.
 */
export const projects = {
  optimops: {
    en: {
      'meta.title': 'OptimOps Neo, Thomas Chu',
      'meta.description': 'A full-stack decision-support platform for a French fire and rescue service: coverage analysis, scenario simulation, resource optimization, and the indicator engine underneath it.',

      'p.eyebrow': 'Full-stack · decision support · since 2023',
      'p.title': 'OptimOps Neo',
      'p.lead': "A platform that lets a fire and rescue service ask what would happen if it moved a vehicle, changed a shift pattern, or lost a station for a day, and get an answer grounded in its own operational history rather than in someone's intuition.",

      'p.facts.role.label': 'Role',
      'p.facts.role.value': 'Data scientist: data contract, computation engine, API, dashboard architecture',
      'p.facts.stack.label': 'Stack',
      'p.facts.stack.value': 'Python · FastAPI · Pandas · Parquet · pytest · Vue 3 · Quasar · ECharts · Leaflet',
      'p.facts.scope.label': 'Scope',
      'p.facts.scope.value': 'Backend, frontend, and the whole data layer between them',
      'p.facts.status.label': 'Status',
      'p.facts.status.value': 'In production, actively developed',

      'p.context.title': 'Context',
      'p.context.body': '<p>A fire and rescue service makes resource decisions constantly. Where to station a vehicle, how many crews to roster for a given night, whether a coverage gap is acceptable. Those decisions used to be made on experience and on aggregate reports that took days to produce and answered exactly one question each.</p><p>The service already held years of operational history: every intervention, every vehicle dispatch, every availability window. What it did not have was a way to interrogate that history fast enough for it to inform a decision, or to ask a hypothetical question of it at all.</p>',

      'p.built.title': 'What I built',
      'p.built.body': '<p>A platform in three layers. A computation layer turns raw operational tables into roughly three dozen indicator tables covering response delays, vehicle unavailability, operational load, coverage gaps and regulatory compliance. A FastAPI backend serves those tables from an in-process cache loaded once at startup, with one router per domain. A Vue 3 and Quasar frontend puts them in front of users.</p><p>On top of the reporting sit the two heavier features: a scenario simulator that replays historical interventions against a modified configuration, and an optimizer that searches for better vehicle and staffing allocations.</p>',

      'p.dashboard.title': 'A dashboard people build themselves',
      'p.dashboard.body': '<p>The frontend is not a fixed set of pages. It is a widget system: a registry describes every available widget type and the data source it binds to, a rules layer adjusts which properties are available depending on the navigation context, and each widget declares how to fetch and transform its own data.</p><p>Users compose their own dashboards from that catalogue instead of filing a ticket and waiting for a developer to build one more view. That last part was the actual goal. The reporting backlog before this was mostly requests for small variations on views that already existed.</p>',

      'p.engine.title': 'Rebuilding the engine underneath',
      'p.engine.body': '<p>The indicator engine feeding all of this had grown organically over several years, and by 2025 it was the limiting factor. Before proposing to replace it I audited it in four parts and wrote up what I found, on the theory that a rewrite argued from "the old one is messy" tends to reproduce the same mistakes in fresher syntax.</p><p>The audit was not encouraging. The data path crossed four formats between the source system and a computed value, with no stage that clearly owned validation. I catalogued around a hundred and fifty distinct transformations, among which one sweep-line pattern, walking a timeline of start and end events to compute overlap, had been independently reimplemented close to a dozen times. At least two of those copies carried documented numerical bugs. One vehicle category resolved to three different classifications depending on which module you asked. Several reference tables had no traceable provenance. No test anywhere in the chain asserted the value of a single indicator.</p><p>The replacement has a deliberately shorter data path. Inputs arrive as a typed, denormalised Parquet contract and are validated at load time, so a missing or malformed column stops the run instead of being quietly dropped and resurfacing weeks later as an unexplained blank in a chart. The core is a star schema, one fact table per grain with shared dimensions, so the indicators are queries over a common model rather than three dozen bespoke pipelines. The sweep-line logic exists once now, tested against hand-computed values. Publication is atomic: a run either writes a complete, consistent set of outputs or writes nothing.</p><p>A regression harness runs the old engine as an external black box and compares its output against the new one, indicator by indicator. Every divergence is either a bug I introduced or a bug I fixed, and the harness makes me write down which before moving on.</p>',

      'p.decisions.title': 'Engineering decisions',
      'p.decisions.body': "<p><strong>Columnar files instead of a database for reads.</strong> The indicator tables are written once by a batch pipeline and read constantly, never updated in place. Serving them as Parquet, loaded into an in-process cache at startup, removed an entire service from the deployment. No database to provision, tune, back up or keep in sync. Deployment became copying a directory.</p><p><strong>Long jobs never block a request.</strong> Optimization runs take between thirty seconds and two minutes. They execute on background threads, with task state persisted to a small on-disk store so every worker process sees the same registry. The frontend submits a run and polls for status. Without that shared persistence, a poll landing on a different worker than the one holding the job would have reported it missing.</p><p><strong>Saved scenarios live on the server.</strong> Keeping them in browser storage would have made every user's scenario library invisible to their colleagues, which removes most of the point of building scenarios. A shared server-side store made the library collaborative, and a one-time migration lifted anything already saved locally into it.</p><p><strong>Access control has one honest seam.</strong> There is no identity provider yet, so the current permission layer is explicitly interim and documented as insecure by design. Role checks all funnel through a single resolver, so when a real identity provider arrives, one function changes and every route inherits it. Scattering ad-hoc checks around the codebase and calling it security would have been harder to remove later than it was to write.</p><p><strong>Validate at the boundary, loudly.</strong> The original engine tolerated missing columns and unknown categories, which pushed the discovery of a data problem onto whoever noticed a strange chart three weeks later. The new one refuses to run. Being stopped at ingestion is annoying for about ten minutes; the alternative costs considerably more.</p>",

      'p.outcome.title': 'Where it stands',
      'p.outcome.body': '<p>Questions that used to need a bespoke report now take a few clicks, and users build their own views instead of queuing for one. More usefully, the platform changed the kind of question being asked, from what happened last year to what would happen if we changed this.</p><p>The new engine is not yet the one in production. It runs beside the existing one while the regression harness works through the indicator set, which is the intended sequence: a replacement that cannot show where it differs is not ready to replace anything. What has already changed is that every indicator now has a traceable path from a validated input to a tested transformation, which is the property the original system never had.</p>',

      'p.shot.coverage': 'Coverage view: response areas on the left, load ratio per station on the right. Station names and the department are redacted.',
      'p.shot.charts': 'Monthly resource load per station, switchable between chart and table. Station names are redacted.',
      'p.shot.model': 'The relational model behind the indicator engine: interventions, dispatches, vehicles, crews and availability.',

      'p.nav.prev': 'Back to work',
      'p.nav.next': 'Next: Multimodal Emotion Recognition',
    },
    fr: {
      'meta.title': 'OptimOps Neo, Thomas Chu',
      'meta.description': "Une plateforme full-stack d'aide à la décision pour un service d'incendie et de secours français : analyse de couverture, simulation de scénarios, optimisation des ressources, et le moteur d'indicateurs sous-jacent.",

      'p.eyebrow': "Full-stack · aide à la décision · depuis 2023",
      'p.title': 'OptimOps Neo',
      'p.lead': "Une plateforme qui permet à un service d'incendie et de secours de savoir ce qui se passerait s'il déplaçait un engin, modifiait un régime de garde ou perdait un centre pendant une journée, avec une réponse fondée sur son propre historique opérationnel plutôt que sur l'intuition de quelqu'un.",

      'p.facts.role.label': 'Rôle',
      'p.facts.role.value': "Data scientist : contrat de données, moteur de calcul, API, architecture du tableau de bord",
      'p.facts.stack.label': 'Technologies',
      'p.facts.stack.value': 'Python · FastAPI · Pandas · Parquet · pytest · Vue 3 · Quasar · ECharts · Leaflet',
      'p.facts.scope.label': 'Périmètre',
      'p.facts.scope.value': "Backend, frontend, et toute la couche de données entre les deux",
      'p.facts.status.label': 'Statut',
      'p.facts.status.value': 'En production, développement actif',

      'p.context.title': 'Contexte',
      'p.context.body': "<p>Un service d'incendie et de secours arbitre en permanence. Où stationner un engin, combien d'équipes armer pour une nuit donnée, si un défaut de couverture est acceptable. Ces décisions se prenaient sur l'expérience et sur des rapports agrégés qui demandaient plusieurs jours de production et répondaient à exactement une question chacun.</p><p>Le service disposait déjà de plusieurs années d'historique opérationnel : chaque intervention, chaque engagement d'engin, chaque fenêtre de disponibilité. Ce qui manquait, c'était un moyen d'interroger cet historique assez vite pour éclairer une décision, et surtout de lui poser une question hypothétique.</p>",

      'p.built.title': "Ce que j'ai construit",
      'p.built.body': "<p>Une plateforme en trois couches. Une couche de calcul transforme les tables opérationnelles brutes en une trentaine de tables d'indicateurs : délais d'intervention, indisponibilité des engins, charge opérationnelle, défauts de couverture et conformité réglementaire. Un backend FastAPI sert ces tables depuis un cache en mémoire chargé une fois au démarrage, avec un routeur par domaine. Un frontend Vue 3 et Quasar les met devant les utilisateurs.</p><p>Au-dessus du reporting, les deux fonctionnalités les plus lourdes : un simulateur qui rejoue les interventions historiques sur une configuration modifiée, et un optimiseur qui recherche de meilleures affectations d'engins et d'effectifs.</p>",

      'p.dashboard.title': 'Un tableau de bord que les utilisateurs composent',
      'p.dashboard.body': "<p>Le frontend n'est pas un ensemble figé de pages. C'est un système de composants : un registre décrit chaque type de composant et la source de données à laquelle il se rattache, une couche de règles ajuste les propriétés disponibles selon le contexte de navigation, et chaque composant déclare comment récupérer et transformer ses propres données.</p><p>Les utilisateurs composent eux-mêmes leurs tableaux de bord à partir de ce catalogue, au lieu d'ouvrir un ticket et d'attendre qu'un développeur crée une vue de plus. C'était le véritable objectif : la file d'attente du reporting était surtout faite de demandes de petites variations sur des vues qui existaient déjà.</p>",

      'p.engine.title': 'Reconstruire le moteur sous-jacent',
      'p.engine.body': "<p>Le moteur d'indicateurs qui alimentait tout cela avait grandi de façon organique sur plusieurs années, et en 2025 il était devenu le facteur limitant. Avant de proposer de le remplacer, je l'ai audité en quatre volets et j'ai consigné mes constats, parce qu'une réécriture argumentée par « l'ancien est en désordre » a tendance à reproduire les mêmes erreurs dans une syntaxe plus récente.</p><p>L'audit n'était pas encourageant. Le chemin de données traversait quatre formats entre le système source et une valeur calculée, sans étape qui porte clairement la validation. J'ai recensé environ cent cinquante transformations distinctes, parmi lesquelles un même motif de balayage temporel, parcourir une chronologie d'événements de début et de fin pour calculer un recouvrement, avait été réimplémenté indépendamment près d'une dizaine de fois. Au moins deux de ces copies portaient des erreurs numériques documentées. Une même catégorie d'engin se résolvait en trois classifications différentes selon le module interrogé. Plusieurs référentiels n'avaient pas de provenance traçable. Aucun test, nulle part dans la chaîne, ne vérifiait la valeur d'un seul indicateur.</p><p>Le remplaçant a un chemin de données volontairement plus court. Les entrées arrivent sous forme d'un contrat Parquet typé et dénormalisé, validé au chargement : une colonne absente ou mal formée interrompt le traitement au lieu d'être ignorée en silence et de ressortir des semaines plus tard en case vide inexpliquée dans un graphique. Le cœur est un modèle en étoile, une table de faits par grain avec des dimensions partagées, de sorte que les indicateurs sont des requêtes sur un modèle commun plutôt qu'une trentaine de chaînes sur mesure. La logique de balayage temporel n'existe plus qu'une fois, testée contre des valeurs calculées à la main. La publication est atomique : un traitement écrit soit un ensemble complet et cohérent, soit rien.</p><p>Un harnais de non-régression exécute l'ancien moteur comme une boîte noire externe et compare ses sorties à celles du nouveau, indicateur par indicateur. Chaque écart est soit une erreur que j'ai introduite, soit une erreur que j'ai corrigée, et le harnais m'oblige à écrire laquelle avant de poursuivre.</p>",

      'p.decisions.title': 'Décisions techniques',
      'p.decisions.body': "<p><strong>Des fichiers colonnaires plutôt qu'une base de données en lecture.</strong> Les tables d'indicateurs sont écrites une fois par une chaîne par lots puis lues en permanence, jamais modifiées sur place. Les servir en Parquet, chargées dans un cache en mémoire au démarrage, a supprimé un service entier du déploiement. Plus de base à provisionner, régler, sauvegarder ou synchroniser. Déployer revient à copier un répertoire.</p><p><strong>Les traitements longs ne bloquent jamais une requête.</strong> Une optimisation prend de trente secondes à deux minutes. Elle s'exécute sur un fil d'arrière-plan, l'état de la tâche étant persisté dans un petit magasin sur disque pour que tous les processus voient le même registre. Le frontend soumet un calcul puis interroge son statut. Sans cette persistance partagée, une requête de statut arrivant sur un autre processus que celui qui porte la tâche l'aurait déclarée introuvable.</p><p><strong>Les scénarios enregistrés vivent sur le serveur.</strong> Les garder dans le navigateur aurait rendu la bibliothèque de chacun invisible à ses collègues, ce qui retire l'essentiel de l'intérêt de construire des scénarios. Un magasin partagé côté serveur l'a rendue collaborative, et une migration unique a remonté ce qui était déjà enregistré localement.</p><p><strong>Le contrôle d'accès a une seule couture assumée.</strong> Il n'existe pas encore de fournisseur d'identité : la couche de permissions actuelle est explicitement provisoire et documentée comme non sécurisée par construction. Les vérifications de rôle passent toutes par un unique résolveur, si bien que le jour où un vrai fournisseur d'identité arrivera, une seule fonction changera et toutes les routes en hériteront. Disséminer des vérifications ad hoc dans le code et appeler cela de la sécurité aurait été plus difficile à retirer ensuite qu'à écrire.</p><p><strong>Valider à la frontière, bruyamment.</strong> Le moteur d'origine tolérait les colonnes manquantes et les catégories inconnues, ce qui reportait la découverte d'un défaut de données sur la personne qui remarquerait un graphique étrange trois semaines plus tard. Le nouveau refuse de s'exécuter. Être arrêté à l'ingestion agace pendant dix minutes ; l'alternative coûte nettement plus cher.</p>",

      'p.outcome.title': 'Où en est le projet',
      'p.outcome.body': "<p>Des questions qui exigeaient un rapport sur mesure se règlent en quelques clics, et les utilisateurs construisent leurs propres vues au lieu d'en faire la demande. Plus utile encore : la plateforme a changé la nature des questions posées, de « qu'est-il arrivé l'an dernier » à « que se passerait-il si nous changions ceci ».</p><p>Le nouveau moteur n'est pas encore celui en production. Il tourne à côté de l'existant pendant que le harnais parcourt l'ensemble des indicateurs, et c'est la séquence voulue : un remplaçant incapable de montrer en quoi il diffère n'est pas prêt à remplacer quoi que ce soit. Ce qui a déjà changé, c'est que chaque indicateur dispose d'un chemin traçable, d'une entrée validée jusqu'à une transformation testée, la propriété qui manquait au système d'origine.</p>",

      'p.shot.coverage': "Vue de couverture : les secteurs à gauche, le taux de sollicitation par centre à droite. Les noms de centres et le département sont masqués.",
      'p.shot.charts': "Charge mensuelle en moyens par centre, basculable entre graphique et tableau. Les noms de centres sont masqués.",
      'p.shot.model': "Le modèle relationnel derrière le moteur d'indicateurs : interventions, engagements, engins, agents et disponibilités.",

      'p.nav.prev': 'Retour aux projets',
      'p.nav.next': 'Suivant : Reconnaissance multimodale des émotions',
    },
  },

  'emotion-recognition': {
    en: {
      'meta.title': 'Multimodal Emotion Recognition, Thomas Chu',
      'meta.description': 'A research internship at the University of Portsmouth: recognising emotion across video, text, audio and images by fine-tuning transformer models. The work fed into a published paper.',

      'p.eyebrow': 'Research internship · 2023',
      'p.title': 'Multimodal Emotion Recognition',
      'p.lead': 'A research internship at the University of Portsmouth, working on models that infer emotional state from whichever signals are available: what someone wrote, how they said it, and how they looked while saying it.',

      'p.facts.role.label': 'Role',
      'p.facts.role.value': 'Research assistant intern',
      'p.facts.stack.label': 'Stack',
      'p.facts.stack.value': 'Python · PyTorch · Transformers · DeBERTa · OpenAI fine-tuning · Weights & Biases',
      'p.facts.scope.label': 'Scope',
      'p.facts.scope.value': 'Model fine-tuning, experiment tracking, a real-time transcription tool',
      'p.facts.status.label': 'Status',
      'p.facts.status.value': 'Completed in 2023 · published in 2025',

      'p.context.title': 'Context',
      'p.context.body': '<p>The research group was studying how emotional state could be inferred from recordings of students, with the eventual aim of spotting disengagement early enough to do something about it. Emotion is a genuinely multimodal signal: text carries the content, audio carries the delivery, video carries the expression, and each of the three is unreliable on its own.</p><p>The practical problem was less about model architecture than about iteration. Runs were being launched, tuned and compared informally, which made it hard to say whether a change had helped or whether the difference was noise.</p>',

      'p.built.title': 'What I built',
      'p.built.body': "<p>I worked on the text branch, fine-tuning a DeBERTa model on the group's labelled data, and separately fine-tuned an OpenAI model as a comparison point, so the team had a reference for what a general-purpose model achieved on the same task with no domain training.</p><p>To fix the iteration problem I introduced Weights &amp; Biases across the group's experiments, with every run logging its hyperparameters, metrics and artefacts automatically. Comparing two runs became a matter of reading a chart rather than reconstructing from memory what had been changed.</p><p>I also built a live transcription tool that captured audio, transcribed it as it arrived, and pushed each segment through the emotion model, so the pipeline could be demonstrated end to end on a live speaker instead of only on a prepared dataset.</p>",

      'p.decisions.title': 'Engineering decisions',
      'p.decisions.body': '<p><strong>Track experiments before tuning them.</strong> Adding experiment tracking was not the assignment, but without it no result was reproducible and no comparison was trustworthy. Fixing that first made every subsequent measurement mean something. It was also my first encounter with infrastructure debt showing up as unreliable conclusions rather than as slow work.</p><p><strong>Fine-tune a general model as a baseline, not as a competitor.</strong> The OpenAI fine-tune existed to measure how much domain-specific training actually bought us. If a specialised model cannot beat a general one, that is worth finding out in week three rather than week ten.</p><p><strong>Demonstrate on live input.</strong> A model that only ever runs on a clean, pre-segmented dataset hides its practical failure modes. Wiring the pipeline to live audio surfaced latency and segmentation problems that offline evaluation would never have shown.</p>',

      'p.outcome.title': 'Outcome',
      'p.outcome.body': '<p>The group came away with a tracked, reproducible experiment setup, a fine-tuned text model with a documented baseline to compare against, and a pipeline that could be demonstrated live.</p><p>The wider research went on to be published. Enguerrand Boitel, the PhD researcher I was assisting, completed his doctorate on the MIST framework, which combines DeBERTa for text, a Semi-CNN for speech, ResNet-50 for facial expression and a 3D-CNN for motion. The text branch I worked on during the internship uses the same model family that ended up in the published architecture.</p><p>For me it was the project that moved my interest from models toward the systems around them, which is roughly where it has stayed.</p>',

      'p.paper.label': 'Published work',
      'p.paper.title': 'MIST: Multimodal emotion recognition using DeBERTa for text, Semi-CNN for speech, ResNet-50 for facial, and 3D-CNN for motion analysis',
      'p.paper.authors': 'Enguerrand Boitel, Alaa Mohasseb, Ella Haig',
      'p.paper.venue': 'Expert Systems with Applications, volume 270, January 2025',
      'p.paper.cta': 'Read the paper',
      'p.paper.note': 'I am not an author on this paper. I contributed to the text branch during my internship in 2023, before the framework took its final form.',

      'p.shot.sweep': 'A Weights &amp; Biases sweep: each line is one training run, traced across hyperparameters and coloured by the accuracy it reached.',

      'p.nav.prev': 'Previous: OptimOps Neo',
      'p.nav.next': 'Next: Predictops',
    },
    fr: {
      'meta.title': 'Reconnaissance multimodale des émotions, Thomas Chu',
      'meta.description': "Un stage de recherche à l'université de Portsmouth : reconnaître l'émotion sur vidéo, texte, audio et images par ajustement fin de modèles transformeurs. Ce travail a nourri un article publié.",

      'p.eyebrow': 'Stage de recherche · 2023',
      'p.title': 'Reconnaissance multimodale des émotions',
      'p.lead': "Un stage de recherche à l'université de Portsmouth, sur des modèles qui infèrent un état émotionnel à partir des signaux disponibles : ce qu'une personne a écrit, la façon dont elle l'a dit, et son expression au moment de le dire.",

      'p.facts.role.label': 'Rôle',
      'p.facts.role.value': 'Stagiaire assistant de recherche',
      'p.facts.stack.label': 'Technologies',
      'p.facts.stack.value': 'Python · PyTorch · Transformers · DeBERTa · ajustement fin OpenAI · Weights & Biases',
      'p.facts.scope.label': 'Périmètre',
      'p.facts.scope.value': "Ajustement fin de modèles, suivi d'expériences, outil de transcription en temps réel",
      'p.facts.status.label': 'Statut',
      'p.facts.status.value': 'Terminé en 2023 · publié en 2025',

      'p.context.title': 'Contexte',
      'p.context.body': "<p>L'équipe de recherche étudiait comment inférer un état émotionnel à partir d'enregistrements d'étudiants, avec pour objectif de repérer un décrochage assez tôt pour y répondre. L'émotion est un signal réellement multimodal : le texte porte le contenu, l'audio la manière, la vidéo l'expression, et aucun des trois n'est fiable isolément.</p><p>Le problème pratique tenait moins à l'architecture des modèles qu'à l'itération. Les entraînements étaient lancés, réglés et comparés de façon informelle, ce qui rendait difficile de dire si un changement avait aidé ou si l'écart relevait du bruit.</p>",

      'p.built.title': "Ce que j'ai construit",
      'p.built.body': "<p>J'ai travaillé sur la branche texte, en ajustant finement un modèle DeBERTa sur les données annotées de l'équipe, et j'ai par ailleurs ajusté un modèle OpenAI comme point de comparaison, pour que l'équipe dispose d'une référence sur ce qu'obtient un modèle généraliste sur la même tâche sans entraînement métier.</p><p>Pour régler le problème d'itération, j'ai introduit Weights &amp; Biases sur l'ensemble des expériences, chaque entraînement journalisant automatiquement ses hyperparamètres, ses métriques et ses artefacts. Comparer deux entraînements est devenu une affaire de lecture de graphique plutôt que de reconstitution de mémoire.</p><p>J'ai également développé un outil de transcription en direct qui capte l'audio, le transcrit au fil de l'eau et fait passer chaque segment dans le modèle d'émotion, afin de démontrer la chaîne de bout en bout sur un locuteur réel et non seulement sur un jeu de données préparé.</p>",

      'p.decisions.title': 'Décisions techniques',
      'p.decisions.body': "<p><strong>Tracer les expériences avant de les régler.</strong> Mettre en place le suivi d'expériences n'était pas la mission, mais sans lui aucun résultat n'était reproductible et aucune comparaison fiable. Corriger cela d'abord a donné du sens à toutes les mesures suivantes. C'était aussi ma première rencontre avec la dette d'outillage qui se manifeste par des conclusions peu fiables plutôt que par de la lenteur.</p><p><strong>Ajuster un modèle généraliste comme référence, pas comme concurrent.</strong> L'ajustement OpenAI servait à mesurer ce qu'apportait réellement un entraînement spécifique au domaine. Si un modèle spécialisé ne bat pas un généraliste, mieux vaut le découvrir en semaine trois qu'en semaine dix.</p><p><strong>Démontrer sur des entrées réelles.</strong> Un modèle qui ne tourne que sur un jeu de données propre et pré-segmenté masque ses vrais modes de défaillance. Brancher la chaîne sur de l'audio en direct a révélé des problèmes de latence et de segmentation qu'une évaluation hors ligne n'aurait jamais montrés.</p>",

      'p.outcome.title': 'Résultat',
      'p.outcome.body': "<p>L'équipe est repartie avec un dispositif d'expérimentation tracé et reproductible, un modèle texte ajusté accompagné d'une référence documentée, et une chaîne démontrable en direct.</p><p>La recherche plus large a ensuite été publiée. Enguerrand Boitel, le doctorant que j'assistais, a soutenu sa thèse sur le cadre MIST, qui combine DeBERTa pour le texte, un Semi-CNN pour la parole, ResNet-50 pour l'expression faciale et un 3D-CNN pour le mouvement. La branche texte sur laquelle j'ai travaillé pendant le stage repose sur la même famille de modèles que celle retenue dans l'architecture publiée.</p><p>Pour moi, c'est le projet qui a déplacé mon intérêt des modèles vers les systèmes qui les entourent, et il y est resté.</p>",

      'p.paper.label': 'Publication',
      'p.paper.title': 'MIST: Multimodal emotion recognition using DeBERTa for text, Semi-CNN for speech, ResNet-50 for facial, and 3D-CNN for motion analysis',
      'p.paper.authors': 'Enguerrand Boitel, Alaa Mohasseb, Ella Haig',
      'p.paper.venue': 'Expert Systems with Applications, volume 270, janvier 2025',
      'p.paper.cta': "Lire l'article",
      'p.paper.note': "Je ne suis pas auteur de cet article. J'ai contribué à la branche texte pendant mon stage en 2023, avant que le cadre ne prenne sa forme définitive.",

      'p.shot.sweep': "Un balayage Weights &amp; Biases : chaque ligne est un entraînement, tracé à travers les hyperparamètres et coloré par la précision atteinte.",

      'p.nav.prev': 'Précédent : OptimOps Neo',
      'p.nav.next': 'Suivant : Predictops',
    },
  },

  predictops: {
    en: {
      'meta.title': 'Predictops, Thomas Chu',
      'meta.description': 'Geolocated forecasting of emergency interventions, combining historical operational data with weather signals in an operational dashboard.',

      'p.eyebrow': 'Forecasting · dataviz · 2023-2024',
      'p.title': 'Predictops',
      'p.lead': 'Forecasting where and when emergency interventions are likely to happen, so a service can position resources ahead of demand instead of reacting to it.',

      'p.facts.role.label': 'Role',
      'p.facts.role.value': 'Development support and integration with OptimOps',
      'p.facts.stack.label': 'Stack',
      'p.facts.stack.value': 'Python · scikit-learn · Pandas · Vue 3 · Quasar · ECharts',
      'p.facts.scope.label': 'Scope',
      'p.facts.scope.value': 'Feature engineering, forecast surfacing, dashboard integration',
      'p.facts.status.label': 'Status',
      'p.facts.status.value': 'Delivered · since superseded by OptimOps',

      'p.context.title': 'Context',
      'p.context.body': '<p>Emergency demand is not uniform. It clusters in space, in time, and around conditions. Weather in particular moves several categories of intervention in ways that are clearly visible in the historical record. A service that can anticipate that shift, even roughly, can pre-position crews instead of dispatching from wherever they happen to be.</p><p>The forecast on its own is not the deliverable. A prediction that lives in a notebook changes nothing. It has to arrive where the decision is actually made.</p>',

      'p.built.title': 'What I built',
      'p.built.body': '<p>I contributed to the forecasting side, assembling features from historical intervention records and joining them against weather data so the model could learn the relationship between conditions and demand, resolved geographically rather than aggregated over a whole territory.</p><p>The larger part of my contribution was surfacing. Building the views that put forecasts in front of operators, and connecting Predictops to OptimOps so a projection could feed the same interface where coverage and resource decisions were already being made.</p>',

      'p.decisions.title': 'Engineering decisions',
      'p.decisions.body': '<p><strong>Forecast at a geographic grain, not a territorial average.</strong> A single number for a whole territory can be perfectly accurate and still tell an operator nothing, because demand concentrates and the value of the forecast is in knowing where. Keeping the geographic resolution cost accuracy per cell but made the output usable.</p><p><strong>Treat weather as an input signal, not a special case.</strong> Weather was joined into the same feature pipeline as everything else rather than bolted on as a separate correction. That made the model easier to reason about, and made adding further external signals later a small job instead of a redesign.</p><p><strong>Integrate rather than stand alone.</strong> Connecting Predictops to OptimOps mattered more than any accuracy gain. Operators already had a tool they opened every day, and a forecast that appears there gets used, while one behind a separate login mostly does not.</p>',

      'p.outcome.title': 'Outcome',
      'p.outcome.body': '<p>Predictops showed that geolocated demand forecasting was viable on the available operational history, and the integration work established the pattern that OptimOps later generalised: predictions and indicators sharing one interface instead of living in separate tools.</p><p>The platform itself has since been superseded by OptimOps, which absorbed its role.</p>',

      'p.shot.weather': 'The weather view: a hex-grid humidity map beside the active warnings that drive short-term demand. The department selector is redacted.',
      'p.shot.synthesis': 'The daily synthesis: predicted interventions and calls by time of day, with a reliability score per band. The command chain and the client crest are redacted.',

      'p.nav.prev': 'Previous: Multimodal Emotion Recognition',
      'p.nav.next': 'Next: ARS Health Dashboard',
    },
    fr: {
      'meta.title': 'Predictops, Thomas Chu',
      'meta.description': "Prévision géolocalisée des interventions de secours, combinant données opérationnelles historiques et signaux météo dans un tableau de bord opérationnel.",

      'p.eyebrow': 'Prévision · dataviz · 2023-2024',
      'p.title': 'Predictops',
      'p.lead': "Prévoir où et quand les interventions de secours ont des chances de survenir, pour qu'un service puisse positionner ses moyens en amont de la demande au lieu d'y réagir.",

      'p.facts.role.label': 'Rôle',
      'p.facts.role.value': "Appui au développement et intégration avec OptimOps",
      'p.facts.stack.label': 'Technologies',
      'p.facts.stack.value': 'Python · scikit-learn · Pandas · Vue 3 · Quasar · ECharts',
      'p.facts.scope.label': 'Périmètre',
      'p.facts.scope.value': "Ingénierie des variables, restitution des prévisions, intégration au tableau de bord",
      'p.facts.status.label': 'Statut',
      'p.facts.status.value': 'Livré · depuis remplacé par OptimOps',

      'p.context.title': 'Contexte',
      'p.context.body': "<p>La demande de secours n'est pas uniforme. Elle se concentre dans l'espace, dans le temps, et autour de certaines conditions. La météo en particulier déplace plusieurs catégories d'intervention de façon nettement visible dans l'historique. Un service capable d'anticiper ce déplacement, même grossièrement, peut prépositionner ses équipes au lieu de les engager depuis là où elles se trouvent.</p><p>La prévision seule n'est pas le livrable. Une prédiction qui reste dans un carnet de calcul ne change rien. Elle doit arriver là où la décision se prend.</p>",

      'p.built.title': "Ce que j'ai construit",
      'p.built.body': "<p>J'ai contribué au volet prévision, en construisant des variables à partir des historiques d'intervention et en les joignant aux données météo pour que le modèle apprenne la relation entre conditions et demande, à une résolution géographique plutôt qu'agrégée sur tout un territoire.</p><p>L'essentiel de ma contribution portait sur la restitution. Construire les vues qui mettent les prévisions devant les opérateurs, et relier Predictops à OptimOps pour qu'une projection alimente l'interface où les décisions de couverture et de moyens se prenaient déjà.</p>",

      'p.decisions.title': 'Décisions techniques',
      'p.decisions.body': "<p><strong>Prévoir à une maille géographique, pas en moyenne territoriale.</strong> Un chiffre unique pour tout un territoire peut être parfaitement exact et n'apprendre rien à un opérateur, parce que la demande se concentre et que toute la valeur de la prévision tient à savoir où. Conserver la résolution géographique a coûté en précision par maille mais a rendu le résultat exploitable.</p><p><strong>Traiter la météo comme un signal d'entrée, pas comme un cas particulier.</strong> La météo a été jointe dans la même chaîne de variables que le reste plutôt qu'ajoutée en correction séparée. Le modèle en est plus lisible, et l'ajout ultérieur d'autres signaux externes devient un petit chantier au lieu d'une refonte.</p><p><strong>Intégrer plutôt qu'exister à côté.</strong> Relier Predictops à OptimOps comptait davantage que n'importe quel gain de précision. Les opérateurs disposaient déjà d'un outil ouvert quotidiennement, et une prévision qui y apparaît est utilisée, contrairement à une prévision derrière une autre authentification.</p>",

      'p.outcome.title': 'Résultat',
      'p.outcome.body': "<p>Predictops a montré que la prévision géolocalisée de la demande était viable sur l'historique opérationnel disponible, et le travail d'intégration a établi le motif qu'OptimOps a ensuite généralisé : prévisions et indicateurs partageant une même interface au lieu de vivre dans des outils séparés.</p><p>La plateforme a depuis été remplacée par OptimOps, qui en a absorbé le rôle.</p>",

      'p.shot.weather': "La vue météo : une carte d'humidité en nid d'abeille à côté des vigilances actives qui pilotent la demande à court terme. Le sélecteur de département est masqué.",
      'p.shot.synthesis': "La synthèse quotidienne : interventions et appels prévus par tranche horaire, avec un indice de fiabilité par tranche. La chaîne de commandement et l'écusson du client sont masqués.",

      'p.nav.prev': 'Précédent : Reconnaissance multimodale des émotions',
      'p.nav.next': 'Suivant : Tableau de bord santé ARS',
    },
  },

  ars: {
    en: {
      'meta.title': 'ARS Health Dashboard, Thomas Chu',
      'meta.description': 'A proof-of-concept regional health-surveillance dashboard: emergency and hospitalisation indicators on an interactive map, built on a configurable widget architecture.',

      'p.eyebrow': 'Proof of concept · 2024',
      'p.title': 'ARS Health Dashboard',
      'p.lead': 'A proof of concept for regional health surveillance, and a deliberate test of whether the dashboard architecture built for emergency services would survive contact with an entirely different domain.',

      'p.facts.role.label': 'Role',
      'p.facts.role.value': 'Full-stack: API, authentication, dashboard system',
      'p.facts.stack.label': 'Stack',
      'p.facts.stack.value': 'Python · Flask · MongoDB · JWT · Vue 3 · Quasar · Leaflet',
      'p.facts.scope.label': 'Scope',
      'p.facts.scope.value': 'Backend API, access control, map and indicator widgets, layout builder',
      'p.facts.status.label': 'Status',
      'p.facts.status.value': 'Proof of concept · never deployed to production',

      'p.context.title': 'Context',
      'p.context.body': '<p>Regional health authorities monitor indicators that behave a lot like operational emergency data. Counts that vary by geography, by time and by population band, watched for the moment they depart from normal. The surface is different, emergency-room attendance and hospital admissions rather than vehicle dispatches, but the shape of the question is the same.</p><p>That similarity was the actual point of the project. The widget architecture built for OptimOps was a substantial investment, and the only real way to find out whether it generalised was to point it at a second problem.</p>',

      'p.built.title': 'What I built',
      'p.built.body': '<p>A Flask API backed by MongoDB, with token-based authentication, an administration layer for managing users, and transactional email for account flows. Indicator endpoints serve emergency attendance, hospital admissions and age-band breakdowns, with an external weather API joined in as a correlating signal.</p><p>On the frontend, a Vue 3 and Quasar application with Leaflet maps showing regional contours and per-area indicators, and the same three-part widget system as OptimOps: a registry of widget types and presets, per-widget data sources declaring how to fetch and transform their own payload, and a layout builder letting a user assemble a dashboard from the catalogue.</p>',

      'p.decisions.title': 'Engineering decisions',
      'p.decisions.body': "<p><strong>Port the architecture, not the code.</strong> Copying the OptimOps implementation would have proved that copying works, which nobody doubted. Rebuilding on the same three-part pattern against a different backend and a different domain vocabulary tested whether the <em>pattern</em> held up, which was the only interesting question.</p><p><strong>A different backend on purpose.</strong> OptimOps serves precomputed columnar files. This needed document storage and per-user state, so it uses Flask and MongoDB. Keeping the frontend architecture constant while changing the backend isolated the thing being tested.</p><p><strong>Real authentication from the start.</strong> Unlike the interim role layer in OptimOps, health data justified token-based authentication and an admin layer up front, even in a proof of concept. Retrofitting auth is one of those jobs that is never as small as the estimate.</p><p><strong>Stop at proof of concept.</strong> The project answered its question. Carrying it further would have meant committing to a product nobody had asked for, so it is presented as what it is.</p>",

      'p.outcome.title': 'Outcome',
      'p.outcome.body': '<p>The widget architecture transferred cleanly. Building a second dashboard on it took a fraction of the time the first had, and the friction that did appear was in domain vocabulary rather than in the pattern itself, which is the result I was hoping for.</p><p>It remains a proof of concept and was never deployed. Its value was confirming that the architecture generalises, which directly informed how the OptimOps widget system was structured afterwards.</p>',

      'p.diagram.caption': 'The three-part widget pattern, rebuilt here against a different backend: a registry of types, per-widget data sources, and a layout the user assembles.',

      'p.nav.prev': 'Previous: Predictops',
      'p.nav.next': 'Back to work',
    },
    fr: {
      'meta.title': 'Tableau de bord santé ARS, Thomas Chu',
      'meta.description': "Une preuve de concept de veille sanitaire régionale : indicateurs d'urgences et d'hospitalisations sur une carte interactive, sur une architecture de composants configurables.",

      'p.eyebrow': 'Preuve de concept · 2024',
      'p.title': 'Tableau de bord santé ARS',
      'p.lead': "Une preuve de concept pour la veille sanitaire régionale, et un test délibéré : l'architecture de tableau de bord conçue pour les services de secours résiste-t-elle au contact d'un domaine entièrement différent.",

      'p.facts.role.label': 'Rôle',
      'p.facts.role.value': 'Full-stack : API, authentification, système de tableau de bord',
      'p.facts.stack.label': 'Technologies',
      'p.facts.stack.value': 'Python · Flask · MongoDB · JWT · Vue 3 · Quasar · Leaflet',
      'p.facts.scope.label': 'Périmètre',
      'p.facts.scope.value': "API backend, contrôle d'accès, composants carte et indicateurs, éditeur de disposition",
      'p.facts.status.label': 'Statut',
      'p.facts.status.value': 'Preuve de concept · jamais déployé en production',

      'p.context.title': 'Contexte',
      'p.context.body': "<p>Les agences régionales de santé suivent des indicateurs qui se comportent beaucoup comme des données opérationnelles de secours. Des effectifs qui varient selon la géographie, le temps et la tranche d'âge, surveillés pour le moment où ils s'écartent de la normale. La surface diffère, passages aux urgences et hospitalisations plutôt qu'engagements d'engins, mais la forme de la question est la même.</p><p>Cette similarité était le véritable objet du projet. L'architecture de composants bâtie pour OptimOps représentait un investissement conséquent, et le seul vrai moyen de savoir si elle se généralisait était de la pointer vers un deuxième problème.</p>",

      'p.built.title': "Ce que j'ai construit",
      'p.built.body': "<p>Une API Flask adossée à MongoDB, avec authentification par jeton, une couche d'administration pour la gestion des comptes et l'envoi d'e-mails transactionnels. Les points d'entrée servent les passages aux urgences, les hospitalisations et les répartitions par tranche d'âge, avec une API météo externe jointe comme signal de corrélation.</p><p>Côté frontend, une application Vue 3 et Quasar avec des cartes Leaflet affichant les contours régionaux et les indicateurs par zone, et le même système de composants en trois parties qu'OptimOps : un registre des types et préréglages, des sources de données déclarant chacune comment récupérer et transformer sa charge utile, et un éditeur de disposition permettant de composer son tableau de bord à partir du catalogue.</p>",

      'p.decisions.title': 'Décisions techniques',
      'p.decisions.body': "<p><strong>Transposer l'architecture, pas le code.</strong> Copier l'implémentation d'OptimOps aurait prouvé que le copier-coller fonctionne, ce dont personne ne doutait. Reconstruire sur le même motif en trois parties face à un autre backend et à un autre vocabulaire métier testait la solidité du <em>motif</em>, seule question intéressante.</p><p><strong>Un backend différent, volontairement.</strong> OptimOps sert des fichiers colonnaires précalculés. Ce projet demandait un stockage documentaire et un état par utilisateur, d'où Flask et MongoDB. Garder l'architecture frontend constante en changeant le backend isolait l'objet du test.</p><p><strong>Une vraie authentification dès le départ.</strong> Contrairement à la couche de rôles provisoire d'OptimOps, des données de santé justifiaient une authentification par jeton et une couche d'administration d'emblée, même en preuve de concept. Rajouter l'authentification après coup fait partie de ces chantiers qui ne sont jamais aussi petits que l'estimation.</p><p><strong>S'arrêter à la preuve de concept.</strong> Le projet a répondu à sa question. Aller plus loin aurait signifié s'engager sur un produit que personne n'avait demandé : il est donc présenté pour ce qu'il est.</p>",

      'p.outcome.title': 'Résultat',
      'p.outcome.body': "<p>L'architecture de composants s'est transposée sans heurt. Construire un second tableau de bord dessus a demandé une fraction du temps du premier, et les frictions rencontrées venaient du vocabulaire métier et non du motif lui-même, ce qui était le résultat espéré.</p><p>Le projet reste une preuve de concept et n'a jamais été déployé. Sa valeur tient à la confirmation que l'architecture se généralise, ce qui a directement orienté la structuration ultérieure du système de composants d'OptimOps.</p>",

      'p.diagram.caption': "Le motif de composants en trois parties, rebâti ici sur un autre backend : un registre de types, des sources de données par composant, et une disposition que l'utilisateur assemble.",

      'p.nav.prev': 'Précédent : Predictops',
      'p.nav.next': 'Retour aux projets',
    },
  },
};
