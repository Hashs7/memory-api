import { CONTENT_TYPE, emptyMemory } from '@/const/memory';

// Add memory store
export const state = () => ({
  memory: { ...emptyMemory },
});

export const getters = {
  contents: (state) => state.memory.contents,
};

export const mutations = {
  addContent(state, type) {
    state.memory.contents.push(CONTENT_TYPE[type]);
  },

  updateName(state, value) {
    state.memory.name = value;
  },

  updateDate(state, value) {
    state.memory.date = value;
  },

  updateVisibility(state, value) {
    state.memory.visibility = value;
  },

  setMemory(state, memory) {
    state.memory = { ...memory };
  },

  updateContent(state, { index, value, file }) {
    if (value) {
      state.memory.contents[index].content = value;
    }
    if (file) {
      state.memory.contents[index].file = file;
    }
  },

  resetState(state) {
    state.memory = { ...emptyMemory };
  },

  removeContent(state, index) {
    state.memory.contents.splice(index, 1);
  },

  selectTheme(state, slug) {
    state.themes.forEach((t) => (t.selected = false));
    const theme = state.themes.find((t) => t.slug === slug);
    theme.selected = true;
  },
};
