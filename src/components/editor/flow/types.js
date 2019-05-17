type ButtonProps = {
  value: Object,
  onChange: Function,
  /** Material-UI styling */
  classes?: Object,
}

type NodeProps = {
  children: any,
  attributes: Object,
  node: {
    data: Object,
  },
}

export type { ButtonProps, NodeProps }
