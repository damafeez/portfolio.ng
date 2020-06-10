<template>
  <div :title="label" class="text-input">
    <textarea
      v-if="type === 'textarea'"
      :id="id"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
    <input
      v-else
      :id="id"
      :type="type"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
    <label v-if="icon || label" :for="id">
      <icon-base v-if="icon" :name="icon"></icon-base>
      <template v-else>{{ label[0] }}</template>
    </label>
  </div>
</template>
<script>
const allowedTypes = ['text', 'number', 'textarea']
export default {
  name: 'TextInput',
  props: {
    type: {
      type: String,
      validator: type => allowedTypes.includes(type),
      default: 'text',
    },
    value: [String, Number],
    label: String,
    icon: String,
    id: {
      type: String,
      default: () => `text-input-${Math.floor(Math.random() * 1000)}`,
    },
  },
}
</script>
<style lang="scss" scoped>
.text-input {
  border: 1px solid currentColor;
  border-radius: 5px;
  display: flex;
  align-items: center;
  input,
  textarea {
    flex: 1;
    min-width: 0;
    outline: none;
    border: none;
    background: transparent;
    padding: 0.6rem 0.7rem;
    border-radius: 0.4rem;
    color: inherit;
    &:focus {
      & + label {
        max-width: 0;
        opacity: 0;
      }
    }
  }
  label {
    padding: 0 0.5rem;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s ease-out;
    overflow: hidden;
  }
}
</style>
