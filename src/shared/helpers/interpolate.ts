import Mustache from 'mustache';

export function interpolate(template: any, context: Record<string, any>) {
  if (typeof template === 'string') {
    return Mustache.render(template, context);
  }

  if (Array.isArray(template)) {
    return template.map((item) => interpolate(item, context));
  }

  if (typeof template === 'object' && template !== null) {
    const interpolatedObject: Record<string, any> = {};
    for (const key in template) {
      interpolatedObject[key] = interpolate(template[key], context);
    }
    return interpolatedObject;
  }

  return template;
}
