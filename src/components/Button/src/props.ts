export const buttonProps = {
  color: {
    type: String,
    validator: (v) => ['error', 'warning', 'success', ''].includes(v),
  },
  /**
   * Text before icon.
   */
  preIcon: { type: String },
  /**
   * Text after icon.
   */
  postIcon: { type: String },
  /**
   * preIcon and postIcon icon size.
   * @default: 14
   */
  iconSize: { type: Number, default: 14 },
  loading: { type: Boolean },
  disabled: { type: Boolean },
  onClick: { type: Function as PropType<(...args) => any>, default: null },
}
