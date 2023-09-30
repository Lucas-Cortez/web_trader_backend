export interface Injectable<I = any> {
  inject(): I;
}
