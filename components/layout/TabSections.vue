<template>
  <div>
    <nav class="o-section__head tab-nav">
      <button
        v-for="(s, i) in sections"
        :key="i"
        :class="{ current: selectedSection === s.name }"
        class="tab-nav__item"
        @click="showSection(s.name)"
      >
        <span>{{ s.nav }}</span>
        <span v-if="showIndex">({{ getIndex(s) }})</span>
      </button>
    </nav>

    <div class="tab-sections">
      <section
        v-for="(s, i) in sections"
        :key="i"
        :class="[s.class]"
        class="tab-sections__container"
      >
        <div v-show="selectedSection === s.name" class="">
          <component
            :is="s.component"
            v-for="d in s.data"
            :key="d.id"
            :data="d"
          />
          <slot :name="`section${i}`"></slot>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import InstrumentPreview from '../instrument/InstrumentPreview';
import MemoryPreview from '../memories/MemoryPreview';

export default {
  name: 'TabSections',
  components: {
    InstrumentPreview,
    MemoryPreview,
  },
  props: {
    showIndex: {
      type: Boolean,
      default: false,
    },
    sections: {
      type: Array,
      required: true,

      name: {
        type: String,
        required: true,
      },
      nav: {
        type: String,
        required: true,
      },
      component: {
        type: String,
        required: true,
      },
      class: {
        type: String,
        required: true,
      },
      data: {
        type: Array,
        required: true,
      },
    },
  },
  data() {
    return {
      selectedSection: null,
    };
  },
  created() {
    this.showSection(this.sections[0].name);
  },
  methods: {
    showSection(name) {
      this.selectedSection = name;
    },
    getIndex(section) {
      return section.data.length;
    },
  },
};
</script>
