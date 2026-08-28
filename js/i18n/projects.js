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
      'meta.title': 'OptimOps, Thomas Chu',
      'meta.description': 'A decision-support platform for a French fire and rescue service: coverage analysis, crew availability, regulatory compliance, scenario simulation, and the star-schema indicator engine underneath it.',

      'p.eyebrow': 'Full-stack · decision support · since 2023',
      'p.title': 'OptimOps',
      'p.lead': 'A platform that answers structural questions about a fire and rescue service: which areas are genuinely covered, which stations cannot crew a vehicle right now, and what would change if you moved one. Predictops asked what demand was coming. OptimOps asks whether the organisation can absorb it.',

      'p.facts.role.label': 'Role',
      'p.facts.role.value': 'Data scientist: data contract, computation engine, API, dashboard architecture',
      'p.facts.stack.label': 'Stack',
      'p.facts.stack.value': 'Python · FastAPI · Pandas · Parquet · pytest · Vue 3 · Quasar · ECharts · Leaflet',
      'p.facts.scope.label': 'Scope',
      'p.facts.scope.value': 'Backend, frontend, and the whole data layer between them',
      'p.facts.status.label': 'Status',
      'p.facts.status.value': 'In production, actively developed',

      'p.context.title': 'Context',
      'p.context.body': '<p>A fire and rescue service makes structural decisions constantly. Where to station a vehicle, how many crews to roster for a given night, whether a coverage gap is acceptable, whether a station still meets its regulatory targets. Those decisions used to rest on experience and on aggregate reports that took days to produce and answered exactly one question each.</p><p>The service already held years of operational history: every intervention, every vehicle dispatch, every declared availability slot. What it did not have was a way to interrogate that history fast enough to inform a decision, or to ask a hypothetical question of it at all.</p><p>The overview map is the entry point. One dot per station, coloured from "nothing to see here" to "look at this one", computed across every indicator the engine publishes.</p>',

      'p.built.title': 'What it does now',
      'p.built.body': '<p>The engine publishes 35 indicator tables covering response delays, vehicle and crew unavailability, operational load, coverage gaps, regulatory compliance and duty-hour ratios. A FastAPI backend serves them from an in-process cache loaded once at startup, one router per domain. A Vue 3 and Quasar frontend puts them in front of users.</p><p>The frontend is a widget system rather than a fixed set of pages. A registry describes every widget type and the data source it binds to, a rules layer adjusts which properties are available depending on the navigation context, and each widget declares how to fetch and transform its own data. Users assemble their own dashboards from that catalogue instead of filing a ticket for one more view.</p><p>On top of the reporting sit the heavier features: a scenario simulator that replays historical interventions against a modified configuration, and an optimizer that searches for better vehicle and staffing allocations.</p>',

      'p.coverage.title': 'Coverage, computed rather than declared',
      'p.coverage.body': '<p>Every station has its own response area, and those areas overlap. Rather than treating each one separately, the engine intersects all of them into atomic zones: the smallest pieces of territory for which the set of responsible stations is identical. A zone might be covered by one station, or jointly by seven.</p><p>That decomposition is what makes the interesting question answerable. A zone is uncovered at a given moment only when <em>every</em> station responsible for it is simultaneously unable to respond. Counting station-by-station would have either overstated the problem, by flagging a zone whenever one of its stations was busy, or understated it, by averaging the gap away.</p><p>The result is measurable in hours per year rather than as an opinion, and it is the reason the platform can say something about a station move that a spreadsheet cannot.</p>',

      'p.arming.title': 'Rules the service edits itself',
      'p.arming.body': '<p>Whether a station can respond is not a matter of counting bodies. Each vehicle type needs a specific crew: so many drivers, so many crew chiefs, so many team leaders, each backed by a qualification that proves the person can hold that role. There is a full crew mode and a degraded mode with a smaller minimum.</p><p>Those rules used to be buried in code. They are now an editable page: the service sets, per vehicle type and per role, how many people each mode requires and which qualification codes count as proof. The unavailability calculation reads that configuration directly, so a rule change is a form submission rather than a release.</p><p>From there the engine walks the timeline. At every instant it compares who was actually present and qualified against what each vehicle demands, and marks the station unavailable when nothing can leave the door.</p>',

      'p.engine.title': 'Rebuilding the engine underneath',
      'p.engine.body': '<p>The engine feeding all of this had grown organically over several years, and it became the limiting factor. Before proposing to replace it I audited it in four parts and wrote up what I found, on the theory that a rewrite argued from "the old one is messy" tends to reproduce the same mistakes in fresher syntax.</p><p>The audit was not encouraging. The data path crossed four formats between the source system and a computed value, with no stage that clearly owned validation. I catalogued around a hundred and fifty distinct transformations, among which one sweep-line pattern, walking a timeline of start and end events to compute overlap, had been independently reimplemented close to a dozen times. At least two of those copies carried documented numerical bugs. One vehicle category resolved to three different classifications depending on which module you asked. No test anywhere in the chain asserted the value of a single indicator.</p><p>The replacement is built on a star schema. Five fact tables carry the measures, at the grain they naturally occur, and they all join through two hubs and a small set of conformed dimensions. Dimensions that change over time are versioned, and facts reference the version that was current when the event happened, so a station that moved between companies in 2024 does not silently rewrite its own history in 2022.</p><p>Inputs arrive as a typed, denormalised Parquet contract, validated at load time: a missing or malformed column stops the run instead of being quietly dropped and resurfacing weeks later as an unexplained blank in a chart. The sweep-line exists once now, tested against hand-computed values. Publication is atomic, 54 files written per run, and a run either publishes a complete set or publishes nothing. A regression harness runs the old engine as an external black box and compares output indicator by indicator, so every divergence gets explained in writing before I move on.</p>',

      'p.decisions.title': 'Engineering decisions',
      'p.decisions.body': "<p><strong>Dropping the database and the cache.</strong> The first version ran on a Dockerised MongoDB for computed results and Redis for caching, which is the reflex answer and was wrong here. The indicator tables are written once by a batch pipeline and read constantly, never updated in place, so both services were storing data that a file already stored better. Serving Parquet from an in-process cache removed two containers, a connection string, a backup policy and a whole class of stale-cache bugs. Deployment became copying a directory.</p><p><strong>Long jobs never block a request.</strong> Optimization runs take between thirty seconds and two minutes. They execute on background threads, with task state persisted to a small on-disk store so every worker process sees the same registry. The frontend submits a run and polls for status. Without that shared persistence, a poll landing on a different worker than the one holding the job would have reported it missing.</p><p><strong>Saved scenarios live on the server.</strong> Keeping them in browser storage would have made every user's scenario library invisible to their colleagues, which removes most of the point of building scenarios. A shared server-side store made the library collaborative, and a one-time migration lifted anything already saved locally into it.</p><p><strong>Access control has one honest seam.</strong> There is no identity provider yet, so the current permission layer is explicitly interim and documented as insecure by design. Role checks all funnel through a single resolver, so when a real identity provider arrives, one function changes and every route inherits it.</p><p><strong>Validate at the boundary, loudly.</strong> The original engine tolerated missing columns and unknown categories, which pushed the discovery of a data problem onto whoever noticed a strange chart three weeks later. The new one refuses to run. Being stopped at ingestion is annoying for about ten minutes; the alternative costs considerably more.</p>",

      'p.outcome.title': 'Where it stands',
      'p.outcome.body': '<p>The platform is in production and in daily use. Questions that used to need a bespoke report now take a few clicks, and users build their own views instead of queuing for one. More usefully, it changed the kind of question being asked, from what happened last year to what would happen if we changed this.</p><p>The rebuilt engine runs beside the one it replaces while the regression harness works through the indicator set, which is the intended sequence: a replacement that cannot show where it differs is not ready to replace anything. What has already changed is that every indicator now has a traceable path from a validated input to a tested transformation, which is the property the original never had.</p>',

      'p.shot.interventions': 'Monthly intervention volume by mission type, one of the 35 published indicator tables. The axis values are redacted.',
      'p.shot.overview': 'The overview map: one dot per station, coloured from quiet to hot spot across every published indicator.',
      'p.shot.coverage': 'Atomic coverage zones, coloured by how many stations are jointly responsible for each one. Place names are redacted.',
      'p.shot.arming': 'The crew requirement editor: per vehicle type, how many of each role a full or degraded response needs, and which qualification codes count.',
      'p.diagram.star': 'The indicator model: five fact tables at their natural grain, joining through two hubs to a set of conformed dimensions.',

      'p.nav.prev': 'Back to work',
      'p.nav.next': 'Next: Multimodal Emotion Recognition',
    },
    fr: {
      'meta.title': 'OptimOps, Thomas Chu',
      'meta.description': "Une plateforme d'aide à la décision pour un service d'incendie et de secours : analyse de couverture, disponibilité des équipes, conformité réglementaire, simulation de scénarios, et le moteur d'indicateurs en étoile qui alimente le tout.",

      'p.eyebrow': "Full-stack · aide à la décision · depuis 2023",
      'p.title': 'OptimOps',
      'p.lead': "Une plateforme qui répond aux questions de structure d'un service d'incendie et de secours : quels secteurs sont réellement couverts, quels centres ne peuvent pas armer un engin en ce moment, et ce que changerait le déplacement de l'un d'eux. Predictops cherchait à savoir quelle demande allait arriver. OptimOps regarde si l'organisation peut l'encaisser.",

      'p.facts.role.label': 'Rôle',
      'p.facts.role.value': "Data scientist : contrat de données, moteur de calcul, API, architecture du tableau de bord",
      'p.facts.stack.label': 'Technologies',
      'p.facts.stack.value': 'Python · FastAPI · Pandas · Parquet · pytest · Vue 3 · Quasar · ECharts · Leaflet',
      'p.facts.scope.label': 'Périmètre',
      'p.facts.scope.value': "Le backend, le frontend, et toute la couche de données entre les deux",
      'p.facts.status.label': 'Statut',
      'p.facts.status.value': 'En production, toujours en développement',

      'p.context.title': 'Le contexte',
      'p.context.body': "<p>Un service d'incendie et de secours arbitre en permanence. Où stationner un engin, combien d'équipes armer pour une nuit donnée, si un trou de couverture est acceptable, si un centre tient encore ses objectifs réglementaires. Jusque-là, ces arbitrages reposaient sur l'expérience et sur des rapports agrégés qui demandaient plusieurs jours de production et ne répondaient chacun qu'à une seule question.</p><p>Le service avait pourtant des années d'historique sous la main : chaque intervention, chaque engagement d'engin, chaque créneau de disponibilité déclaré. Ce qui manquait, c'était de quoi interroger tout ça assez vite pour que ça serve à décider. Et surtout de quoi lui poser une question au conditionnel.</p><p>La carte de synthèse sert de porte d'entrée. Un point par centre, coloré du « rien à signaler » au « celui-là, il faut le regarder », à partir de tous les indicateurs que produit le moteur.</p>",

      'p.built.title': "Ce que ça fait aujourd'hui",
      'p.built.body': "<p>Le moteur publie 35 tables d'indicateurs : délais d'intervention, indisponibilité des engins et des agents, charge opérationnelle, trous de couverture, conformité réglementaire, taux de garde. Un backend FastAPI les sert depuis un cache mémoire chargé une fois au démarrage, avec un routeur par domaine. Un frontend Vue 3 et Quasar les met devant les utilisateurs.</p><p>Ce frontend n'est pas une série de pages figées, mais un système de composants. Un registre décrit chaque type de composant et la source de données à laquelle il se branche, une couche de règles ajuste les propriétés disponibles selon le contexte, et chaque composant déclare lui-même comment récupérer et transformer ses données. Les utilisateurs montent leurs propres tableaux de bord au lieu d'ouvrir un ticket pour une vue de plus.</p><p>Au-dessus du reporting, les deux gros morceaux : un simulateur qui rejoue les interventions passées sur une configuration modifiée, et un optimiseur qui cherche de meilleures affectations d'engins et d'effectifs.</p>",

      'p.coverage.title': 'La couverture, calculée et non déclarée',
      'p.coverage.body': "<p>Chaque centre a son secteur de premier appel, et ces secteurs se recouvrent. Plutôt que de les traiter un par un, le moteur les croise tous pour en tirer des zones atomiques : les plus petits morceaux de territoire dont la liste des centres responsables est identique. Une zone peut dépendre d'un seul centre, ou de sept à la fois.</p><p>C'est ce découpage qui rend la vraie question calculable. Une zone n'est découverte à un instant donné que si <em>tous</em> les centres qui en répondent sont simultanément hors jeu. Compter centre par centre aurait soit gonflé le problème, en signalant une zone dès qu'un seul de ses centres était pris, soit noyé le trou dans une moyenne.</p><p>Résultat : la non-couverture se chiffre en heures par an au lieu de se discuter. C'est aussi ce qui permet à la plateforme de dire quelque chose d'utile sur un déplacement de centre, là où un tableur reste muet.</p>",

      'p.arming.title': "Des règles que le service modifie lui-même",
      'p.arming.body': "<p>Savoir si un centre peut partir, ce n'est pas compter des têtes. Chaque type d'engin réclame un armement précis : tant de conducteurs, tant de chefs d'agrès, tant de chefs d'équipe, chacun adossé à une qualification qui prouve que la personne peut tenir le rôle. Avec un mode complet et un mode dégradé au minimum plus bas.</p><p>Ces règles étaient enfouies dans le code. Elles sont devenues une page éditable : le service fixe lui-même, par type d'engin et par rôle, combien de personnes chaque mode exige et quels codes emploi font foi. Le calcul d'indisponibilité lit cette configuration directement, du coup changer une règle relève du formulaire et non de la mise en production.</p><p>À partir de là, le moteur parcourt la chronologie. À chaque instant, il compare qui était présent et qualifié à ce que réclame chaque engin, et déclare le centre indisponible quand plus rien ne peut sortir.</p>",

      'p.engine.title': 'Reconstruire le moteur en dessous',
      'p.engine.body': "<p>Le moteur qui alimentait tout ça avait grossi de façon organique pendant plusieurs années, au point de devenir le facteur limitant. Avant de proposer de le remplacer, je l'ai audité en quatre volets et j'ai écrit ce que j'y trouvais, parce qu'une réécriture qui s'appuie sur « l'ancien est en désordre » finit en général par refaire les mêmes erreurs dans une syntaxe plus récente.</p><p>L'audit n'a pas rassuré grand monde. Entre le système source et une valeur affichée, la donnée traversait quatre formats, sans qu'aucune étape ne porte clairement la validation. J'ai recensé environ cent cinquante transformations distinctes. Parmi elles, un même balayage temporel, celui qui parcourt des débuts et des fins d'événements pour calculer un recouvrement, avait été réécrit une dizaine de fois de façon indépendante, dont au moins deux copies avec des erreurs de calcul documentées. Une même catégorie d'engin se résolvait en trois classifications différentes selon le module interrogé. Et nulle part dans la chaîne un test ne vérifiait la valeur d'un seul indicateur.</p><p>Le remplaçant s'appuie sur un modèle en étoile. Cinq tables de faits portent les mesures, chacune au grain où elles existent vraiment, et toutes se rejoignent par deux pivots et un petit jeu de dimensions partagées. Les dimensions qui bougent dans le temps sont versionnées, et les faits pointent vers la version en vigueur au moment de l'événement : un centre qui change de compagnie en 2024 ne réécrit donc pas en silence son propre passé de 2022.</p><p>Les entrées arrivent sous forme d'un contrat Parquet typé et dénormalisé, validé au chargement. Une colonne absente ou mal formée arrête le traitement, au lieu de passer inaperçue et de ressortir trois semaines plus tard en case vide inexpliquée. Le balayage temporel n'existe plus qu'en un seul exemplaire, testé contre des valeurs calculées à la main. La publication est atomique, 54 fichiers par exécution, et un traitement publie soit tout, soit rien. Enfin, un harnais de non-régression fait tourner l'ancien moteur en boîte noire et compare les sorties indicateur par indicateur, ce qui m'oblige à expliquer chaque écart par écrit avant de passer à la suite.</p>",

      'p.decisions.title': 'Choix techniques',
      'p.decisions.body': "<p><strong>Se passer de la base et du cache.</strong> La première version tournait avec un MongoDB dockerisé pour stocker les résultats et un Redis pour le cache. C'est le réflexe habituel, et ici c'était le mauvais. Les tables d'indicateurs sont écrites une fois par un traitement par lots puis lues en permanence, jamais modifiées sur place : les deux services conservaient donc des données qu'un simple fichier gardait mieux. Servir du Parquet depuis un cache en mémoire a fait disparaître deux conteneurs, une chaîne de connexion, une politique de sauvegarde et toute une famille de bugs de cache périmé. Déployer, c'est copier un répertoire.</p><p><strong>Les traitements longs ne bloquent jamais une requête.</strong> Une optimisation prend entre trente secondes et deux minutes. Elle part sur un fil d'arrière-plan, et l'état de la tâche est écrit dans un petit magasin sur disque pour que tous les processus voient le même registre. Le frontend lance le calcul puis interroge son statut. Sans cette persistance partagée, une demande de statut qui tombe sur un autre processus que celui qui porte la tâche l'aurait déclarée introuvable.</p><p><strong>Les scénarios enregistrés vivent sur le serveur.</strong> Les garder dans le navigateur aurait rendu la bibliothèque de chacun invisible aux collègues, ce qui vide l'exercice de son intérêt. Un magasin partagé côté serveur l'a rendue collaborative, et une migration a récupéré au passage ce qui traînait en local.</p><p><strong>Le contrôle d'accès assume une couture.</strong> Il n'y a pas encore de fournisseur d'identité : la couche de permissions actuelle est provisoire et documentée comme non sécurisée par construction. Toutes les vérifications de rôle passent par un seul résolveur, si bien que le jour où un vrai fournisseur arrivera, une fonction changera et toutes les routes en hériteront.</p><p><strong>Valider à l'entrée, et bruyamment.</strong> L'ancien moteur tolérait les colonnes manquantes et les catégories inconnues, ce qui reportait la découverte du problème sur la personne qui remarquerait un graphique bizarre trois semaines plus tard. Le nouveau refuse de démarrer. Être bloqué à l'ingestion agace dix minutes ; l'autre option coûte beaucoup plus cher.</p>",

      'p.outcome.title': 'Où ça en est',
      'p.outcome.body': "<p>La plateforme est en production et sert tous les jours. Des questions qui demandaient un rapport sur mesure se règlent en quelques clics, et les utilisateurs montent leurs vues eux-mêmes au lieu de les commander. Surtout, la nature des questions a changé : on est passé de « qu'est-ce qui s'est passé l'an dernier » à « qu'est-ce que ça donnerait si on changeait ça ».</p><p>Le moteur reconstruit tourne à côté de celui qu'il remplace, le temps que le harnais parcoure tous les indicateurs. C'est voulu : un remplaçant qui ne sait pas montrer en quoi il diffère n'est pas prêt à remplacer quoi que ce soit. Ce qui a déjà changé, c'est que chaque indicateur a maintenant un chemin traçable, d'une entrée validée jusqu'à une transformation testée. C'est exactement ce qui manquait avant.</p>",

      'p.shot.interventions': "Le volume mensuel d'interventions par type de mission, l'une des 35 tables d'indicateurs publiées. Les valeurs de l'axe sont masquées.",
      'p.shot.overview': "La carte de synthèse : un point par centre, du calme au point chaud, tous indicateurs confondus.",
      'p.shot.coverage': "Les zones atomiques de couverture, colorées par le nombre de centres qui en répondent conjointement. Les noms de lieux sont masqués.",
      'p.shot.arming': "L'éditeur d'armement : par type d'engin, combien d'agents de chaque rôle exige un départ complet ou dégradé, et quels codes emploi font foi.",
      'p.diagram.star': "Le modèle d'indicateurs : cinq tables de faits à leur grain naturel, reliées par deux pivots à un jeu de dimensions partagées.",

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

      'p.nav.prev': 'Previous: OptimOps',
      'p.nav.next': 'Next: Predictops',
    },
    fr: {
      'meta.title': 'Reconnaissance multimodale des émotions, Thomas Chu',
      'meta.description': "Un stage de recherche à l'université de Portsmouth : reconnaître l'émotion sur vidéo, texte, audio et images par ajustement fin de modèles transformeurs. Ce travail a nourri un article publié.",

      'p.eyebrow': 'Stage de recherche · 2023',
      'p.title': 'Reconnaissance multimodale des émotions',
      'p.lead': "Un stage de recherche à l'université de Portsmouth, sur des modèles qui devinent un état émotionnel à partir de ce qui est disponible : ce qu'une personne a écrit, la façon dont elle l'a dit, et sa tête au moment où elle le disait.",

      'p.facts.role.label': 'Rôle',
      'p.facts.role.value': 'Stagiaire assistant de recherche',
      'p.facts.stack.label': 'Technologies',
      'p.facts.stack.value': 'Python · PyTorch · Transformers · DeBERTa · ajustement fin OpenAI · Weights & Biases',
      'p.facts.scope.label': 'Périmètre',
      'p.facts.scope.value': "Affinage de modèles, suivi d'expériences, outil de transcription en direct",
      'p.facts.status.label': 'Statut',
      'p.facts.status.value': 'Terminé en 2023 · publié en 2025',

      'p.context.title': 'Contexte',
      'p.context.body': "<p>L'équipe cherchait à repérer l'état émotionnel d'étudiants à partir d'enregistrements, avec l'idée de détecter un décrochage assez tôt pour faire quelque chose. L'émotion est un signal vraiment multimodal : le texte porte le contenu, l'audio la manière, la vidéo l'expression. Pris séparément, aucun des trois n'est fiable.</p><p>Le vrai problème n'était pas l'architecture des modèles, c'était l'itération. Les entraînements partaient, se réglaient et se comparaient à la main, sans trace. Impossible de dire si un changement avait aidé ou si l'écart n'était que du bruit.</p>",

      'p.built.title': "Ce que j'ai construit",
      'p.built.body': "<p>Je me suis occupé de la branche texte : affiner un DeBERTa sur les données annotées de l'équipe, et affiner en parallèle un modèle OpenAI comme point de comparaison, histoire de savoir ce qu'obtient un généraliste sur la même tâche sans entraînement métier.</p><p>Pour le problème d'itération, j'ai mis Weights &amp; Biases sur toutes les expériences : chaque entraînement enregistre tout seul ses hyperparamètres, ses métriques et ses artefacts. Comparer deux runs est devenu une lecture de graphique, au lieu d'un effort de mémoire.</p><p>J'ai aussi écrit un outil de transcription en direct qui capte l'audio, le transcrit au fil de l'eau et envoie chaque segment dans le modèle d'émotion. De quoi montrer la chaîne complète sur quelqu'un qui parle, et pas seulement sur un jeu de données bien rangé.</p>",

      'p.decisions.title': 'Décisions techniques',
      'p.decisions.body': "<p><strong>Tracer les expériences avant de les régler.</strong> Ce n'était pas la mission, mais sans ça aucun résultat n'était reproductible et aucune comparaison ne tenait. Commencer par là a donné du sens à toutes les mesures suivantes. C'était aussi ma première rencontre avec une dette d'outillage qui se voit dans des conclusions douteuses plutôt que dans des délais.</p><p><strong>Le modèle généraliste comme repère, pas comme rival.</strong> L'affinage OpenAI servait à chiffrer ce qu'apporte vraiment un entraînement métier. Si le modèle spécialisé ne bat pas le généraliste, autant le savoir en semaine trois qu'en semaine dix.</p><p><strong>Démontrer sur du réel.</strong> Un modèle qui ne tourne que sur un jeu de données propre et déjà découpé cache ses vraies faiblesses. Le brancher sur de l'audio en direct a fait remonter des problèmes de latence et de découpage qu'aucune évaluation hors ligne n'aurait montrés.</p>",

      'p.outcome.title': 'Résultat',
      'p.outcome.body': "<p>L'équipe s'est retrouvée avec des expériences tracées et reproductibles, un modèle texte affiné avec son point de comparaison documenté, et une chaîne qu'on pouvait montrer en direct.</p><p>La recherche a été publiée depuis. Enguerrand Boitel, le doctorant que j'assistais, a soutenu sa thèse sur le cadre MIST, qui associe DeBERTa pour le texte, un Semi-CNN pour la parole, ResNet-50 pour le visage et un 3D-CNN pour le mouvement. La branche texte sur laquelle j'ai travaillé pendant le stage utilise la même famille de modèles que celle retenue dans l'architecture publiée.</p><p>De mon côté, c'est le projet qui a déplacé mon intérêt des modèles vers tout ce qu'il y a autour. Et il n'en est jamais reparti.</p>",

      'p.paper.label': 'Publication',
      'p.paper.title': 'MIST: Multimodal emotion recognition using DeBERTa for text, Semi-CNN for speech, ResNet-50 for facial, and 3D-CNN for motion analysis',
      'p.paper.authors': 'Enguerrand Boitel, Alaa Mohasseb, Ella Haig',
      'p.paper.venue': 'Expert Systems with Applications, volume 270, janvier 2025',
      'p.paper.cta': "Lire l'article",
      'p.paper.note': "Je ne suis pas auteur de cet article. J'ai contribué à la branche texte pendant mon stage en 2023, avant que le cadre prenne sa forme finale.",

      'p.shot.sweep': "Un balayage Weights &amp; Biases : chaque ligne est un entraînement, suivi d'un hyperparamètre à l'autre, coloré par la précision atteinte.",

      'p.nav.prev': 'Précédent : OptimOps',
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
      'p.lead': "Prévoir où et quand les interventions ont des chances de tomber, pour qu'un service place ses moyens avant la demande au lieu de courir derrière.",

      'p.facts.role.label': 'Rôle',
      'p.facts.role.value': "Appui au développement, et intégration à OptimOps",
      'p.facts.stack.label': 'Technologies',
      'p.facts.stack.value': 'Python · scikit-learn · Pandas · Vue 3 · Quasar · ECharts',
      'p.facts.scope.label': 'Périmètre',
      'p.facts.scope.value': "Construction des variables, restitution des prévisions, intégration au tableau de bord",
      'p.facts.status.label': 'Statut',
      'p.facts.status.value': 'Livré · depuis remplacé par OptimOps',

      'p.context.title': 'Contexte',
      'p.context.body': "<p>La demande de secours n'a rien d'uniforme. Elle se concentre dans l'espace, dans le temps, et autour de certaines conditions. La météo, en particulier, déplace plusieurs types d'intervention de façon très visible dans l'historique. Un service qui anticipe ce déplacement, même grossièrement, peut prépositionner ses équipes plutôt que de les engager d'où elles se trouvent.</p><p>Mais la prévision seule ne suffit pas. Une prédiction qui reste dans un notebook ne change rien à rien. Il faut qu'elle arrive là où la décision se prend.</p>",

      'p.built.title': "Ce que j'ai construit",
      'p.built.body': "<p>Côté prévision, j'ai construit les variables à partir des historiques d'intervention et je les ai croisées avec la météo, pour que le modèle apprenne le lien entre conditions et demande à une maille géographique plutôt qu'en moyenne sur tout un territoire.</p><p>Mais l'essentiel de ce que j'ai fait, c'est la restitution : les vues qui mettent la prévision sous les yeux des opérateurs, et le raccordement de Predictops à OptimOps pour qu'une projection alimente l'interface où les décisions de couverture se prenaient déjà.</p>",

      'p.decisions.title': 'Décisions techniques',
      'p.decisions.body': "<p><strong>Prévoir à la maille, pas en moyenne.</strong> Un chiffre unique pour tout un territoire peut être parfaitement juste et n'apprendre strictement rien à un opérateur, puisque la demande se concentre et que tout l'intérêt est de savoir où. Garder la résolution géographique a coûté en précision par maille, mais c'est ce qui rend le résultat utilisable.</p><p><strong>La météo est un signal comme un autre.</strong> Elle a été jointe dans la même chaîne de variables que le reste, plutôt qu'ajoutée en correction à part. Le modèle est plus lisible, et ajouter un autre signal externe plus tard devient un petit chantier au lieu d'une refonte.</p><p><strong>S'intégrer plutôt que vivre à côté.</strong> Brancher Predictops sur OptimOps comptait plus que n'importe quel gain de précision. Les opérateurs avaient déjà un outil ouvert tous les jours : une prévision qui s'y affiche est consultée, une prévision derrière une deuxième authentification ne l'est pas.</p>",

      'p.outcome.title': 'Résultat',
      'p.outcome.body': "<p>Predictops a montré que la prévision géolocalisée tenait debout sur l'historique disponible. Et le travail d'intégration a posé le principe qu'OptimOps a ensuite généralisé : prévisions et indicateurs dans la même interface, plutôt que dans deux outils qui s'ignorent.</p><p>La plateforme a depuis été remplacée par OptimOps, qui en a repris le rôle.</p>",

      'p.shot.weather': "La vue météo : carte d'humidité en nid d'abeille, et à côté les vigilances en cours, celles qui font bouger la demande à court terme. Le sélecteur de département est masqué.",
      'p.shot.synthesis': "La synthèse du jour : interventions et appels prévus par tranche horaire, avec un indice de fiabilité pour chacune. La chaîne de commandement et l'écusson du client sont masqués.",

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
      'p.lead': "Une preuve de concept pour la veille sanitaire régionale, et surtout un test : l'architecture de tableau de bord conçue pour les secours tient-elle debout dans un domaine qui n'a rien à voir.",

      'p.facts.role.label': 'Rôle',
      'p.facts.role.value': 'Full-stack : API, authentification, système de tableau de bord',
      'p.facts.stack.label': 'Technologies',
      'p.facts.stack.value': 'Python · Flask · MongoDB · JWT · Vue 3 · Quasar · Leaflet',
      'p.facts.scope.label': 'Périmètre',
      'p.facts.scope.value': "API backend, contrôle d'accès, composants carte et indicateurs, éditeur de mise en page",
      'p.facts.status.label': 'Statut',
      'p.facts.status.value': 'Preuve de concept · jamais déployé en production',

      'p.context.title': 'Contexte',
      'p.context.body': "<p>Les agences régionales de santé suivent des indicateurs qui se comportent comme des données opérationnelles de secours : des volumes qui varient selon le territoire, le moment et la tranche d'âge, qu'on surveille pour repérer l'écart à la normale. Ce ne sont plus des engagements d'engins mais des passages aux urgences et des hospitalisations, seulement la question a exactement la même forme.</p><p>C'est cette ressemblance qui a motivé le projet. L'architecture de composants d'OptimOps représentait un gros investissement, et le seul moyen honnête de savoir si elle se généralisait, c'était de la pointer vers un deuxième problème.</p>",

      'p.built.title': "Ce que j'ai construit",
      'p.built.body': "<p>Une API Flask adossée à MongoDB, avec authentification par jeton, une couche d'administration pour gérer les comptes et l'envoi d'e-mails transactionnels. Les points d'entrée servent les passages aux urgences, les hospitalisations et les répartitions par tranche d'âge, plus une API météo externe branchée comme signal de corrélation.</p><p>Côté frontend, une application Vue 3 et Quasar, des cartes Leaflet pour les contours régionaux et les indicateurs par zone, et le même système de composants en trois parties qu'OptimOps : un registre des types et des préréglages, des sources de données qui déclarent chacune comment aller chercher et transformer leur contenu, et un éditeur où l'utilisateur compose son tableau de bord à partir du catalogue.</p>",

      'p.decisions.title': 'Décisions techniques',
      'p.decisions.body': "<p><strong>Transposer l'architecture, pas le code.</strong> Copier l'implémentation d'OptimOps aurait prouvé que le copier-coller marche, ce dont personne ne doutait. Refaire le même motif en trois parties sur un autre backend et un autre vocabulaire métier, ça testait la solidité du <em>motif</em>. C'était la seule question qui valait la peine.</p><p><strong>Un backend différent, exprès.</strong> OptimOps sert des fichiers colonnaires précalculés. Ici il fallait du stockage documentaire et de l'état par utilisateur, d'où Flask et MongoDB. En gardant l'architecture frontend identique et en changeant le backend, on isole ce qu'on veut tester.</p><p><strong>Une vraie authentification tout de suite.</strong> Contrairement à la couche de rôles provisoire d'OptimOps, des données de santé méritaient une authentification par jeton et une gestion des comptes dès le début, même sur une preuve de concept. Rajouter l'authentification après coup fait partie de ces chantiers qui ne sont jamais aussi petits que prévu.</p><p><strong>S'arrêter à la preuve de concept.</strong> Le projet avait répondu à sa question. Continuer, c'était s'engager sur un produit que personne n'avait demandé. Il est donc présenté pour ce qu'il est.</p>",

      'p.outcome.title': 'Résultat',
      'p.outcome.body': "<p>L'architecture s'est transposée sans accroc. Monter un second tableau de bord dessus a pris une fraction du temps qu'avait pris le premier, et les frottements venaient du vocabulaire métier, pas du motif. C'est exactement le résultat que j'espérais.</p><p>Le projet reste une preuve de concept, jamais déployée. Sa valeur, c'est d'avoir confirmé que l'architecture se généralise, ce qui a directement guidé la façon dont le système de composants d'OptimOps a été structuré ensuite.</p>",

      'p.diagram.caption': "Le motif en trois parties, refait ici sur un autre backend : un registre de types, une source de données par composant, et une mise en page que l'utilisateur assemble.",

      'p.nav.prev': 'Précédent : Predictops',
      'p.nav.next': 'Retour aux projets',
    },
  },
};
