<template>
  <div class="el-form-item" :class="[{'is-error': isError}]">
    <div class="el-form-item__content">
      <slot>
        <el-input v-model="row[prop]"></el-input>
      </slot>
      <div
          v-if="isError"
          class="el-form-item__error"
      >
        {{ validateMessage }}
      </div>
    </div>

  </div>
</template>

<script>
import AsyncValidator from 'async-validator'

const noop = function () {
}

export default {
  name: 'TableFormItem',

  componentName: 'ElFormItem',

  props: {
    row: {
      type: Object,
      require: true
    },

    required: {
      type: Boolean,
      default: undefined
    },

    prop: {
      type: String,
      require: true
    },

    label: String,

    rules: [Object, Array]
  },

  data() {
    return {
      validateState: '',
      validateMessage: ''
    }
  },

  created() {
    this.$on('el.form.blur', this.onFieldBlur)
    this.$on('el.form.change', this.onFieldChange)
  },

  computed: {

    isError({validateState}) {
      return validateState === 'error'
    }
  },

  methods: {
    validate(trigger, callback = noop) {
      const rules = this.getFilteredRule(trigger)
      if ((!rules || rules.length === 0) && this.required === undefined) {
        callback()
        return true
      }

      this.validateState = 'validating'

      const descriptor = {}
      if (rules && rules.length > 0) {
        rules.forEach(rule => {
          delete rule.trigger
        })
      }
      descriptor[this.prop] = rules

      const validator = new AsyncValidator(descriptor)
      const fieldValue = this.row[this.prop]
      validator.validate({
        [this.prop]: fieldValue
      }, {firstFields: true}, (errors, invalidFields) => {
        this.validateState = !errors ? 'success' : 'error'
        this.validateMessage = errors ? errors[0].message : ''
        callback(this.validateMessage, invalidFields)
      })
    },

    onFieldChange() {
      this.validate('change')
    },

    onFieldBlur() {
      this.validate('blur')
    },

    getFilteredRule(trigger) {
      const rules = this.getRules()
      return rules.filter(rule => {
        if (!rule.trigger || trigger === '') return true
        if (Array.isArray(rule.trigger)) {
          return rule.trigger.indexOf(trigger) > -1
        } else {
          return rule.trigger === trigger
        }
      }).map(rule => Object.assign({}, rule))
    },

    getRules() {
      let formRules = this.rules || []
      const requiredRule = this.required !== undefined ? {
        required: !!this.required,
        message: `${ this.label || this.prop || '属性' }不能为空`
      } : []
      return [].concat(formRules || []).concat(requiredRule)
    }
  }
}
</script>