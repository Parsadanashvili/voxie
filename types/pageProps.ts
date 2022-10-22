import { NextPage } from "next";

/**
 * Description for interface
 *
 * @interface CustomNextPage
 * @extends {NextPage}
 * @property {string} getPageTitle - Page title
 *
 */
export type CustomNextPage<T> = NextPage<T> & {
  getPageTitle?: string;
};
