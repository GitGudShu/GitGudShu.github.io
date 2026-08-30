import { p, one } from './text.js';

/**
 * Every string on this page, in both languages.
 *
 * The prose is written in blocks: break the lines wherever you like, only a
 * blank line starts a new paragraph. See ./text.js.
 */
export const color = {
  en: {
    // Browser tab and search result.
    'meta.title': one`The Colour I Was Chasing`,

    'meta.description': one`
      A very long detour through Paris in 1927, a phone company engineer, a gymnast, and
      twenty-six composers, in search of one specific warm sad sound.
    `,

    // Small line above the title.
    'c.eyebrow': one`Found it. Congratulations. Nobody else will.`,

    // The one heading on the page.
    'c.title': one`The Colour I Was Chasing`,

    // Italic line under the title.
    'c.lead': one`And the extremely long way round I took to find out what it was.`,

    // Opening. The big drop-cap paragraph.
    'c.open': p`
      I have written three pieces of music. Three. They are, technically speaking, correct.
      Every note is where the theory says it should be. Nothing is wrong with them.

      They are also boring in a way that makes me want to lie down on the floor.
    `,

    // Beside the flopped-cat gif.
    'c.floor': p`
      You know that feeling when you cook something, you follow the recipe exactly, and it
      still tastes like nothing. That. I made music that tastes like nothing. The maddening
      part is that I could not tell you why, because on paper I did everything right.

      So I did what any reasonable person does at midnight, which is open forty browser
      tabs and try to reverse engineer my own taste.
    `,

    // Caption under the flopped-cat gif.
    'c.scene.floor': one`Me, structurally, for most of March.`,

    // The list of heroes.
    'c.list': p`
      My opening move was to list my heroes, and I want you to look at this list, because
      written down it looks completely deranged.

      An American new age pianist who mostly arranges Christian hymns. A Japanese anime
      composer best known for scoring a show about immortal gemstone people. A Hollywood
      animation guy with a lot of dragons. Two Broadway songwriters. An American who moved
      to Japan and now writes some of the most beautiful string music on earth. A Japanese
      composer whose most famous cue exists almost exclusively to soundtrack people punching
      each other.

      That is not a taste. That is a ransom note assembled from six different magazines.
      <span class="kao">ヽ(°〇°)ﾉ</span>

      This is exactly why I cannot answer the question at parties. Somebody says so what
      music are you into, and I have nine minutes of material and a piano I do not have with
      me, so I say film scores, and they say oh like Hans Zimmer, and I say yes, like Hans
      Zimmer, and we both move on, and something small dies inside me.
    `,

    // Melody first.
    'c.priority': p`
      The first useful thing I worked out was that this is not a genre. It is a
      <em>priority</em>. Every single person on my list writes the melody first. The tune
      exists before the arrangement exists. Everything else in the piece is there to hold
      it, the way you cup your hands around a small animal.

      My three pieces were built the other way round. I made a chord grid and draped a
      melody on top of it. The melody was a byproduct. It had no life of its own, so of
      course it could not hold anyone's hand. It was not even alive.

      Cool. Great. Diagnosed in one move. I should have gone and written something.

      Reader, I did not go and write something. Instead I spent the next several days doing
      musical archaeology, which is my favourite hobby and also the most sophisticated form
      of procrastination available to a human being. <span class="kao">(¬‿¬)</span>
    `,

    // The question: why the shared colour.
    'c.question': p`
      Here is the thing I actually wanted to know. Why do Japanese composers all seem to
      share a colour.

      Not a sound. A <em>colour</em>. This warmth, this brightness that is also sad. Soft
      strings holding up a solo voice, a flute, an oboe, a cello, a piano, telling you
      something kind. I hear it in Evan Call. I hear it in Kajiura. I hear it in Fujisawa
      and Hayashi and Ōshima and Kitamura. I assumed it was cultural, or educational, or
      something in the water in Tokyo.

      Then I found a story I am still not over.
    `,

    // Beside the gravity-experiment gif. Paris, 1927.
    'c.ikenouchi': p`
      His name was Ikenouchi Tomojirō, born 1906, son of a famous haiku poet. As a young man
      he was learning harmony from an exiled Polish musician, working through the standard
      textbooks of the era, which were all German. Riemann. Functional harmony. Roman
      numerals. The Austro-German pipeline that basically the entire world was importing at
      the time.

      He hated it. Not found it difficult. Hated it. Thought it was stiff and wrong and not
      what music was for.

      So in 1927 this twenty-one-year-old dropped out of Keio University, got on a boat to
      Marseille, took a train to Paris, and started grinding harmony exercises out of the
      Dubois and Reber treatises with the goal of getting into the Paris Conservatoire.
    `,

    // Caption under the gravity gif.
    'c.scene.glass': one`Ikenouchi Tomojirō, 1927, reviewing the German curriculum.`,

    // What France did instead.
    'c.france': p`
      He got in. First Japanese person ever admitted. Studied there, absorbed the whole
      French system, came home in 1937, and became professor of composition at Tokyo
      University of the Arts, where he proceeded to teach an enormous number of students.

      The Japanese Wikipedia article on harmony states it completely flatly, like it is not
      a wild thing to say. After Ikenouchi came back, the Paris Conservatoire method became
      dominant in Japan and it still is.

      Do you understand what this means. The reason Japanese scoring sounds the way it does
      is that one annoyed young man in the 1920s decided German homework was ugly and went
      to France instead.

      German harmony is about motion and development. Where is this going, how does it get
      there, what is the argument. French harmony is about colour and sonority. What does
      this chord <em>taste</em> like, standing still. Fauré, Debussy, Ravel. Added ninths,
      unresolved sevenths, chords chosen for flavour instead of for function. Japan imported
      the French one. That is the accent I have been hearing my whole life without knowing
      it.
    `,

    // The red textbooks.
    'c.redbooks': p`
      Then it got written down. Three volumes plus a supplement, published between 1964 and
      1967, nicknamed the red books because volume one has a red cover. Basically every
      music university in Japan taught from them for half a century. Geidai only swapped
      them out in 2015, and it was such a big deal that a national newspaper ran a headline
      about it.

      And here is the part that made me put my phone down and stare at a wall. Michiru
      Ōshima, who wrote the Honzuki no Gekokujou score, the family themes that made me feel
      like someone had put a blanket on me, studied at Kunitachi under Shimaoka Yuzuru. Who
      is the man who wrote the red books.

      I traced a feeling I got from an anime about a girl who loves books all the way back
      to a guy who was annoyed at Hugo Riemann in 1926. <span class="kao">(´；ω；\`)</span>
    `,

    // Beside the gymnast gif.
    'c.collapse': p`
      Then the whole theory falls apart, delightfully.

      Because Yuki Kajiura has no music education at all. She studied English literature.
      She worked as an engineer at NTT, the phone company, playing keyboards in a band on
      weekends. That is it. That is the entire training.

      Yuki Hayashi went to a normal university. He got into music through <strong>men's
      rhythmic gymnastics</strong>, because he was an athlete choosing background music for
      his floor routines, and then he started writing the routines' music himself, and then
      he mailed a demo tape to Hiroyuki Sawano, who also never went to conservatory.
    `,

    // Caption under the gymnast gif.
    'c.scene.gymnast': one`
      The actual origin story of the music you have heard ten thousand people get punched
      to.
    `,

    // The house party.
    'c.houseparty': p`
      And Evan Call, my beloved, is an American from California who studied film scoring at
      Berklee, moved to Japan on a <em>tourist visa</em> with no plan, got invited by his
      roommate to a party for foreigners, met a guy at that party who happened to know
      someone at Elements Garden, and that is how he ended up scoring Violet Evergarden.

      A house party. The single most beautiful string writing in modern anime exists because
      of a house party.

      So there is no school. There is no secret curriculum. What there is instead is a
      <em>shared dialect</em> that floats around above the institutions, which everybody
      swims in whether they went to conservatory or not. And a huge part of that dialect is
      one chord progression with a name.
    `,

    // Heading of the chord card.
    'c.royal.name': one`Ōdō shinkō, the royal road`,
    // Text under the four chords.
    'c.royal.body': p`
      Four chords. In C that is Fmaj7, G7, Em7, Am. Two major chords, then two minor ones.
      Brightness and sadness placed right next to each other and never reconciled.

      The killer move is that the G7 refuses to resolve home. It slips sideways to Em7
      instead. In classical harmony that trick is a special effect you deploy once,
      carefully, for a reason. In J-pop it is just the weather.

      That is the sound. That is literally the mechanical thing under the feeling I have
      been chasing for years without being able to name it.
    `,
    // Caption beside the arrow.
    'c.royal.slip': one`refuses to resolve, slips sideways`,
    // Label under Fmaj7 and G7.
    'c.royal.bright': one`bright`,
    // Label under Em7 and Am.
    'c.royal.dark': one`sad`,

    // The NHK detour.
    'c.nhk': p`
      Here is what broke my brain. That progression got its name in <strong>2008</strong>,
      from a musician posting on Niconico. Then in 2014 the producer Seiji Kameda renamed it
      the little devil progression on a music education show on NHK, comparing the shift
      from bright to dark to a heartbreak.

      On national television. To normal people. On the public broadcaster.

      France does not have that. America does not have that. There is no BBC show teaching
      the general public what a secondary dominant is. In Japan the harmonic vocabulary is
      <em>common property</em>. It has nicknames. This is why a self-taught gymnast and a
      graduate who studied under the author of the standard textbook end up sounding
      related.
    `,

    // What does not work.
    'c.dislike': p`
      And then I ruined my own theory by mentioning who I do not like.

      At some point I casually said that Joe Hisaishi does nothing for me. Neither does
      Kenji Kawai. Neither does Koichi Sugiyama. Three of the biggest names in Japanese
      scoring. Absolute titans. And I feel nothing. <span class="kao">ಠ_ಠ</span>

      I said it as a fun aside and it turned out to be the single most useful thing I said
      in the entire conversation, because look at what those three have in common. Hisaishi
      came out of American minimalism, so his tenderness is a gorgeous melody sitting on top
      of slow, mostly plain harmony, built on repetition. Kawai is textural and modal,
      drones and atmosphere, harmonically he barely moves. Sugiyama wrote Baroque pastiche,
      clean and diatonic.

      All three are <strong>harmonically slow or plain</strong>. And everyone I love is
      harmonically busy. Chords moving constantly underneath a slow melody. Secondary
      dominants everywhere. Borrowed chords. Resolutions that get deflected at the last
      possible second.

      So my taste was never Japanese. My taste is <strong>harmonic motion</strong>.
      Specifically I love hearing one sustained melody note get its entire meaning changed
      by the chords moving underneath it.
    `,

    // Setsunai.
    'c.setsunai': p`
      Which is why David Tolk never quite got me, even though on paper he should. He is
      diatonic and he <em>resolves</em>. His music is about repose. It takes you somewhere
      restful and leaves you there. What I want is the opposite. I want music that hovers
      and keeps deferring, where the tenderness comes from the deferral instead of from the
      arrival.

      Japanese has a word for that, 切ない, setsunai, and English does not, which is annoying
      and also explains a lot about why nobody understands me at parties.
    `,

    // The rounds of narrowing it down.
    'c.rounds': p`
      Then I went back to Kevin Penkin properly and decided no, actually, most of him is
      too complicated for me, it goes full Jacob Collier and my brain leaves the building.
      Except Hanezeve Caradhina, which destroyed me the first time I heard it and still
      does. And Hanezeve Caradhina is one of his <strong>simplest</strong> tracks. A short
      repeating chord loop with a gigantic wordless vocal line on top.

      So it was not density either. I do not want harmonic complexity, I want harmonic
      <em>warmth</em> under a big simple melody. Rich, not complicated. Two different axes
      and I had them stapled together.

      Then I found Adam Guettel, who is more harmonically sophisticated than Pasek and
      Paul, and I preferred Pasek and Paul, because Guettel's melodies are angular and
      speechy and Pasek and Paul's are singable. So melody actually outranks harmony for me,
      despite me confidently declaring at the start that harmony was the main thing. The
      harmony is what I <em>notice</em>. The melody is what actually gets me.

      Then Nicholas Britell, where I liked the harmony fine but wanted a lead instrument
      that was not more strings, and less of the environmental floating stuff. So
      orchestration is a hard requirement too. I need a distinctive solo voice out front.

      Every single round I got more specific and every single round the Japanese theory got
      less load-bearing.
    `,

    // Beside the tangled-string gif.
    'c.judah': p`
      Here is how the whole thing ended.

      I got recommended Amelia Warner. Listened to Mary Shelley. Fine. Listened to The
      Beautiful Game. Fine. Nothing. I was fully prepared to file her under acceptable, not
      crazy.

      And then YouTube autoplay, doing what YouTube autoplay does, threw a track called
      Ivory Coast at me and it was <em>exactly it</em>. I assumed it was Warner. It was not.
      It is a guy called Judah Earl, who is not a film composer at all. Ivory Coast is a
      single from 2020, licensed through a sync library, which means it is music written for
      filmmakers to buy. There is no film. There is no scene. There is no story. It is
      cinematic music written for <strong>nobody in particular</strong> and it has something
      like four million plays.
    `,

    // Caption under the tangled-string gif.
    'c.scene.whiteboard': one`Six days of research, one conclusion, zero new pieces of music.`,

    // Where it landed.
    'c.landing': p`
      This matters enormously to me, because I had spent the whole time worrying that I only
      love this stuff because I meet it inside anime. That I was contaminated by narrative.
      That I had no real taste, just Pavlovian conditioning from crying at cartoons.

      Nope. Ivory Coast arrived with no story attached, from a guy I had never heard of, via
      an algorithm, and it beat three scores by a professionally trained, Oscar-shortlisted
      film composer. It is the music. It was always the music.
      <span class="kao">(◕‿◕)</span>

      Look at the pattern. My three best discoveries, the ones I found myself, are almond,
      Mizusato, and now Judah Earl. All three are <strong>independent composers publishing
      straight to platforms</strong>, attached to no industry at all. Not anime. Not
      Hollywood. Not Broadway. Not the Paris Conservatoire.
    `,

    // The conclusion, before the letters.
    'c.conclusion': p`
      So here is where I actually landed, after all that.

      The colour is not Asian. The colour belongs to a certain <em>kind of person</em>.
      People who write short, emotionally direct, melodic music with no irony in it and no
      fear of being pretty. They cluster in Japan because Japan happened to build an entire
      industry that employs hundreds of them full time, and France and America did not. That
      is it. That is the whole difference. Not a national soul. Infrastructure.

      Which is, I have to say, both less romantic and much more useful, because it means the
      thing is learnable. Evan Call proved it. He picked it up in four years by hanging
      around a Tokyo studio.

      Also, and I say this with love for myself, I have now spent an enormous amount of
      effort building a beautiful map of my own taste and I have still not written a fourth
      piece. The map is finished. The map is good. The map is not music.
    `,

    // One line introducing the twenty-seven letters.
    'c.letters.intro': one`
      So before I go and be useful, here they all are, one at a time, with the exact track I
      would put in your hands.
    `,
    'c.letters.call.work': one`Song for the Beyond, from Frieren`,
    'c.letters.call.body': p`
      Everyone knows him for Violet Evergarden and now Frieren, and both are correct, but
      the one I hold onto is from Josee, the Tiger and the Fish. It is the love theme for a
      film about a disabled girl and the boy who becomes her caretaker, it runs about three
      and a half minutes which for him is enormous, and it is scored with a Hungarian
      orchestra and a Japanese pianist.

      This is the vulnerable version of him, before the whole world knew his name. It is the
      sound of somebody deciding to be gentle on purpose.
    `,
    'c.letters.fujisawa.work': one`Rail no Ue wo Hashiru Jinsei wa, from The Eccentric Family`,
    'c.letters.fujisawa.body': p`
      Not the main theme. Not the opening. The friendship theme, buried on disc two.

      The show is about immortal gemstone people, and one of them is poisonous, so she gets
      assigned the night shift alone forever so she does not hurt anybody. And Fujisawa sat
      down and wrote a piece of music about <em>that</em>.

      It is the most emotionally exposed thing on a soundtrack for a show most people would
      never click on. I will die on this hill.
    `,
    'c.letters.hayashi.work': one`Moonlit Night, from Death Parade`,
    'c.letters.hayashi.body': p`
      Yes, the You Say Run guy. Yes, the anime punching music guy. Go listen to what he did
      for the ice skating scene in Death Parade instead.

      Same man. Zero punching. Absolutely wrecked me.
    `,
    'c.letters.kajiura.work': one`Canta per me`,
    'c.letters.kajiura.body': p`
      The former phone company engineer. English literature degree. No conservatory, no
      theory teacher, nothing, just a woman who played keyboards in a band and read a lot
      and apparently absorbed Italian and Latin flavoured modal writing by osmosis and
      vibes.

      Her whole sound is layered voices singing made-up languages over harmony that never
      sits still. She invented a personal dialect and then made everybody else in the
      industry want to speak it. Start here if you have never been Kajiura'd before.

      Every time somebody tells me you need a music degree, I think about her working at
      NTT. <span class="kao">(＾▽＾)</span>
    `,
    'c.letters.oshima.work': one`Arigatou, from Honzuki no Gekokujou`,
    'c.letters.oshima.body': p`
      The music that plays when this girl who loves books is surrounded by people who love
      her back.

      She learned harmony directly from the man who wrote the standard Japanese textbook,
      and you can hear it. There is a rigour under the warmth. It is not soft because she
      does not know how to be complicated. It is soft on purpose, by someone who could
      absolutely be complicated if she wanted to, and chose not to.

      That restraint is the whole thing. That is what I want to learn.
    `,
    'c.letters.kitamura1.work': one`Soul of Cinder, from Dark Souls III`,
    'c.letters.kitamura1.body': p`
      This is the one everybody knows her for. Colossal, terrifying, a choir screaming at
      you while the last ashes of a dead world try very hard to end your life. She spent
      years being extremely good at overwhelming people, and she is still the name people
      reach for when they want to say that a soundtrack is enormous.
    `,

    'c.letters.kitamura2.work': one`Spells That Bring Happiness, from Tongari Boushi no Atelier`,
    'c.letters.kitamura2.body': p`
      And this is the same person, eighteen months later, writing tender chamber music for
      a story about a girl learning to be a witch. Play the two back to back. Nothing about
      the craft changed. Only the brief did.

      She describes herself as good at orchestra, small ensembles, folk instruments and
      non-lingual chorus, and that is not a genre list, that is a <em>colour</em> list. I
      find that unreasonably inspiring, and it is the clearest proof I have that none of
      this is a cage you get locked into.
    `,

    // Caption under the cosy-cottage gif.
    'c.scene.cottage': one`Same composer. Roughly eighteen months apart.`,

    'c.letters.haneoka.work': one`The main theme, from Kono Oto Tomare`,
    'c.letters.haneoka.body': p`
      He does something simple and it has the colour. Then he does something intricate and
      fancy in Kaguya-sama and it <em>still</em> has the colour, which proves the colour
      survives complexity, it just does not require it.

      Fun detail. He studied contemporary music at university, and in an interview he says
      the thing that helps him most today is the tonal harmony and counterpoint he learned
      <em>before</em> he got in, doing entrance exam prep. The degree taught him modernism.
      The cramming taught him how to be beautiful. I think about that constantly.
    `,
    'c.letters.nishiki.work': one`Olberic's theme, from Octopath Traveler`,
    'c.letters.nishiki.body': p`
      Tokyo College of Music, on the film and broadcast music course, so an actual formal
      media scoring pipeline exists and he went through it.

      He also writes detailed public breakdowns of his own cues, and some of them are in
      English, which is the single most generous thing a working composer in this idiom has
      ever done for someone like me. A man explaining his own harmonic decisions, for free,
      to nobody in particular. I owe him.
    `,
    'c.letters.takanashi.work': one`Omoi, from Carnival Phantasm`,
    'c.letters.takanashi.body': p`
      One of the people whose music I have absorbed through hundreds of hours of television
      without ever once looking at a credit.

      He came out of bands, not conservatories, and it shows in the best possible way. There
      is a directness there that you do not get from people who were taught to be careful.
    `,
    'c.letters.kato.work': one`Isshiki's theme, from Shokugeki no Soma`,
    'c.letters.kato.body': p`
      Same category, different hands, and he gets his own entry because lumping two
      composers together is exactly the crime I have been complaining about for two thousand
      words.

      Enormously prolific, effortlessly warm, and almost never the name anybody mentions.
      Which is its own kind of compliment: the music worked so well you never thought to ask
      who did it.
    `,
    'c.letters.penkin.work': one`Hanezeve Caradhina`,
    'c.letters.penkin.body': p`
      The only one of his I come back to, and the first one I ever heard. Made me cry
      immediately, which is embarrassing, and then made me cry again later, which is worse.

      It is a simple loop with an enormous wordless voice on top of it. That is the entire
      trick. And I have now learned that this is my <em>type</em>. Voice as the lead
      instrument, no words, no lyrics competing, just a human sound carrying the tune over
      warm strings.

      Everything else he does is too clever for me and I have made peace with that.
      <span class="kao">¯\\_(ツ)_/¯</span>
    `,
    'c.letters.shimomura.work': one`Hearts as One`,
    'c.letters.shimomura.body': p`
      I knew the melody for years before I knew her name, like a lot of people.

      Probably the most harmonically generous person in game music. Never static, never
      cold, always one more beautiful chord where a lesser composer would have stopped and
      called it finished.
    `,
    'c.letters.mayuko.work': one`Bojji's theme, from Ranking of Kings`,
    'c.letters.mayuko.body': p`
      A story about a deaf mute prince who cannot speak, which means the music has to do all
      the emotional talking for him.

      That constraint produces exactly my thing. Foreground melodies, small warm ensembles,
      short cues that actually go somewhere. Bojji's theme. The music box one. I was not
      okay.
    `,
    'c.letters.muramatsu.work': one`Mary's Theme, played live`,
    'c.letters.muramatsu.body': p`
      He scored When Marnie Was There too. He is a pianist first and it shows.

      But the reason I love Mary specifically is that a hammered dulcimer player, Joshua
      Messick, plays on <em>every single track</em> on that soundtrack. An entire film
      carried by one strange bright unusual timbre over an orchestra.

      That solved a problem I did not know I had, which is that I need a distinctive solo
      voice out front and I get restless when it is strings all the way down.
    `,
    'c.letters.yokoyama.work': one`Autumn Sonata, from Fruits Basket`,
    'c.letters.yokoyama.body': p`
      Family warmth, dense string writing, chords moving constantly under slow melodies.

      Straight down the middle of everything I want. No notes.
    `,
    'c.letters.powell.work': one`Come Say Goodbye, from The Call of the Wild`,
    'c.letters.powell.body': p`
      Everybody goes to the dragons and they are right to, but Call of the Wild is the one I
      would hand to someone.

      He scored a dog. He used banjo and fiddle and accordion and mandolin, which forced him
      out of orchestral grandeur into something small and human, and the whole score is warm
      right up until the moment it is not.

      He is also the busiest reharmoniser working in animation, which I now understand is
      exactly why he sits on my list next to a pile of anime composers. Same disease.
      <span class="kao">(¬‿¬)</span>
    `,
    'c.letters.pasekpaul.work': one`Runnin' Home to You, from The Flash`,
    'c.letters.pasekpaul.body': p`
      Everybody cites The Greatest Showman. Fine. Go find this instead.

      It is a quiet ballad about unglamorous, unnoticed maternal love, hidden inside a broad
      comedy musical about a boy who wants a BB gun. No irony. No wink. Just a grown adult
      writing something small and tender in a show nobody would think to look in.

      That is the whole ethos in one song.
    `,
    'c.letters.wallerbridge.work': one`Home, from The Boy, The Mole, The Fox and The Horse`,
    'c.letters.wallerbridge.body': p`
      This one is not an I like this. This one is a <em>this is the target</em>.

      Small chamber ensemble. Storybook. Simple beautiful tunes. Warm legible harmony. Short
      cues that go somewhere and then stop.

      If I could write one thing in my life and have it sound like this score, I would
      consider the whole hobby a success and go and get a normal life.
    `,
    'c.letters.bowers.work': one`Roz's Story, from The Wild Robot`,
    'c.letters.bowers.body': p`
      Jazz pianist scoring an animated film about a machine learning how to be a mother. On
      paper it is aimed directly at my face, and in practice it lands.

      I watched the film and did not even look at who wrote the music, which is entirely my
      own fault, and I am correcting it now, publicly, in writing.
    `,
    'c.letters.britell.work': one`If Beale Street Could Talk`,
    'c.letters.britell.body': p`
      The harmony is gorgeous. Genuinely.

      But it is mostly strings, and I found myself wishing for a different timbre to lead,
      and some of it floats a bit environmental for me when I want a melody standing up
      front and saying something.

      I like it. I do not love it. And figuring out <em>why</em> taught me more about myself
      than any of the ones I love did.
    `,
    'c.letters.coker.work': one`Light of Nibel, from Ori and the Blind Forest`,
    'c.letters.coker.body': p`
      Piano, strings, wordless voice, unashamed emotion, and absolutely no embarrassment
      about any of it.

      Video game music has been quietly doing my entire genre for twenty years and almost
      nobody outside gaming has noticed.
    `,
    'c.letters.larkin.work': one`Lace, from Hollow Knight: Silksong`,
    'c.letters.larkin.body': p`
      Four notes and a lot of empty space, and it can make a grown adult sit very still.

      It is the single strongest argument I have for the idea that restraint is a skill and
      not an absence of one.
    `,
    'c.letters.park.work': one`A Slant of Light`,
    'c.letters.park.body': p`
      Korean, indie, piano-led, soft, song-shaped. Not scoring anything, not attached to any
      story, just a person making a small beautiful thing.

      Which, in hindsight, was the first clue that this was never about anime at all.
    `,
    'c.letters.almond.work': one`My New Gear...`,
    'c.letters.almond.body': p`
      One of my two lucky finds. Someone posting drafts to the internet with no industry
      behind them at all.

      I still go back to almond's rough sketches more than most finished commercial albums I
      own. There is something about hearing an idea before it gets polished, while it is
      still slightly wrong and completely alive.
    `,
    'c.letters.mizusato.work': one`Neko no Sumu Machi, a record about Paris and cats`,
    'c.letters.mizusato.body': p`
      My other lucky find. This one went viral and I felt weirdly protective about it, like
      when a band you like gets big.

      Which is ridiculous, because I found it on TikTok like everybody else.
      <span class="kao">(´；ω；\`)</span>
    `,
    'c.letters.judah.work': one`Ivory Coast`,
    'c.letters.judah.body': p`
      And finally the one that broke the case open.

      An independent composer. No film, no anime, no narrative, no context, licensed on a
      stock music platform for filmmakers to buy. Found by an algorithm at random while I
      was busy being unimpressed by somebody else.

      And it did the thing. Immediately. No story required. Which means the last five years
      of me quietly suspecting I only love this music because of the shows it came attached
      to were wrong.

      I just like beautiful things. Turns out that was allowed the whole time.
    `,

    // Caption under the last gif.
    'c.scene.piano': one`Progress. Technically.`,

    // The close, beside the last gif.
    'c.coda': p`
      That is the list. Twenty-six people who have all, at one point or another, made me sit
      completely still in a dark room.

      What I want is to write one piece that does that to somebody else. Nothing clever.
      Nothing that proves I did the reading. Something kind and unhurried and a little too
      pretty, that somebody puts on at eleven at night without quite knowing why, the way I
      have been putting their music on for years.

      That is the whole ambition. It is not a small one and I am nowhere near it.
    `,

    // Shown when YouTube refuses to play a track off-site.
    'c.player.out': one`Listen on YouTube`,

    // Credit for the borrowed gifs.
    'c.gifs': one`
      Cats above are other people's work, from Giphy. Nothing on this page is mine except
      the words and the bad decisions.
    `,

    // The last line on the page.
    'c.wish': one`Wish me luck ;)`,

    // Label on a letter's play button.
    'c.player.play': one`Play`,
    // Shown when a letter has no link yet.
    'c.player.pending': one`No link on this one yet.`,

    // Link back to the music page.
    'c.back': one`Back to the music page`,

    // Link back to the work.
    'c.home': one`Back to work`,
  },

  fr: {
    // Browser tab and search result.
    'meta.title': one`La couleur que je cherchais`,

    'meta.description': one`
      Un très long détour par le Paris de 1927, un ingénieur télécom, un gymnaste et
      vingt-six compositeurs, à la recherche d'un son chaud et triste bien précis.
    `,

    // Small line above the title.
    'c.eyebrow': one`Trouvée. Bravo. Personne d'autre ne la trouvera.`,

    // The one heading on the page.
    'c.title': one`La couleur que je cherchais`,

    // Italic line under the title.
    'c.lead': one`Et le très long chemin que j'ai pris pour comprendre ce que c'était.`,

    // Opening. The big drop-cap paragraph.
    'c.open': p`
      J'ai écrit trois morceaux. Trois. Ils sont, techniquement parlant, corrects. Chaque
      note est là où la théorie dit qu'elle doit être. Rien ne cloche.

      Ils sont aussi ennuyeux à un point qui me donne envie de m'allonger par terre.
    `,

    // Beside the flopped-cat gif.
    'c.floor': p`
      Vous connaissez cette sensation : vous cuisinez, vous suivez la recette à la lettre,
      et ça n'a quand même le goût de rien. Voilà. J'ai fait de la musique qui a le goût de
      rien. Et le plus rageant, c'est que je n'aurais pas su dire pourquoi, puisque sur le
      papier j'avais tout fait juste.

      Alors j'ai fait ce que fait toute personne raisonnable à minuit : j'ai ouvert quarante
      onglets et tenté de désosser mes propres goûts.
    `,

    // Caption under the flopped-cat gif.
    'c.scene.floor': one`Moi, structurellement, pendant la majeure partie du mois de mars.`,

    // The list of heroes.
    'c.list': p`
      Mon premier réflexe a été de lister mes héros, et je veux que vous regardiez cette
      liste, parce qu'écrite noir sur blanc elle est complètement délirante.

      Un pianiste new age américain qui arrange surtout des cantiques. Un compositeur
      japonais surtout connu pour avoir mis en musique une série sur des gemmes immortelles.
      Un type de l'animation hollywoodienne avec beaucoup de dragons. Deux auteurs de
      Broadway. Un Américain parti vivre au Japon qui écrit aujourd'hui parmi les plus
      belles musiques pour cordes de la planète. Un compositeur japonais dont le morceau le
      plus célèbre ne sert quasiment qu'à accompagner des gens qui se mettent des coups de
      poing.

      Ce n'est pas un goût. C'est une lettre de rançon découpée dans six magazines
      différents. <span class="kao">ヽ(°〇°)ﾉ</span>

      C'est exactement pour ça que je n'arrive pas à répondre en soirée. Quelqu'un demande
      ce que j'écoute, j'ai neuf minutes d'argumentaire et un piano que je n'ai pas sur moi,
      alors je dis « des musiques de film », on me répond « ah, genre Hans Zimmer », je dis
      oui genre Hans Zimmer, on passe à autre chose, et quelque chose de petit meurt en moi.
    `,

    // Melody first.
    'c.priority': p`
      La première chose utile que j'ai comprise, c'est que ce n'est pas un genre. C'est une
      <em>priorité</em>. Toutes les personnes de ma liste écrivent la mélodie en premier.
      L'air existe avant l'arrangement. Tout le reste du morceau est là pour le tenir, comme
      on referme ses mains autour d'un petit animal.

      Mes trois morceaux étaient construits à l'envers. J'avais fait une grille d'accords et
      drapé une mélodie dessus. La mélodie était un sous-produit. Elle n'avait aucune vie
      propre, donc évidemment elle ne pouvait tenir la main de personne. Elle n'était même
      pas vivante.

      Super. Génial. Diagnostiqué en un coup. J'aurais dû aller écrire quelque chose.

      Cher lecteur, je ne suis pas allé écrire quelque chose. J'ai passé les jours suivants
      à faire de l'archéologie musicale, mon loisir préféré et accessoirement la forme de
      procrastination la plus sophistiquée accessible à un être humain.
      <span class="kao">(¬‿¬)</span>
    `,

    // The question: why the shared colour.
    'c.question': p`
      Voilà ce que je voulais vraiment savoir. Pourquoi les compositeurs japonais
      semblent-ils tous partager une couleur.

      Pas un son. Une <em>couleur</em>. Cette chaleur, cette clarté qui est aussi triste.
      Des cordes douces qui portent une voix seule, une flûte, un hautbois, un violoncelle,
      un piano, en train de vous dire quelque chose de gentil. Je l'entends chez Evan Call.
      Je l'entends chez Kajiura. Chez Fujisawa, Hayashi, Ōshima, Kitamura. Je supposais que
      c'était culturel, ou scolaire, ou quelque chose dans l'eau de Tokyo.

      Et je suis tombé sur une histoire dont je ne me suis toujours pas remis.
    `,

    // Beside the gravity-experiment gif. Paris, 1927.
    'c.ikenouchi': p`
      Il s'appelait Ikenouchi Tomojirō, né en 1906, fils d'un poète de haïku célèbre. Jeune
      homme, il apprenait l'harmonie auprès d'un musicien polonais en exil, en travaillant
      les manuels standards de l'époque, tous allemands. Riemann. L'harmonie fonctionnelle.
      Les chiffrages romains. Le pipeline austro-allemand que la terre entière importait
      alors.

      Il détestait ça. Pas « il avait du mal ». Il détestait. Il trouvait ça rigide, faux,
      et à côté de ce à quoi sert la musique.

      Donc en 1927, ce garçon de vingt et un ans quitte l'université Keio, monte sur un
      bateau pour Marseille, prend un train pour Paris, et se met à enchaîner les exercices
      d'harmonie des traités de Dubois et Reber avec un objectif : entrer au Conservatoire
      de Paris.
    `,

    // Caption under the gravity gif.
    'c.scene.glass': one`Ikenouchi Tomojirō, 1927, examinant le programme allemand.`,

    // What France did instead.
    'c.france': p`
      Il y entre. Premier Japonais jamais admis. Il y étudie, absorbe tout le système
      français, rentre en 1937, et devient professeur de composition à l'université des arts
      de Tokyo, où il forme un nombre considérable d'élèves.

      L'article japonais de Wikipédia sur l'harmonie l'énonce très platement, comme si ce
      n'était pas une chose folle à dire. Après le retour d'Ikenouchi, la méthode du
      Conservatoire de Paris devient dominante au Japon, et elle l'est toujours.

      Mesurez bien ce que ça veut dire. Si la musique de film japonaise sonne comme ça,
      c'est parce qu'un jeune homme agacé des années 1920 a trouvé les devoirs allemands
      laids et est parti en France.

      L'harmonie allemande parle de mouvement et de développement. Où va-t-on, comment y
      arrive-t-on, quel est l'argument. L'harmonie française parle de couleur et de
      sonorité. Quel <em>goût</em> a cet accord, immobile. Fauré, Debussy, Ravel. Neuvièmes
      ajoutées, septièmes non résolues, accords choisis pour leur saveur et non pour leur
      fonction. Le Japon a importé la seconde. C'est cet accent que j'entends depuis
      toujours sans le savoir.
    `,

    // The red textbooks.
    'c.redbooks': p`
      Ensuite ça a été mis par écrit. Trois volumes et un supplément, publiés entre 1964 et
      1967, surnommés les livres rouges parce que le premier a une couverture rouge. Presque
      toutes les universités de musique du Japon ont enseigné avec pendant un demi-siècle.
      Geidai ne les a remplacés qu'en 2015, et c'était un tel événement qu'un quotidien
      national en a fait un titre.

      Et voici le passage qui m'a fait poser mon téléphone et fixer un mur. Michiru Ōshima,
      qui a écrit la musique de Honzuki no Gekokujou, ces thèmes de famille qui m'ont fait
      l'effet d'une couverture posée sur les épaules, a étudié à Kunitachi auprès de
      Shimaoka Yuzuru. C'est-à-dire l'homme qui a écrit les livres rouges.

      J'ai remonté une émotion venue d'un anime sur une fille qui aime les livres jusqu'à un
      type énervé contre Hugo Riemann en 1926. <span class="kao">(´；ω；\`)</span>
    `,

    // Beside the gymnast gif.
    'c.collapse': p`
      Et là toute la théorie s'effondre, ce qui est délicieux.

      Parce que Yuki Kajiura n'a aucune formation musicale. Elle a fait des études de
      littérature anglaise. Elle a travaillé comme ingénieure chez NTT, l'opérateur
      téléphonique, en jouant des claviers dans un groupe le week-end. C'est tout. C'est
      toute la formation.

      Yuki Hayashi est allé dans une université normale. Il est venu à la musique par la
      <strong>gymnastique rythmique masculine</strong> : athlète, il choisissait les
      musiques de ses enchaînements au sol, puis il a commencé à les écrire lui-même, puis
      il a envoyé une démo à Hiroyuki Sawano, qui n'a jamais mis les pieds dans un
      conservatoire non plus.
    `,

    // Caption under the gymnast gif.
    'c.scene.gymnast': one`
      L'origine réelle de la musique sur laquelle vous avez vu dix mille personnes se faire
      frapper.
    `,

    // The house party.
    'c.houseparty': p`
      Et Evan Call, mon bien-aimé, est un Américain de Californie qui a étudié la musique de
      film à Berklee, est parti vivre au Japon avec un <em>visa touriste</em> et aucun plan,
      s'est fait inviter par son colocataire à une soirée pour étrangers, y a rencontré un
      type qui connaissait quelqu'un chez Elements Garden, et voilà comment il s'est
      retrouvé à composer Violet Evergarden.

      Une soirée entre amis. La plus belle écriture pour cordes de l'animation moderne
      existe grâce à une soirée entre amis.

      Donc il n'y a pas d'école. Il n'y a pas de programme secret. Ce qu'il y a, c'est un
      <em>dialecte partagé</em> qui flotte au-dessus des institutions, dans lequel tout le
      monde baigne, conservatoire ou pas. Et une grande partie de ce dialecte tient dans une
      suite d'accords qui a un nom.
    `,

    // Heading of the chord card.
    'c.royal.name': one`Ōdō shinkō, la voie royale`,
    // Text under the four chords.
    'c.royal.body': p`
      Quatre accords. En do : Fa maj7, Sol7, Mi m7, La m. Deux accords majeurs, puis deux
      mineurs. La clarté et la tristesse posées côte à côte et jamais réconciliées.

      Le coup de génie, c'est que le Sol7 refuse de rentrer à la maison. Il glisse de côté
      vers le Mi m7. En harmonie classique, ce tour est un effet spécial qu'on sort une
      fois, prudemment, pour une raison. En J-pop, c'est juste la météo.

      C'est ça, le son. C'est littéralement le mécanisme sous la sensation que je poursuis
      depuis des années sans savoir la nommer.
    `,
    // Caption beside the arrow.
    'c.royal.slip': one`refuse de résoudre, glisse de côté`,
    // Label under Fmaj7 and G7.
    'c.royal.bright': one`clair`,
    // Label under Em7 and Am.
    'c.royal.dark': one`triste`,

    // The NHK detour.
    'c.nhk': p`
      Et voilà ce qui m'a cassé le cerveau. Cette suite d'accords a été nommée en
      <strong>2008</strong>, par un musicien qui postait sur Niconico. Puis en 2014, le
      producteur Seiji Kameda l'a rebaptisée « la progression du petit démon » dans une
      émission d'éducation musicale sur NHK, en comparant le basculement du clair au sombre
      à un chagrin d'amour.

      À la télévision nationale. Pour des gens normaux. Sur le service public.

      La France n'a pas ça. L'Amérique n'a pas ça. Il n'existe pas d'émission qui explique
      au grand public ce qu'est une dominante secondaire. Au Japon, le vocabulaire
      harmonique est un <em>bien commun</em>. Il a des surnoms. C'est pour ça qu'un gymnaste
      autodidacte et une diplômée formée par l'auteur du manuel de référence finissent par
      sonner comme des cousins.
    `,

    // What does not work.
    'c.dislike': p`
      Et puis j'ai ruiné ma propre théorie en mentionnant ceux que je n'aime pas.

      J'ai lâché en passant que Joe Hisaishi ne me fait rien. Kenji Kawai non plus. Koichi
      Sugiyama non plus. Trois des plus grands noms de la musique de film japonaise. Des
      titans absolus. Et je ne ressens rien. <span class="kao">ಠ_ಠ</span>

      Je l'ai dit comme une anecdote amusante et c'est devenu la chose la plus utile de
      toute la conversation, parce que regardez ce que ces trois-là ont en commun. Hisaishi
      vient du minimalisme américain : sa tendresse, c'est une magnifique mélodie posée sur
      une harmonie lente et assez nue, bâtie sur la répétition. Kawai est textural et modal,
      des bourdons et de l'atmosphère, harmoniquement il ne bouge presque pas. Sugiyama
      écrivait du pastiche baroque, propre et diatonique.

      Tous les trois sont <strong>harmoniquement lents ou simples</strong>. Et tous ceux que
      j'aime sont harmoniquement affairés. Des accords qui bougent en permanence sous une
      mélodie lente. Des dominantes secondaires partout. Des emprunts. Des résolutions
      détournées à la dernière seconde possible.

      Donc mon goût n'a jamais été japonais. Mon goût, c'est le <strong>mouvement
      harmonique</strong>. Très précisément : j'adore entendre une seule note tenue changer
      entièrement de sens à cause des accords qui bougent dessous.
    `,

    // Setsunai.
    'c.setsunai': p`
      C'est pour ça que David Tolk ne m'a jamais tout à fait attrapé, alors que sur le
      papier il devrait. Il est diatonique et il <em>résout</em>. Sa musique parle de repos.
      Elle vous emmène dans un endroit calme et vous y laisse. Moi je veux l'inverse. Je
      veux une musique qui plane et qui diffère sans arrêt, où la tendresse vient du report
      et non de l'arrivée.

      Le japonais a un mot pour ça, 切ない, setsunai, et pas le français, ce qui est agaçant et
      explique pas mal de choses sur mes soirées.
    `,

    // The rounds of narrowing it down.
    'c.rounds': p`
      Je suis ensuite retourné écouter Kevin Penkin sérieusement, et je me suis dit non, en fait,
      la plupart du temps c'est trop compliqué pour moi, ça part en plein Jacob Collier et
      mon cerveau quitte la salle. Sauf Hanezeve Caradhina, qui m'a détruit la première fois
      et me détruit encore. Et Hanezeve Caradhina est l'un de ses morceaux les plus
      <strong>simples</strong>. Une courte boucle d'accords avec une immense ligne vocale
      sans paroles par-dessus.

      Donc ce n'était pas la densité non plus. Je ne veux pas de complexité harmonique, je
      veux de la <em>chaleur</em> harmonique sous une grande mélodie simple. Riche, pas
      compliqué. Deux axes différents que j'avais agrafés ensemble.

      Puis je suis tombé sur Adam Guettel, harmoniquement plus sophistiqué que Pasek et Paul, et
      j'ai préféré Pasek et Paul, parce que les mélodies de Guettel sont anguleuses et
      parlées et celles de Pasek et Paul se chantent. Donc la mélodie passe devant
      l'harmonie chez moi, alors que j'avais déclaré avec assurance au départ que l'harmonie
      était l'essentiel. L'harmonie, c'est ce que je <em>remarque</em>. La mélodie, c'est ce
      qui m'attrape.

      Puis Nicholas Britell, dont l'harmonie me plaît beaucoup mais où j'attendais un
      instrument soliste qui ne soit pas encore des cordes, et moins de flottement
      d'ambiance. Donc l'orchestration est une exigence dure elle aussi. Il me faut une voix
      soliste distincte au premier plan.

      À chaque tour je devenais plus précis, et à chaque tour la théorie japonaise portait
      un peu moins.
    `,

    // Beside the tangled-string gif.
    'c.judah': p`
      Voici comment tout ça s'est terminé.

      On m'a recommandé Amelia Warner. J'ai écouté Mary Shelley. Bien. J'ai écouté The
      Beautiful Game. Bien. Rien. J'étais prêt à la classer dans « acceptable, sans plus ».

      Et là la lecture automatique de YouTube, faisant ce que fait la lecture automatique de
      YouTube, m'a balancé un morceau appelé Ivory Coast et c'était <em>exactement ça</em>.
      J'ai cru que c'était Warner. Ce n'était pas elle. C'est un type qui s'appelle Judah
      Earl, et qui n'est pas du tout compositeur de films. Ivory Coast est un single de
      2020, licencié via une banque de musique de synchronisation, c'est-à-dire de la
      musique écrite pour que des réalisateurs l'achètent. Il n'y a pas de film. Pas de
      scène. Pas d'histoire. C'est de la musique cinématographique écrite pour
      <strong>personne en particulier</strong>, et elle a quelque chose comme quatre
      millions d'écoutes.
    `,

    // Caption under the tangled-string gif.
    'c.scene.whiteboard': one`Six jours de recherche, une conclusion, zéro nouveau morceau.`,

    // Where it landed.
    'c.landing': p`
      Ça compte énormément pour moi, parce que j'avais passé tout ce temps à craindre de
      n'aimer cette musique que parce que je la rencontre dans des animes. D'être contaminé
      par le récit. De n'avoir aucun goût réel, juste un conditionnement pavlovien à force
      de pleurer devant des dessins animés.

      Eh bien non. Ivory Coast est arrivé sans aucune histoire attachée, d'un type dont je
      n'avais jamais entendu parler, par un algorithme, et il a battu trois partitions d'une
      compositrice formée et présélectionnée aux Oscars. C'est la musique. Ça a toujours été
      la musique. <span class="kao">(◕‿◕)</span>

      Regardez le motif. Mes trois meilleures découvertes, celles que j'ai faites seul, sont
      almond, Mizusato, et maintenant Judah Earl. Tous les trois sont des
      <strong>compositeurs indépendants qui publient directement sur les
      plateformes</strong>, rattachés à aucune industrie. Ni anime. Ni Hollywood. Ni
      Broadway. Ni le Conservatoire de Paris.
    `,

    // The conclusion, before the letters.
    'c.conclusion': p`
      Alors voilà où j'ai atterri, après tout ça.

      La couleur n'est pas asiatique. La couleur appartient à un certain <em>type de
      personne</em>. Des gens qui écrivent une musique courte, mélodique, émotionnellement
      directe, sans ironie et sans peur d'être jolie. Ils se concentrent au Japon parce que
      le Japon a bâti toute une industrie qui en emploie des centaines à plein temps, et pas
      la France ni l'Amérique. C'est tout. C'est toute la différence. Pas une âme nationale.
      Des infrastructures.

      Ce qui est, je dois le dire, à la fois moins romantique et beaucoup plus utile, parce
      que ça veut dire que la chose s'apprend. Evan Call l'a prouvé. Il l'a attrapée en
      quatre ans à traîner dans un studio de Tokyo.

      Par ailleurs, et je le dis avec beaucoup d'affection pour moi-même, j'ai maintenant
      fourni un effort considérable pour dresser une superbe carte de mon propre goût et je
      n'ai toujours pas écrit de quatrième morceau. La carte est finie. La carte est bonne.
      La carte n'est pas de la musique.
    `,

    // One line introducing the twenty-seven letters.
    'c.letters.intro': one`
      Donc avant d'aller faire quelque chose d'utile, les voici tous, un par un, avec le
      morceau exact que je vous mettrais entre les mains.
    `,
    'c.letters.call.work': one`Song for the Beyond, de Frieren`,
    'c.letters.call.body': p`
      Tout le monde le connaît pour Violet Evergarden et maintenant Frieren, et tout le
      monde a raison, mais celui auquel je tiens vient de Josée, le tigre et les poissons.
      C'est le thème d'amour d'un film sur une jeune fille handicapée et le garçon qui
      devient son aide de vie, il dure trois minutes et demie, ce qui pour lui est énorme,
      et il est enregistré avec un orchestre hongrois et une pianiste japonaise.

      C'est sa version vulnérable, avant que le monde entier connaisse son nom. C'est le son
      de quelqu'un qui décide d'être doux, exprès.
    `,
    'c.letters.fujisawa.work': one`Rail no Ue wo Hashiru Jinsei wa, de La Famille excentrique`,
    'c.letters.fujisawa.body': p`
      Pas le thème principal. Pas le générique. Le thème de l'amitié, planqué sur le disque
      deux.

      La série parle de gemmes immortelles, et l'une d'elles est toxique, donc on lui
      assigne la garde de nuit, seule, pour toujours, afin qu'elle ne blesse personne. Et
      Fujisawa s'est assis et a écrit un morceau sur <em>ça</em>.

      C'est la chose la plus à vif d'une bande originale pour une série sur laquelle la
      plupart des gens ne cliqueraient jamais. Je mourrai sur cette colline.
    `,
    'c.letters.hayashi.work': one`Moonlit Night, de Death Parade`,
    'c.letters.hayashi.body': p`
      Oui, le type de You Say Run. Oui, le type de la musique de baston. Allez plutôt
      écouter ce qu'il a fait pour la scène de patinage de Death Parade.

      Même homme. Zéro coup de poing. M'a complètement démoli.
    `,
    'c.letters.kajiura.work': one`Canta per me`,
    'c.letters.kajiura.body': p`
      L'ancienne ingénieure des télécoms. Licence de littérature anglaise. Pas de
      conservatoire, pas de professeur d'harmonie, rien, juste une femme qui jouait des
      claviers dans un groupe, qui lisait beaucoup, et qui a apparemment absorbé une
      écriture modale aux parfums italiens et latins par osmose et par instinct.

      Tout son son repose sur des voix superposées chantant des langues inventées, sur une
      harmonie qui ne tient jamais en place. Elle a inventé un dialecte personnel puis donné
      envie à toute l'industrie de le parler. Commencez par là si vous n'avez jamais été
      Kajiura'd.

      Chaque fois qu'on me dit qu'il faut un diplôme de musique, je pense à elle chez NTT.
      <span class="kao">(＾▽＾)</span>
    `,
    'c.letters.oshima.work': one`Arigatou, de Honzuki no Gekokujou`,
    'c.letters.oshima.body': p`
      La musique qui joue quand cette fille qui aime les livres se retrouve entourée de gens
      qui l'aiment en retour.

      Elle a appris l'harmonie directement auprès de l'homme qui a écrit le manuel japonais
      de référence, et ça s'entend. Il y a une rigueur sous la chaleur. Ce n'est pas doux
      parce qu'elle ne saurait pas être compliquée. C'est doux exprès, par quelqu'un qui
      pourrait tout à fait être compliqué et a choisi de ne pas l'être.

      Cette retenue, c'est tout le sujet. C'est ça que je veux apprendre.
    `,
    'c.letters.kitamura1.work': one`Soul of Cinder, de Dark Souls III`,
    'c.letters.kitamura1.body': p`
      C'est pour ça que tout le monde la connaît. Colossal, terrifiant, un chœur qui vous
      hurle dessus pendant que les dernières cendres d'un monde mort s'acharnent à mettre
      fin à vos jours. Elle a passé des années à être excellente pour écraser les gens, et
      c'est encore son nom qu'on cite quand on veut dire qu'une bande originale est énorme.
    `,

    'c.letters.kitamura2.work': one`Spells That Bring Happiness, de Tongari Boushi no Atelier`,
    'c.letters.kitamura2.body': p`
      Et voici la même personne, dix-huit mois plus tard, qui écrit de la musique de chambre
      tout en douceur pour une histoire de jeune fille qui apprend à devenir sorcière.
      Écoutez les deux à la suite. Le métier n'a pas bougé d'un millimètre. Seule la
      commande a changé.

      Elle se décrit comme bonne en orchestre, petits ensembles, instruments folk et chœur
      non linguistique, et ce n'est pas une liste de genres, c'est une liste de
      <em>couleurs</em>. Je trouve ça déraisonnablement inspirant, et c'est la preuve la
      plus nette que rien de tout ça n'est une cage.
    `,

    // Caption under the cosy-cottage gif.
    'c.scene.cottage': one`Même compositrice. Environ dix-huit mois d'écart.`,

    'c.letters.haneoka.work': one`Le thème principal, de Kono Oto Tomare`,
    'c.letters.haneoka.body': p`
      Il fait quelque chose de simple et ça a la couleur. Puis il fait quelque chose de
      raffiné et compliqué dans Kaguya-sama et ça a <em>encore</em> la couleur, ce qui
      prouve que la couleur survit à la complexité, elle ne l'exige simplement pas.

      Détail amusant. Il a étudié la musique contemporaine à l'université, et dans une
      interview il dit que ce qui l'aide le plus aujourd'hui, c'est l'harmonie tonale et le
      contrepoint appris <em>avant</em> d'y entrer, pendant la prépa au concours. Le diplôme
      lui a enseigné le modernisme. Le bachotage lui a appris à être beau. J'y pense
      constamment.
    `,
    'c.letters.nishiki.work': one`Le thème d'Olberic, d'Octopath Traveler`,
    'c.letters.nishiki.body': p`
      Collège de musique de Tokyo, filière musique pour le cinéma et la télévision : il
      existe donc une vraie filière formelle de musique à l'image, et il l'a suivie.

      Il publie aussi des analyses détaillées de ses propres morceaux, dont certaines en
      anglais, ce qui est la chose la plus généreuse qu'un compositeur en activité dans cet
      idiome ait jamais faite pour quelqu'un comme moi. Un homme qui explique gratuitement
      ses choix harmoniques à personne en particulier. Je lui dois quelque chose.
    `,
    'c.letters.takanashi.work': one`Omoi, de Carnival Phantasm`,
    'c.letters.takanashi.body': p`
      L'un de ceux dont j'ai absorbé la musique pendant des centaines d'heures de télévision
      sans jamais regarder un générique.

      Il vient des groupes, pas des conservatoires, et ça s'entend de la meilleure façon
      possible. Il y a là une franchise qu'on n'obtient pas de gens à qui on a appris la
      prudence.
    `,
    'c.letters.kato.work': one`Le thème d'Isshiki, de Shokugeki no Soma`,
    'c.letters.kato.body': p`
      Même catégorie, autres mains, et il a droit à sa propre entrée parce que mélanger deux
      compositeurs est exactement le crime que je dénonce depuis deux mille mots.

      Énormément prolifique, chaleureux sans effort, et presque jamais le nom que quiconque
      cite. Ce qui est un compliment à sa façon : la musique a si bien marché que vous
      n'avez jamais pensé à demander qui l'avait faite.
    `,
    'c.letters.penkin.work': one`Hanezeve Caradhina`,
    'c.letters.penkin.body': p`
      Le seul de ses morceaux sur lequel je reviens, et le premier que j'aie entendu. M'a
      fait pleurer immédiatement, ce qui est gênant, puis m'a refait pleurer plus tard, ce
      qui est pire.

      C'est une boucle simple avec une immense voix sans paroles dessus. C'est tout le tour
      de magie. Et j'ai fini par comprendre que c'est mon <em>type</em>. La voix comme
      instrument principal, pas de mots, pas de paroles qui font concurrence, juste un son
      humain qui porte l'air au-dessus de cordes chaudes.

      Tout le reste de son travail est trop malin pour moi et j'ai fait la paix avec ça.
      <span class="kao">¯\\_(ツ)_/¯</span>
    `,
    'c.letters.shimomura.work': one`Hearts as One`,
    'c.letters.shimomura.body': p`
      J'ai connu la mélodie des années avant de connaître son nom, comme beaucoup de gens.

      Probablement la personne la plus généreuse harmoniquement de la musique de jeu vidéo.
      Jamais statique, jamais froide, toujours un bel accord de plus là où quelqu'un de
      moindre se serait arrêté en se disant que c'était fini.
    `,
    'c.letters.mayuko.work': one`Le thème de Bojji, de Ranking of Kings`,
    'c.letters.mayuko.body': p`
      Une histoire de prince sourd et muet qui ne peut pas parler, ce qui veut dire que la
      musique doit faire tout le travail émotionnel à sa place.

      Cette contrainte produit exactement mon truc. Des mélodies au premier plan, de petits
      ensembles chaleureux, des morceaux courts qui vont réellement quelque part. Le thème
      de Bojji. Celui de la boîte à musique. Je n'allais pas bien.
    `,
    'c.letters.muramatsu.work': one`Le thème de Mary, en concert`,
    'c.letters.muramatsu.body': p`
      Il a aussi composé Souvenirs de Marnie. C'est d'abord un pianiste et ça s'entend.

      Mais si j'aime Mary en particulier, c'est parce qu'un joueur de dulcimer à marteaux,
      Joshua Messick, joue sur <em>absolument tous les morceaux</em> de cette bande
      originale. Un film entier porté par un timbre étrange, clair et inhabituel au-dessus
      d'un orchestre.

      Ça a résolu un problème dont j'ignorais l'existence : il me faut une voix soliste
      distincte devant, et je m'agite quand c'est des cordes jusqu'en bas.
    `,
    'c.letters.yokoyama.work': one`Autumn Sonata, de Fruits Basket`,
    'c.letters.yokoyama.body': p`
      Chaleur familiale, écriture de cordes dense, accords qui bougent en permanence sous
      des mélodies lentes.

      En plein dans le mille de tout ce que je veux. Rien à redire.
    `,
    'c.letters.powell.work': one`Come Say Goodbye, de L'Appel de la forêt`,
    'c.letters.powell.body': p`
      Tout le monde va vers les dragons et tout le monde a raison, mais L'Appel de la forêt
      est celui que je mettrais entre vos mains.

      Il a mis en musique un chien. Il a utilisé du banjo, du violon, de l'accordéon et de
      la mandoline, ce qui l'a forcé à sortir de la grandeur orchestrale pour quelque chose
      de petit et d'humain, et toute la partition est chaleureuse jusqu'au moment où elle
      cesse de l'être.

      C'est aussi le réharmoniseur le plus actif de l'animation, ce qui explique, je le
      comprends maintenant, pourquoi il figure dans ma liste à côté d'une pile de
      compositeurs d'anime. Même maladie. <span class="kao">(¬‿¬)</span>
    `,
    'c.letters.pasekpaul.work': one`Runnin' Home to You, de Flash`,
    'c.letters.pasekpaul.body': p`
      Tout le monde cite The Greatest Showman. Très bien. Allez plutôt chercher celle-là.

      C'est une ballade calme sur l'amour maternel, celui qu'on ne remarque pas et qui n'a
      rien de glamour, cachée dans une grosse comédie musicale sur un gamin qui veut une
      carabine à plomb. Pas d'ironie. Pas de clin d'œil. Juste un adulte qui écrit quelque
      chose de petit et de tendre dans un spectacle où personne n'aurait l'idée de chercher.

      C'est toute l'éthique en une chanson.
    `,
    'c.letters.wallerbridge.work': one`Home, de The Boy, The Mole, The Fox and The Horse`,
    'c.letters.wallerbridge.body': p`
      Celle-ci n'est pas un « j'aime bien ». Celle-ci est un <em>c'est ça, la cible</em>.

      Petit ensemble de chambre. Livre d'images. Des airs simples et beaux. Une harmonie
      chaude et lisible. Des morceaux courts qui vont quelque part puis s'arrêtent.

      Si je pouvais écrire une seule chose dans ma vie et qu'elle sonne comme cette
      partition, je considérerais tout ce loisir comme réussi et j'irais mener une vie
      normale.
    `,
    'c.letters.bowers.work': one`Roz's Story, du Robot sauvage`,
    'c.letters.bowers.body': p`
      Un pianiste de jazz qui met en musique un film d'animation sur une machine qui apprend
      à être mère. Sur le papier c'est visé droit sur ma figure, et en pratique ça touche.

      J'ai vu le film et je n'ai même pas regardé qui avait écrit la musique, ce qui est
      entièrement ma faute, et je corrige maintenant, publiquement, par écrit.
    `,
    'c.letters.britell.work': one`If Beale Street Could Talk`,
    'c.letters.britell.body': p`
      L'harmonie est superbe. Vraiment.

      Mais c'est surtout des cordes, et je me suis surpris à souhaiter un autre timbre en
      tête, et un peu moins de flottement d'ambiance quand j'attends une mélodie debout
      devant qui dit quelque chose.

      J'aime bien. Je n'adore pas. Et comprendre <em>pourquoi</em> m'a appris plus sur moi
      que n'importe lequel de ceux que j'adore.
    `,
    'c.letters.coker.work': one`Light of Nibel, d'Ori and the Blind Forest`,
    'c.letters.coker.body': p`
      Piano, cordes, voix sans paroles, émotion assumée, et aucune gêne à ce sujet.

      La musique de jeu vidéo fait tranquillement tout mon genre depuis vingt ans et presque
      personne en dehors du jeu ne l'a remarqué.
    `,
    'c.letters.larkin.work': one`Lace, de Hollow Knight: Silksong`,
    'c.letters.larkin.body': p`
      Quatre notes et beaucoup de vide, et ça peut clouer un adulte sur sa chaise.

      C'est mon meilleur argument pour dire que la retenue est une compétence, et pas
      l'absence de compétence.
    `,
    'c.letters.park.work': one`A Slant of Light`,
    'c.letters.park.body': p`
      Coréen, indépendant, mené par le piano, doux, en forme de chanson. Ne met rien en
      musique, n'est rattaché à aucune histoire, juste une personne qui fabrique une petite
      chose belle.

      Ce qui, rétrospectivement, était le premier indice que tout ça n'a jamais eu de
      rapport avec l'anime.
    `,
    'c.letters.almond.work': one`My New Gear...`,
    'c.letters.almond.body': p`
      L'une de mes deux trouvailles chanceuses. Quelqu'un qui poste des brouillons sur
      internet sans aucune industrie derrière.

      Je reviens encore aux esquisses d'almond plus souvent qu'à la plupart des albums finis
      que je possède. Il y a quelque chose à entendre une idée avant qu'elle soit polie,
      quand elle est encore un peu de travers et complètement vivante.
    `,
    'c.letters.mizusato.work': one`Neko no Sumu Machi, un disque sur Paris et les chats`,
    'c.letters.mizusato.body': p`
      Mon autre trouvaille chanceuse. Celle-ci est devenue virale et je me suis senti
      bizarrement protecteur, comme quand un groupe qu'on aime devient gros.

      Ce qui est ridicule, puisque je l'ai trouvée sur TikTok comme tout le monde.
      <span class="kao">(´；ω；\`)</span>
    `,
    'c.letters.judah.work': one`Ivory Coast`,
    'c.letters.judah.body': p`
      Et enfin celui qui a fait tomber l'affaire.

      Un compositeur indépendant. Pas de film, pas d'anime, pas de récit, pas de contexte,
      licencié sur une plateforme de musique au catalogue pour que des réalisateurs
      l'achètent. Trouvé au hasard par un algorithme pendant que j'étais occupé à ne pas
      être impressionné par quelqu'un d'autre.

      Et il a fait l'effet. Immédiatement. Sans histoire. Ce qui veut dire que mes cinq
      dernières années à soupçonner en silence de n'aimer cette musique que grâce aux séries
      auxquelles elle était attachée étaient une erreur.

      J'aime simplement les belles choses. Il s'avère que c'était autorisé depuis le début.
    `,

    // Caption under the last gif.
    'c.scene.piano': one`Des progrès. Techniquement.`,

    // The close, beside the last gif.
    'c.coda': p`
      Voilà la liste. Vingt-six personnes qui m'ont toutes, à un moment ou à un autre, cloué
      sur place dans une pièce sombre.

      Ce que je veux, c'est écrire un morceau qui fasse ça à quelqu'un d'autre. Rien de
      malin. Rien qui prouve que j'ai bien révisé. Quelque chose de doux, de posé, d'un peu
      trop joli, que quelqu'un lance à onze heures du soir sans trop savoir pourquoi, comme
      je lance leur musique depuis des années.

      C'est toute l'ambition. Elle n'est pas modeste et j'en suis très loin.
    `,

    // Shown when YouTube refuses to play a track off-site.
    'c.player.out': one`Écouter sur YouTube`,

    // Credit for the borrowed gifs.
    'c.gifs': one`
      Les chats ci-dessus viennent de Giphy et ne sont pas de moi. Sur cette page il n'y a
      que les mots et les mauvaises décisions qui m'appartiennent.
    `,

    // The last line on the page.
    'c.wish': one`Souhaitez-moi bonne chance ;)`,

    // Label on a letter's play button.
    'c.player.play': one`Écouter`,
    // Shown when a letter has no link yet.
    'c.player.pending': one`Pas encore de lien pour celui-ci.`,

    // Link back to the music page.
    'c.back': one`Retour à la page musique`,

    // Link back to the work.
    'c.home': one`Retour aux projets`,
  },
};
