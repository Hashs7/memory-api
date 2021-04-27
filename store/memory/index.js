import { CONTENT_TYPE, THEMES } from '@/const/memory';

// Add memory store
export const state = () => ({
  name: '',
  date: [],
  type: 'Concert',
  contents: [],
  themes: [...THEMES],
});

export const mutations = {
  addContent(state, type) {
    state.contents.push(CONTENT_TYPE[type]);
  },

  updateNale(state, value) {
    state.name = value;
  },

  updateDate(state, value) {
    state.date = value;
  },
};

export const actions = {};
