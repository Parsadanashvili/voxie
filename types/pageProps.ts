import { NextPage } from "next";

/**
 * Description for interface
 *
 * @interface CustomNextPage
 * @extends {NextPage}
 * @property {string} getPageTitle - Page title
 *
 */
export type CustomNextPage = NextPage & {
  getPageTitle?: string;
};
