export type KeyValueObject = {
  [key: string]: any;
};

declare global {
  var dataLayer: KeyValueObject[];
}
