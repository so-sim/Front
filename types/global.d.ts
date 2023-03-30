export type KeyValueObject = {
  [key: string]: string;
};

declare global {
  var dataLayer: KeyValueObject[];
}
