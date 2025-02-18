import type { BookStatusConst } from "@global/definitions/constant.definition";

export type TBookStatus = (typeof BookStatusConst)[keyof typeof BookStatusConst];
