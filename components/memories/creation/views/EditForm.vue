<template>
  <div class="o-page o-page--edit">
    <div class="o-page__header o-page__header-nav">
      <button class="o-page__header-btn icon" @click="$emit('back')">
        <IconChevron />
      </button>
      <span>Modifier le souvenir</span>
      <button class="o-page__header-btn primary" @click="$emit('submit')">
        Enregister
      </button>
    </div>
    <div class="o-page__body">
      <MemoryPreview v-if="value" :memory="value" />
    </div>

    <div class="o-cells">
      <label class="o-cells__label">Nom</label>
      <client-only>
        <b-field>
          <b-input
            :value="value.name"
            placeholder="Nom du souvenir"
            @input="handleChange({ name: $event })"
          />
        </b-field>
      </client-only>
    </div>

    <div class="o-cells">
      <label class="o-cells__label">Date</label>
      <client-only>
        <b-field>
          <b-datepicker
            :value="new Date(value.date)"
            locale="fr"
            placeholder="Sélectionner une date"
            icon="calendar-today"
            trap-focus
            @input="handleChange({ date: $event.toISOString() })"
          >
          </b-datepicker>
        </b-field>
      </client-only>
    </div>

    <div class="o-cells">
      <label class="o-cells__label">Confidentialité</label>
      <div class="o-cells__container">
        <button class="o-cells__item" @click="$emit('params')">
          <span v-if="!visibilityItem">
            Choisissez qui peut voir le souvenir
          </span>
          <span v-else class="o-cells__item-content">
            <span class="o-cells__item-text">{{ visibilityItem.text }}</span>
            <span class="o-cells__item-help">{{ visibilityItem.helper }}</span>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import IconChevron from '@/assets/svg/ic_chevron.svg?inline';
import MemoryPreview from '../../MemoryPreview';

export default {
  name: 'EditForm',
  components: { MemoryPreview, IconChevron },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: {
        date: null,
      },
    };
  },
  methods: {
    handleChange(input) {
      console.log(input);
      this.$emit('input', { ...this.value, ...input });
    },
  },
};
</script>

<style lang="scss" scoped></style>
