import "reflect-metadata";

export function Body(target: any, propertyKey: any, index: any) {
  const slug = "body";
  var type = Reflect.getMetadata("design:paramtypes", target, propertyKey);
  const oldState = Reflect.getMetadata(`${propertyKey}`, target) ?? [];

  Reflect.defineMetadata(
    `${propertyKey}`,
    [
      ...oldState,
      {
        order: index,
        type: type[index],
        slug,
      },
    ],

    target
  );
}
export function Query(target: any, propertyKey: any, index: any) {
  const slug = "query";
  var type = Reflect.getMetadata("design:paramtypes", target, propertyKey);
  const oldState = Reflect.getMetadata(`${propertyKey}`, target) ?? [];

  Reflect.defineMetadata(
    `${propertyKey}`,
    [
      ...oldState,
      {
        order: index,
        type: type[index],
        slug,
      },
    ],

    target
  );
}
export function Get(route: string) {
  return (target: any, propertyKey: any, descriptor: PropertyDescriptor) => {
    const routes = Reflect.getMetadata("routes", target) ?? [];
    const params = Reflect.getMetadata(`${propertyKey}`, target) ?? [];
    Reflect.defineMetadata(
      "routes",
      [
        ...routes,
        {
          url: route,
          method: "get",
          name: propertyKey,
          params,
        },
      ],
      target
    );
  };
}
