import { p, one } from './text.js';

/**
 * Every string on this page, in both languages.
 *
 * The prose is written in blocks: break the lines wherever you like, only a
 * blank line starts a new paragraph. See ./text.js.
 */
export const music = {
  en: {
    // Browser tab and search result.
    'meta.title': one`Music, Thomas Chu`,

    'meta.description': one`
      Why "so what music are you into" is the hardest question at any dinner party, what
      melody-first composers actually do, and the seven pieces that explain it.
    `,

    // Page heading.
    'm.title': one`Music`,

    // Italic line under the title.
    'm.lead': one`
      Somebody asks what music I like and I say film scores or classical music, mostly. That
      is a lie by omission and you don't want to be that guy that says "Actually it's called
      neo-classical", especially if the classification is this wide (premature classifcation
      is the bane of the data-driven way). This is the long version, with the actual music
      playing alongside it.
    `,

    'm.party.title': one`The dinner party problem`,
    'm.party.body': p`
      There is a question that turns up at every dinner, every office lunch and every cheeky
      friendly banter, and I have never once come out of it with my dignity intact. Somebody
      asks what music I am into.

      The honest answer is not a genre. The honest answer is about forty seconds from the
      score of a film about a boy and a dragon, and explaining it properly would take nine
      minutes and a piano, by which point the other person has remembered they need to
      refill their glass.

      So I say film scores, mostly, which is a lie by omission. They say oh, like Hans
      Zimmer, and I say yes, like Hans Zimmer, which is a lie by cowardice. Everyone leaves
      happier. I go home and listen to a Korean pianist play the same eight bars four times
      in a row and feel something I have no vocabulary for.
    `,

    'm.genre.title': one`It is not a genre, it is a priority`,
    'm.genre.body': p`
      If I liked jazz I could say jazz. There would be a canon, an argument about whether
      Coltrane's late period was a mistake, and a bar somewhere full of people who also like
      jazz. Genres come with social infrastructure. You get a shelf in the record shop, a
      subreddit, and a nod from strangers.

      What I like has none of that, because what I like is not a sound. It is a decision
      that a particular kind of composer makes, and the people who make it are scattered
      across four continents and about six industries that have never spoken to one another.

      Here is the list, and I would like you to notice how deranged it looks: an American
      new-age pianist who mostly arranges Christian hymns. A Japanese composer best known
      for scoring a show about immortal gemstone people. A Hollywood animation composer with
      a Grammy and a great many dragons. An American who moved to Japan and now writes some
      of the most beautiful string music being made anywhere. Two Broadway songwriters. A
      Japanese composer who has spent thirty years writing choral music in a language she
      invented herself. And the man behind the most weaponised cue in the anime canon.

      That is not a taste. That is a ransom note assembled from seven different magazines.
      It is one thing, though. It took me years to see it, and it is this: every single one
      of them writes the melody first.
    `,

    'm.melody.title': one`Melody first`,
    'm.melody.body': p`
      Most contemporary music is built harmony outward. You establish a groove, find a chord
      loop, put something on top of it. The top line is a consequence of the structure
      underneath.

      These people work the other way round. There is a tune. It exists before the
      arrangement exists, it would survive being hummed badly by a stranger at a bus stop,
      and everything else in the piece is there to hold it, roughly the way you cup your
      hands around a small animal.

      John Powell's <em>Forbidden Friendship</em> is four minutes of a boy and a dragon
      deciding not to kill each other, and the entire cue is one melodic idea turned over
      and looked at from different angles. No development section. No cleverness. The tune
      arrives, leaves, comes back changed. It is one of the most emotionally efficient
      pieces of music written this century, and it is attached to a cartoon.

      The one in the player is a quieter piece of his, and it does exactly the same thing
      with a great deal less orchestra.
    `,

    'm.pedal.title': one`The pedal point`,
    'm.pedal.body': p`
      Evan Call does this in <em>Violet Evergarden</em>, and again in <em>Frieren</em>, with
      a device I am frankly obsessed with. He holds one note in the bass, usually the tonic,
      and lets all the harmony move above it without ever letting go of the floor.

      The result is music that floats instead of marching. It has nowhere to be. It is the
      harmonic equivalent of somebody sitting down next to you and not saying anything.
    `,

    'm.borrowed.title': one`The borrowed minor iv`,
    'm.borrowed.body': p`
      David Tolk, who I promise you nobody at any party has ever heard of, does the whole
      thing with two hands and occasionally a violin. His arrangement of <em>Be Still My
      Soul</em> pulls the single most devastating move available in tonal music, and pulls
      it about four times.

      You are in a major key. Everything is fine. Then, instead of going to the bright
      fourth chord you were expecting, he flattens its third, and for one bar the whole room
      dims. In C major that is the move from C to F minor. One note shifts by a semitone.
      One. And it produces an ache with nothing attached to it: you are not sad about
      anything in particular, you are just sad, in a way that feels like being understood.

      <em>Blessings</em>, in the player, does the same thing with a cello in the room.
    `,

    'm.sincere.title': one`The awkward part is that it is sincere`,
    'm.sincere.body': p`
      Here is the actual social difficulty, and I have stopped pretending otherwise. The
      music I love is unironic. It has no distance from itself. It is not commenting on
      anything, it is not in dialogue with anything, and it has no knowing wink built in as
      an escape hatch. It is a grown adult writing a tune whose entire purpose is to produce
      a soft, uncomplicated, deeply unfashionable feeling. Tenderness, mostly. Sometimes
      hope, which is worse.

      We do not have a good way to talk about that. If I say a piece is beautiful and it
      made me cry, the polite response is a small, kind silence. If I add that it is from an
      anime about gemstones, the silence stops being kind.

      That would be Yoshiaki Fujisawa, writing chamber music of genuine delicacy for
      <em>Land of the Lustrous</em>, a show most people would dismiss from the poster alone,
      and something close to a lullaby for <em>Mushoku Tensei</em>. Yuki Hayashi wrote
      <em>You Say Run</em>, a cue so effective it became a meme, and also scored
      <em>Haikyuu</em> with real melodic craft. Yuki Kajiura has spent three decades writing
      enormous choral music in a language she made up, which sounds like a bit until you
      hear it. And Pasek and Paul get filed under musical theatre and therefore under not
      serious, having written two of the most honest things about loneliness produced this
      decade, plus one very good song for a superhero show.

      The delivery mechanism is a cartoon. The writing is not a cartoon.
    `,

    'm.writing.title': one`So I started writing it myself`,
    'm.writing.body': p`
      I have three pieces. They are, technically, fine. They are also, and I say this with
      love for myself, profoundly boring. They sound like homework, which is what they are:
      I read the book about how to do it and then did what the book said.

      The diagnosis is that I did it backwards. I built a chord grid and draped a melody
      over the top, and you can hear that in the result. The tune does not exist
      independently. It is a byproduct. It has no life of its own, so it cannot hold
      anybody's hand.

      So now I do the embarrassing thing instead. I hum into my phone while walking. I sing
      badly in the car. I look for a shape that survives with no accompaniment at all,
      because that is the actual test. If it needs the strings to be moving, it is not a
      melody. It is a texture with ambitions.

      I want to write something small. A lead voice telling a story, soft strings
      underneath, maybe a choir doing nothing more complicated than breathing. Two or three
      instruments, nothing clever. Something that feels like a hand on your shoulder that
      you did not ask for and turn out to have needed.

      It will take years and it might not work. And when somebody at a party asks what I am
      working on, I am going to say instrumental stuff, and they are going to say oh, like
      Jacob Collier, and I am going to say yes.
    `,

    'm.player.title': one`The music itself`,
    'm.player.disclaimer': one`
      Somebody else's work in every case, played from the rightsholder's own upload and
      credited to whoever wrote it. Covers are linked, never copied here. The player loads
      only when you press play.
    `,

    'track.the-great-tree.title': one`The Great Tree`,
    'track.the-great-tree.credit': one`John Powell`,

    'track.never-coming-back.title': one`Never Coming Back`,
    'track.never-coming-back.credit': one`Evan Call`,

    'track.blessings.title': one`Blessings`,
    'track.blessings.credit': one`David Tolk, with Steven Sharp Nelson on cello`,

    'track.gift-from-roxy.title': one`A Gift from Roxy`,
    'track.gift-from-roxy.credit': one`Yoshiaki Fujisawa`,

    'track.above.title': one`Above`,
    'track.above.credit': one`Yuki Hayashi and Asami Tachibana`,

    'track.you-will-be-found.title': one`You Will Be Found`,
    'track.you-will-be-found.credit': one`Pasek and Paul, with the original Broadway cast`,

    'track.promise.title': one`Promise`,
    'track.promise.credit': one`Yuki Kajiura, sung by FictionJunction YUUKA`,

    // Play button label.
    'player.play': one`Play`,

    // Pause button label.
    'player.pause': one`Pause`,

    // Scrub bar label.
    'player.seek': one`Seek within the track`,

    // Volume slider label.
    'player.volume': one`Volume`,

    // Button on a tracklist row.
    'player.cue': one`Hear it`,

    // Shown before the player is loaded.
    'player.consent': one`Press play to load YouTube's player.`,

    // Shown while the player loads.
    'player.loading': one`Loading the player.`,

    // Shown when a blocker stops YouTube loading.
    'player.blocked': one`YouTube did not load. A blocker is probably in the way.`,

    // Shown when YouTube will not play a track off-site.
    'player.refused': one`YouTube will not play this one outside YouTube. Open it there instead.`,

    // Shown when a track has no link yet.
    'player.empty': one`No link set for this one yet.`,

    // Prefix on the photo credit.
    'player.photo': one`Photo:`,

    'm.list.title': one`The listening list`,
    'm.list.lead': one`
      The actual people. Go and hear them properly, on something better than laptop
      speakers.
    `,
    'm.list.powell': one`Forbidden Friendship, and most of How to Train Your Dragon`,
    'm.list.call': one`Violet Evergarden, Frieren: Beyond Journey's End`,
    'm.list.tolk': one`The Woods, Autumn Road, Be Still My Soul, Blessings`,
    'm.list.fujisawa': one`Land of the Lustrous, Mushoku Tensei, The Eccentric Family`,
    'm.list.hayashi': one`You Say Run, Haikyuu, Death Parade`,
    'm.list.kajiura': one`The Case Study of Vanitas, Puella Magi Madoka Magica`,
    'm.list.pasekpaul': one`Waving Through a Window, Words Fail, Pretty Funny`,

    // Label on the hidden mark before it is a cat.
    'm.secret.dot': one`A small mark at the end of the page`,
    // Label once it has become a cat.
    'm.secret.cat': one`It is a cat now. Keep going.`,
    // Label once it is a door.
    'm.secret.open': one`Open the thing that was hidden here`,

    'm.back': one`Back to work`,
  },

  fr: {
    // Browser tab and search result.
    'meta.title': one`Musique, Thomas Chu`,

    'meta.description': one`
      Pourquoi « tu écoutes quoi comme musique » est la pire question d'un dîner, ce que
      font vraiment les compositeurs qui écrivent la mélodie d'abord, et les sept morceaux
      qui l'expliquent.
    `,

    // Page heading.
    'm.title': one`Musique`,

    // Italic line under the title.
    'm.lead': one`
      On me demande ce que j'écoute, je réponds « des musiques de film, du classique ».
      C'est un mensonge par omission. Voici la version longue, avec la vraie musique qui
      joue à côté.
    `,

    'm.party.title': one`Le problème du dîner`,
    'm.party.body': p`
      Il y a une question qui revient à chaque dîner, à chaque déjeuner d'équipe et à chaque
      discussion entre amis, et je ne m'en suis jamais sorti avec les honneurs. Quelqu'un me
      demande ce que j'écoute.

      La réponse honnête n'est pas un genre. La réponse honnête, c'est une quarantaine de
      secondes tirées de la musique d'un film sur un garçon et un dragon, et il me faudrait
      neuf minutes et un piano pour l'expliquer correctement. D'ici là, mon interlocuteur se
      sera souvenu qu'il doit resservir son verre.

      Alors je dis « des musiques de film », ce qui est un mensonge par omission. On me
      répond « ah, genre Hans Zimmer », et je dis oui, genre Hans Zimmer, ce qui est un
      mensonge par lâcheté. Tout le monde repart content. Je rentre chez moi écouter un
      pianiste coréen jouer quatre fois de suite les mêmes huit mesures, et ressentir
      quelque chose que je ne sais pas nommer.
    `,

    'm.genre.title': one`Ce n'est pas un genre, c'est une priorité`,
    'm.genre.body': p`
      Si j'aimais le jazz, je pourrais dire « le jazz ». Il y aurait un canon, une
      engueulade sur la dernière période de Coltrane, et un bar quelque part rempli de gens
      qui aiment aussi le jazz. Un genre, ça vient avec ses infrastructures sociales. On a
      droit à un rayon chez le disquaire, à un forum, et à un hochement de tête entre
      inconnus.

      Ce que j'aime n'a rien de tout ça, parce que ce n'est pas un son. C'est une décision
      que prend un certain type de compositeur, et les gens qui la prennent sont éparpillés
      sur quatre continents et dans six industries qui ne se sont jamais adressé la parole.

      Voilà la liste, et regardez à quel point elle est absurde : un pianiste new age
      américain qui arrange surtout des cantiques. Un compositeur japonais surtout connu
      pour avoir mis en musique une série sur des gemmes immortelles. Un compositeur
      d'animation hollywoodien avec un Grammy et beaucoup de dragons. Un Américain parti
      vivre au Japon qui écrit aujourd'hui parmi les plus belles musiques pour cordes qu'on
      fasse. Deux auteurs de Broadway. Une compositrice japonaise qui écrit depuis trente
      ans de la musique chorale dans une langue qu'elle a inventée elle-même. Et l'homme
      derrière le morceau le plus militarisé de tout l'anime.

      Ce n'est pas un goût, c'est une lettre de rançon découpée dans sept magazines
      différents. Sauf que c'est une seule et même chose. Il m'a fallu des années pour la
      voir : tous, sans exception, écrivent la mélodie en premier.
    `,

    'm.melody.title': one`La mélodie d'abord`,
    'm.melody.body': p`
      La plupart de la musique actuelle se construit depuis l'harmonie vers l'extérieur. On
      pose un groove, on trouve une boucle d'accords, on met quelque chose par-dessus. La
      ligne du haut est une conséquence de ce qu'il y a en dessous.

      Ces gens-là font l'inverse. Il y a un air. Il existe avant l'arrangement, il
      survivrait à un inconnu qui le fredonne mal à un arrêt de bus, et tout le reste du
      morceau est là pour le tenir, à peu près comme on referme ses mains autour d'un petit
      animal.

      « Forbidden Friendship » de John Powell, ce sont quatre minutes pendant lesquelles un
      garçon et un dragon décident de ne pas s'entretuer, et tout le morceau n'est qu'une
      seule idée mélodique retournée et regardée sous plusieurs angles. Pas de
      développement, aucune malice. L'air arrive, s'en va, revient changé. C'est l'une des
      musiques les plus efficaces émotionnellement de ce siècle, et elle est accrochée à un
      dessin animé.

      Celui du lecteur est une pièce plus calme, qui fait exactement la même chose avec
      beaucoup moins d'orchestre.
    `,

    'm.pedal.title': one`La pédale`,
    'm.pedal.body': p`
      Evan Call fait ça dans <em>Violet Evergarden</em>, puis encore dans <em>Frieren</em>,
      avec un procédé qui m'obsède. Il tient une seule note à la basse, en général la
      tonique, et laisse toute l'harmonie bouger au-dessus sans jamais lâcher le plancher.

      Le résultat, c'est une musique qui flotte au lieu de marcher. Elle n'a nulle part où
      aller. C'est l'équivalent harmonique de quelqu'un qui s'assied à côté de vous et ne
      dit rien.
    `,

    'm.borrowed.title': one`Le quatrième degré mineur emprunté`,
    'm.borrowed.body': p`
      David Tolk, dont je vous garantis que personne n'a jamais entendu parler en soirée,
      fait tout ça avec deux mains et parfois un violon. Son arrangement de « Be Still My
      Soul » sort le geste le plus dévastateur de toute la musique tonale, et le sort
      environ quatre fois.

      Vous êtes en majeur. Tout va bien. Et au lieu d'aller vers le quatrième degré lumineux
      que vous attendiez, il en baisse la tierce, et pendant une mesure toute la pièce
      s'assombrit. En do majeur, c'est le passage de do à fa mineur. Une note bouge d'un
      demi-ton. Une seule. Et ça produit un pincement sans objet : vous n'êtes triste de
      rien en particulier, vous êtes juste triste, d'une façon qui donne l'impression d'être
      compris.

      « Blessings », dans le lecteur, fait exactement pareil avec un violoncelle dans la
      pièce.
    `,

    'm.sincere.title': one`Le plus gênant, c'est que c'est sincère`,
    'm.sincere.body': p`
      Voilà la vraie difficulté sociale, et j'ai arrêté de faire semblant du contraire. La
      musique que j'aime est sans ironie. Elle ne prend aucune distance avec elle-même. Elle
      ne commente rien, elle ne dialogue avec rien, et elle n'a pas de clin d'œil complice
      prévu comme porte de sortie. C'est un adulte qui écrit un air dont le seul but est de
      provoquer un sentiment doux, simple et complètement démodé. De la tendresse, le plus
      souvent. Parfois de l'espoir, ce qui est pire.

      On n'a pas de bonne façon de parler de ça. Si je dis qu'un morceau est beau et qu'il
      m'a fait pleurer, la réponse polie est un petit silence bienveillant. Si j'ajoute
      qu'il vient d'un anime sur des pierres précieuses, le silence cesse d'être
      bienveillant.

      C'est pourtant Yoshiaki Fujisawa, qui écrit une musique de chambre d'une vraie
      délicatesse pour <em>Land of the Lustrous</em>, une série que la plupart des gens
      écarteraient rien qu'en voyant l'affiche, et quelque chose qui tient de la berceuse
      pour <em>Mushoku Tensei</em>. Yuki Hayashi a écrit « You Say Run », un morceau si
      efficace qu'il est devenu un mème, et a aussi composé <em>Haikyuu</em> avec un vrai
      métier mélodique. Yuki Kajiura écrit depuis trente ans d'immenses pièces chorales dans
      une langue qu'elle a inventée, ce qui ressemble à une blague jusqu'à ce qu'on
      l'écoute. Et Pasek et Paul sont rangés dans « comédie musicale », donc dans « pas
      sérieux », alors qu'ils ont écrit deux des choses les plus honnêtes sur la solitude
      produites cette décennie, plus une très bonne chanson pour une série de super-héros.

      Le véhicule est un dessin animé. L'écriture, non.
    `,

    'm.writing.title': one`Du coup je m'y suis mis`,
    'm.writing.body': p`
      J'ai écrit trois morceaux. Techniquement, ils sont corrects. Ils sont aussi, et je le
      dis avec beaucoup d'affection pour moi-même, profondément ennuyeux. Ils sonnent comme
      un devoir, ce qui est exactement ce qu'ils sont : j'ai lu le livre qui explique
      comment faire, et j'ai fait ce que disait le livre.

      Le diagnostic, c'est que je m'y suis pris à l'envers. J'ai construit une grille
      d'accords et j'ai posé une mélodie par-dessus, et ça s'entend. L'air n'existe pas tout
      seul. C'est un sous-produit. Il n'a pas de vie propre, donc il ne peut tenir la main
      de personne.

      Alors maintenant je fais le truc gênant. Je fredonne dans mon téléphone en marchant.
      Je chante mal dans la voiture. Je cherche une forme qui tienne sans le moindre
      accompagnement, parce que c'est ça, le vrai test. S'il faut que les cordes bougent, ce
      n'est pas une mélodie. C'est une texture avec des ambitions.

      Je veux écrire quelque chose de petit. Une voix qui raconte, des cordes douces en
      dessous, peut-être un chœur qui ne fait rien de plus compliqué que respirer. Deux ou
      trois instruments, rien de malin. Quelque chose qui fasse l'effet d'une main sur
      l'épaule qu'on n'a pas demandée et dont il s'avère qu'on avait besoin.

      Ça prendra des années et ça ne marchera peut-être pas. Et quand quelqu'un me demandera
      en soirée sur quoi je travaille, je répondrai « des trucs instrumentaux », on me dira
      « ah, genre Jacob Collier », et je dirai oui.
    `,

    'm.player.title': one`La musique elle-même`,
    'm.player.disclaimer': one`
      Rien de tout ça n'est de moi : chaque morceau vient de la chaîne de son ayant droit et
      reste crédité à qui l'a écrit. Les pochettes sont liées, jamais recopiées. Le lecteur
      ne se charge qu'à la lecture.
    `,

    'track.the-great-tree.title': one`The Great Tree`,
    'track.the-great-tree.credit': one`John Powell`,

    'track.never-coming-back.title': one`Never Coming Back`,
    'track.never-coming-back.credit': one`Evan Call`,

    'track.blessings.title': one`Blessings`,
    'track.blessings.credit': one`David Tolk, avec Steven Sharp Nelson au violoncelle`,

    'track.gift-from-roxy.title': one`Un cadeau de Roxy`,
    'track.gift-from-roxy.credit': one`Yoshiaki Fujisawa`,

    'track.above.title': one`Above`,
    'track.above.credit': one`Yuki Hayashi et Asami Tachibana`,

    'track.you-will-be-found.title': one`You Will Be Found`,
    'track.you-will-be-found.credit': one`Pasek et Paul, avec la distribution originale de Broadway`,

    'track.promise.title': one`Promesse`,
    'track.promise.credit': one`Yuki Kajiura, chanté par FictionJunction YUUKA`,

    // Play button label.
    'player.play': one`Lecture`,

    // Pause button label.
    'player.pause': one`Pause`,

    // Scrub bar label.
    'player.seek': one`Se déplacer dans le morceau`,

    // Volume slider label.
    'player.volume': one`Volume`,

    // Button on a tracklist row.
    'player.cue': one`Écouter`,

    // Shown before the player is loaded.
    'player.consent': one`Appuyez sur lecture pour charger le lecteur YouTube.`,

    // Shown while the player loads.
    'player.loading': one`Chargement du lecteur.`,

    // Shown when a blocker stops YouTube loading.
    'player.blocked': one`YouTube ne s'est pas chargé. Un bloqueur doit être passé par là.`,

    // Shown when YouTube will not play a track off-site.
    'player.refused': one`
      YouTube refuse de lire ce morceau ailleurs que chez lui. Ouvrez-le là-bas.
    `,

    // Shown when a track has no link yet.
    'player.empty': one`Pas encore de lien pour celui-ci.`,

    // Prefix on the photo credit.
    'player.photo': one`Photo :`,

    'm.list.title': one`La liste d'écoute`,
    'm.list.lead': one`
      Les vrais gens. Allez les écouter correctement, sur autre chose que des haut-parleurs
      de portable.
    `,
    'm.list.powell': one`Forbidden Friendship, et l'essentiel de Dragons`,
    'm.list.call': one`Violet Evergarden, Frieren`,
    'm.list.tolk': one`The Woods, Autumn Road, Be Still My Soul, Blessings`,
    'm.list.fujisawa': one`Land of the Lustrous, Mushoku Tensei, La Famille Excentrique`,
    'm.list.hayashi': one`You Say Run, Haikyuu, Death Parade`,
    'm.list.kajiura': one`Vanitas no Carte, Madoka Magica`,
    'm.list.pasekpaul': one`Waving Through a Window, Words Fail, Pretty Funny`,

    // Label on the hidden mark before it is a cat.
    'm.secret.dot': one`Une petite marque au bas de la page`,
    // Label once it has become a cat.
    'm.secret.cat': one`C'est un chat maintenant. Continuez.`,
    // Label once it is a door.
    'm.secret.open': one`Ouvrir ce qui était caché ici`,

    'm.back': one`Retour aux projets`,
  },
};
