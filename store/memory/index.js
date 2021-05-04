import { CONTENT_TYPE, THEMES } from '@/const/memory';

const initialState = {
  name: '',
  date: [],
  type: 'Concert',
  contents: [],
  themes: [...THEMES],
};

// Add memory store
export const state = () => ({
  ...initialState,
});

export const mutations = {
  addContent(state, type) {
    state.contents.push(CONTENT_TYPE[type]);
  },

  updateName(state, value) {
    state.name = value;
  },

  resetState(state) {
    state = { ...initialState };
  },

  updateDate(state, value) {
    state.date = value;
  },

  removeContent(state, index) {
    state.contents.splice(index, 1);
  },

  selectTheme(state, slug) {
    state.themes.forEach((t) => (t.selected = false));
    const theme = state.themes.find((t) => t.slug === slug);
    theme.selected = true;
  },
};

export const actions = {};
