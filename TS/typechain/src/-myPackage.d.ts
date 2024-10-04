interface Config {
  url: string;
}

declare module "myPackage" {
  // declare에서는 구현을 하지 않는 타입을 function으로해도 됨
  // type으로 해도 됨

  function init(config: Config): boolean;
  function exit(code: number): number;
}
