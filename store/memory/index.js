import { CONTENT_TYPE, THEMES } from '@/const/memory';

const initialState = {
  name: '',
  date: [],
  type: 'Concert',
  visibility: null,
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

  updateDate(state, value) {
    state.date = value;
  },

  updateVisibility(state, value) {
    state.visibility = value;
  },

  updateContent(state, { index, value, file }) {
    if (value) {
      state.contents[index].content = value;
    }
    if (file) {
      state.contents[index].file = file;
    }
  },

  resetState(state) {
    state = { ...initialState };
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
