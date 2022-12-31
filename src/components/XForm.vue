<template>
  <form>
    <div v-for="(field, index) in fields" :key="index">
      <component
        :is="field.component ?? 'input'"
        :value="modelValue[field.field]"
        :name="field.field"
        :placeholder="field.placeholder"
        :type="field.type"
        @input="onInput($event)"
      >
        {{ modelValue[field.field] ?? field.placeholder }}
      </component>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
    fields: {
      type: Array,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  methods: {
    onInput(event, index) {
      let newModelValue = { ...this.modelValue };
      newModelValue[event.target.name] = event.target.value;
      this.$emit("update:modelValue", newModelValue);
    },
  },
};
</script>
