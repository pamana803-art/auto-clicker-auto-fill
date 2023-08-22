type Event = {
  event: string;
  section: string;
  conversionName: string;
  conversionValue: string;
};

/**
 * @deprecated
 * @param input
 * @param section
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function dataLayerInput_(input: any, section: string) {
  const key = Object.keys(input)[0];
  const event: Event = { event: 'input', section, conversionName: key, conversionValue: input[key] };
  window.dataLayer.push(event);
}

/**
 * @deprecated
 * @param conversionName
 * @param conversionValue
 */
export function dataLayerModel_(conversionName: string, conversionValue: string) {
  const event = { event: 'modal', conversionName, conversionValue };
  window.dataLayer.push(event);
}
