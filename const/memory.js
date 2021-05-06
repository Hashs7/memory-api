export const CONTENT_TYPE = {
  media: {
    type: 'media',
    component: 'MediaContent',
    content: '',
    file: '',
  },
  audio: {
    type: 'audio',
    component: 'AudioContent',
    content: '',
    file: '',
  },
  text: {
    type: 'text',
    component: 'TextContent',
    content: '',
  },
};

export const VISIBILITY = {
  private: {
    slug: 'private',
    text: 'Moi seulement',
    helper: 'Vous seul pouvez voir ce souvenir',
  },
  unlisted: {
    slug: 'unlisted',
    text: 'Non répertorié',
    helper: 'Seul les personnes disposant du lien y ont accès',
  },
  fans: {
    slug: 'fans',
    text: 'Fans seulement',
    helper: 'Seuls vos amis pourront voir ce souvenir',
  },
  public: {
    slug: 'public',
    text: 'Tout le monde',
    helper: 'Votre souvenir est publique',
  },
};

export const formatContentType = (types) =>
  types.map((t) => {
    delete t.component;
    return t;
  });

export const THEMES = [
  {
    title: "Noir c'est noir",
    subtitle: 'Sous-titre',
    slug: 'black',
    selected: false,
  },
  {
    title: 'Le pianiste',
    subtitle: 'Sous-titre',
    slug: 'pianiste',
    selected: false,
  },
  {
    title: 'La vie en rose',
    subtitle: 'Sous-titre',
    slug: 'vie-rose',
    selected: false,
  },
  {
    title: 'Banana split',
    subtitle: 'Sous-titre',
    slug: 'banana-split',
    selected: false,
  },
  {
    title: 'Santiano',
    subtitle: 'Sous-titre',
    slug: 'santiano',
    selected: false,
  },
  {
    title: 'Les sardines',
    subtitle: 'Sous-titre',
    slug: 'sardines',
    selected: false,
  },
  {
    title: 'Je l’aime à mourir',
    subtitle: 'Sous-titre',
    slug: 'aime-mourir',
    selected: false,
  },
  {
    title: 'Surfin’ USA',
    subtitle: 'surfing-usa',
    slug: 'surfing-usa',
    selected: false,
  },
  {
    title: 'L’amour à la plage',
    subtitle: 'Sous-titre',
    slug: 'playa',
    selected: false,
  },
  {
    title: 'Je viens du sud',
    subtitle: 'Sous-titre',
    slug: 'south',
    selected: false,
  },
  {
    title: 'Couleur menthe à l’eau',
    subtitle: 'Sous-titre',
    slug: 'mint',
    selected: false,
  },
];
