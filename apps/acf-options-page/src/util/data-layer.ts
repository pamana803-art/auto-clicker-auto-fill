type Event = {
  event: string;
  section: string;
  conversionName: string;
  conversionValue: string;
};

export function dataLayerInput(input:any, section:string) {
  const key = Object.keys(input)[0];
  const event: Event = { event: 'input', section, conversionName: key, conversionValue: input[key] };
  window.dataLayer.push(event);
}

export function dataLayerModel(conversionName: string, conversionValue: string) {
  const event = { event: 'modal', conversionName, conversionValue };
  window.dataLayer.push(event);
}
