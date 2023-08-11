export const numberWithExponential = function (props:any, propName:string, componentName:string) {
  if (Number.isNaN(props[propName])) {
    return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. Validation failed.`)
  }
  return false
}
